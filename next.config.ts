import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bunny Stream poster/thumbnail CDN (pull zones are *.b-cdn.net).
    // Local /public assets need no entry here.
    remotePatterns: [{ protocol: "https", hostname: "**.b-cdn.net" }],
  },
  // Online checkout is dormant until Stripe is wired to the company account
  // (MED-41). Temporary (307) so it is a one-block revert; the /buy route,
  // actions and webhook stay in place.
  async redirects() {
    return [{ source: "/buy", destination: "/contact", permanent: false }];
  },
};

export default nextConfig;
