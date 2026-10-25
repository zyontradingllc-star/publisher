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
      `${APP_ORIGIN}/sitemap.xml`,
      `${APP_ORIGIN}/sitemap-app.xml`,
    ],
    host: APP_ORIGIN,
  };
}
