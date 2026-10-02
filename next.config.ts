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
};

export default nextConfig;
