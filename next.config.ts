import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bunny Stream poster/thumbnail CDN (pull zones are *.b-cdn.net).
    // Local /public assets need no entry here.
    remotePatterns: [{ protocol: "https", hostname: "**.b-cdn.net" }],
  },
};

export default nextConfig;
