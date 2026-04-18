import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Hides the dev-only “N” route indicator (bottom-left) so it never overlaps HUDs like the map legend. */
  devIndicators: false,
};

export default nextConfig;
