"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { SoundDock } from "@/components/ui/sound-dock";
import { WeChatShare } from "@/components/ui/wechat-share";

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    // Pure Cinema Freefall canvas on homepage, zero conflicting headers/footers/widgets
    return <main className="min-h-screen bg-slate-950 text-white">{children}</main>;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <BackToTop />
      <SoundDock />
      <WeChatShare />
    </>
  );
}
