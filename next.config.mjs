/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

/**
 * Local: marketing on :3000; platform routes are proxied via src/middleware.ts
 * so Publish / dashboard / books stay on the same origin.
 * Production Hostinger build: static export (middleware skipped at runtime).
 */
const nextConfig = {
  ...(isProd ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
