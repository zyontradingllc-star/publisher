import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "My Books" };

export default async function DashboardBooksPage() {
  const profile = await requireProfile("/dashboard/books");
  const books = await getMyBooks(profile.id, profile.email);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="heading-section">My books</h1>
          <p className="mt-2 text-forest-muted">
            Drafts, submissions, and published listings - all in one place.
          </p>
        </div>
        <Button href="/dashboard/books/new">Publish Book</Button>
      </div>

      {books.length === 0 ? (
        <EmptyState
          title="No listings yet"
          description="Start with a draft. You can submit for review when your description, cover, and policies are ready."
          actionHref="/dashboard/books/new"
          actionLabel="Publish Book"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sand bg-ivory/80 text-xs uppercase tracking-wide text-forest-muted">
              <tr>
                <th className="px-4 py-3 font-bold">Title</th>
                <th className="hidden px-4 py-3 font-bold sm:table-cell">Updated</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{book.title}</p>
                    {book.subtitle ? (
                      <p className="text-forest-muted">{book.subtitle}</p>
                    ) : null}
                  </td>
                  <td className="hidden px-4 py-3 text-forest-muted sm:table-cell">
                    {formatDate(book.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={book.status} />
                  </td>
                  <td className="px-4 py-3">
                    {book.status === "published" && book.is_public ? (
                      <Link
                        href={`/books/${book.slug}`}
                        className="font-semibold text-coral hover:underline"
                      >
                        View
                      </Link>
                    ) : book.status === "pending_review" ||
                      book.status === "changes_requested" ? (
                      <span className="text-xs text-forest-muted">In review</span>
                    ) : (
                      <Link
                        href={`/dashboard/books/${book.id}`}
                        className="font-semibold text-coral hover:underline"
                      >
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
