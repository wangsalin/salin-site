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
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta itemProp="name" content={siteConfig.title} />
        <meta itemProp="description" content={siteConfig.description} />
        <meta itemProp="image" content={siteConfig.wechatThumb} />
        <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" defer />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.title}
          href="/feed.xml"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--brand)] selection:text-white transition-colors duration-200">
        <LayoutChrome>{children}</LayoutChrome>
        <Analytics />
      </body>
    </html>
  );
}
