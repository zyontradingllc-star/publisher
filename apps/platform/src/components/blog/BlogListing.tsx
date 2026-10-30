"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogNewsletterCard } from "@/components/blog/BlogNewsletterCard";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FadeIn } from "@/components/blog/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  BLOG_FILTERS,
  formatBlogDate,
  type BlogFilter,
  type BlogPost,
} from "@/lib/blog/posts";

const PAGE_SIZE = 6;

type Props = {
  posts: BlogPost[];
  trending: BlogPost[];
};

export function BlogListing({ posts, trending }: Props) {
  const [filter, setFilter] = useState<BlogFilter>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const featured = posts[0];
  const showFeaturedRail = Boolean(featured) && filter === "All";

  const filtered = useMemo(() => {
    if (filter === "All") return posts.slice(1);
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  /** Under featured: first 2 cards in a 2-col row (layout mock). */
  const underFeatured = showFeaturedRail ? filtered.slice(0, 2) : [];
  const gridSource = showFeaturedRail ? filtered.slice(2) : filtered;
  const gridPosts = gridSource.slice(0, visible);
  const articleCount =
    filter === "All" ? posts.length : filtered.length;

  const activeFilters = useMemo(() => {
    const present = new Set(posts.map((p) => p.category));
    return BLOG_FILTERS.filter(
      (f) => f === "All" || present.has(f as (typeof posts)[number]["category"])
    );
  }, [posts]);

  return (
    <div className="bg-page-wash">
      {/* Hero — mock: 1.25fr / 0.75fr */}
      <section
        id="hero"
        className="mx-auto max-w-[1240px] px-4 pb-10 pt-12 sm:px-6 md:pt-16 lg:px-8"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3 py-1 text-xs font-medium text-ink">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
              New — free author page + one shareable book link
            </div>
            <h1 className="mt-6 font-display text-[1.85rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem] lg:leading-[0.98]">
              Book marketing tips
              <span className="mt-1 block font-bold italic text-coral">
                &amp; author guides
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal sm:text-[17px]">
              Practical launch strategies, author page guides, and promotion
              ideas to help independent authors reach more readers—with a free
              author page and one shareable book link.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[13px] text-forest-muted">
              <div className="flex -space-x-2" aria-hidden>
                {["#E08A2A", "#A7C4AB", "#273E2B"].map((color) => (
                  <span
                    key={color}
                    className="h-7 w-7 rounded-full border-2 border-white"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <span>Trusted by indie authors · New guides every week</span>
            </div>
          </FadeIn>
          <div id="hero-email" className="relative">
            <FadeIn delayMs={80}>
              <BlogNewsletterCard variant="hero" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-[4.5rem] z-30 border-y border-sand bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <div
            className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1"
            role="tablist"
            aria-label="Filter posts by category"
          >
            {activeFilters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(item);
                    setVisible(PAGE_SIZE);
                  }}
                  className={`h-[34px] shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] font-medium transition ${
                    active
                      ? "border-coral bg-coral text-white shadow-soft"
                      : "border-sand bg-white text-charcoal hover:border-coral/40 hover:text-ink"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <span className="ml-auto hidden shrink-0 items-center gap-2 text-xs text-forest-muted md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            {articleCount} articles
          </span>
        </div>
      </div>

      {/* Featured + sidebar (mock main) */}
      <main
        id="blog-grid"
        className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
      >
        {showFeaturedRail && featured ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <FadeIn>
                <BlogPostCard post={featured} featured />
              </FadeIn>
              {underFeatured.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {underFeatured.map((post, i) => (
                    <FadeIn key={post.slug} delayMs={40 + i * 40}>
                      <BlogPostCard post={post} compact />
                    </FadeIn>
                  ))}
                </div>
              ) : null}
            </div>

            <FadeIn delayMs={60} className="space-y-6 lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl border border-[#E08A2A]/25 bg-gradient-to-br from-[#F2C14D] via-[#F5D06A] to-[#E08A2A] p-6 shadow-soft">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-5 -top-6 h-[110px] w-[110px] rounded-full bg-white/35"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-8 left-4 h-[72px] w-[72px] rounded-full bg-ink/10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-8 bottom-14 h-7 w-7 rounded-full bg-white/40"
                />
                <div className="relative flex items-center justify-between">
                  <h2 className="text-sm font-bold tracking-tight text-ink">
                    Trending this week
                  </h2>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/10 text-xs"
                    aria-hidden
                  >
                    🔥
                  </span>
                </div>
                <ol className="relative mt-5 space-y-5">
                  {trending.map((post, i) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="group flex gap-4 text-left"
                      >
                        <span className="font-display text-[28px] font-extrabold leading-none tracking-tight text-ink/20 transition group-hover:text-ink/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                            {(post.h1 || post.title)
                              .replace(/:\s*/g, " ")
                              .replace(/\s+/g, " ")
                              .trim()}
                          </span>
                          <span className="mt-1 block text-[11px] text-ink/65">
                            {post.category} · {formatBlogDate(post.publishedAt)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("All");
                    document
                      .getElementById("latest-articles")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative mt-6 flex h-10 w-full items-center justify-center rounded-full border border-ink/15 bg-white/70 text-[13px] font-medium text-ink backdrop-blur transition hover:bg-white"
                >
                  See all trending →
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#273E2B] via-[#2F4A33] to-[#3A5640] p-6 shadow-soft">
                {/* Soft round shapes — same idea as yellow card, green theme */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-8 h-[130px] w-[130px] rounded-full bg-[#A7C4AB]/35"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -left-8 h-[100px] w-[100px] rounded-full bg-white/10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-8 right-3 h-[56px] w-[56px] rotate-12 rounded-[14px] bg-[#A7C4AB]/25"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-10 top-16 h-8 w-8 rounded-full bg-white/15"
                />
                <span className="relative inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-bold text-coral">
                  Popular
                </span>
                <h2 className="relative mt-4 max-w-[220px] font-display text-xl font-bold leading-tight text-white">
                  Templates that help you sell more books
                </h2>
                <p className="relative mt-2 text-[13px] leading-relaxed text-white/75">
                  Launch checklists, swap scripts, and ads tips—plus a free
                  author page.
                </p>
                <ul className="relative mt-4 space-y-2">
                  {[
                    "Book launch checklist",
                    "Newsletter swap script",
                    "Amazon ads starter plan",
                  ].map((label) => (
                    <li key={label}>
                      <Link
                        href="/publish/"
                        className="flex w-full items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-left text-xs font-medium text-white backdrop-blur transition hover:bg-white/25"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A7C4AB] text-[10px] text-ink">
                          ↗
                        </span>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="relative mt-5">
                  <Button href="/publish/" className="w-full">
                    Get your free author page
                  </Button>
                </div>
                <p className="relative mt-3 text-center text-[11px] text-white/55">
                  Free during launch · No commission on sales
                </p>
              </div>
            </FadeIn>
          </div>
        ) : null}

        <section
          id="latest-articles"
          className={showFeaturedRail ? "mt-14" : ""}
        >
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {filter === "All" ? "Latest articles" : filter}
          </h2>
          {gridPosts.length === 0 ? (
            <p className="mt-6 text-charcoal">
              No articles in this category yet. Try another filter.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, index) => (
                <FadeIn key={post.slug} delayMs={Math.min(index, 5) * 40}>
                  <BlogPostCard post={post} />
                </FadeIn>
              ))}
            </div>
          )}

          {visible < gridSource.length ? (
            <div className="mt-10 text-center">
              <Button
                type="button"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
              >
                Load More Articles
              </Button>
            </div>
          ) : null}
        </section>

        <div className="mt-14">
          <BlogNewsletterCard variant="strip" />
        </div>
      </main>
    </div>
  );
}
