import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { SeoAppArticle } from "@/components/seo/SeoAppArticle";
import { Button } from "@/components/ui/Button";
import { getPublishedBooks } from "@/lib/books";
import { buildAppMetadata } from "@/lib/seo";
import {
  BOOKSTORE_SEO_SLUG_LIST,
  getBookstoreSeoPage,
} from "@/lib/seo-app-pages";

type Props = { params: Promise<{ slug: string }> };

/** Map marketing bookstore slugs → Payload genre slugs when they differ. */
const GENRE_ALIAS: Record<string, string> = {
  childrens: "childrens",
  "science-fiction": "science-fiction",
  "young-adult": "young-adult",
  "self-help": "self-help",
  "historical-fiction": "historical-fiction",
  "cozy-mystery": "cozy-mystery",
  "new-releases": "",
  "book-club-picks": "",
};

export function generateStaticParams() {
  return BOOKSTORE_SEO_SLUG_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getBookstoreSeoPage(slug);
  if (!page) return {};
  return buildAppMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function BookstoreSlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "build") notFound();
  const page = getBookstoreSeoPage(slug);
  if (!page) notFound();

  const genreSlug = GENRE_ALIAS[slug] ?? slug;
  let books: Awaited<ReturnType<typeof getPublishedBooks>>["books"] = [];

  if (genreSlug) {
    try {
      const result = await getPublishedBooks({
        genre: genreSlug,
        pageSize: 8,
        sort: "newest",
      });
      books = result.books;
    } catch {
      books = [];
    }
  } else {
    try {
      const result = await getPublishedBooks({ pageSize: 8, sort: "newest" });
      books = result.books;
    } catch {
      books = [];
    }
  }

  return (
    <>
      <SeoAppArticle
        page={page}
        related={[
          { href: "/bookstore/", label: "Bookstore home" },
          { href: "/books/", label: "All books" },
          { href: "/guides/list-your-book-online/", label: "List your book online" },
          { href: "/publish/", label: "Publish your book" },
        ]}
      />
      {books.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="heading-section-sm">Featured titles</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/books/">Browse all books</Button>
            {genreSlug ? (
              <Button href={`/genres/${genreSlug}/`} variant="ghost">
                Genre catalog
              </Button>
            ) : null}
          </div>
          <p className="mt-6 text-sm text-forest-muted">
            Prefer the classic genre URL?{" "}
            <Link href="/books/" className="font-semibold text-coral hover:underline">
              Open the book catalog
            </Link>
            .
          </p>
        </section>
      ) : null}
    </>
  );
}
