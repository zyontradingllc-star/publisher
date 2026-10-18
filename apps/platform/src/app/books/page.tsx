import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getGenres, getPublishedBooks } from "@/lib/books";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export const metadata: Metadata = {
  title: "Books",
  description: "Browse independent book listings on Authors Pilot.",
};

const PAGE_SIZE = 12;

const LANGUAGES = [
  { value: "", label: "All languages" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "pt", label: "Portuguese" },
];

type SearchParams = {
  q?: string;
  genre?: string;
  language?: string;
  sort?: string;
  page?: string;
};

function buildQuery(base: SearchParams, patch: Partial<SearchParams>) {
  const merged = { ...base, ...patch };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.genre) params.set("genre", merged.genre);
  if (merged.language) params.set("language", merged.language);
  if (merged.sort && merged.sort !== "newest") params.set("sort", merged.sort);
  if (merged.page && merged.page !== "1") params.set("page", merged.page);
  const s = params.toString();
  return s ? `?${s}` : "";
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const genre = sp.genre ?? "";
  const language = sp.language ?? "";
  const sort = sp.sort === "title" ? "title" : "newest";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);

  let genres: Awaited<ReturnType<typeof getGenres>> = [];
  let books: Awaited<ReturnType<typeof getPublishedBooks>>["books"] = [];
  let total = 0;
  const configured = isFirebaseConfigured();
  // Genres from fallback list; published catalog fills when public Firestore reads are added
  try {
    genres = await getGenres();
  } catch {
    genres = [];
  }
  void configured;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const queryBase: SearchParams = { q, genre, language, sort, page: String(page) };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="heading-section">Book catalog</h1>
      <p className="mt-2 max-w-2xl text-forest-muted">
        Discover independent titles. Purchase buttons send you to author-chosen external stores and
        websites.
      </p>

      <form method="get" className="mt-8 grid gap-4 rounded-2xl border border-sand bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <label htmlFor="q" className="label-field">
            Search
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Title, author, or keywords"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="genre" className="label-field">
            Genre
          </label>
          <select id="genre" name="genre" defaultValue={genre} className="input-field">
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.slug}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="label-field">
            Language
          </label>
          <select id="language" name="language" defaultValue={language} className="input-field">
            {LANGUAGES.map((lang) => (
              <option key={lang.value || "all"} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="label-field">
            Sort
          </label>
          <select id="sort" name="sort" defaultValue={sort} className="input-field">
            <option value="newest">Newest</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
        <div className="flex items-end sm:col-span-2 lg:col-span-5">
          <button
            type="submit"
            className="rounded-full bg-coral px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-coral-deep"
          >
            Apply filters
          </button>
        </div>
      </form>

      <div className="mt-10">
        {books.length === 0 ? (
          <EmptyState
            title={configured ? "No published books yet" : "Catalog coming soon"}
            description={
              configured
                ? "New listings appear here after author submissions are reviewed and published."
                : "Published titles will appear here once the catalog is connected."
            }
            actionHref="/signup"
            actionLabel="Signup As Author"
          />
        ) : (
          <>
            <p className="text-sm text-forest-muted">
              Showing page {page} of {totalPages} ({total} listing{total === 1 ? "" : "s"})
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            {totalPages > 1 ? (
              <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                {page > 1 ? (
                  <Link
                    href={`/books${buildQuery(queryBase, { page: String(page - 1) })}`}
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
                    href={`/books${buildQuery(queryBase, { page: String(page + 1) })}`}
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
