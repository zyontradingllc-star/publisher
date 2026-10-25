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

/** Payload + trailingSlash can store `/api/media/file/x.jpg/` — strip for Next/Image. */
function normalizeMediaPath(path: string): string {
  let p = path.trim();
  if (p.length > 1 && p.endsWith("/")) p = p.replace(/\/+$/, "");
  return p;
}

/**
 * Public image URL for covers/avatars/banners.
 * In dev, prefixes PLATFORM_ASSET_ORIGIN so marketing (:3000) can load platform media (:3001).
 */
function resolvePublicMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const normalized = normalizeMediaPath(path);
  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://")
  ) {
    return normalized;
  }
  if (normalized.startsWith("/")) {
    // Payload media (and other local public paths) must hit the platform origin
    // when the page is opened via the marketing proxy on :3000.
    if (
      normalized.startsWith("/api/media") ||
      Boolean(PLATFORM_ASSET_ORIGIN)
    ) {
      return platformPublicPath(normalized);
    }
    return normalized;
  }
  return null;
}

export function coverUrl(path: string | null | undefined): string | null {
  const resolved = resolvePublicMediaUrl(path);
  if (resolved) return resolved;
  return publicStorageUrl("book-covers", path);
}

export function avatarUrl(path: string | null | undefined): string | null {
  const resolved = resolvePublicMediaUrl(path);
  if (resolved) return resolved;
  return publicStorageUrl("avatars", path);
}

export function bannerUrl(path: string | null | undefined): string | null {
  const resolved = resolvePublicMediaUrl(path);
  if (resolved) return resolved;
  return publicStorageUrl("banners", path);
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
    ? "https://authorspilot.com"
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Marketing home (logo back-link) - old website on :3000 locally */
export const MARKETING_HOME_URL = `${MARKETING_URL}/`;

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
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleaned = path.length > 1 && path.endsWith("/") ? path.replace(/\/+$/, "") : path;
  const p = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return PLATFORM_ASSET_ORIGIN ? `${PLATFORM_ASSET_ORIGIN}${p}` : p;
}
