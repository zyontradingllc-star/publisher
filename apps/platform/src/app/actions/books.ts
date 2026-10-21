"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isLeadOnlySession, requireProfile } from "@/lib/auth";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  notifyAdminNewSubmission,
  notifyAuthorSubmissionReceived,
} from "@/lib/email";
import { dropInfoToInbox } from "@/lib/notify-inbox";
import {
  canTransition,
  isAuthorEditable,
} from "@/lib/status-transitions";
import { isSafeHttpUrl, slugify } from "@/lib/utils";
import {
  bookDraftSchema,
  bookSubmitSchema,
  COVER_EXTENSIONS,
  COVER_MIME_TYPES,
  MANUSCRIPT_EXTENSIONS,
  MANUSCRIPT_MIME_TYPES,
  maxCoverBytes,
  maxManuscriptBytes,
  salesLinkSchema,
} from "@/lib/validations";
import type { ActionState } from "@/app/actions/auth";
import type { BookStatus } from "@/types/database";

async function ensureUniqueSlug(base: string, excludeId?: string) {
  const supabase = await createClient();
  let slug = slugify(base) || "book";
  let n = 0;
  while (true) {
    let q = supabase.from("books").select("id").eq("slug", slug);
    if (excludeId) q = q.neq("id", excludeId);
    const { data } = await q.maybeSingle();
    if (!data) return slug;
    n += 1;
    slug = `${slugify(base)}-${n}`;
  }
}

export async function saveBookDraftAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");

  const parsed = bookDraftSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle") || "",
    slug: slugify(String(formData.get("slug") || formData.get("title") || "")),
    description: formData.get("description") || "",
    author_display_name:
      formData.get("author_display_name") || profile.display_name || "",
    genre_id: formData.get("genre_id") || "",
    language: formData.get("language") || "en",
    publication_date: formData.get("publication_date") || "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Lead session (signup emailed to no-reply@, Supabase not ready): drop book details to inbox
  if ((await isLeadOnlySession()) || !isSupabaseConfigured()) {
    const inbox = await dropInfoToInbox({
      subject: `Book publishing details - ${parsed.data.title}`,
      lines: [
        "Author book publishing details (dashboard)",
        "",
        `Author: ${parsed.data.author_display_name}`,
        `Author email: ${profile.email ?? "(unknown)"}`,
        `Title: ${parsed.data.title}`,
        `Subtitle: ${parsed.data.subtitle || "-"}`,
        `Slug: ${parsed.data.slug}`,
        `Language: ${parsed.data.language}`,
        `Genre id: ${parsed.data.genre_id || "-"}`,
        `Publication date: ${parsed.data.publication_date || "-"}`,
        "",
        "Description:",
        parsed.data.description || "(empty)",
        "",
        `Submitted at: ${new Date().toISOString()}`,
      ],
    });
    if (!inbox.ok) {
      return {
        ok: false,
        message:
          inbox.error ||
          "Could not send book details to no-reply@authorspilot.com. Try again.",
      };
    }
    return {
      ok: true,
      message:
        "Book details sent to no-reply@authorspilot.com. Our team will follow up. Full draft saving unlocks after Supabase is connected.",
    };
  }

  const supabase = await createClient();
  const slug = await ensureUniqueSlug(parsed.data.slug, bookId || undefined);

  const payload = {
    title: parsed.data.title,
    subtitle: parsed.data.subtitle || null,
    slug,
    description: parsed.data.description || "",
    author_display_name: parsed.data.author_display_name,
    genre_id: parsed.data.genre_id || null,
    language: parsed.data.language,
    publication_date: parsed.data.publication_date || null,
    rights_confirmed: formData.get("rights_confirmed") === "on",
    content_policy_accepted: formData.get("content_policy_accepted") === "on",
  };

  if (bookId) {
    const { data: existing } = await supabase
      .from("books")
      .select("id, status, author_id")
      .eq("id", bookId)
      .eq("author_id", profile.id)
      .maybeSingle();

    if (!existing) return { ok: false, message: "Book not found." };
    if (!isAuthorEditable(existing.status as BookStatus)) {
      return {
        ok: false,
        message:
          "This book cannot be edited while it is under review or published. Ask an admin to unpublish or request changes before editing core details. Sales links can still be managed for published listings.",
      };
    }

    const { error } = await supabase
      .from("books")
      .update(payload)
      .eq("id", bookId)
      .eq("author_id", profile.id);

    if (error) return { ok: false, message: error.message };
    revalidatePath("/dashboard/books");
    revalidatePath(`/dashboard/books/${bookId}`);
    return { ok: true, message: "Draft saved." };
  }

  const { data, error } = await supabase
    .from("books")
    .insert({
      ...payload,
      author_id: profile.id,
      status: "draft",
    })
    .select("id")
    .single();

  if (error) return { ok: false, message: error.message };

  await supabase.from("book_status_events").insert({
    book_id: data.id,
    actor_id: profile.id,
    from_status: null,
    to_status: "draft",
    note: "Draft created",
  });

  redirect(`/dashboard/books/${data.id}`);
}

