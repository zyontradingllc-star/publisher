/**
 * Static-export hosting needs a real file at /sitemap-authors-pilot.xml.
 * Keep this in sync by running: node scripts/write-sitemap-authors-pilot.mjs
 * (Uses the same URL list as src/lib/sitemap-entries.ts — guide slugs + known routes.)
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SITE = "https://authorspilot.com";

function canonical(path) {
  if (!path || path === "/") return `${SITE}/`;
  const trimmed = (path.startsWith("/") ? path : `/${path}`).replace(/\/+$/, "");
  return `${SITE}${trimmed}/`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Pull diyGuideSlugs from the TS source so we do not drift. */
function readDiyGuideSlugs() {
  const src = readFileSync(join(root, "src/content/guides/diy-guides.ts"), "utf8");
  const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

/** Pull blog slugs from articles index. */
function readBlogSlugs() {
  const src = readFileSync(join(root, "src/content/blog/articles/index.ts"), "utf8");
  const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

/** Pull seo page paths. */
function readSeoPaths() {
  const src = readFileSync(join(root, "src/content/seo-pages.ts"), "utf8");
  const paths = [...src.matchAll(/path:\s*"(\/[^"]+)"/g)].map((m) => m[1]);
  return [...new Set(paths)];
}

const staticPaths = [
  "/book-publishing-author-website-design-agency",
  "/blog/author-publishing-blog-resources",
  "/blog/writing-resources-for-authors",
  "/contact-author-website-design-agency",
  "/about-authorspilot-publishing-agency",
  "/author-publishing-website-price",
  "/privacy-policy",
  "/terms-and-conditions",
  "/self-publishing-agency-services",
  "/book-publishing-services-for-authors",
  "/audiobook-production-services-for-authors",
  "/book-marketing-services-for-authors",
  "/pdf-to-audio-conversion-service",
  "/book-animation-video-services",
  "/live",
  "/publish",
  "/tools",
  "/tools/blurb-writer",
  "/tools/keyword-researcher",
  "/tools/title-generator",
  "/tools/royalty-calculator",
  "/store/preview",
];

const now = new Date().toISOString();
const urls = [
  ...staticPaths,
  ...readSeoPaths(),
  ...readDiyGuideSlugs().map((s) => `/${s}`),
  ...readBlogSlugs().map((s) => `/blog/${s}`),
].map((path) => canonical(path));

const unique = [...new Set(urls)];

const body = unique
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const out = join(root, "public/sitemap-authors-pilot.xml");
writeFileSync(out, xml, "utf8");
console.log(`Wrote ${unique.length} URLs → ${out}`);
