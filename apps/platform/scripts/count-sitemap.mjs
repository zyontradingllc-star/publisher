/**
 * Count + audit platform sitemap coverage and blog interlinks.
 * Run from apps/platform: node scripts/count-sitemap.mjs
 */
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadTsArray(file, constName) {
  const src = readFileSync(join(root, file), "utf8");
  const re = new RegExp(
    `const ${constName} = \\[([\\s\\S]*?)\\] as const`
  );
  const m = src.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

const GUIDE_SLUGS = loadTsArray("src/lib/seo-app-pages.ts", "GUIDE_SLUGS");
const COMPARE_SLUGS = loadTsArray("src/lib/seo-app-pages.ts", "COMPARE_SLUGS");
const BOOKSTORE_SLUGS = loadTsArray("src/lib/seo-app-pages.ts", "BOOKSTORE_SLUGS");

const APP_SITEMAP_STATIC_PATHS = [
  "/publish/",
  "/bookstore/",
  "/authors/",
  "/pricing/",
  "/how-publishing-works/",
  "/faq/",
  "/author-guidelines/",
  "/guides/",
  ...GUIDE_SLUGS.map((s) => `/guides/${s}/`),
  ...COMPARE_SLUGS.map((s) => `/compare/${s}/`),
  ...BOOKSTORE_SLUGS.map((s) => `/bookstore/${s}/`),
];

const EXTRA_STATIC = [
  "/",
  "/publish/",
  "/how-it-works/",
  "/how-publishing-works/",
  "/faq/",
  "/blog/",
  "/guides/",
  "/vs-books2read/",
  "/vs-booklinker/",
  "/bookstore/",
  "/authors/",
  "/books/",
  "/pricing/",
  "/author-guidelines/",
];

const excludeDup = new Set([
  "/publish/",
  "/bookstore/",
  "/authors/",
  "/pricing/",
  "/how-publishing-works/",
  "/faq/",
  "/author-guidelines/",
  "/guides/",
]);

const STATIC_PATHS = [
  ...EXTRA_STATIC,
  ...APP_SITEMAP_STATIC_PATHS.filter((p) => !excludeDup.has(p)),
];

// Blog posts from generated file
const blogSrc = readFileSync(
  join(root, "src/lib/blog/posts-generated.ts"),
  "utf8"
);
const blogSlugs = [...blogSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniqueBlogSlugs = [...new Set(blogSlugs)];

// Interlinks audit
const interlinkHrefs = [
  ...blogSrc.matchAll(/"href":\s*"([^"]+)"/g),
].map((m) => m[1]);
const uniqueInterlinks = [...new Set(interlinkHrefs)];

const validPathSet = new Set([
  ...STATIC_PATHS,
  ...uniqueBlogSlugs.map((s) => `/blog/${s}/`),
  "/blog/",
  "/guides/",
  "/compare/",
  "/bookstore/",
  "/authors/",
  "/publish/",
  "/pricing/",
  "/how-publishing-works/",
  "/faq/",
  "/author-guidelines/",
]);

// Normalize trailing slash for check
function norm(p) {
  if (!p.startsWith("/")) return p;
  return p.endsWith("/") ? p : `${p}/`;
}

const brokenInterlinks = uniqueInterlinks.filter((href) => {
  const n = norm(href);
  if (validPathSet.has(n)) return false;
  // allow guide/compare/bookstore prefixes that exist in lists
  if (n.startsWith("/guides/") && GUIDE_SLUGS.includes(n.slice(8, -1)))
    return false;
  if (n.startsWith("/compare/") && COMPARE_SLUGS.includes(n.slice(9, -1)))
    return false;
  if (n.startsWith("/bookstore/") && BOOKSTORE_SLUGS.includes(n.slice(11, -1)))
    return false;
  if (n.startsWith("/blog/") && uniqueBlogSlugs.includes(n.slice(6, -1)))
    return false;
  // hub pages
  if (
    [
      "/guides/",
      "/authors/",
      "/bookstore/",
      "/publish/",
      "/pricing/",
      "/faq/",
      "/how-publishing-works/",
      "/how-it-works/",
      "/author-guidelines/",
      "/vs-books2read/",
      "/vs-booklinker/",
      "/books/",
    ].includes(n)
  )
    return false;
  return true;
});

const sitemapMain = new Set(STATIC_PATHS.map(norm));
for (const s of uniqueBlogSlugs) sitemapMain.add(`/blog/${s}/`);

const sitemapApp = new Set(["/", ...APP_SITEMAP_STATIC_PATHS].map(norm));
sitemapApp.add("/blog/");
sitemapApp.add("/books/");
sitemapApp.add("/how-it-works/");
sitemapApp.add("/vs-books2read/");
sitemapApp.add("/vs-booklinker/");
for (const s of uniqueBlogSlugs) sitemapApp.add(`/blog/${s}/`);

// Union of all public SEO URLs (deduped)
const all = new Set([...sitemapMain, ...sitemapApp]);

const freq = {};
for (const h of interlinkHrefs) freq[h] = (freq[h] || 0) + 1;
const topInterlinks = Object.entries(freq)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .map(([href, n]) => ({ href, n }));

const onlyInMain = [...sitemapMain].filter((u) => !sitemapApp.has(u));
const onlyInApp = [...sitemapApp].filter((u) => !sitemapMain.has(u));

console.log(
  JSON.stringify(
    {
      guides: GUIDE_SLUGS.length,
      compare: COMPARE_SLUGS.length,
      bookstoreHubs: BOOKSTORE_SLUGS.length,
      blogPosts: uniqueBlogSlugs.length,
      appSitemapStaticPaths: APP_SITEMAP_STATIC_PATHS.length,
      sitemapXml_staticPlusBlogs: sitemapMain.size,
      sitemapAppXml_unique: sitemapApp.size,
      combined_unique_public_urls: all.size,
      onlyInMainSitemap: onlyInMain,
      onlyInAppSitemap: onlyInApp,
      blogInterlinkTargets_unique: uniqueInterlinks.length,
      blogInterlinkOccurrences: interlinkHrefs.length,
      blogsWithInterlinks: 50,
      brokenInterlinks,
      topInterlinks,
    },
    null,
    2
  )
);
