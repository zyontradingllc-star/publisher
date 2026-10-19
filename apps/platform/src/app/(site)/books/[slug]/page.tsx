import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { PurchaseButtons } from "@/components/PurchaseButtons";
import { ReportForm } from "@/components/forms/ReportForm";
import { SocialShare } from "@/components/SocialShare";
import { RecordBookView } from "@/components/RecordView";
import { getAuthorBooks, getBookBySlug } from "@/lib/books";
import { isPayloadConfigured } from "@/lib/payload";
import { avatarUrl, coverUrl, formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Lightweight title only — avoid a second full Payload depth fetch on every request
  return { title: slug.replace(/-/g, " ") };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isPayloadConfigured()) {
    notFound();
  }

  let book: Awaited<ReturnType<typeof getBookBySlug>>["book"] = null;
  let loadError: string | null = null;

  try {
    const result = await getBookBySlug(slug);
    book = result.book;
    loadError = result.error;
  } catch {
    notFound();
  }

  if (!book) {
    notFound();
  }

  const cover = coverUrl(book.cover_path);
  const authorProfile = book.profiles;
  const authorSlug = authorProfile?.slug;
  const authorAvatar = avatarUrl(authorProfile?.avatar_path);
  const moreByAuthor =
    authorProfile?.id != null
      ? await getAuthorBooks(authorProfile.id, book.id).catch(() => [])
      : [];

  const authorNameEl = authorSlug ? (
    <Link
      href={`/authors/${authorSlug}`}
      className="font-semibold text-ink hover:underline"
    >
      {book.author_display_name}
    </Link>
  ) : (
    <span className="font-semibold text-ink">{book.author_display_name}</span>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <RecordBookView bookId={book.id} />
      <nav className="text-sm text-forest-muted">
        <Link href="/books" className="hover:text-coral">
          Books
        </Link>
        {book.genre ? (
          <>
            {" "}
            /{" "}
            <Link href={`/genres/${book.genre.slug}`} className="hover:text-coral">
              {book.genre.name}
            </Link>
          </>
        ) : null}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-[380px]">
          {book.genre ? (
            <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-coral lg:text-left">
              {book.genre.name}
            </p>
          ) : null}
          <h1 className="mt-1 text-center heading-display text-3xl sm:text-4xl lg:text-left">
            {book.title}
          </h1>
          {book.subtitle ? (
            <p className="mt-1 text-center text-lg text-charcoal lg:text-left">
              {book.subtitle}
            </p>
          ) : null}
          <div className="relative mt-5 aspect-[2/3] w-full overflow-hidden rounded-2xl border border-sand bg-ivory shadow-book">
            {cover ? (
              <Image
                src={cover}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="380px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-cta-wash p-4 text-center font-semibold text-white">
                {book.title}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mt-1 flex items-center gap-3 text-forest-muted lg:mt-10">
            {authorAvatar ? (
              authorSlug ? (
                <Link
                  href={`/authors/${authorSlug}`}
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-sand bg-sand shadow-soft"
                  aria-label={`${book.author_display_name} profile`}
                >
                  <Image
                    src={authorAvatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </Link>
              ) : (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-sand bg-sand shadow-soft">
                  <Image
                    src={authorAvatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </span>
              )
            ) : (
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-bold text-ink"
                aria-hidden="true"
              >
                {(book.author_display_name || "?").slice(0, 1).toUpperCase()}
              </span>
            )}
            <p className="text-base">
              by {authorNameEl}
            </p>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-forest-muted">
            {book.language ? <li>Language: {book.language.toUpperCase()}</li> : null}
            {book.publication_date ? (
              <li>Published: {formatDate(book.publication_date)}</li>
            ) : book.published_at ? (
              <li>Listed: {formatDate(book.published_at)}</li>
            ) : null}
          </ul>

          {loadError ? (
            <p className="mt-4 text-sm text-red-600">{loadError}</p>
          ) : null}

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold text-ink">Get this book</h2>
            <div className="mt-3">
              <PurchaseButtons bookId={book.id} links={book.sales_links} />
            </div>
          </div>

          {book.description ? (
            <div className="mt-8">
              <h2 className="font-display text-lg font-bold text-ink">About this book</h2>
              <div className="mt-3 whitespace-pre-wrap text-charcoal leading-relaxed">
                {book.description}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <SocialShare title={book.title} path={`/books/${book.slug}`} />
          </div>

          <ReportForm bookId={book.id} />
        </div>
      </div>

      {moreByAuthor.length > 0 ? (
        <section className="mt-14 border-t border-sand pt-12">
          <h2 className="heading-display text-xl">More by this author</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {moreByAuthor.slice(0, 4).map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
