"use client";

import { WeChatShare } from "@/components/ui/wechat-share";

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  // 全面推翻旧版传统顶栏与页脚，首页呈现 100% 纯净、全屏大图沉浸式画卷
  return (
    <>
      <main className="w-full min-h-screen overflow-x-hidden bg-[#070a08] text-[#e3ebe5]">
        {children}
      </main>
      <WeChatShare />
    </>
  );
}
