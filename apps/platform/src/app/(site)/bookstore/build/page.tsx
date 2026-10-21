import type { Metadata } from "next";
import Link from "next/link";
import { BookstoreProductCard } from "@/components/BookstoreProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getGenres, getPublishedBooks } from "@/lib/books";
import { isPayloadConfigured } from "@/lib/payload";
import { LANGUAGES } from "@/types/database";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "BookStore (Draft)",
  description:
    "Internal draft of the Authors Pilot BookStore. Not linked from the live site.",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 24;

type SearchParams = {
  q?: string;
  genre?: string;
  language?: string;
  page?: string;
};

export default async function BookstorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const genre = (sp.genre ?? "").trim();
  const language = (sp.language ?? "").trim();
  const page = Math.max(1, Number(sp.page ?? "1") || 1);

  const configured = isPayloadConfigured();
  const [catalog, genres] = await Promise.all([
    getPublishedBooks({
      q: q || undefined,
      genre: genre || undefined,
      language: language || undefined,
      sort: "newest",
      page,
      pageSize: PAGE_SIZE,
    }),
    getGenres(),
  ]);

  const books = genre
    ? catalog.books.filter((b) => b.genre?.slug === genre)
    : catalog.books;
  const total = genre ? books.length : catalog.count;
  const totalPages = Math.max(
    1,
    Math.ceil((genre ? books.length : catalog.count) / PAGE_SIZE)
  );

  const queryBase = new URLSearchParams();
  if (q) queryBase.set("q", q);
  if (genre) queryBase.set("genre", genre);
  if (language) queryBase.set("language", language);

  const pageHref = (p: number) => {
    const params = new URLSearchParams(queryBase);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return s ? `/bookstore/build?${s}` : "/bookstore/build";
  };

  const filterHref = (key: "genre" | "language", value: string) => {
    const params = new URLSearchParams(queryBase);
    params.delete("page");
    if (value) params.set(key, value);
    else params.delete(key);
    const s = params.toString();
    return s ? `/bookstore/build?${s}` : "/bookstore/build";
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col bg-[#EAEDED]">
      <div className="border-b border-[#E08A2A]/40 bg-[#FFF8E8] px-4 py-2 text-center text-xs font-semibold text-ink sm:px-6">
        DRAFT - BookStore build page. Not linked from the live site. Public
        visitors see Coming Soon at /bookstore.
      </div>
      {/* Full-width search - Authors Pilot (no Deliver to / Returns / Cart) */}
      <div className="w-full border-b border-black/20 bg-forest-wash">
        <div className="flex w-full flex-wrap items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
          <Link
            href="/bookstore/build"
            className="shrink-0 font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            BookStore
          </Link>
          <form
            action="/bookstore/build"
            method="get"
            className="flex min-w-0 flex-1 overflow-hidden rounded-md bg-white shadow-soft"
          >
            {genre ? <input type="hidden" name="genre" value={genre} /> : null}
            {language ? (
              <input type="hidden" name="language" value={language} />
            ) : null}
            <label className="sr-only" htmlFor="bookstore-q">
              Search books
            </label>
            <input
              id="bookstore-q"
              name="q"
              defaultValue={q}
              placeholder="Search Authors Pilot books"
              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-ink outline-none sm:text-base"
            />
            <button
              type="submit"
              className="shrink-0 bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink sm:px-6"
            >
              Search
            </button>
          </form>
          <Button href="/publish/start" className="!px-4 !py-2.5 !text-xs">
            Submit Your Book
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-sand bg-white px-4 py-5 sm:px-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-6 xl:w-72">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
            Filters
          </p>
          <div className="mt-5 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-ink">Genre</h2>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <Link
                    href={filterHref("genre", "")}
                    className={`text-sm ${!genre ? "font-semibold text-coral" : "text-charcoal hover:text-coral"}`}
                  >
                    Any genre
                  </Link>
                </li>
                {genres.slice(0, 14).map((g) => (
                  <li key={g.id}>
                    <Link
                      href={filterHref("genre", g.slug)}
                      className={`text-sm ${
                        genre === g.slug
                          ? "font-semibold text-coral"
                          : "text-charcoal hover:text-coral"
                      }`}
                    >
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">Language</h2>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <Link
                    href={filterHref("language", "")}
                    className={`text-sm ${!language ? "font-semibold text-coral" : "text-charcoal hover:text-coral"}`}
                  >
                    Any language
                  </Link>
                </li>
                {LANGUAGES.slice(0, 10).map((lang) => (
                  <li key={lang.code}>
                    <Link
                      href={filterHref("language", lang.code)}
                      className={`text-sm ${
                        language === lang.code
                          ? "font-semibold text-coral"
                          : "text-charcoal hover:text-coral"
                      }`}
                    >
                      {lang.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <p className="text-sm text-charcoal sm:text-base">
            {q ? (
              <>
                Results for{" "}
                <span className="font-semibold text-ink">&quot;{q}&quot;</span>
              </>
            ) : (
              <>Browse independent listings on Authors Pilot</>
            )}
            {total > 0 ? (
              <span className="text-forest-muted">
                {" "}
                · {total} book{total === 1 ? "" : "s"}
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-xs text-forest-muted sm:text-sm">
            Buy on the author&apos;s store - no cart, deliver-to, or returns on
            Authors Pilot.
          </p>

          <div className="mt-6">
            {!configured || books.length === 0 ? (
              <EmptyState
                title={configured ? "No books match" : "BookStore coming soon"}
                description={
                  configured
                    ? "Try another search or clear filters. New titles appear after approval."
                    : "Approved listings will show here for readers to discover."
                }
                actionHref="/publish/start"
                actionLabel="Submit Your Book"
              />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {books.map((book, i) => (
                    <BookstoreProductCard
                      key={book.id}
                      book={book}
                      featured={i < 2}
                    />
                  ))}
                </div>
                {totalPages > 1 ? (
                  <nav
                    className="mt-10 flex flex-wrap items-center justify-center gap-2 pb-8"
                    aria-label="Pagination"
                  >
                    {page > 1 ? (
                      <Link
                        href={pageHref(page - 1)}
                        className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-semibold hover:border-coral/40"
                      >
                        Previous
                      </Link>
                    ) : null}
                    <span className="px-3 text-sm text-forest-muted">
                      Page {page} / {totalPages}
                    </span>
                    {page < totalPages ? (
                      <Link
                        href={pageHref(page + 1)}
                        className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-semibold hover:border-coral/40"
                      >
                        Next
                      </Link>
                    ) : null}
                  </nav>
                ) : null}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
