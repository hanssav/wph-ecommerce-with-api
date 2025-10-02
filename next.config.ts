import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-ecapac.acer.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mobiledokan.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
      },
    ],
  },
};

export default nextConfig;
