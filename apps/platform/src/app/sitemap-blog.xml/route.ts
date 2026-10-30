import { getAllBlogPosts } from "@/lib/blog/posts";
import { appCanonical } from "@/lib/seo";
import {
  SITEMAP_XML_HEADERS,
  sitemapLastmod,
  xmlUrlEntry,
} from "@/lib/sitemap-xml";

/**
 * Dedicated blog sitemap for app.authorspilot.com.
 * Lists /blog/ + every published public article from the content registry.
 */
export async function GET() {
  const seen = new Set<string>();
  const entries: string[] = [];

  const indexUrl = appCanonical("/blog/");
  seen.add(indexUrl);
  entries.push(
    xmlUrlEntry({
      loc: indexUrl,
      changefreq: "weekly",
      priority: "0.9",
    })
  );

  for (const post of getAllBlogPosts()) {
    if (!post.slug) continue;
    const loc = appCanonical(`/blog/${post.slug}/`);
    if (seen.has(loc)) continue;
    seen.add(loc);
    entries.push(
      xmlUrlEntry({
        loc,
        lastmod: sitemapLastmod(post.publishedAt),
        changefreq: "monthly",
        priority: "0.7",
      })
    );
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(body, { headers: SITEMAP_XML_HEADERS });
}
