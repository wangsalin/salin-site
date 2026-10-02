"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/site";

export function WeChatShare() {
  useEffect(() => {
    // Only execute inside WeChat browser
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent.toLowerCase();
    const isWeChat = /micromessenger/.test(ua);
    if (!isWeChat) return;

    // URL to sign must match current page URL without hash (#)
    const currentUrl = window.location.href.split("#")[0];

    fetch(`/api/wechat/jssdk?url=${encodeURIComponent(currentUrl)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;
        const wx = (window as any).wx;
        if (!wx) return;

        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
        });

        wx.ready(() => {
          // 1. 分享给朋友 (Send to Chat)
          wx.updateAppMessageShareData({
            title: siteConfig.title,
            desc: siteConfig.description,
            link: siteConfig.url,
            imgUrl: siteConfig.wechatThumb,
            success: () => {
              // Successfully registered share data
            },
          });

          // 2. 分享到朋友圈 (Share to Moments)
          wx.updateTimelineShareData({
            title: `${siteConfig.brandName}｜${siteConfig.role}`,
            link: siteConfig.url,
            imgUrl: siteConfig.wechatThumb,
            success: () => {
              // Successfully registered timeline share data
            },
          });
        });
      })
      .catch(() => {
        // Silently fail if API is unreachable
      });
  }, []);

  return null;
}
