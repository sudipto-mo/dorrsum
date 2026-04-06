import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/credit-workbench", destination: "/credit-workbench/index.html" },
      { source: "/credit-workbench/", destination: "/credit-workbench/index.html" },
    ];
  },
};

export default nextConfig;
