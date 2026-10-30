import type { MetadataRoute } from "next";
import { getPublicAuthors, getPublishedBooks } from "@/lib/books";
import { isPayloadConfigured } from "@/lib/payload";
import { appCanonical } from "@/lib/seo";
import { APP_SITEMAP_STATIC_PATHS } from "@/lib/seo-app-pages";

/** Unique static public URLs only — no dashboard/auth duplicates. */
const STATIC_PATHS: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/publish/", priority: 1 },
  { path: "/how-it-works/", priority: 0.95 },
  { path: "/how-publishing-works/", priority: 0.85 },
  { path: "/faq/", priority: 0.9 },
  { path: "/blog/", priority: 0.85 },
  { path: "/guides/", priority: 0.85 },
  { path: "/vs-books2read/", priority: 0.9 },
  { path: "/vs-booklinker/", priority: 0.9 },
  { path: "/bookstore/", priority: 0.8 },
  { path: "/authors/", priority: 0.8 },
  { path: "/books/", priority: 0.8 },
  { path: "/pricing/", priority: 0.75 },
  { path: "/author-guidelines/", priority: 0.7 },
  ...APP_SITEMAP_STATIC_PATHS.filter(
    (path) =>
      ![
        "/publish/",
        "/bookstore/",
        "/authors/",
        "/pricing/",
        "/how-publishing-works/",
        "/faq/",
        "/author-guidelines/",
        "/guides/",
      ].includes(path)
  ).map((path) => ({
    path,
    priority: path.startsWith("/compare/") ? 0.8 : 0.75,
  })),
];

function safeDate(value: string | Date | null | undefined): Date {
  if (!value) return new Date();
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seen = new Set<string>();
  const staticEntries: MetadataRoute.Sitemap = [];

  for (const { path, priority } of STATIC_PATHS) {
    const url = appCanonical(path);
    if (seen.has(url)) continue;
    seen.add(url);
    staticEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority,
    });
  }

  // Blog article URLs live in /sitemap-blog.xml only (avoid duplicate listings).

  if (!isPayloadConfigured()) return staticEntries;

  try {
    const [{ books }, { authors }] = await Promise.all([
      getPublishedBooks({ pageSize: 500, sort: "newest" }),
      getPublicAuthors({ pageSize: 500 }),
    ]);

    const bookEntries: MetadataRoute.Sitemap = [];
    for (const b of books) {
      if (!b.slug) continue;
      const url = appCanonical(`/books/${b.slug}/`);
      if (seen.has(url)) continue;
      seen.add(url);
      bookEntries.push({
        url,
        lastModified: safeDate(b.updated_at),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    const authorEntries: MetadataRoute.Sitemap = [];
    for (const a of authors) {
      if (!a.slug) continue;
      const url = appCanonical(`/authors/${a.slug}/`);
      if (seen.has(url)) continue;
      seen.add(url);
      authorEntries.push({
        url,
        lastModified: safeDate(a.updated_at),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    return [...staticEntries, ...authorEntries, ...bookEntries];
  } catch {
    return staticEntries;
  }
}
