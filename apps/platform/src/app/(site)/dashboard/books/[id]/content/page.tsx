import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getMyBook } from "@/lib/books";
import { PublishBookContentForm } from "@/components/forms/PublishBookContentForm";

export const metadata = { title: "Publish Book - Content" };

export default async function BookContentStepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await requireProfile(`/dashboard/books/${id}/content`);
  const { book } = await getMyBook(profile.id, id);
  if (!book) notFound();

  return (
    <div className="space-y-6">
      <nav
        aria-label="Publish progress"
        className="flex flex-wrap gap-2 border-b border-sand pb-4 sm:gap-6"
      >
        <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-green-600 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">
            ✓
          </span>
          Book Details
        </div>
        <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-coral bg-[#F0F5F1] px-3 py-2 text-sm font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral text-xs text-white">
            2
          </span>
          Book Content
        </div>
        <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2 text-sm font-semibold text-forest-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand text-xs">
            3
          </span>
          Sales Links
        </div>
      </nav>

      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
          Publish book · Step 2
        </p>
        <h1 className="heading-section mt-1">{book.title}</h1>
        <p className="mt-2 text-forest-muted">
          Manuscript, cover, ISBN, and accessibility
        </p>
      </header>

      <PublishBookContentForm bookId={book.id} bookTitle={book.title} />

      <Link href="/dashboard" className="text-sm text-coral hover:underline">
        ← Dashboard
      </Link>
    </div>
  );
}
