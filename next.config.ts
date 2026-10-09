import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    mdxRs: false,
  },
  async rewrites() {
    return [
      {
        source: '/ui',
        destination: 'https://ui.eyucn.com/',
      },
      {
        source: '/ui/',
        destination: 'https://ui.eyucn.com/',
      },
      {
        source: '/ui/:path*',
        destination: 'https://ui.eyucn.com/:path*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://ui.eyucn.com/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
