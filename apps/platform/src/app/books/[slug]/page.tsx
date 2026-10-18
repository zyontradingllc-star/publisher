import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { PurchaseButtons } from "@/components/PurchaseButtons";
import { ReportForm } from "@/components/forms/ReportForm";
import { SocialShare } from "@/components/SocialShare";
import { RecordBookView } from "@/components/RecordView";
import { getSessionUser } from "@/lib/auth";
import { getAuthorBooks, getBookBySlug } from "@/lib/books";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { coverUrl, formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSupabaseConfigured()) {
    return { title: "Book" };
  }
  try {
    const { book } = await getBookBySlug(slug);
    if (!book) return { title: "Book not found" };
    return {
      title: book.title,
      description: book.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: "Book" };
  }
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isSupabaseConfigured()) {
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
  const moreByAuthor =
    authorProfile?.id != null
      ? await getAuthorBooks(authorProfile.id, book.id).catch(() => [])
      : [];

  const user = await getSessionUser().catch(() => null);

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

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-2xl border border-sand bg-ivory shadow-book">
          {cover ? (
            <Image
              src={cover}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              sizes="280px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-cta-wash p-4 text-center font-semibold text-white">
              {book.title}
            </div>
          )}
        </div>

        <div>
          {book.genre ? (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
              {book.genre.name}
            </p>
          ) : null}
          <h1 className="mt-1 heading-display text-3xl sm:text-4xl">{book.title}</h1>
          {book.subtitle ? (
            <p className="mt-1 text-lg text-charcoal">{book.subtitle}</p>
          ) : null}
          <p className="mt-3 text-forest-muted">
            by{" "}
            {authorSlug ? (
              <Link href={`/authors/${authorSlug}`} className="font-semibold text-ink hover:underline">
                {book.author_display_name}
              </Link>
            ) : (
              <span className="font-semibold text-ink">{book.author_display_name}</span>
            )}
          </p>
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

          <ReportForm bookId={book.id} defaultEmail={user?.email} />
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
