/**
 * Publishing platform links.
 * Local (unified): same origin as marketing → `/publish` on :3000 (rewritten to :3001).
 * Production marketing site: absolute app.authorspilot.com.
 */
export const PLATFORM_URL = (
  process.env.NEXT_PUBLIC_PLATFORM_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://app.authorspilot.com"
    : "")
).replace(/\/$/, "");

export const platformHref = (path = "/") => {
  const p = path.startsWith("/") ? path : `/${path}`;
  // Marketing uses trailingSlash — keep Publish links consistent in local proxy mode
  const normalized =
    p === "/" ? "/" : p.endsWith("/") ? p : `${p}/`;
  if (!PLATFORM_URL) return normalized;
  return `${PLATFORM_URL}${normalized === "/" ? "/" : normalized}`;
};
