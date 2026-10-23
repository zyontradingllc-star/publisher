"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isLeadOnlySession, requireProfile } from "@/lib/auth";
import {
  notifyAdminNewSubmission,
  notifyAuthorSubmissionReceived,
} from "@/lib/email";
import { dropInfoToInbox } from "@/lib/notify-inbox";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
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
  const payload = await getPayloadClient();
  let slug = slugify(base) || "book";
  let n = 0;
  while (true) {
    const found = await payload.find({
      collection: "books",
      where: { slug: { equals: slug } },
      limit: 5,
      overrideAccess: true,
    });
    const conflict = found.docs.some((doc) => String(doc.id) !== String(excludeId ?? ""));
    if (!conflict) return slug;
    n += 1;
    slug = `${slugify(base)}-${n}`;
  }
}

async function findAuthorIdForProfile(profile: {
  id: string;
  email: string | null;
}): Promise<string | number | null> {
  if (!isPayloadConfigured()) return null;
  const payload = await getPayloadClient();
  if (profile.email) {
    const byEmail = await payload.find({
      collection: "authors",
      where: { email: { equals: profile.email.trim().toLowerCase() } },
      limit: 1,
      overrideAccess: true,
    });
    if (byEmail.docs[0]) return byEmail.docs[0].id;
  }
  const byUid = await payload.find({
    collection: "authors",
    where: { firebaseUid: { equals: profile.id } },
    limit: 1,
    overrideAccess: true,
  });
  return byUid.docs[0]?.id ?? null;
}

function mapBookStatus(status: string | null | undefined): BookStatus {
  if (status === "published") return "published";
  if (status === "unpublished") return "unpublished";
  return "draft";
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
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  if ((await isLeadOnlySession()) || !isPayloadConfigured()) {
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
          "Could not send book details. Try again or use /publish.",
      };
    }
    return {
      ok: true,
      message:
        "Book details sent. Prefer /publish for Payload submissions when CMS is configured.",
    };
  }

  const authorId = await findAuthorIdForProfile(profile);
  if (!authorId) {
    return {
      ok: false,
      message:
        "No Payload author linked to this account yet. Use /publish or ask an admin to create your author with firebaseUid.",
    };
  }

  const payload = await getPayloadClient();
  const slug = await ensureUniqueSlug(parsed.data.slug, bookId || undefined);

  if (bookId) {
    try {
      const existing = await payload.findByID({
        collection: "books",
        id: bookId,
        depth: 0,
        overrideAccess: true,
      });
      const authorRef =
        typeof existing.author === "object" && existing.author && "id" in existing.author
          ? String((existing.author as { id: string | number }).id)
          : String(existing.author);
      if (authorRef !== String(authorId)) {
        return { ok: false, message: "Book not found." };
      }
      const status = mapBookStatus(String(existing.status));
      if (!isAuthorEditable(status)) {
        return {
          ok: false,
          message:
            "This book cannot be edited while it is under review or published.",
        };
      }
      await payload.update({
        collection: "books",
        id: bookId,
        data: {
          title: parsed.data.title,
          subtitle: parsed.data.subtitle || undefined,
          slug,
          description: parsed.data.description || undefined,
          language: parsed.data.language,
        },
        overrideAccess: true,
      });
      revalidatePath("/dashboard/books");
      revalidatePath(`/dashboard/books/${bookId}`);
      return { ok: true, message: "Draft saved." };
    } catch {
      return { ok: false, message: "Book not found in Payload." };
    }
  }

  const created = await payload.create({
    collection: "books",
    data: {
      title: parsed.data.title,
      subtitle: parsed.data.subtitle || undefined,
      slug,
      description: parsed.data.description || undefined,
      language: parsed.data.language,
      author: authorId,
      status: "draft",
    },
    overrideAccess: true,
  });

  redirect(`/dashboard/books/${created.id}`);
}