export async function submitBookAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  if (!bookId) return { ok: false, message: "Save a draft before submitting." };

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("*, sales_links(*)")
    .eq("id", bookId)
    .eq("author_id", profile.id)
    .maybeSingle();

  if (!book) return { ok: false, message: "Book not found." };
  if (!isAuthorEditable(book.status as BookStatus)) {
    return { ok: false, message: "This book is not editable right now." };
  }

  const fromStatus = book.status as BookStatus;
  if (!canTransition(fromStatus, "pending_review", { asAdmin: false })) {
    return {
      ok: false,
      message: "This book cannot be submitted for review from its current status.",
    };
  }

  const parsed = bookSubmitSchema.safeParse({
    title: formData.get("title") || book.title,
    subtitle: formData.get("subtitle") || book.subtitle || "",
    slug: slugify(String(formData.get("slug") || book.slug)),
    description: formData.get("description") || book.description,
    author_display_name:
      formData.get("author_display_name") || book.author_display_name,
    genre_id: formData.get("genre_id") || book.genre_id || "",
    language: formData.get("language") || book.language,
    publication_date: formData.get("publication_date") || book.publication_date || "",
    rights_confirmed: formData.get("rights_confirmed") === "on" || book.rights_confirmed,
    content_policy_accepted:
      formData.get("content_policy_accepted") === "on" || book.content_policy_accepted,
    cover_path: book.cover_path || "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Complete all required fields before submitting for review.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { error } = await supabase
    .from("books")
    .update({
      title: parsed.data.title,
      subtitle: parsed.data.subtitle || null,
      slug: await ensureUniqueSlug(parsed.data.slug, bookId),
      description: parsed.data.description,
      author_display_name: parsed.data.author_display_name,
      genre_id: parsed.data.genre_id,
      language: parsed.data.language,
      publication_date: parsed.data.publication_date || null,
      rights_confirmed: true,
      content_policy_accepted: true,
      status: "pending_review",
      submitted_at: new Date().toISOString(),
      rejection_reason: null,
      changes_requested_reason: null,
    })
    .eq("id", bookId)
    .eq("author_id", profile.id);

  if (error) return { ok: false, message: error.message };

  await supabase.from("book_status_events").insert({
    book_id: bookId,
    actor_id: profile.id,
    from_status: fromStatus,
    to_status: "pending_review",
    note: "Submitted for review",
  });

  await notifyAdminNewSubmission({
    title: parsed.data.title,
    authorName: parsed.data.author_display_name,
    bookId,
  });

  if (profile.email) {
    await notifyAuthorSubmissionReceived({
      email: profile.email,
      title: parsed.data.title,
    });
  }

  revalidatePath("/dashboard/books");
  revalidatePath(`/dashboard/books/${bookId}`);
  return {
    ok: true,
    message:
      "Submitted for review. We will notify you when it is reviewed. (Email is sent only when the email provider is configured.)",
  };
}

export async function uploadCoverAction(formData: FormData): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  const file = formData.get("cover") as File | null;
  if (!bookId || !file || file.size === 0) {
    return { ok: false, message: "Choose a cover image." };
  }

  if (!(COVER_MIME_TYPES as readonly string[]).includes(file.type)) {
    return { ok: false, message: "Cover must be JPEG, PNG, WebP, or GIF." };
  }
  const lower = file.name.toLowerCase();
  if (!COVER_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return { ok: false, message: "Unsupported cover file extension." };
  }
  if (file.size > maxCoverBytes()) {
    return {
      ok: false,
      message: `Cover must be ${(maxCoverBytes() / 1024 / 1024).toFixed(0)} MB or smaller.`,
    };
  }

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("id, status")
    .eq("id", bookId)
    .eq("author_id", profile.id)
    .maybeSingle();
  if (!book) return { ok: false, message: "Book not found." };
  if (!isAuthorEditable(book.status as BookStatus)) {
    return { ok: false, message: "Cover cannot be changed in the current status." };
  }

  const ext = lower.split(".").pop() || "jpg";
  const path = `${profile.id}/${bookId}/cover-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("book-covers")
    .upload(path, buffer, { contentType: file.type, upsert: true });
  if (uploadError) return { ok: false, message: uploadError.message };

  const { error } = await supabase
    .from("books")
    .update({ cover_path: path })
    .eq("id", bookId)
    .eq("author_id", profile.id);
  if (error) return { ok: false, message: error.message };

  revalidatePath(`/dashboard/books/${bookId}`);
  return { ok: true, message: "Cover uploaded." };
}

export async function uploadManuscriptAction(formData: FormData): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  const file = formData.get("manuscript") as File | null;
  if (!bookId || !file || file.size === 0) {
    return { ok: false, message: "Choose a manuscript file." };
  }

  if (!(MANUSCRIPT_MIME_TYPES as readonly string[]).includes(file.type)) {
    return {
      ok: false,
      message: "Manuscript must be PDF, EPUB, or DOCX.",
    };
  }
  const lower = file.name.toLowerCase();
  if (!MANUSCRIPT_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return { ok: false, message: "Unsupported manuscript extension." };
  }
  if (file.size > maxManuscriptBytes()) {
    return {
      ok: false,
      message: `Manuscript must be ${(maxManuscriptBytes() / 1024 / 1024).toFixed(0)} MB or smaller.`,
    };
  }

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("id, status")
    .eq("id", bookId)
    .eq("author_id", profile.id)
    .maybeSingle();
  if (!book) return { ok: false, message: "Book not found." };
  if (!isAuthorEditable(book.status as BookStatus)) {
    return { ok: false, message: "Manuscript cannot be changed in the current status." };
  }

  const ext = lower.split(".").pop() || "pdf";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  const path = `${profile.id}/${bookId}/ms-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("manuscripts")
    .upload(path, buffer, { contentType: file.type, upsert: true });
  if (uploadError) return { ok: false, message: uploadError.message };

  const { error } = await supabase
    .from("books")
    .update({
      manuscript_path: path,
      manuscript_filename: safeName,
      manuscript_mime: file.type,
      manuscript_size_bytes: file.size,
    })
    .eq("id", bookId)
    .eq("author_id", profile.id);
  if (error) return { ok: false, message: error.message };

  revalidatePath(`/dashboard/books/${bookId}`);
  return {
    ok: true,
    message:
      "Manuscript uploaded privately. Note: uploads are not malware-scanned in Phase 1 - only authorized admins and you can access this file.",
  };
}

