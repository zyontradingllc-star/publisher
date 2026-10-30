import { appCanonical } from "@/lib/seo";
import { SITEMAP_XML_HEADERS, xmlUrlEntry } from "@/lib/sitemap-xml";

/**
 * Links-only sitemap for GSC "Alternate page with proper canonical".
 * Canonical hubs that marketing redirects to (or soft-serves). No new pages.
 */
const HUB_PATHS = [
  "/faq/",
  "/copyright/",
  "/how-publishing-works/",
] as const;

export async function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = HUB_PATHS.map((path) =>
    xmlUrlEntry({
      loc: appCanonical(path),
      lastmod,
      changefreq: "monthly",
      priority: "0.8",
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, { headers: SITEMAP_XML_HEADERS });
}
