import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during the build process
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
