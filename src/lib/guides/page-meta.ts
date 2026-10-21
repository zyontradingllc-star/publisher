import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getDiyGuide } from "@/content/guides/diy-guides";

export function diyGuideMetadata(slug: string): Metadata {
  const guide = getDiyGuide(slug);
  if (!guide) return {};
  return buildPageMetadata({
    title: guide.seoTitle,
    description: guide.metaDescription,
    path: `/${guide.slug}`,
    keywords: guide.primaryKeyword,
  });
}