export async function submitBookAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  if (!bookId) return { ok: false, message: "Save a draft before submitting." };
  if (!isPayloadConfigured()) {
    return { ok: false, message: "Payload CMS is not configured." };
  }

  const payload = await getPayloadClient();
  const authorId = await findAuthorIdForProfile(profile);
  if (!authorId) return { ok: false, message: "Author not linked in Payload." };

  let book: {
    id: string | number;
    title?: string;
    subtitle?: string | null;
    slug?: string;
    description?: string | null;
    language?: string | null;
    status?: string | null;
    author?: unknown;
    cover?: unknown;
  };
  try {
    book = await payload.findByID({
      collection: "books",
      id: bookId,
      depth: 0,
      overrideAccess: true,
    });
  } catch {
    return { ok: false, message: "Book not found." };
  }

  const authorRef =
    typeof book.author === "object" && book.author && "id" in book.author
      ? String((book.author as { id: string | number }).id)
      : String(book.author);
  if (authorRef !== String(authorId)) {
    return { ok: false, message: "Book not found." };
  }

  const fromStatus = mapBookStatus(String(book.status));
  if (!isAuthorEditable(fromStatus)) {
    return { ok: false, message: "This book is not editable right now." };
  }
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
      formData.get("author_display_name") || profile.display_name || "",
    genre_id: formData.get("genre_id") || "",
    language: formData.get("language") || book.language || "en",
    publication_date: formData.get("publication_date") || "",
    rights_confirmed: formData.get("rights_confirmed") === "on",
    content_policy_accepted: formData.get("content_policy_accepted") === "on",
    cover_path: book.cover ? "ok" : "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Complete all required fields before submitting for review.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  // Payload books use draft|published|unpublished — keep as draft and notify admins.
  await payload.update({
    collection: "books",
    id: bookId,
    data: {
      title: parsed.data.title,
      subtitle: parsed.data.subtitle || undefined,
      slug: await ensureUniqueSlug(parsed.data.slug, bookId),
      description: parsed.data.description,
      language: parsed.data.language,
      status: "draft",
    },
    overrideAccess: true,
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
      "Submitted for review. Prefer creating via /publish (book-submissions) for the full CMS workflow.",
  };
}

