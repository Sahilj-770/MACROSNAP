import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  // Explicit absolute root to keep Turbopack clean
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Enable React strict mode for catching issues early
  reactStrictMode: true,

  // Optimise images from common CDN hostnames — add yours as needed
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
}

export default nextConfig
