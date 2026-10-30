/** Escape text for XML element / attribute content. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** ISO date (YYYY-MM-DD or full) → W3C lastmod, or null if invalid. */
export function sitemapLastmod(
  value: string | Date | null | undefined
): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

export function xmlUrlEntry(opts: {
  loc: string;
  lastmod?: string | null;
  changefreq?: string;
  priority?: string;
}): string {
  const lines = [`  <url>`, `    <loc>${escapeXml(opts.loc)}</loc>`];
  if (opts.lastmod) {
    lines.push(`    <lastmod>${escapeXml(opts.lastmod)}</lastmod>`);
  }
  if (opts.changefreq) {
    lines.push(`    <changefreq>${escapeXml(opts.changefreq)}</changefreq>`);
  }
  if (opts.priority) {
    lines.push(`    <priority>${escapeXml(opts.priority)}</priority>`);
  }
  lines.push(`  </url>`);
  return lines.join("\n");
}

export const SITEMAP_XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;
