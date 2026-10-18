import type { BookStatus } from "@/types/database";

/**
 * Valid publication workflow transitions.
 * Authors never transition to `published` — only admins may approve.
 * Changing a browser value cannot bypass this (also enforced in Postgres).
 */
const TRANSITIONS: Record<BookStatus, readonly BookStatus[]> = {
  draft: ["pending_review"],
  pending_review: ["published", "changes_requested", "rejected"],
  changes_requested: ["pending_review", "draft"],
  rejected: ["draft", "pending_review"],
  published: ["unpublished", "changes_requested"],
  unpublished: ["pending_review", "draft", "published"],
};

export function canTransition(
  from: BookStatus,
  to: BookStatus,
  opts?: { asAdmin?: boolean }
): boolean {
  if (from === to) return true;
  const allowed = TRANSITIONS[from] ?? [];
  if (!allowed.includes(to)) return false;
  if (to === "published" && !opts?.asAdmin) return false;
  return true;
}

export function authorEditableStatuses(): BookStatus[] {
  return ["draft", "changes_requested", "rejected", "unpublished"];
}

export function isAuthorEditable(status: BookStatus): boolean {
  return authorEditableStatuses().includes(status);
}

/**
 * Published listings: authors may update sales links only.
 * Core metadata requires admin unpublish / changes_requested first.
 */
export function publishedCoreLocked(status: BookStatus): boolean {
  return status === "published";
}

export { TRANSITIONS as BOOK_STATUS_TRANSITIONS };
