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

  const fbBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (fbBucket) {
    return `https://storage.googleapis.com/${fbBucket}/${path}`;
  }

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

export function coverUrl(path: string | null | undefined): string | null {
  return publicStorageUrl("book-covers", path);
}

export function avatarUrl(path: string | null | undefined): string | null {
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

export const MARKETING_URL =
  process.env.NEXT_PUBLIC_MARKETING_URL ??
  process.env.PUBLIC_SITE_URL ??
  "https://www.authorspilot.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3001";
