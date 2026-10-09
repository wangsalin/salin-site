"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { WeChatShare } from "@/components/ui/wechat-share";

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
      <BackToTop />
      <WeChatShare />
    </>
  );
}
