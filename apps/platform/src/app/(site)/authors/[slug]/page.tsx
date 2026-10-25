import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { AuthorShareBar } from "@/components/AuthorShareBar";
import { PurchaseButtons } from "@/components/PurchaseButtons";
import { RecordAuthorView } from "@/components/RecordView";
import { Button } from "@/components/ui/Button";
import { getAuthorBooks, getAuthorBySlug } from "@/lib/books";
import { isPayloadConfigured } from "@/lib/payload";
import { appCanonical, buildAppMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";
import {
  avatarUrl,
  bannerUrl,
  coverUrl,
  formatDate,
  platformPublicPath,
  truncate,
} from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isPayloadConfigured()) return { title: "Author" };
  try {
    const { author, payloadAuthorId } = await getAuthorBySlug(slug);
    if (!author) return { title: "Author not found" };
    const name = author.display_name ?? "Author";
    const books = payloadAuthorId
      ? await getAuthorBooks(payloadAuthorId).catch(() => [])
      : [];
    const featured = books[0];
    const description =
      author.bio?.slice(0, 160) ||
      (featured
        ? `${featured.title} by ${name} — read & buy on Authors Pilot.`
        : `Discover books by ${name} on Authors Pilot.`);
    const image =
      coverUrl(featured?.cover_path) ||
      avatarUrl(author.avatar_path) ||
      DEFAULT_OG_IMAGE;
    return buildAppMetadata({
      title: `${name} · Author | Authors Pilot`,
      description,
      path: `/authors/${slug}/`,
      image,
    });
  } catch {
    return { title: "Author" };
  }
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isPayloadConfigured()) notFound();

  const { author, payloadAuthorId, error } = await getAuthorBySlug(slug).catch(
    () => ({
      author: null,
      payloadAuthorId: null,
      error: "Failed to load profile",
    })
  );

  if (!author) notFound();

  const books = payloadAuthorId
    ? await getAuthorBooks(payloadAuthorId).catch(() => [])
    : [];
  const featured = books[0] ?? null;
  const moreBooks = books.slice(1);
  const avatar = avatarUrl(author.avatar_path);
  const banner = bannerUrl(author.banner_path);
  const name = author.display_name ?? "Author";
  const featuredCover = featured ? coverUrl(featured.cover_path) : null;

  const socials = [
    { label: "Website", href: author.website_url, color: "bg-[#273E2B]" },
    { label: "Facebook", href: author.social_facebook, color: "bg-[#1877F2]" },
    {
      label: "Instagram",
      href: author.social_instagram,
      color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    },
    { label: "X", href: author.social_twitter, color: "bg-[#111111]" },
    { label: "LinkedIn", href: author.social_linkedin, color: "bg-[#0A66C2]" },
    {
      label: "TikTok",
      href: author.social_tiktok || author.social_whatsapp,
      color: "bg-[#010101]",
    },
    { label: "Reddit", href: author.social_reddit, color: "bg-[#FF4500]" },
  ].filter((s) => s.href);

  const pageUrl = appCanonical(`/authors/${slug}/`);
  const personLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name,
      description: author.bio || undefined,
      url: pageUrl,
      image: avatar || undefined,
      sameAs: socials.map((s) => s.href).filter(Boolean),
    },
  };

  return (
    <div className="bg-[#F7F3EA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <RecordAuthorView profileId={author.id} />

      {/* Atmosphere hero */}
      <div className="relative overflow-hidden border-b border-sand">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8D4A8]/50 via-[#F7F3EA] to-[#A7C4AB]/25" />
        {banner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={platformPublicPath(banner)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        ) : null}
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
          <nav className="text-sm text-forest-muted">
            <Link href="/authors" className="hover:text-coral">
              Authors
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{name}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-[5px] border-white bg-[#1A1A1A] shadow-lift sm:h-36 sm:w-36">
              {avatar ? (
                <Image
                  src={platformPublicPath(avatar)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="144px"
                  priority
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-white">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E08A2A]">
                Public author page
              </p>
              <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {name}
              </h1>
              <p className="mt-2 text-sm text-forest-muted">
                {books.length} published book
                {books.length === 1 ? "" : "s"}
                {author.slug ? (
                  <>
                    {" "}
                    ·{" "}
                    <span className="font-mono text-xs">
                      /authors/{author.slug}
                    </span>
                  </>
                ) : null}
              </p>
              {socials.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.label}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-soft transition hover:scale-105 ${s.color}`}
                      >
                        <span className="sr-only">{s.label}</span>
                        {s.label.slice(0, 1)}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {/* Featured book — Amazon-style center composition */}
        {featured ? (
          <section className="overflow-hidden rounded-none border border-sand bg-white shadow-lift">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,340px)_1fr]">
              <div className="bg-gradient-to-b from-ivory to-white p-6 sm:p-8">
                <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-none border border-sand bg-ivory shadow-book">
                  {featuredCover ? (
                    <Image
                      src={platformPublicPath(featuredCover)}
                      alt={`Cover of ${featured.title}`}
                      fill
                      className="object-cover"
                      sizes="280px"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-cta-wash p-4 text-center font-semibold text-white">
                      {featured.title}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center border-t border-sand p-6 sm:p-8 lg:border-l lg:border-t-0">
                {featured.genre?.name ? (
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                    {featured.genre.name}
                  </p>
                ) : (
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                    Featured book
                  </p>
                )}
                <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  <Link
                    href={`/books/${featured.slug}`}
                    className="hover:underline"
                  >
                    {featured.title}
                  </Link>
                </h2>
                {featured.subtitle ? (
                  <p className="mt-1 text-lg text-charcoal">{featured.subtitle}</p>
                ) : null}
                <p className="mt-3 text-base text-forest-muted">
                  by <span className="font-semibold text-ink">{name}</span>
                </p>

                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-y border-sand py-3 text-sm text-forest-muted">
                  {featured.language ? (
                    <li>Language: {featured.language.toUpperCase()}</li>
                  ) : null}
                  {featured.published_at ? (
                    <li>Listed: {formatDate(featured.published_at)}</li>
                  ) : null}
                  <li>
                    <Link
                      href={`/books/${featured.slug}`}
                      className="font-semibold text-coral hover:underline"
                    >
                      Full book page
                    </Link>
                  </li>
                </ul>

                {featured.description ? (
                  <p className="mt-5 text-[15px] leading-relaxed text-charcoal">
                    {truncate(featured.description, 420)}
                  </p>
                ) : null}

                <div className="mt-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    Get this book
                  </h3>
                  <div className="mt-3">
                    <PurchaseButtons
                      bookId={featured.id}
                      links={featured.sales_links}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Button href={`/books/${featured.slug}`} variant="ghost">
                    View book details
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-none border border-sand bg-white p-8 text-center shadow-soft">
            <h2 className="font-display text-2xl font-bold text-ink">
              Books coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-forest-muted">
              Approved listings for {name} will appear here for readers to
              discover and share.
            </p>
          </section>
        )}

        {/* About */}
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-none border border-sand bg-white p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">About</h2>
            {author.bio?.trim() ? (
              <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-charcoal">
                {author.bio}
              </p>
            ) : (
              <p className="mt-4 text-sm text-forest-muted">
                {name} has not added a biography yet.
              </p>
            )}
          </div>
          <AuthorShareBar name={name} path={`/authors/${slug}`} />
        </section>

        {/* Catalog */}
        {moreBooks.length > 0 ? (
          <section>
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-display text-2xl font-bold text-ink">
                More by {name}
              </h2>
              <Link
                href="/bookstore"
                className="text-sm font-semibold text-coral hover:underline"
              >
                Browse bookstore
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {moreBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
