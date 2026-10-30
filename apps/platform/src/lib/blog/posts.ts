import { marketingLinksForCategory } from "./marketing-cross-links";
import { GENERATED_BLOG_POSTS } from "./posts-generated";

export const BLOG_FILTERS = [
  "All",
  "Author Page",
  "Book Launch",
  "Book Listing",
  "Comparisons",
  "Promotion",
  "Royalties",
  "Amazon Ads",
  "Newsletter Swaps",
  "Author Mindset",
] as const;

export type BlogFilter = (typeof BLOG_FILTERS)[number];
export type BlogCategory = Exclude<BlogFilter, "All">;

export type BlogInterlink = {
  href: string;
  label: string;
};

export type BlogPost = {
  slug: string;
  /** Card / listing title */
  title: string;
  /** Single keyword-focused H1 on the article page */
  h1: string;
  /** SEO meta description */
  metaDescription: string;
  /** H2 section headings on the article page */
  headings: readonly [string, string, string];
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorInitials: string;
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  imageAlt: string;
  trending?: boolean;
  body: string[];
  interlinks?: BlogInterlink[];
  aeoAnswer?: string;
  primaryKeyword?: string;
};

/** Category badge tones — brand greens / coral soft / sky. */
export const CATEGORY_BADGE: Record<BlogCategory, string> = {
  "Author Page": "bg-[#A7C4AB]/40 text-ink",
  "Book Launch": "bg-gradient-to-r from-[#E08A2A]/25 to-[#F2C14D]/35 text-ink",
  "Book Listing": "bg-ivory text-charcoal border border-sand",
  Comparisons: "bg-sky-100 text-sky-900",
  Promotion: "bg-[#A7C4AB]/25 text-coral-deep",
  Royalties: "bg-coral/10 text-coral",
  "Amazon Ads": "bg-coral/10 text-coral",
  "Newsletter Swaps": "bg-ivory text-charcoal border border-sand",
  "Author Mindset": "bg-[#A7C4AB]/25 text-coral-deep",
};

/** 50 SEO blogs from spreadsheet + marketing cross-links. */
export const BLOG_POSTS: BlogPost[] = (
  GENERATED_BLOG_POSTS as unknown as BlogPost[]
).map((post) => {
  const extra = marketingLinksForCategory(post.category);
  if (!extra.length) return post;
  const existing = post.interlinks ?? [];
  const seen = new Set(existing.map((l) => l.href));
  const merged = [
    ...existing,
    ...extra.filter((l) => !seen.has(l.href)),
  ].slice(0, 8);
  return { ...post, interlinks: merged };
});

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getTrendingPosts(limit = 3): BlogPost[] {
  const trending = getAllBlogPosts().filter((p) => p.trending);
  const fallback = getAllBlogPosts();
  return (trending.length >= limit ? trending : fallback).slice(0, limit);
}

export function isNewPost(publishedAt: string, withinDays = 21): boolean {
  const published = new Date(publishedAt).getTime();
  const now = Date.UTC(2026, 9, 24);
  return now - published <= withinDays * 24 * 60 * 60 * 1000;
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

const GENERIC_AEO_MARKER =
  /means you get a free branded author page and one shareable link/i;

/** Prefer a concrete how-to opener when the stored AEO answer is templated. */
export function resolveBlogAeoAnswer(post: BlogPost): string {
  const stored = post.aeoAnswer?.trim();
  if (stored && !GENERIC_AEO_MARKER.test(stored)) return stored;

  const howTo = post.body.find(
    (block) =>
      block.length > 80 &&
      !GENERIC_AEO_MARKER.test(block.slice(0, 120)) &&
      !/^Q\d+:/m.test(block)
  );
  if (howTo) {
    const first = howTo.split(/\n{2,}/)[0]?.trim() ?? "";
    if (first.length >= 40 && first.length <= 360) return first;
    if (first.length > 360) return `${first.slice(0, 357).trim()}…`;
  }

  return stored || post.metaDescription || post.excerpt;
}

/** Pull Q/A pairs from article body for FAQPage schema (AEO / GEO). */
export function parseBlogFaqs(
  post: BlogPost
): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [
    {
      question: post.headings[0] || post.h1,
      answer: resolveBlogAeoAnswer(post),
    },
  ];

  const blob = post.body.join("\n\n");
  const re = /Q\d+:\s*(.+?)\s*\nA:\s*([\s\S]*?)(?=\nQ\d+:|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(blob)) !== null && faqs.length < 6) {
    const question = match[1].trim().replace(/\?*$/, "?");
    const answer = match[2].trim().replace(/\s+/g, " ");
    if (question.length < 8 || answer.length < 20) continue;
    if (faqs.some((f) => f.question.toLowerCase() === question.toLowerCase())) {
      continue;
    }
    faqs.push({ question, answer: answer.slice(0, 500) });
  }

  return faqs;
}
