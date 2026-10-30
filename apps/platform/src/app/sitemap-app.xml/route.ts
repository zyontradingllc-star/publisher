import { appCanonical } from "@/lib/seo";
import {
  APP_SITEMAP_STATIC_PATHS,
  SELL_ON_SITEMAP_PATHS,
} from "@/lib/seo-app-pages";
import {
  SITEMAP_XML_HEADERS,
  xmlUrlEntry,
} from "@/lib/sitemap-xml";

/**
 * Public indexable app pages not already in APP_SITEMAP_STATIC_PATHS.
 * Do NOT list /privacy/ or /terms/ — those 307 to authorspilot.com (GSC "Page with redirect").
 */
const EXTRA_PUBLIC_PATHS = [
  "/blog/",
  "/books/",
  "/how-it-works/",
  "/vs-books2read/",
  "/vs-booklinker/",
  "/about/",
  "/contact/",
  "/community-policy/",
  "/copyright/",
] as const;

/**
 * Dedicated sitemap for app.authorspilot.com SEO landings.
 * Blog articles are listed only in /sitemap-blog.xml.
 */
export async function GET() {
  const paths = new Set<string>([
    "/",
    ...APP_SITEMAP_STATIC_PATHS,
    ...SELL_ON_SITEMAP_PATHS,
    ...EXTRA_PUBLIC_PATHS,
  ]);

  const urls = [...paths].map((path) => {
    const loc = path.startsWith("http") ? path : appCanonical(path);
    const priority =
      path === "/" || path === "/publish/" || path === "/blog/"
        ? "1.0"
        : path.startsWith("/guides/") ||
            path.startsWith("/compare/") ||
            path.startsWith("/sell-on/")
          ? "0.8"
          : "0.7";
    return xmlUrlEntry({
      loc,
      changefreq: "weekly",
      priority,
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, { headers: SITEMAP_XML_HEADERS });
}
