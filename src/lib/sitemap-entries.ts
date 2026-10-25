import type { MetadataRoute } from "next";
import { getAllBlogArticles } from "@/lib/blog";
import { diyGuideSlugs } from "@/content/guides/diy-guides";
import { seoPagePaths } from "@/content/seo-pages";
import { canonicalUrl } from "@/lib/seo";

/** Live, indexable URLs only. Do not add unpublished / draft / coming-soon paths. */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: canonicalUrl("/blog/author-publishing-blog-resources"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: canonicalUrl("/blog/writing-resources-for-authors"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/contact-author-website-design-agency"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: canonicalUrl("/about-authorspilot-publishing-agency"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/author-publishing-website-price"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/privacy"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl("/terms"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl("/self-publishing-agency-services"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: canonicalUrl("/book-publishing-services-for-authors"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: canonicalUrl("/audiobook-production-services-for-authors"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: canonicalUrl("/book-marketing-services-for-authors"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: canonicalUrl("/pdf-to-audio-conversion-service"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/book-animation-video-services"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/live"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: canonicalUrl("/publish"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: canonicalUrl("/tools"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/tools/blurb-writer"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/tools/keyword-researcher"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/tools/title-generator"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/tools/royalty-calculator"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: canonicalUrl("/store/preview"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...seoPagePaths.map((path) => ({
      url: canonicalUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path.includes("book-writing") || path.includes("self-publishing") ? 0.95 : 0.9,
    })),
    ...diyGuideSlugs.map((slug) => ({
      url: canonicalUrl(`/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  const blogRoutes = getAllBlogArticles().map((article) => ({
    url: canonicalUrl(`/blog/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}

export function buildSitemapXml(entries: MetadataRoute.Sitemap): string {
  const body = entries
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified
            ? new Date(entry.lastModified).toISOString()
            : undefined;
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : null,
        typeof entry.priority === "number" ? `    <priority>${entry.priority}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
