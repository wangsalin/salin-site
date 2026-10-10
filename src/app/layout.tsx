import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/data/site";
import { LayoutChrome } from "@/components/layout/layout-chrome";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-share-card.jpg`,
        width: 1200,
        height: 630,
        alt: "Salin · 狗哥 | 12年餐饮老炮的 AI 实战独立站",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    images: [`${siteConfig.url}/images/og-share-card.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* OpenGraph / 通用社交协议 */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={`${siteConfig.url}/images/og-share-card.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content={siteConfig.name} />

        {/* Twitter Card 协议 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={`${siteConfig.url}/images/og-share-card.jpg`} />

        {/* 微信 / QQ 客户端抓取协议 (itemProp 标准) */}
        <meta itemProp="name" content="Salin · 狗哥 | 12年餐饮老炮的 AI 实战独立站" />
        <meta itemProp="description" content="从服务2000+餐饮实体到自研AI商业化落地。认准了就走到底，做点有趣且真实的事。" />
        <meta itemProp="image" content={`${siteConfig.url}/images/wechat-share-thumb.jpg`} />

        {/* 微信 JSSDK 外部脚本 */}
        <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" defer />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.title}
          href="/feed.xml"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--brand)] selection:text-white transition-colors duration-200">
        {/* 微信内置浏览器首图捕获：微信无 JSSDK 时抓取 body 内首张大于 300x300 的图片作为分享卡片缩略图 */}
        <div
          style={{
            position: "absolute",
            top: -9999,
            left: -9999,
            width: 0,
            height: 0,
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <img
            src={`${siteConfig.url}/images/wechat-share-thumb.jpg`}
            alt="Salin · 狗哥 微信分享缩略图"
            width={500}
            height={500}
          />
        </div>

        <LayoutChrome>{children}</LayoutChrome>
        <Analytics />
      </body>
    </html>
  );
}
