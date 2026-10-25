import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function slugs(file, re) {
  return [
    ...new Set(
      [...readFileSync(join(root, file), "utf8").matchAll(re)].map((m) => m[1])
    ),
  ];
}

const diy = slugs("src/content/guides/diy-guides.ts", /slug:\s*"([^"]+)"/g);
const blog = slugs(
  "src/content/blog/articles/index.ts",
  /slug:\s*"([^"]+)"/g
);
const seo = slugs("src/content/seo-pages.ts", /path:\s*"(\/[^"]+)"/g);
const xml = readFileSync(join(root, "public/sitemap-authors-pilot.xml"), "utf8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

console.log(
  JSON.stringify(
    {
      diyGuides: diy.length,
      marketingBlogs: blog.length,
      seoPages: seo.length,
      staticCore: 22,
      expectedUnique:
        22 + seo.length + diy.length + blog.length /* may overlap */,
      sitemapXmlLocs: locs.length,
    },
    null,
    2
  )
);
