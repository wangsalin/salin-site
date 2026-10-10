"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/site";

export function WeChatShare() {
  useEffect(() => {
    // 仅在微信内置浏览器环境中执行
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent.toLowerCase();
    const isWeChat = /micromessenger/.test(ua);
    if (!isWeChat) return;

    // 微信签名 URL 必须匹配当前去掉 hash 的完整 URL
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
          // 1. 分享给朋友 (Send to WeChat Chat)
          wx.updateAppMessageShareData({
            title: "Salin · 狗哥 | 12年餐饮老炮的 AI 实战独立站",
            desc: "从服务2000+餐饮实体到自研AI商业化落地。认准了就走到底，做点有趣且真实的事。",
            link: siteConfig.url,
            imgUrl: `${siteConfig.url}/images/wechat-share-thumb.jpg`,
            success: () => {
              // 成功注册好友分享卡片
            },
          });

          // 2. 分享到朋友圈 (Share to Moments)
          wx.updateTimelineShareData({
            title: "Salin · 狗哥 | 12年创业摸爬滚打，把餐饮实战方法论写进自研 AI",
            link: siteConfig.url,
            imgUrl: `${siteConfig.url}/images/wechat-share-thumb.jpg`,
            success: () => {
              // 成功注册朋友圈分享卡片
            },
          });
        });
      })
      .catch(() => {
        // 静默降级：由页面内首图与 meta itemprop 兜底抓取
      });
  }, []);

  return null;
}
