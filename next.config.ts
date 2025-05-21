import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during the build process
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable server actions with proper configuration
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
