import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { AuthorSocialLinks } from "@/components/AuthorSocialLinks";
import { BookDescription } from "@/components/BookDescription";
import { BuyNowChannels } from "@/components/BuyNowChannels";
import { PublicShareHeader } from "@/components/PublicShareHeader";
import { RecordBookView } from "@/components/RecordView";
import { getAuthorBooks, getBookBySlug } from "@/lib/books";
import { isPayloadConfigured } from "@/lib/payload";
import { appCanonical, buildAppMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { coverUrl, formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isPayloadConfigured()) {
    return { title: slug.replace(/-/g, " ") };
  }
  try {
    const { book } = await getBookBySlug(slug);
    if (!book) return { title: "Book not found" };
    const description =
      book.description?.slice(0, 160) ||
      `${book.title} by ${book.author_display_name} on Authors Pilot.`;
    const image = coverUrl(book.cover_path) || DEFAULT_OG_IMAGE;
    return buildAppMetadata({
      title: `${book.title} | Authors Pilot`,
      description,
      path: `/books/${slug}/`,
      image,
    });
  } catch {
    return { title: slug.replace(/-/g, " ") };
  }
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
  const authorName = book.author_display_name || "Author";
  const moreByAuthor =
    authorProfile?.id != null
      ? await getAuthorBooks(authorProfile.id, book.id).catch(() => [])
      : [];
  const publicUrl = appCanonical(`/books/${slug}/`);
  const listedAt = book.publication_date || book.published_at;

  const authorNameEl = authorSlug ? (
    <Link
      href={`/authors/${authorSlug}`}
      className="font-semibold text-coral hover:underline"
    >
      {book.author_display_name}
    </Link>
  ) : (
    <span className="font-semibold text-ink">{book.author_display_name}</span>
  );

  const buyUrl =
    book.sales_links?.find((l) => l.is_primary && l.is_active)?.url ||
    book.sales_links?.find((l) => l.is_active)?.url ||
    undefined;
  const bookLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    image: cover || undefined,
    author: {
      "@type": "Person",
      name: book.author_display_name,
      url: authorSlug ? appCanonical(`/authors/${authorSlug}/`) : undefined,
    },
    url: publicUrl,
    ...(buyUrl
      ? {
          offers: {
            "@type": "Offer",
            url: buyUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
        />
        <RecordBookView bookId={book.id} />

        <nav className="text-sm text-forest-muted">
          <Link href="/books" className="hover:text-coral">
            Books
          </Link>
          {book.genre ? (
            <>
              {" "}
              /{" "}
              <Link
                href={`/genres/${book.genre.slug}`}
                className="hover:text-coral"
              >
                {book.genre.name}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="mt-6">
          <PublicShareHeader
            name={authorName}
            avatarPath={authorProfile?.avatar_path}
            bannerPath={authorProfile?.banner_path}
            authorHref={authorSlug ? `/authors/${authorSlug}` : null}
            meta={`Author · ${book.title}`}
          />
        </div>

        {loadError ? (
          <p className="mt-4 text-sm text-red-600">{loadError}</p>
        ) : null}

        {/* Full white product area: cover + buy box + description */}
        <section className="mt-8 w-full border border-sand bg-white p-4 shadow-soft sm:mt-10 sm:p-6 lg:p-8">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-10">
            <div className="mx-auto w-full max-w-[360px] lg:mx-0">
              <div className="relative aspect-[2/3] w-full overflow-hidden border border-sand bg-ivory shadow-book">
                {cover ? (
                  <Image
                    src={cover}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 360px, 360px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-cta-wash p-6 text-center font-display text-lg font-bold text-white">
                    {book.title}
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 w-full">
              <h1 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl lg:text-[2rem]">
                {book.title}
                {book.subtitle ? (
                  <span className="font-semibold text-charcoal">
                    : {book.subtitle}
                  </span>
                ) : null}
              </h1>

              <p className="mt-2 text-sm text-charcoal">
                by {authorNameEl}{" "}
                <span className="text-forest-muted">(Author)</span>
              </p>

              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-forest-muted">
                {book.language ? (
                  <li>Language: {book.language.toUpperCase()}</li>
                ) : null}
                {book.genre ? <li>Genre: {book.genre.name}</li> : null}
                {listedAt ? <li>Listed: {formatDate(listedAt)}</li> : null}
              </ul>

              {book.description ? (
                <div className="mt-8">
                  <BookDescription text={book.description} />
                </div>
              ) : null}

              <div className="mt-8">
                <AuthorSocialLinks
                  socialFacebook={authorProfile?.social_facebook}
                  socialInstagram={authorProfile?.social_instagram}
                  socialTwitter={authorProfile?.social_twitter}
                  socialLinkedin={authorProfile?.social_linkedin}
                  socialWhatsapp={authorProfile?.social_whatsapp}
                  socialTiktok={authorProfile?.social_tiktok}
                  socialYoutube={authorProfile?.social_youtube}
                  socialPinterest={authorProfile?.social_pinterest}
                  socialReddit={authorProfile?.social_reddit}
                />
              </div>

              <div className="mt-8 w-full">
                <BuyNowChannels bookId={book.id} links={book.sales_links} />
              </div>
            </div>
          </div>
        </section>

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
    </div>
  );
}
