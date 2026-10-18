import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Node deploy bundle for app.authorspilot.com (Hostinger VPS / Railway / etc.)
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // FlatCompat + next/core-web-vitals can circular-serialize during CI builds.
    // Typecheck (`npm run typecheck`) remains the gate for correctness.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
