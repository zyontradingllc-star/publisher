"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { notifyAuthorStatusChange } from "@/lib/email";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import { canTransition } from "@/lib/status-transitions";
import { adminReviewSchema } from "@/lib/validations";
import { BOOK_STATUS_LABELS, type BookStatus } from "@/types/database";
import type { ActionState } from "@/app/actions/auth";

function submissionToBookStatus(status: string): BookStatus {
  switch (status) {
    case "approved":
      return "published";
    case "changes_requested":
      return "changes_requested";
    case "rejected":
      return "rejected";
    case "under_review":
    case "pending":
    default:
      return "pending_review";
  }
}

function payloadBookToStatus(status: string): BookStatus {
  if (status === "published") return "published";
  if (status === "unpublished") return "unpublished";
  return "draft";
}

export async function reviewBookAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  if (!isPayloadConfigured()) {
    return { ok: false, message: "Payload CMS is not configured." };
  }

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

  const payload = await getPayloadClient();

  // Prefer book-submissions (review queue), then published books collection.
  let submission: {
    id: string | number;
    title?: string | null;
    status?: string | null;
    authorEmail?: string | null;
    author?: { email?: string | null } | null;
    publicSlug?: string | null;
    approvedBook?: string | number | { id: string | number } | null;
  } | null = null;

  try {
    submission = await payload.findByID({
      collection: "book-submissions",
      id: book_id,
      depth: 0,
      overrideAccess: true,
    });
  } catch {
    submission = null;
  }

  if (submission) {
    const fromStatus = submissionToBookStatus(String(submission.status ?? "pending"));
    let toStatus: BookStatus;
    let nextSubmissionStatus:
      | "pending"
      | "under_review"
      | "changes_requested"
      | "approved"
      | "rejected";

    switch (action) {
      case "approve":
        toStatus = "published";
        nextSubmissionStatus = "approved";
        break;
      case "request_changes":
        toStatus = "changes_requested";
        nextSubmissionStatus = "changes_requested";
        break;
      case "reject":
        toStatus = "rejected";
        nextSubmissionStatus = "rejected";
        break;
      case "unpublish": {
        const approved = submission.approvedBook;
        const bookId =
          typeof approved === "object" && approved && "id" in approved
            ? approved.id
            : approved;
        if (!bookId) {
          return { ok: false, message: "No published book linked to this submission." };
        }
        await payload.update({
          collection: "books",
          id: bookId,
          data: { status: "unpublished" },
          overrideAccess: true,
        });
        revalidatePath("/admin");
        revalidatePath(`/admin/books/${book_id}`);
        revalidatePath("/books");
        return { ok: true, message: "Book unpublished." };
      }
      default:
        return { ok: false, message: "Unknown action." };
    }

    if (!canTransition(fromStatus, toStatus, { asAdmin: true })) {
      return {
        ok: false,
        message: `Cannot move a book from ${BOOK_STATUS_LABELS[fromStatus]} to ${BOOK_STATUS_LABELS[toStatus]}.`,
      };
    }

    await payload.update({
      collection: "book-submissions",
      id: submission.id,
      data: {
        status: nextSubmissionStatus,
        adminNotes: note || undefined,
        reviewedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    });

    const authorEmail =
      submission.authorEmail || submission.author?.email || undefined;
    if (authorEmail) {
      await notifyAuthorStatusChange({
        email: authorEmail,
        title: submission.title || "Your book",
        status: toStatus,
        statusLabel: BOOK_STATUS_LABELS[toStatus],
        note,
      });
    }

    revalidatePath("/admin");
    revalidatePath(`/admin/books/${book_id}`);
    revalidatePath("/books");
    if (submission.publicSlug) {
      revalidatePath(`/books/${submission.publicSlug}`);
    }
    return {
      ok: true,
      message: `Book marked as ${BOOK_STATUS_LABELS[toStatus]}.`,
    };
  }

  // Fallback: Payload books collection (catalog)
  let book: {
    id: string | number;
    title?: string | null;
    slug?: string | null;
    status?: string | null;
    author?: string | number | { id?: string | number; email?: string | null } | null;
  } | null = null;
  try {
    book = await payload.findByID({
      collection: "books",
      id: book_id,
      depth: 1,
      overrideAccess: true,
    });
  } catch {
    book = null;
  }

  if (!book) return { ok: false, message: "Book not found." };

  const fromStatus = payloadBookToStatus(String(book.status ?? "draft"));
  let toStatus: BookStatus;
  let nextBookStatus: "draft" | "published" | "unpublished";

  switch (action) {
    case "approve":
      toStatus = "published";
      nextBookStatus = "published";
      break;
    case "unpublish":
      toStatus = "unpublished";
      nextBookStatus = "unpublished";
      break;
    case "request_changes":
    case "reject":
      return {
        ok: false,
        message:
          "Request changes / reject apply to book submissions. Open the submission in CMS or the review queue.",
      };
    default:
      return { ok: false, message: "Unknown action." };
  }

  if (!canTransition(fromStatus, toStatus, { asAdmin: true })) {
    return {
      ok: false,
      message: `Cannot move a book from ${BOOK_STATUS_LABELS[fromStatus]} to ${BOOK_STATUS_LABELS[toStatus]}.`,
    };
  }

  await payload.update({
    collection: "books",
    id: book.id,
    data: {
      status: nextBookStatus,
      ...(nextBookStatus === "published"
        ? { publishedAt: new Date().toISOString() }
        : {}),
    },
    overrideAccess: true,
  });

  const authorEmail =
    typeof book.author === "object" && book.author
      ? book.author.email ?? undefined
      : undefined;
  if (authorEmail) {
    await notifyAuthorStatusChange({
      email: authorEmail,
      title: book.title || "Your book",
      status: toStatus,
      statusLabel: BOOK_STATUS_LABELS[toStatus],
      note,
    });
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/books/${book_id}`);
  revalidatePath("/books");
  if (book.slug) revalidatePath(`/books/${book.slug}`);
  return {
    ok: true,
    message: `Book marked as ${BOOK_STATUS_LABELS[toStatus]}.`,
  };
}

export async function getManuscriptSignedUrl(
  _bookId: string
): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  return {
    error:
      "Manuscripts are not stored in Payload Media (images only). Review files in the CMS submission or author inbox.",
  };
}

export async function resolveReportAction(
  _prev: ActionState,
  _formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  return {
    ok: false,
    message:
      "Content reports are no longer stored in Supabase. Use Payload CMS admin notes until a reports collection is added.",
  };
}

export async function setAuthorPublicAction(
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  if (!isPayloadConfigured()) {
    return { ok: false, message: "Payload CMS is not configured." };
  }

  const authorId = String(formData.get("author_id") || "");
  if (!authorId) return { ok: false, message: "Author id required." };

  // Payload authors are public-read by default; visibility toggles go through CMS for now.
  const payload = await getPayloadClient();
  try {
    await payload.findByID({
      collection: "authors",
      id: authorId,
      depth: 0,
      overrideAccess: true,
    });
  } catch {
    return { ok: false, message: "Author not found." };
  }

  revalidatePath("/admin/authors");
  return {
    ok: true,
    message:
      "Author records live in Payload CMS. Manage listing visibility there (authors are publicly readable when published books exist).",
  };
}
