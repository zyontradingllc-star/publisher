import type { MetadataRoute } from "next";
import { APP_ORIGIN } from "@/lib/seo";

const DISALLOW = [
  "/dashboard/",
  "/signup/",
  "/login/",
  "/cms/",
  "/admin/",
  "/forgot-password/",
  "/reset-password/",
  "/verify-email/",
  // App hosts redirect these to marketing — keep them out of crawl budget.
  "/privacy/",
  "/terms/",
] as const;

/** AI / answer-engine crawlers we explicitly allow (AEO / GEO). */
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOW],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
        disallow: [...DISALLOW],
      })),
    ],
    sitemap: [
      `${APP_ORIGIN}/sitemap-index.xml`,
      `${APP_ORIGIN}/sitemap.xml`,
      `${APP_ORIGIN}/sitemap-app.xml`,
      `${APP_ORIGIN}/sitemap-blog.xml`,
      `${APP_ORIGIN}/sitemap-links.xml`,
    ],
    host: APP_ORIGIN,
  };
}
