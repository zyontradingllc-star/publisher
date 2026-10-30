import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

export const APP_SITE_NAME = "Authors Pilot";
export const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  SITE_URL ||
  "https://app.authorspilot.com"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = `${APP_ORIGIN}/og-image.webp`;

/** Absolute trailing-slash canonical for app.authorspilot.com */
export function appCanonical(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    path = new URL(path).pathname;
  }
  if (!path || path === "/") return `${APP_ORIGIN}/`;
  const trimmed = (path.startsWith("/") ? path : `/${path}`).replace(/\/+$/, "");
  if (/\.[a-z0-9]+$/i.test(trimmed)) return `${APP_ORIGIN}${trimmed}`;
  return `${APP_ORIGIN}${trimmed}/`;
}

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  imageAlt?: string;
  noIndex?: boolean;
  keywords?: string[];
  /** Open Graph type — articles use "article". */
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildAppMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noIndex,
  keywords,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const url = appCanonical(path);
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title: { absolute: title },
    description,
    keywords,
    metadataBase: new URL(APP_ORIGIN),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: ogType,
      url,
      siteName: APP_SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
      ...(ogType === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
