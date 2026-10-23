import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function publicStorageUrl(bucket: string, path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  void bucket;
  const fbBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (fbBucket) {
    return `https://storage.googleapis.com/${fbBucket}/${path}`;
  }
  return null;
}

export function coverUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  // Absolute / Payload media URLs (http, https, or /api/media/...)
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }
  return publicStorageUrl("book-covers", path);
}

export function avatarUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }
  return publicStorageUrl("avatars", path);
}

export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function purchaseCtaLabel(linkType: string, label?: string): string {
  if (label && label.trim()) {
    const lower = label.toLowerCase();
    if (lower.includes("amazon")) return "View on Amazon";
    if (lower.includes("website") || lower.includes("store")) {
      return "Buy on Author's Website";
    }
  }
  switch (linkType) {
    case "author_website":
      return "Buy on Author's Website";
    case "amazon":
      return "View on Amazon";
    case "facebook":
      return "View on Facebook";
    case "instagram":
      return "View on Instagram";
    case "whatsapp":
      return "Contact on WhatsApp";
    default:
      return "View Purchase Options";
  }
}

export const AUTHOR_WEBSITE_DESIGN_URL =
  "https://authorspilot.com/author-website-design-agency-usa/";

export const MARKETING_URL = (
  process.env.NEXT_PUBLIC_MARKETING_URL ??
  process.env.PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://www.authorspilot.com"
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Marketing home (logo back-link) - old website on :3000 locally */
export const MARKETING_HOME_URL = `${MARKETING_URL}/book-publishing-author-website-design-agency/`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

/**
 * When marketing proxies platform HTML on :3000, public files (logo, etc.)
 * must still load from the platform origin in local dev.
 */
export const PLATFORM_ASSET_ORIGIN = (
  process.env.NEXT_PUBLIC_PLATFORM_ASSET_ORIGIN ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "")
).replace(/\/$/, "");

export function platformPublicPath(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return PLATFORM_ASSET_ORIGIN ? `${PLATFORM_ASSET_ORIGIN}${p}` : p;
}
