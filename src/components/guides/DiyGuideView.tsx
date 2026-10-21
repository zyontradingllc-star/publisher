import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { AdSenseSlot } from "@/components/ads/AdSenseSlot";
import { getBlogArticle } from "@/lib/blog";
import { canonicalUrl, SITE_NAME } from "@/lib/seo";
import type { DiyGuide } from "@/content/guides/types";
import { getDiyGuide } from "@/content/guides/diy-guides";

type Props = {
  guide: DiyGuide;
};

function LinkedText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const href = match[2];
    const external = href.startsWith("http");
    if (external) {
      nodes.push(
        <a
          key={`ext-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#E08A2A] underline-offset-2 hover:underline"
        >
          {match[1]}
        </a>,
      );
    } else {
      nodes.push(
        <Link
          key={`inlink-${key++}`}
          href={href}
          className="font-semibold text-[#E08A2A] underline-offset-2 hover:underline"
        >
          {match[1]}
        </Link>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

function buildGuideSchema(guide: DiyGuide) {
  const url = canonicalUrl(`/${guide.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
    url,
  };
}

function buildFaqSchema(guide: DiyGuide) {
  if (!guide.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function DiyGuideView({ guide }: Props) {
  const faqSchema = buildFaqSchema(guide);
  const relatedGuides = guide.relatedGuideSlugs
    .map((slug) => getDiyGuide(slug))
    .filter(Boolean) as DiyGuide[];
  const relatedBlogs = guide.relatedBlogSlugs
    .map((slug) => getBlogArticle(slug))
    .filter(Boolean);

  const toc = guide.sections
    .filter((s) => s.level === 2)
    .map((s) => ({ id: s.id, label: s.heading }));

  return (
    <>
      <JsonLd data={buildGuideSchema(guide)} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/book-publishing-author-website-design-agency" },
          { label: "Free Guides", href: "/publish-book-for-free" },
          { label: guide.title },
        ]}
      />

      <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          <div>
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#A7C4AB]/30 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                  {guide.intent === "listing" ? "Free listing" : "Free DIY guide"}
                </span>
                <time
                  dateTime={guide.updatedAt}
                  className="font-sans text-xs text-charcoal"
                >
                  Updated{" "}
                  {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h1 className="mt-4 heading-section">{guide.title}</h1>

              <div className="mt-8 rounded-2xl border border-[#A7C4AB]/50 bg-[#F8FAF8] p-6">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                  Short Answer
                </p>
                <p className="mt-3 font-sans text-base leading-relaxed text-ink sm:text-lg">
                  {guide.shortAnswer}
                </p>
              </div>

              <p className="mt-4 font-sans text-sm text-charcoal">
                Educational guide from{" "}
                <span className="font-semibold text-ink">{SITE_NAME}</span>. Platform
                fees and print costs can still apply - always check the retailer&apos;s
                official help pages.
              </p>
            </FadeIn>

            <FadeIn delay={0.08} className="mt-10 space-y-10">
              {guide.sections.map((section) => {
                const HeadingTag = section.level === 2 ? "h2" : "h3";
                const headingClass =
                  section.level === 2
                    ? "heading-section-sm text-forest"
                    : "font-display text-xl font-semibold text-ink sm:text-2xl";

                return (
                  <section key={section.id} id={section.id}>
                    <HeadingTag className={headingClass}>{section.heading}</HeadingTag>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="font-sans text-base leading-relaxed text-charcoal"
                        >
                          <LinkedText text={paragraph} />
                        </p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 font-sans text-sm text-charcoal sm:text-base"
                          >
                            <span
                              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral"
                              aria-hidden
                            />
                            <LinkedText text={bullet} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </FadeIn>

            {guide.officialLinks.length > 0 && (
              <FadeIn className="mt-12">
                <p className="heading-section-sm text-forest">Official resources</p>
                <ul className="mt-4 space-y-2">
                  {guide.officialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm font-semibold text-[#E08A2A] underline-offset-2 hover:underline sm:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}

            {guide.faqs.length > 0 && (
              <FadeIn className="mt-12">
                <p className="heading-section-sm text-forest">Frequently Asked Questions</p>
                <div className="mt-6 space-y-3">
                  {guide.faqs.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-2xl border border-sand bg-white p-5"
                    >
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {item.question}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn className="mt-12 rounded-2xl border border-sand bg-ivory p-8">
              <p className="font-display text-2xl font-semibold text-ink">
                {guide.diyCta.heading}
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                {guide.diyCta.text}
              </p>
              <div className="mt-6">
                <Button href={guide.diyCta.href}>{guide.diyCta.label}</Button>
              </div>
            </FadeIn>

            {guide.paidNote && (
              <FadeIn className="mt-8 rounded-2xl border border-sand bg-white p-8">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-charcoal">
                  Paid Authors Pilot services (optional)
                </p>
                <p className="mt-3 font-display text-xl font-semibold text-ink">
                  {guide.paidNote.heading}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                  {guide.paidNote.text}
                </p>
                <div className="mt-6">
                  <Button href={guide.paidNote.href} variant="ghost">
                    {guide.paidNote.label}
                  </Button>
                </div>
              </FadeIn>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-sand bg-white p-5 shadow-soft">
                <p className="font-display text-lg font-semibold text-ink">
                  On this page
                </p>
                <ol className="mt-4 space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block font-sans text-sm text-charcoal transition hover:text-[#273E2B]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
            <AdSenseSlot slot="blog-article" />
          </aside>
        </div>

        {(relatedGuides.length > 0 || relatedBlogs.length > 0) && (
          <FadeIn className="mt-16">
            <p className="heading-section-sm text-forest">Keep reading</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}/`}
                    className="block rounded-2xl border border-sand bg-white p-5 transition hover:border-[#273E2B]/40"
                  >
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#E08A2A]">
                      Free guide
                    </span>
                    <p className="mt-2 font-display text-lg font-semibold text-ink">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
              {relatedBlogs.map((item) =>
                item ? (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}/`}
                      className="block rounded-2xl border border-sand bg-white p-5 transition hover:border-[#273E2B]/40"
                    >
                      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal">
                        Blog
                      </span>
                      <p className="mt-2 font-display text-lg font-semibold text-ink">
                        {item.title}
                      </p>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </FadeIn>
        )}
      </article>
    </>
  );
}
