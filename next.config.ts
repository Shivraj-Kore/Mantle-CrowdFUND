import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['pngtree.com', 'images.unsplash.com'], // Add any other domains you need
  },
};

export default nextConfig;
