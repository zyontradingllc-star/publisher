import type { Metadata } from "next";

export const SITE_URL = "https://authorspilot.com";
export const SITE_NAME = "Authors Pilot";
export const DEFAULT_OG_IMAGE = "/og-image.webp";

export function canonicalUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    path = new URL(path).pathname;
  }
  if (!path || path === "/") return `${SITE_URL}/`;
  const trimmed = (path.startsWith("/") ? path : `/${path}`).replace(/\/+$/, "");
  if (/\.[a-z0-9]+$/i.test(trimmed)) {
    return `${SITE_URL}${trimmed}`;
  }
  return `${SITE_URL}${trimmed}/`;
}

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogDescription?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogDescription,
}: PageSeo): Metadata {
  const url = canonicalUrl(path);
  const ogDesc = ogDescription ?? description;

  return {
    title: { absolute: title },
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description: ogDesc,
      type: "website",
      url,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDesc,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
