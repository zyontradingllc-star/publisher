import type { BookStatus } from "@/types/database";
import { BOOK_STATUS_LABELS } from "@/types/database";
import { cn } from "@/lib/utils";

const styles: Record<BookStatus, string> = {
  draft: "bg-gray-100 text-gray-800",
  pending_review: "bg-amber-100 text-amber-900",
  changes_requested: "bg-orange-100 text-orange-900",
  published: "bg-green-100 text-green-900",
  rejected: "bg-red-100 text-red-900",
  unpublished: "bg-slate-100 text-slate-800",
};

export function StatusBadge({ status }: { status: BookStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        styles[status]
      )}
    >
      {BOOK_STATUS_LABELS[status]}
    </span>
  );
}
