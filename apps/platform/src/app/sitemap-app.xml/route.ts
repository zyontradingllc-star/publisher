import { appCanonical } from "@/lib/seo";
import { APP_SITEMAP_STATIC_PATHS } from "@/lib/seo-app-pages";
import { getAllBlogPosts } from "@/lib/blog/posts";

/**
 * Dedicated sitemap for app.authorspilot.com SEO landings.
 * Does not replace authorspilot.com/sitemap.xml (marketing site).
 */
export async function GET() {
  const lastmod = new Date().toISOString();

  const paths = new Set<string>(["/", ...APP_SITEMAP_STATIC_PATHS]);
  for (const post of getAllBlogPosts()) {
    paths.add(`/blog/${post.slug}/`);
  }
  paths.add("/blog/");
  paths.add("/books/");
  paths.add("/how-it-works/");
  paths.add("/vs-books2read/");
  paths.add("/vs-booklinker/");

  const urls = [...paths].map((path) => {
    const loc = path.startsWith("http") ? path : appCanonical(path);
    const priority =
      path === "/" || path === "/publish/" || path === "/blog/"
        ? "1.0"
        : path.startsWith("/guides/") || path.startsWith("/compare/")
          ? "0.8"
          : "0.7";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
