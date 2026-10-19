import type { Metadata } from "next";
import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublicAuthors } from "@/lib/books";
export const metadata: Metadata = {
  title: "Authors",
  description: "Meet independent authors publishing on Authors Pilot.",
};

const PAGE_SIZE = 12;

type SearchParams = { q?: string; page?: string };

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const authors: Awaited<ReturnType<typeof getPublicAuthors>>["authors"] = [];
  const total = 0;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return `/authors${s ? `?${s}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="heading-section">Authors</h1>
      <p className="mt-2 max-w-2xl text-forest-muted">
        Public author profiles on Authors Pilot. Visit a profile to see published listings and links.
      </p>

      <form method="get" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="q" className="label-field">
            Search by name
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Author name"
            className="input-field"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-coral px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-coral-deep"
        >
          Search
        </button>
      </form>

      <div className="mt-10">
        {authors.length === 0 ? (
          <EmptyState
            title="No authors found"
            description={
              q
                ? "Try a different search term."
                : "After approval, each author gets a separate public page — profiles will appear here."
            }
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav className="mt-10 flex justify-center gap-3" aria-label="Pagination">
                {page > 1 ? (
                  <Link
                    href={pageHref(page - 1)}
                    className="rounded-full border border-sand px-4 py-2 text-sm font-semibold hover:border-coral/40"
                  >
                    Previous
                  </Link>
                ) : null}
                <span className="self-center text-sm text-forest-muted">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={pageHref(page + 1)}
                    className="rounded-full border border-sand px-4 py-2 text-sm font-semibold hover:border-coral/40"
                  >
                    Next
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
