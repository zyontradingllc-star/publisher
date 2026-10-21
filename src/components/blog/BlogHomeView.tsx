"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import type { BlogArticle, BlogCategory } from "@/lib/blog/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

const SERVICE_LINKS = [
  { href: "/book-writing-services-for-authors", label: "Book Writing" },
  { href: "/ghostwriting-services-for-authors", label: "Ghostwriting" },
  { href: "/self-publishing-services-for-authors", label: "Self Publishing" },
  { href: "/book-cover-design-services", label: "Cover Design" },
  { href: "/professional-book-editing-services", label: "Editing" },
  { href: "/book-formatting-services-for-authors", label: "Formatting" },
  { href: "/audiobook-production-services-for-authors", label: "Audiobooks" },
  { href: "/amazon-kdp-publishing-services", label: "Amazon KDP" },
];

type Props = {
  articles: BlogArticle[];
  featured: BlogArticle;
};

export function BlogHomeView({ articles, featured }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const haystack = [
        article.title,
        article.excerpt,
        article.category,
        article.primaryKeyword,
        ...article.secondaryKeywords,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery && article.slug !== featured.slug;
    });
  }, [articles, category, featured.slug, query]);

  const visibleArticles = filtered.slice(0, visibleCount);

  return (
    <>
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      <FadeIn>
        <span className="badge-pill">Author Resources</span>
        <h1 className="mt-4 heading-section">
          Author Publishing Blog - Tips, Guides &amp; Resources
        </h1>
        <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-charcoal sm:text-lg">
          Practical publishing guidance on writing, self publishing, cover design,
          formatting, Amazon KDP, and audiobooks - written for authors who want
          clear answers and a professional path forward.
        </p>
        <div className="mt-6">
          <Button href="/blog/writing-resources-for-authors">Write a Blog</Button>
        </div>
      </FadeIn>

      <FadeIn className="mt-10">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#E08A2A]">
          Featured Article
        </p>
        <div className="mt-4">
          <BlogCard article={featured} featured />
        </div>
      </FadeIn>

      <h2 className="mt-12 font-display text-2xl font-semibold text-forest">
        Latest Articles
      </h2>

      <FadeIn className="mt-6 rounded-2xl border border-sand bg-white p-4 sm:p-5">
        <h2 className="mb-4 font-display text-2xl font-semibold text-forest">
          Browse by Topic
        </h2>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(6);
            }}
            placeholder="Search articles..."
            className="w-full rounded-full border border-sand bg-ivory px-4 py-2.5 font-sans text-sm text-ink outline-none transition focus:border-[#273E2B] lg:max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setVisibleCount(6);
              }}
              className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] ${
                category === "All"
                  ? "bg-[#273E2B] text-white"
                  : "border border-sand bg-white text-ink"
              }`}
            >
              All
            </button>
            {BLOG_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setVisibleCount(6);
                }}
                className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] ${
                  category === item
                    ? "bg-[#273E2B] text-white"
                    : "border border-sand bg-white text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article, index) => (
          <FadeIn key={article.slug} delay={index * 0.04}>
            <BlogCard article={article} />
          </FadeIn>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-10 text-center">
          <Button type="button" onClick={() => setVisibleCount((count) => count + 6)}>
            Load More Articles
          </Button>
        </div>
      )}

      <FadeIn className="mt-16 rounded-2xl border border-sand bg-ivory p-8 sm:p-10">
        <p className="heading-section-sm text-forest">Authors Pilot Services</p>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
          Ready to move from reading to action? Explore the services behind these guides.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {SERVICE_LINKS.map((link) => (
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
        <div className="mt-8">
          <Button href="/contact-author-website-design-agency">Book a Free Consultation</Button>
        </div>
      </FadeIn>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>

    </>
  );
}
