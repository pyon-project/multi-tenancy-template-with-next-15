import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set output directory based on the current app
  distDir: process.env.NEXT_PUBLIC_APP_NAME
    ? `.next-${process.env.NEXT_PUBLIC_APP_NAME.toLowerCase()}`
    : ".next",
};

export default nextConfig;
