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
      <header>
        <h1 className="heading-section">{book.title}</h1>
        <p className="mt-2 text-forest-muted">
          Manuscript, cover, ISBN, and accessibility
        </p>
      </header>

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
        <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2 text-sm font-semibold text-forest-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand text-xs">
            2
          </span>
          Sales Links
        </div>
      </nav>

      <PublishBookContentForm bookId={book.id} bookTitle={book.title} />

      <Link href="/dashboard" className="text-sm text-coral hover:underline">
        ← Dashboard
      </Link>
    </div>
  );
}
