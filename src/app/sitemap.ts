import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/sitemap-entries";

export const dynamic = "force-static";

/** Legacy URL: /sitemap.xml — kept so existing GSC submissions still resolve. */
export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