export async function uploadCoverAction(formData: FormData): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  const file = formData.get("cover") as File | null;
  if (!bookId || !file || file.size === 0) {
    return { ok: false, message: "Choose a cover image." };
  }
  if (!isPayloadConfigured()) {
    return { ok: false, message: "Payload CMS is not configured." };
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

  const payload = await getPayloadClient();
  const authorId = await findAuthorIdForProfile(profile);
  if (!authorId) return { ok: false, message: "Author not linked in Payload." };

  let bookDoc: Record<string, unknown>;
  try {
    bookDoc = (await payload.findByID({
      collection: "books",
      id: bookId,
      depth: 0,
      overrideAccess: true,
    })) as unknown as Record<string, unknown>;
  } catch {
    return { ok: false, message: "Book not found." };
  }

  const authorField = bookDoc.author;
  const authorRef =
    typeof authorField === "object" &&
    authorField !== null &&
    "id" in authorField
      ? String((authorField as { id: string | number }).id)
      : String(authorField);
  if (authorRef !== String(authorId)) {
    return { ok: false, message: "Book not found." };
  }
  if (!isAuthorEditable(mapBookStatus(String(bookDoc.status)))) {
    return { ok: false, message: "Cover cannot be changed in the current status." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const media = await payload.create({
    collection: "media",
    data: { alt: `${bookId} cover` },
    file: {
      data: buffer,
      mimetype: file.type,
      name: file.name || "cover.jpg",
      size: file.size,
    },
    overrideAccess: true,
  });

  await payload.update({
    collection: "books",
    id: bookId,
    data: { cover: media.id },
    overrideAccess: true,
  });

  revalidatePath(`/dashboard/books/${bookId}`);
  return { ok: true, message: "Cover uploaded." };
}

export async function uploadManuscriptAction(
  formData: FormData
): Promise<ActionState> {
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

  void profile;
  return {
    ok: false,
    message:
      "Manuscript upload via dashboard needs a Payload non-image upload field. Use /publish content step or email the file to the team for now.",
  };
}

export async function upsertSalesLinkAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  void profile;

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
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  if (!parsed.data.url.startsWith("https://") && !parsed.data.url.startsWith("http://")) {
    return { ok: false, message: "Only http(s) URLs are allowed." };
  }

  const bookId = String(formData.get("book_id") || "");
  if (!bookId || !isPayloadConfigured()) {
    return { ok: false, message: "Book not available." };
  }

  if (!parsed.data.url.startsWith("https://")) {
    return { ok: false, message: "Sale links must use https://." };
  }

  const { usePayloadData } = await import("@/lib/data/flags");
  if (usePayloadData()) {
    const { setSalesLinksPayload, getSalesLinksForBookPayload } = await import(
      "@/lib/data/books-payload"
    );
    const existing = await getSalesLinksForBookPayload(bookId);
    const next = [
      ...existing
        .filter((l) => !(parsed.data.is_primary && l.is_primary))
        .map((l) => ({
          link_type: l.link_type,
          label: l.label,
          url: l.url,
          is_active: l.is_active,
          is_primary: l.is_primary,
          display_order: l.display_order,
        })),
      {
        link_type: parsed.data.link_type as
          | "author_website"
          | "amazon"
          | "facebook"
          | "instagram"
          | "whatsapp"
          | "other",
        label: parsed.data.label,
        url: parsed.data.url,
        is_active: parsed.data.is_active,
        is_primary: parsed.data.is_primary,
        display_order: parsed.data.display_order,
      },
    ];
    await setSalesLinksPayload(bookId, next);
    revalidatePath(`/dashboard/books/${bookId}`);
    return { ok: true, message: "Sales link saved." };
  }

  const payload = await getPayloadClient();
  try {
    await payload.update({
      collection: "books",
      id: bookId,
      data: {
        primarySalesChannel: `${parsed.data.link_type}:${parsed.data.url}`,
      },
      overrideAccess: true,
    });
  } catch {
    return {
      ok: false,
      message:
        "Could not save sales link on Payload book. Use /publish sales step or CMS.",
    };
  }

  revalidatePath(`/dashboard/books/${bookId}`);
  return {
    ok: true,
    message: "Primary sales channel saved on the Payload book.",
  };
}

export async function deleteSalesLinkAction(
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  void profile;
  const bookId = String(formData.get("book_id") || "");
  if (!bookId || !isPayloadConfigured()) {
    return { ok: false, message: "Book not found." };
  }
  const payload = await getPayloadClient();
  try {
    await payload.update({
      collection: "books",
      id: bookId,
      data: { primarySalesChannel: "" },
      overrideAccess: true,
    });
  } catch {
    return { ok: false, message: "Could not clear sales channel." };
  }
  revalidatePath(`/dashboard/books/${bookId}`);
  return { ok: true, message: "Sales channel cleared." };
}

export async function deleteDraftAction(formData: FormData): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/books");
  const bookId = String(formData.get("book_id") || "");
  if (!bookId || !isPayloadConfigured()) {
    return { ok: false, message: "Book not found." };
  }

  const payload = await getPayloadClient();
  const authorId = await findAuthorIdForProfile(profile);
  if (!authorId) return { ok: false, message: "Author not linked." };

  try {
    const book = await payload.findByID({
      collection: "books",
      id: bookId,
      depth: 0,
      overrideAccess: true,
    });
    const authorRef =
      typeof book.author === "object" && book.author && "id" in book.author
        ? String((book.author as { id: string | number }).id)
        : String(book.author);
    if (authorRef !== String(authorId) || book.status !== "draft") {
      return { ok: false, message: "Only your draft books can be deleted." };
    }
    await payload.delete({
      collection: "books",
      id: bookId,
      overrideAccess: true,
    });
  } catch {
    return { ok: false, message: "Could not delete draft." };
  }

  revalidatePath("/dashboard/books");
  redirect("/dashboard/books");
}

export async function recordOutboundClickAction(formData: FormData) {
  const url = String(formData.get("url") || "");
  if (!url || !isSafeHttpUrl(url)) return;
  // Analytics store removed with Supabase — still redirect safely.
  redirect(url);
}
