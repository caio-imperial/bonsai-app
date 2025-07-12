import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'imgbb.com'],
  },
};

export default nextConfig;
