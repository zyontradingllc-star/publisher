import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getGenreBySlug, getPublishedBooks } from "@/lib/books";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const genre = await getGenreBySlug(slug).catch(() => null);
  if (!genre) return { title: "Genre" };
  return {
    title: genre.name,
    description: genre.description ?? `Books in ${genre.name} on Authors Pilot.`,
  };
}

const PAGE_SIZE = 12;

export default async function GenrePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? "1") || 1);

  const genre = await getGenreBySlug(slug).catch(() => null);
  if (!genre) notFound();

  let books: Awaited<ReturnType<typeof getPublishedBooks>>["books"] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const result = await getPublishedBooks({
      genre: slug,
      page,
      pageSize: PAGE_SIZE,
      sort: "newest",
    });
    books = result.books;
    total = result.count;
    error = result.error;
  } catch {
    error = "Could not load books for this genre.";
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-forest-muted">
        <Link href="/books" className="hover:text-coral">
          Books
        </Link>{" "}
        / <span className="text-ink">{genre.name}</span>
      </nav>
      <h1 className="mt-4 heading-section">{genre.name}</h1>
      {genre.description ? (
        <p className="mt-3 max-w-2xl text-charcoal">{genre.description}</p>
      ) : null}

      <div className="mt-10">
        {error ? (
          <EmptyState title="Could not load listings" description={error} />
        ) : books.length === 0 ? (
          <EmptyState
            title="No books in this genre yet"
            description="Check back as authors publish new listings, or browse the full catalog."
            actionHref="/books"
            actionLabel="Browse all books"
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav className="mt-10 flex justify-center gap-3">
                {page > 1 ? (
                  <Link
                    href={`/genres/${slug}?page=${page - 1}`}
                    className="rounded-full border border-sand px-4 py-2 text-sm font-semibold hover:border-coral/40"
                  >
                    Previous
                  </Link>
                ) : null}
                <span className="self-center text-sm text-forest-muted">
                  Page {page} of {totalPages} ({total} books)
                </span>
                {page < totalPages ? (
                  <Link
                    href={`/genres/${slug}?page=${page + 1}`}
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
