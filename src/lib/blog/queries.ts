import {
  getAllBlogArticles,
  getBlogArticle,
} from "@/content/blog/articles";
import type { BlogCategory } from "@/lib/blog/types";

export function getRelatedArticles(slug: string, limit = 3) {
  const article = getBlogArticle(slug);
  if (!article) return [];

  const related = article.relatedSlugs
    .map((relatedSlug) => getBlogArticle(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const fallback = getAllBlogArticles()
    .filter((item) => item.slug !== slug && item.category === article.category)
    .filter((item) => !related.some((r) => r.slug === item.slug));

  return [...related, ...fallback].slice(0, limit);
}

export function getFeaturedArticle() {
  return getAllBlogArticles()[0];
}

export function getLatestArticles(excludeSlug?: string) {
  return getAllBlogArticles().filter((article) => article.slug !== excludeSlug);
}
