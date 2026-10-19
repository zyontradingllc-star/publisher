import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Prefer the browser-facing host when the platform is reached via a
 * same-origin rewrite proxy (marketing :3000 → platform :3001).
 */
export function publicOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedHost) {
    return `${forwardedProto || "http"}://${forwardedHost.split(",")[0]!.trim()}`;
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (appUrl) {
    try {
      return new URL(appUrl).origin;
    } catch {
      // fall through
    }
  }

  return request.nextUrl.origin;
}

/** Redirect that stays on the public (proxied) origin when possible. */
export function publicRedirect(
  request: NextRequest,
  pathWithSearch: string,
  status = 307
) {
  const path = pathWithSearch.startsWith("/")
    ? pathWithSearch
    : `/${pathWithSearch}`;
  return NextResponse.redirect(new URL(path, publicOrigin(request)), status);
}
