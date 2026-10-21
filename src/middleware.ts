import { NextResponse, type NextRequest } from "next/server";

const PLATFORM =
  process.env.PLATFORM_INTERNAL_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:3001";

/** Paths that belong to apps/platform (not the marketing site). */
const PLATFORM_PREFIXES = [
  "/publish",
  "/bookstore",
  "/dashboard",
  "/cms",
  "/books",
  "/authors",
  "/admin",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/how-publishing-works",
  "/genres",
  "/faq",
  "/pricing",
  "/author-guidelines",
  "/community-policy",
  "/copyright",
] as const;

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function shouldProxy(pathname: string) {
  const path = normalizePath(pathname);

  // Keep marketing APIs on this app
  if (
    path.startsWith("/api/contact") ||
    path.startsWith("/api/send-mail") ||
    path.startsWith("/api/blog")
  ) {
    return false;
  }

  if (path.startsWith("/api/")) return true;

  return PLATFORM_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}

/**
 * Dev-only same-origin proxy: browser stays on :3000 while platform runs on :3001.
 */
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  if (!shouldProxy(pathname)) {
    return NextResponse.next();
  }

  const destPath = normalizePath(pathname) + search;
  const destination = new URL(destPath, PLATFORM);

  const requestHeaders = new Headers(request.headers);
  const host = request.headers.get("host") || "localhost:3000";
  requestHeaders.set("x-forwarded-host", host);
  requestHeaders.set("x-forwarded-proto", "http");
  requestHeaders.set(
    "x-forwarded-port",
    host.includes(":") ? host.split(":")[1]! : "80"
  );

  return NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?)$).*)",
  ],
};
