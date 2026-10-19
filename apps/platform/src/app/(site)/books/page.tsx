import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedBooks } from "@/lib/books";
import { isPayloadConfigured } from "@/lib/payload";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Books",
  description: "Browse independent book listings on Authors Pilot.",
};

const PAGE_SIZE = 12;

type SearchParams = {
  page?: string;
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? "1") || 1);

  const configured = isPayloadConfigured();
  const catalog = await getPublishedBooks({
    sort: "newest",
    page,
    pageSize: PAGE_SIZE,
  });
  const books = catalog.books;
  const total = catalog.count;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="heading-section">Book catalog</h1>
      <p className="mt-2 max-w-2xl text-forest-muted">
        Discover independent titles. Purchase buttons send you to author-chosen
        external stores and websites.
      </p>

      <div className="mt-10">
        {books.length === 0 ? (
          <EmptyState
            title={configured ? "No published books yet" : "Catalog coming soon"}
            description={
              configured
                ? "New listings appear here after author submissions are reviewed and published."
                : "Approved author pages and book listings will appear here."
            }
          />
        ) : (
          <>
            <p className="text-sm text-forest-muted">
              {total} listing{total === 1 ? "" : "s"}
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
                aria-label="Pagination"
              >
                {page > 1 ? (
                  <Link
                    href={page === 2 ? "/books" : `/books?page=${page - 1}`}
                    className="rounded-full border border-sand px-4 py-2 text-sm font-semibold hover:border-coral/40"
                  >
                    Previous
                  </Link>
                ) : null}
                <span className="px-3 text-sm text-forest-muted">
                  Page {page} / {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`/books?page=${page + 1}`}
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
