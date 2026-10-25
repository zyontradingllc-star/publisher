import type { NextConfig } from "next";
import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

const isDev = process.env.NODE_ENV === "development";
/** When marketing proxies HTML from :3000, CSS/JS must still load from the platform. */
const assetPrefix =
  isDev
    ? (process.env.PLATFORM_ASSET_PREFIX || "http://localhost:3001").replace(
        /\/$/,
        ""
      )
    : undefined;

const nextConfig: NextConfig = {
  // Node deploy bundle for app.authorspilot.com (Hostinger VPS / Railway / etc.)
  output: "standalone",
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
  ...(assetPrefix ? { assetPrefix } : {}),
  eslint: {
    // FlatCompat + next/core-web-vitals can circular-serialize during CI builds.
    // Typecheck (`npm run typecheck`) remains the gate for correctness.
    ignoreDuringBuilds: true,
  },
  images: {
    ...(assetPrefix ? { path: `${assetPrefix}/_next/image` } : {}),
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/api/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
};

export default withPayload(nextConfig);
