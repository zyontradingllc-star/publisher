import { APP_ORIGIN } from "@/lib/seo";
import { SITEMAP_XML_HEADERS, escapeXml } from "@/lib/sitemap-xml";

/**
 * Sitemap index for app.authorspilot.com.
 * Point GSC at /sitemap-index.xml (also listed in robots.txt).
 */
export async function GET() {
  const sitemaps = [
    `${APP_ORIGIN}/sitemap.xml`,
    `${APP_ORIGIN}/sitemap-app.xml`,
    `${APP_ORIGIN}/sitemap-blog.xml`,
    `${APP_ORIGIN}/sitemap-links.xml`,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (loc) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(body, { headers: SITEMAP_XML_HEADERS });
}
