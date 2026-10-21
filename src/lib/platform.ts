/**
 * Publishing platform links.
 *
 * Local: empty PLATFORM_URL → same origin on :3000 (middleware proxies /publish → :3001).
 * Production: leave empty until https://app.authorspilot.com is actually deployed.
 *   Set NEXT_PUBLIC_PLATFORM_URL=https://app.authorspilot.com in .env.production
 *   only after the Node platform is live there.
 *
 * Never bake localhost into a production / static-export build.
 */
function resolvePlatformUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_PLATFORM_URL ?? "").trim().replace(/\/$/, "");
  const isLocalHost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(raw);

  if (process.env.NODE_ENV === "production") {
    // Ignore empty + localhost — keep Publish on authorspilot.com until app.* is live
    if (!raw || isLocalHost) return "";
    return raw;
  }

  return raw;
}

export const PLATFORM_URL = resolvePlatformUrl();

export const platformHref = (path = "/") => {
  const p = path.startsWith("/") ? path : `/${path}`;
  const normalized = p === "/" ? "/" : p.endsWith("/") ? p : `${p}/`;
  if (!PLATFORM_URL) return normalized;
  return `${PLATFORM_URL}${normalized === "/" ? "/" : normalized}`;
};
