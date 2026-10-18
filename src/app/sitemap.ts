import type { MetadataRoute } from "next";
import { getAllBlogArticles } from "@/lib/blog";
import { seoPagePaths } from "@/content/seo-pages";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: canonicalUrl("/book-publishing-author-website-design-agency"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: canonicalUrl("/blog/author-publishing-blog-resources"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: canonicalUrl("/blog/writing-resources-for-authors"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: canonicalUrl("/contact-author-website-design-agency"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: canonicalUrl("/about-authorspilot-publishing-agency"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: canonicalUrl("/author-publishing-website-price"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: canonicalUrl("/privacy-policy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: canonicalUrl("/terms-and-conditions"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: canonicalUrl("/self-publishing-agency-services"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: canonicalUrl("/book-publishing-services-for-authors"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: canonicalUrl("/audiobook-production-services-for-authors"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: canonicalUrl("/book-marketing-services-for-authors"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: canonicalUrl("/pdf-to-audio-conversion-service"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: canonicalUrl("/book-animation-video-services"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: canonicalUrl("/live"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: canonicalUrl("/publish"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: canonicalUrl("/tools"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: canonicalUrl("/tools/blurb-writer"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: canonicalUrl("/tools/keyword-researcher"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: canonicalUrl("/tools/title-generator"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: canonicalUrl("/tools/royalty-calculator"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: canonicalUrl("/store/preview"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ...seoPagePaths.map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path.includes("book-writing") || path.includes("self-publishing") ? 0.95 : 0.9,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = getAllBlogArticles().map((article) => ({
    url: canonicalUrl(`/blog/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
