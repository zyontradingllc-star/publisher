import type { BlogArticle } from "@/lib/blog/types";

export function getReadingTime(article: BlogArticle): number {
  const text = [
    article.shortAnswer,
    ...article.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.bullets ?? []),
    ]),
    ...(article.faqs?.flatMap((f) => [f.question, f.answer]) ?? []),
  ].join(" ");

  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getTableOfContents(article: BlogArticle) {
  return article.sections.map((section) => ({
    id: section.id,
    label: section.heading,
    level: section.level,
  }));
}
