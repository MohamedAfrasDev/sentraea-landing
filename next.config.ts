import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.icons8.com" }],
  },
};

export default nextConfig;