export async function upsertSalesLinkAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  const linkId = String(formData.get("link_id") || "");

  const parsed = salesLinkSchema.safeParse({
    link_type: formData.get("link_type") || "other",
    label: formData.get("label"),
    url: formData.get("url"),
    is_active: formData.get("is_active") !== "false",
    is_primary: formData.get("is_primary") === "on",
    display_order: Number(formData.get("display_order") || 0),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Enter a valid label and http(s) URL.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("id, status")
    .eq("id", bookId)
    .eq("author_id", profile.id)
    .maybeSingle();
  if (!book) return { ok: false, message: "Book not found." };

  if (parsed.data.is_primary) {
    await supabase
      .from("sales_links")
      .update({ is_primary: false })
      .eq("book_id", bookId);
  }

  let newLinkId = linkId;

  if (linkId) {
    const { error } = await supabase
      .from("sales_links")
      .update(parsed.data)
      .eq("id", linkId)
      .eq("book_id", bookId);
    if (error) return { ok: false, message: error.message };
  } else {
    const { data, error } = await supabase
      .from("sales_links")
      .insert({ ...parsed.data, book_id: bookId })
      .select("id")
      .single();
    if (error) return { ok: false, message: error.message };
    newLinkId = data.id;
  }

  // Mirror primary pointer onto books when RLS allows (editable or published).
  // sales_links.is_primary remains the source of truth for display.
  if (
    parsed.data.is_primary &&
    newLinkId &&
    (isAuthorEditable(book.status as BookStatus) || book.status === "published")
  ) {
    await supabase
      .from("books")
      .update({ primary_sales_link_id: newLinkId })
      .eq("id", bookId);
  }

  revalidatePath(`/dashboard/books/${bookId}`);
  return { ok: true, message: "Sales link saved. Readers will be sent to this external URL - Authors Pilot does not process purchases." };
}

export async function deleteSalesLinkAction(formData: FormData): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  const linkId = String(formData.get("link_id") || "");
  const supabase = await createClient();

  const { data: book } = await supabase
    .from("books")
    .select("id")
    .eq("id", bookId)
    .eq("author_id", profile.id)
    .maybeSingle();
  if (!book) return { ok: false, message: "Book not found." };

  const { error } = await supabase
    .from("sales_links")
    .delete()
    .eq("id", linkId)
    .eq("book_id", bookId);
  if (error) return { ok: false, message: error.message };

  revalidatePath(`/dashboard/books/${bookId}`);
  return { ok: true, message: "Sales link removed." };
}

export async function deleteDraftAction(formData: FormData): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  const supabase = await createClient();
  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", bookId)
    .eq("author_id", profile.id)
    .eq("status", "draft");
  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/books");
  redirect("/dashboard/books");
}

export async function recordOutboundClickAction(formData: FormData) {
  const linkId = String(formData.get("link_id") || "");
  const bookId = String(formData.get("book_id") || "");
  const url = String(formData.get("url") || "");
  if (!linkId || !bookId || !url) return;

  if (!isSafeHttpUrl(url)) return;

  // Verify the link belongs to this book and is active before redirecting.
  const supabase = await createClient();
  const { data: link } = await supabase
    .from("sales_links")
    .select("id, url, click_count, is_active")
    .eq("id", linkId)
    .eq("book_id", bookId)
    .maybeSingle();

  if (!link || !link.is_active || link.url !== url) return;

  await supabase.from("outbound_clicks").insert({
    sales_link_id: linkId,
    book_id: bookId,
  });
  await supabase
    .from("sales_links")
    .update({ click_count: (link.click_count ?? 0) + 1 })
    .eq("id", linkId);

  // Clicks are analytics only - never treated as confirmed sales or revenue.
  redirect(url);
}
