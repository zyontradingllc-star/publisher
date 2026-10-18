import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { AuthorConsultation } from "@/components/ui/AuthorConsultation";
import { AdSenseSlot } from "@/components/ads/AdSenseSlot";
import {
  buildArticleFaqSchema,
  buildArticleSchema,
  getReadingTime,
  getTableOfContents,
} from "@/lib/blog";
import type { BlogArticle } from "@/lib/blog/types";

type Props = {
  article: BlogArticle;
  related: BlogArticle[];
};

function LinkedText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <Link
        key={`inlink-${key++}`}
        href={match[2]}
        className="font-semibold text-[#E08A2A] underline-offset-2 hover:underline"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

function ArticleFaq({ faqs }: { faqs: NonNullable<BlogArticle["faqs"]> }) {
  return (
    <div className="space-y-3">
      {faqs.map((item) => (
        <div key={item.question} className="rounded-2xl border border-sand bg-white p-5">
          <h3 className="font-display text-lg font-semibold text-ink">{item.question}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export function BlogArticleView({ article, related }: Props) {
  const readingTime = getReadingTime(article);
  const toc = getTableOfContents(article);
  const faqSchema = buildArticleFaqSchema(article);

  return (
    <>
      <JsonLd data={buildArticleSchema(article)} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/book-publishing-author-website-design-agency" },
          { label: "Blog", href: "/blog/author-publishing-blog-resources" },
          { label: article.title },
        ]}
      />

      <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          <div>
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#A7C4AB]/30 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                  {article.category}
                </span>
                <time
                  dateTime={article.publishedAt}
                  className="font-sans text-xs text-charcoal"
                >
                  Published{" "}
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="font-sans text-xs text-charcoal">
                  Updated{" "}
                  {new Date(article.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="font-sans text-xs text-charcoal">
                  {readingTime} min read
                </span>
              </div>

              <h1 className="mt-4 heading-section">{article.title}</h1>

              <div className="mt-6 overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={article.featuredImage}
                    alt={article.featuredImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#A7C4AB]/50 bg-[#F8FAF8] p-6">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                  Short Answer
                </p>
                <p className="mt-3 font-sans text-base leading-relaxed text-ink sm:text-lg">
                  {article.shortAnswer}
                </p>
              </div>

              <p className="mt-4 font-sans text-sm text-charcoal">
                By <span className="font-semibold text-ink">{article.author}</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.08} className="mt-10 space-y-10">
              {article.sections.map((section) => {
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
                          key={paragraph}
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
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </FadeIn>

            {article.faqs && article.faqs.length > 0 && (
              <FadeIn className="mt-12">
                <p className="heading-section-sm text-forest">Frequently Asked Questions</p>
                <div className="mt-6">
                  <ArticleFaq faqs={article.faqs} />
                </div>
              </FadeIn>
            )}

            <FadeIn className="mt-12 rounded-2xl border border-sand bg-ivory p-8">
              <p className="font-display text-2xl font-semibold text-ink">
                {article.cta.heading}
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                {article.cta.text}
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {article.serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-coral hover:text-[#E08A2A]"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href={article.cta.href}>{article.cta.label}</Button>
              </div>
            </FadeIn>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-sand bg-white p-5 shadow-soft">
                <p className="font-display text-lg font-semibold text-ink">
                  Table of Contents
                </p>
                <ol className="mt-4 space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block font-sans text-sm text-charcoal transition hover:text-[#273E2B] ${
                          item.level === 3 ? "pl-4" : ""
                        }`}
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

        {related.length > 0 && (
          <FadeIn className="mt-16">
            <p className="heading-section-sm text-forest">Related Articles</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} article={item} />
              ))}
            </div>
          </FadeIn>
        )}
      </article>

      <AuthorConsultation />
    </>
  );
}
