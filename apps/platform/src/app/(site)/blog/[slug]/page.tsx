import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  JsonLd,
  breadcrumbListSchema,
  faqPageSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import {
  CATEGORY_BADGE,
  formatBlogDate,
  getAllBlogPosts,
  getBlogPost,
  parseBlogFaqs,
  resolveBlogAeoAnswer,
} from "@/lib/blog/posts";
import { APP_ORIGIN, appCanonical, buildAppMetadata } from "@/lib/seo";
import { platformPublicPath } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${APP_ORIGIN}${post.image.startsWith("/") ? post.image : `/${post.image}`}`;

  return buildAppMetadata({
    title: `${post.h1} | Authors Pilot`,
    description: post.metaDescription,
    path: `/blog/${post.slug}/`,
    keywords: post.primaryKeyword ? [post.primaryKeyword] : undefined,
    image: imageUrl,
    imageAlt: post.imageAlt,
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
  });
}

function splitParas(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 4);

  const aeo = resolveBlogAeoAnswer(post);
  const faqs = parseBlogFaqs(post);

  const guideLinks = post.interlinks ?? [];
  const blogLinks = related.slice(0, 3).map((item) => ({
    href: `/blog/${item.slug}/`,
    label: item.title,
  }));
  const interlinks = [
    ...guideLinks,
    ...blogLinks.filter(
      (b) => !guideLinks.some((g) => g.href === b.href)
    ),
  ];

  const canonical = appCanonical(`/blog/${post.slug}/`);
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${APP_ORIGIN}${post.image.startsWith("/") ? post.image : `/${post.image}`}`;

  const h1 = post.h1.replace(/:\s*/g, " ").replace(/\s+/g, " ").trim();

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(APP_ORIGIN),
          breadcrumbListSchema(APP_ORIGIN, [
            { name: "Home", path: "/publish/" },
            { name: "Blog", path: "/blog/" },
            { name: h1, path: `/blog/${post.slug}/` },
          ]),
          faqPageSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: h1,
            description: post.metaDescription,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Person",
              name: post.author,
            },
            image: [imageUrl],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonical,
            },
            publisher: { "@id": `${APP_ORIGIN}/#organization` },
            keywords: post.primaryKeyword || undefined,
            about: post.primaryKeyword
              ? { "@type": "Thing", name: post.primaryKeyword }
              : undefined,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-short-answer", "h1"],
            },
            isPartOf: {
              "@type": "Blog",
              name: "Authors Pilot Blog",
              url: `${APP_ORIGIN}/blog/`,
            },
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-forest-muted">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link
                href="/publish/"
                className="font-semibold text-coral hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="px-1">
              /
            </li>
            <li>
              <Link
                href="/blog/"
                className="font-semibold text-coral hover:underline"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden className="px-1">
              /
            </li>
            <li className="text-ink">{post.category}</li>
          </ol>
        </nav>
        <p className="mt-4 text-xs text-forest-muted">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          {" · "}
          {post.readTimeMinutes} min read
        </p>
        <h1 className="mt-4 heading-section">{h1}</h1>
        <div className="mt-5 flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-xs font-bold text-white"
            aria-hidden
          >
            {post.authorInitials}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{post.author}</p>
            <p className="text-xs text-forest-muted">Authors Pilot Editorial</p>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-sand shadow-soft">
          <Image
            src={platformPublicPath(post.image)}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute bottom-4 left-4">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${CATEGORY_BADGE[post.category]}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* AEO / GEO direct answer — visible short answer for answer engines */}
        <div className="aeo-short-answer mt-8 rounded-2xl border border-sand bg-white p-5 shadow-soft">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
            Short answer
          </p>
          <h2 className="mt-2 font-display text-lg font-bold text-ink sm:text-xl">
            {post.headings[0]}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal">{aeo}</p>
        </div>

        <div className="mt-10 space-y-10">
          {post.headings.slice(1).map((heading, i) => {
            const block =
              post.body[i + 1] ??
              post.body[Math.min(i + 1, post.body.length - 1)];
            const paras = splitParas(block || "");
            return (
              <section key={heading}>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {heading}
                </h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-charcoal">
                  {paras.map((p) => (
                    <p key={p.slice(0, 48)} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            );
          })}

          {post.body.slice(3).map((block, i) => (
            <div
              key={`extra-${i}`}
              className="space-y-4 text-base leading-relaxed text-charcoal"
            >
              {splitParas(block).map((p) => (
                <p key={p.slice(0, 48)} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {interlinks.length > 0 ? (
          <nav className="mt-12 rounded-2xl border border-sand bg-warm-wash p-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Related guides & articles
            </h2>
            <ul className="mt-4 space-y-2">
              {interlinks.map((link) => {
                const external = /^https?:\/\//i.test(link.href);
                return (
                  <li key={link.href}>
                    {external ? (
                      <a
                        href={link.href}
                        className="text-sm font-semibold text-coral hover:underline"
                        rel="noopener noreferrer"
                      >
                        {link.label} →
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-coral hover:underline"
                      >
                        {link.label} →
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className="mt-10 overflow-hidden rounded-2xl bg-cta-wash p-6 text-white sm:p-8">
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Get your free author page
          </h2>
          <p className="mt-2 text-sm text-white/75 sm:text-base">
            One shareable link to Amazon or your site. Click tracking. 100%
            royalties—no commission.
          </p>
          <div className="mt-5">
            <Button href="/publish/">Start free</Button>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">
              More in {post.category}
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}/`}
                    className="font-semibold text-coral hover:underline"
                  >
                    {item.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
