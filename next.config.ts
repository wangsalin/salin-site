import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 部署：standalone 模式只打包运行时必需文件，显著减小镜像体积
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      {
        source: "/ui",
        destination: "/ui/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ui/",
        destination: "https://ui.eyucn.com/",
      },
      {
        source: "/ui/:path*",
        destination: "https://ui.eyucn.com/:path*",
      },
    ];
  },
};

export default nextConfig;
