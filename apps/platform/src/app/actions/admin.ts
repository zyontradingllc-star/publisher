"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { notifyAuthorStatusChange } from "@/lib/email";
import { canTransition } from "@/lib/status-transitions";
import { adminReviewSchema } from "@/lib/validations";
import { BOOK_STATUS_LABELS, type BookStatus } from "@/types/database";
import type { ActionState } from "@/app/actions/auth";

export async function reviewBookAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const admin = await requireAdmin();

  const parsed = adminReviewSchema.safeParse({
    book_id: formData.get("book_id"),
    action: formData.get("action"),
    note: formData.get("note") || "",
  });

  if (!parsed.success) {
    return { ok: false, message: "Invalid review request." };
  }

  const { book_id, action, note } = parsed.data;
  if (
    (action === "request_changes" || action === "reject") &&
    !(note && note.trim())
  ) {
    return {
      ok: false,
      message: "Please provide a clear reason for the author.",
    };
  }

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("*, profiles:profiles!books_author_id_fkey(email, display_name)")
    .eq("id", book_id)
    .maybeSingle();

  if (!book) return { ok: false, message: "Book not found." };

  const fromStatus = book.status as BookStatus;
  let toStatus: BookStatus;
  const updates: Record<string, unknown> = {};

  switch (action) {
    case "approve":
      toStatus = "published";
      updates.status = "published";
      updates.published_at = new Date().toISOString();
      updates.is_public = true;
      updates.rejection_reason = null;
      updates.changes_requested_reason = null;
      updates.admin_notes = note || null;
      break;
    case "request_changes":
      toStatus = "changes_requested";
      updates.status = "changes_requested";
      updates.changes_requested_reason = note;
      updates.admin_notes = note;
      break;
    case "reject":
      toStatus = "rejected";
      updates.status = "rejected";
      updates.rejection_reason = note;
      updates.admin_notes = note;
      break;
    case "unpublish":
      toStatus = "unpublished";
      updates.status = "unpublished";
      updates.is_public = false;
      updates.admin_notes = note || null;
      break;
    default:
      return { ok: false, message: "Unknown action." };
  }

  if (!canTransition(fromStatus, toStatus, { asAdmin: true })) {
    return {
      ok: false,
      message: `Cannot move a book from ${BOOK_STATUS_LABELS[fromStatus]} to ${BOOK_STATUS_LABELS[toStatus]}.`,
    };
  }

  const { error } = await supabase.from("books").update(updates).eq("id", book_id);
  if (error) return { ok: false, message: error.message };

  await supabase.from("book_status_events").insert({
    book_id,
    actor_id: admin.id,
    from_status: fromStatus,
    to_status: toStatus,
    note: note || null,
  });

  await supabase.from("admin_audit_log").insert({
    actor_id: admin.id,
    action: `book.${action}`,
    entity_type: "book",
    entity_id: book_id,
    metadata: { fromStatus, toStatus, note },
  });

  const authorEmail = (book.profiles as { email?: string } | null)?.email;
  if (authorEmail) {
    await notifyAuthorStatusChange({
      email: authorEmail,
      title: book.title,
      status: toStatus,
      statusLabel: BOOK_STATUS_LABELS[toStatus],
      note,
    });
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/books/${book_id}`);
  revalidatePath("/books");
  revalidatePath(`/books/${book.slug}`);
  return {
    ok: true,
    message: `Book marked as ${BOOK_STATUS_LABELS[toStatus]}.`,
  };
}

export async function getManuscriptSignedUrl(
  bookId: string
): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("manuscript_path")
    .eq("id", bookId)
    .maybeSingle();

  if (!book?.manuscript_path) {
    return { error: "No manuscript on file." };
  }

  // Prefer service role for reliable signed URLs
  let storageClient = supabase;
  try {
    storageClient = createServiceClient();
  } catch {
    storageClient = supabase;
  }

  const { data, error } = await storageClient.storage
    .from("manuscripts")
    .createSignedUrl(book.manuscript_path, 120);

  if (error || !data?.signedUrl) {
    return { error: error?.message || "Could not create signed URL." };
  }
  return { url: data.signedUrl };
}

export async function resolveReportAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const admin = await requireAdmin();
  const reportId = String(formData.get("report_id") || "");
  const status = String(formData.get("status") || "resolved");
  const notes = String(formData.get("admin_notes") || "");

  if (!["resolved", "dismissed", "reviewing"].includes(status)) {
    return { ok: false, message: "Invalid status." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("content_reports")
    .update({
      status,
      admin_notes: notes || null,
      resolved_by: admin.id,
      resolved_at: new Date().toISOString(),
    })
    .eq("id", reportId);

  if (error) return { ok: false, message: error.message };

  await supabase.from("admin_audit_log").insert({
    actor_id: admin.id,
    action: `report.${status}`,
    entity_type: "content_report",
    entity_id: reportId,
    metadata: { notes },
  });

  revalidatePath("/admin/reports");
  return { ok: true, message: "Report updated." };
}

export async function setAuthorPublicAction(formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const authorId = String(formData.get("author_id") || "");
  const isPublic = formData.get("is_public") === "true";
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ is_public: isPublic })
    .eq("id", authorId);
  if (error) return { ok: false, message: error.message };

  await supabase.from("admin_audit_log").insert({
    actor_id: admin.id,
    action: isPublic ? "author.make_public" : "author.make_private",
    entity_type: "profile",
    entity_id: authorId,
    metadata: {},
  });

  revalidatePath("/admin/authors");
  return { ok: true, message: "Author visibility updated." };
}
