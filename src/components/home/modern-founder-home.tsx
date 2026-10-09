"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Bot,
  Code2,
  Layers,
  Scan,
  X,
  Clock,
  Coffee,
  MessageCircle,
  ChevronDown,
  ExternalLink,
  Cpu,
  RotateCcw,
} from "lucide-react";
import { siteConfig } from "@/data/site";

// ==========================================
// 1. DATA ASSETS (真实定制资产库)
// ==========================================

const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

// 「问问饿狸」现场实时推演题库 (保留高互动灵魂)
const ELI_PROMPTS = [
  {
    id: "traffic",
    label: "🔥 新店开业没客流",
    tag: "3公里客流引爆",
    prompt: "我是临沂新开的一家社区火锅店，开业前三天怎么利用社群与短视频引爆周边 3 公里客流？",
    response: {
      strategy: "【饿狸 3 公里透雨打法】：锁定周边 25 个成熟小区物业群，实施『邻里抢鲜内测券』+ 抖音同城 50 位本地达人阶梯佣金爆破。",
      copy: "“临沂街坊邻居，我们把后厨底料熬透了！凭本条视频到店，首锅毛肚直接由老板请客，不限量送完即止。”",
      metric: "预期首周引流 1,200+ 堂食桌次 · 真实获客成本降低 62%",
    },
  },
  {
    id: "campaign",
    label: "❄️ 周二中午太冷清",
    tag: "淡季毛利核算",
    prompt: "周二中午上座率不到 30%，如何设计不伤毛利的限时引流活动？",
    response: {
      strategy: "【饿狸 阶梯毛利拼团】：针对周边写字楼推出『双人午市元气包』，主打出餐在 8 分钟以内的预制高毛利组合，绑定下周晚餐抵扣券锁定复购。",
      copy: "“打工人的周二不该吃对付的盒饭！热气腾腾的招牌小锅仅限午市 11:30-13:30，吃完再送 20 元深夜食堂券。”",
      metric: "午市翻台率提升 45% · 晚餐二阶段复购转化率达 28%",
    },
  },
  {
    id: "copy",
    label: "✍️ 想写爆款探店脚本",
    tag: "小红书与大众点评",
    prompt: "想在大众点评和小红书发打卡笔记，如何写出既真实自然又能过审的爆款推文？",
    response: {
      strategy: "【饿狸 沉浸五感文案算法】：抛弃死板推销词，从『深夜厨房的锅气声』『红油翻滚的气味』切入，以本地食客第一人称对话展开。",
      copy: "“在临沂挖到这家藏在巷子深处的宝藏小馆！刚掀开帘子就被满屋热腾腾的牛骨香治愈了，老板亲自掌勺 10 年，第一口汤就鲜掉眉毛…”",
      metric: "同城曝光率提升 3.8 倍 · 收藏与到店打卡转化率提升 55%",
    },
  },
];

const PROJECTS = [
  {
    num: "01",
    label: "Flagship AI · 实体商家 AI 获客武器",
    name: "饿狸 youeli.com",
    link: "https://youeli.com",
    desc: "餐饮营销没思路，问问饿狸。找客流 | 做活动 | 写文案，0.4 秒生成真实餐饮实战方案，后厨毛利动态追踪。",
    badge: "12年实体餐饮一线方法论打包",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    hasSimulator: true,
  },
  {
    num: "02",
    label: "Dev Arsenal · 252+ TSX · 原生 MCP",
    name: "Salin UI",
    link: "https://salin.wang/ui",
    desc: "专为 Cursor、Claude、Antigravity 调教的高美学纯净前端骨架。零冗余三方依赖、复制即用纯 TSX，原生 MCP 协议支持。",
    badge: "React 19 · Tailwind v4 · 纯净 TSX",
    command: "npx salin-ui add @mcp/server",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    hasSimulator: false,
  },
  {
    num: "03",
    label: "2,400+ 商业资产 · 永久免费",
    name: "狗哥资源库 Gouge Hub",
    link: "https://zl.eyu.ink",
    desc: "12 年摸爬滚打沉淀的商业资产枢纽。涵盖实体餐饮全案策划、连锁运营规范手册、爆款营销话术库与探店短视频脚本。",
    badge: "2400+ 免费资产 · 终身免费开放",
    chips: ["实体餐饮全案", "连锁管理规范", "爆款营销话术", "探店短视频脚本"],
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    hasSimulator: false,
  },
];

const SERVICES = [
  {
    num: "01",
    title: "饿狸 AI 获客",
    desc: "餐饮营销没思路，问问饿狸。找客流、做活动、写文案，0.4 秒生成真实餐饮实战方案，后厨毛利动态追踪。",
  },
  {
    num: "02",
    title: "实体餐饮增长",
    desc: "12 年一线实战方法论，淡季引流、外卖毛利核算、翻台率提升，累计深度服务超 2000+ 家实体餐饮门店。",
  },
  {
    num: "03",
    title: "本地生活自媒体",
    desc: "从零创立《舌尖上的临沂》，大众点评与小红书探店脚本、朋友圈爆款文案，从 0 到 1 打造本地高净值商业流量阵地。",
  },
  {
    num: "04",
    title: "Salin UI 前端系统",
    desc: "252+ 纯净 TSX 组件，React 19 · Tailwind v4，原生 MCP 协议支持，专为 Cursor、Claude、Antigravity 调教。",
  },
  {
    num: "05",
    title: "全栈 AI 开发",
    desc: "从产品构想到商业化落地，独立打磨 AI Agent、商家工作台与开发者工具，代码纯净如水，商业落地如铁。",
  },
];

// ==========================================
// 2. INTERACTIVE SUB-COMPONENTS
// ==========================================

// 鼠标悬停动力学磁吸组件 (Desktop 增强，移动端优雅降级)
const Magnet = ({ children, padding = 150, strength = 3, className = "" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (Math.abs(distanceX) < padding && Math.abs(distanceY) < padding) {
      x.set(distanceX / strength);
      y.set(distanceY / strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      animate={{ x: x.get(), y: y.get() }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const ContactButton = ({
  text = "Contact",
  onClick,
  href,
}: {
  text?: string;
  onClick?: () => void;
  href?: string;
}) => {
  if (href) {
    return (
      <a
        href={href}
        className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D7E2EA]/30 bg-transparent px-6 py-3 text-[#D7E2EA] transition-all hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] cursor-pointer"
      >
        <span className="font-medium uppercase tracking-widest text-sm">{text}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D7E2EA]/30 bg-transparent px-6 py-3 text-[#D7E2EA] transition-all hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] cursor-pointer"
    >
      <span className="font-medium uppercase tracking-widest text-sm">{text}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

// ==========================================
// 3. SECTIONS
// ==========================================

// HERO 首屏
const HeroSection = ({
  onOpenQr,
  onReplayOpening,
}: {
  onOpenQr: () => void;
  onReplayOpening: () => void;
}) => {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-x-clip px-5 sm:px-8 md:px-12 pt-4 pb-8">
      {/* 极简顶栏导航 */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex w-full items-center justify-between pt-4 md:pt-6 z-20"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#about"
            className="text-xs sm:text-base md:text-lg font-mono font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            Odyssey
          </a>
          <a
            href="#services"
            className="text-xs sm:text-base md:text-lg font-mono font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            饿狸 AI
          </a>
          <a
            href="#projects"
            className="text-xs sm:text-base md:text-lg font-mono font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            Arsenal
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onReplayOpening}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-emerald-500/40 bg-white/[0.04] hover:bg-emerald-500/10 text-white/70 hover:text-emerald-300 font-mono text-xs transition-colors cursor-pointer"
            title="重播电影开幕光效"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>电影开幕</span>
          </button>
          <button
            onClick={onOpenQr}
            className="px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>微信 {siteConfig.wechat}</span>
          </button>
        </div>
      </motion.nav>

      {/* 巨幅背景英文字体：Hi, i'm salin */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-6 sm:-mt-10 relative z-0">
        <div className="overflow-hidden w-full text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13.5vw] sm:text-[14.5vw] md:text-[15.5vw] lg:text-[16.5vw] mt-4 sm:mt-2 select-none"
          >
            Hi, i&apos;m salin
          </motion.h1>
        </div>
      </div>

      {/* 核心中层：Salin 本人镂空实拍人像 + 鼠标物理磁吸 */}
      <Magnet
        padding={150}
        strength={3}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[260px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none sm:pointer-events-auto"
      >
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          src="https://xgdzyqfalbibzelpdpvr.supabase.co/storage/v1/object/sign/restyle-media/57c4ddb3-054a-479a-a9df-792883a91fa0/07296545-7a4c-4018-966c-932fe2c41458.png?token=eyJraWQiOiIwZDIyMTA2Yi1iMThmLTRhMzMtYTQzMi1jODQxN2Y0ZTE2YmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN0eWxlLW1lZGlhLzU3YzRkZGIzLTA1NGEtNDc5YS1hOWRmLTc5Mjg4M2E5MWZhMC8wNzI5NjU0NS03YTRjLTQwMTgtOTY2Yy05MzJmZTJjNDE0NTgucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MTU1ODQzOCwiZXhwIjoyMTA2OTE4NDM4fQ.Zt4uaunQPWg90yyAWXHQ0k50CJqgkpGkVfCclotCZ0k"
          alt="Salin 狗哥"
          className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        />
      </Magnet>

      {/* 底部全宽信息栏 */}
      <div className="flex w-full items-end justify-between pb-4 sm:pb-6 md:pb-8 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-col text-left"
        >
          <span className="text-[#D7E2EA]/60 font-mono text-[clamp(0.6rem,0.85vw,0.8rem)] tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LINYI [35.1041° N, 118.3561° E] · 2014—2026
          </span>
          <p className="text-[#D7E2EA] font-normal leading-relaxed text-[clamp(0.78rem,1.2vw,1.15rem)] max-w-[200px] sm:max-w-[320px] md:max-w-[420px]">
            我是 Salin（朋友多叫我<strong className="text-emerald-400 font-bold">狗哥</strong>）。12年实体店创业者 · 全栈独立开发者 · 从 2000+ 餐饮商家服务到自研 AI 商业化落地。
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ContactButton text="Get In Touch" onClick={onOpenQr} />
        </motion.div>
      </div>
    </section>
  );
};

// 双向滚动视差项目画廊 (21 组动效项目 GIF)
const MarqueeSection = () => {
  const { scrollY } = useScroll();

  const x1 = useTransform(scrollY, (v) => v * 0.3 - 200);
  const x2 = useTransform(scrollY, (v) => -(v * 0.3) + 200);

  const row1 = MARQUEE_IMAGES.slice(0, 11);
  const row2 = MARQUEE_IMAGES.slice(11, 21);

  const seamlessRow1 = [...row1, ...row1, ...row1];
  const seamlessRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="bg-[#0C0C0C] pt-16 sm:pt-24 md:pt-32 pb-10 overflow-hidden w-full flex flex-col gap-3.5 select-none">
      <motion.div style={{ x: x1, willChange: "transform" }} className="flex gap-3.5 whitespace-nowrap min-w-max">
        {seamlessRow1.map((src, i) => (
          <img
            key={`r1-${i}`}
            src={src}
            alt="Project Demo"
            loading="lazy"
            className="w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] rounded-2xl object-cover border border-white/10"
          />
        ))}
      </motion.div>
      <motion.div style={{ x: x2, willChange: "transform" }} className="flex gap-3.5 whitespace-nowrap min-w-max">
        {seamlessRow2.map((src, i) => (
          <img
            key={`r2-${i}`}
            src={src}
            alt="Project Demo"
            loading="lazy"
            className="w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] rounded-2xl object-cover border border-white/10"
          />
        ))}
      </motion.div>
    </section>
  );
};

// 十二年历程 (12Y Odyssey 逐字点亮叙事 + 四角 3D 悬浮物证)
const AboutSection = ({ onOpenQr }: { onOpenQr: () => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const text =
    "2014年愚人节，我从零创立《舌尖上的临沂》，拿着相机走街串巷吃遍临沂。之后七年做餐饮服务者，又亲自下场做餐饮从业者，深度服务过 2000+ 家实体餐饮门店。如今重返服务者，把十二年一线摸爬滚打的方法论写进 AI。认准了就走到底，不装逼，做点有趣且真实的事。";
  const characters = text.split("");

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-24 bg-[#0C0C0C] overflow-hidden w-full text-center"
    >
      {/* 4 大角落悬浮 3D 物证饰件 */}
      <motion.img
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        viewport={{ once: true }}
        src="https://xgdzyqfalbibzelpdpvr.supabase.co/storage/v1/object/sign/restyle-media/57c4ddb3-054a-479a-a9df-792883a91fa0/90104c16-b68d-426d-9bdd-5b53c33db591.png?token=eyJraWQiOiIwZDIyMTA2Yi1iMThmLTRhMzMtYTQzMi1jODQxN2Y0ZTE2YmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN0eWxlLW1lZGlhLzU3YzRkZGIzLTA1NGEtNDc5YS1hOWRmLTc5Mjg4M2E5MWZhMC85MDEwNGMxNi1iNjhkLTQyNmQtOWJkZC01YjUzYzMzZGI1OTEucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MTU1ODQzNSwiZXhwIjoyMTA2OTE4NDM1fQ.NtWKk9CKIeGG45QeFeoxW1YfC0qR_x5UKPhNIWIn4Dc"
        alt="Moon Icon"
        className="absolute top-[4%] left-[2%] sm:left-[3%] w-[100px] sm:w-[150px] md:w-[200px] object-contain pointer-events-none drop-shadow-xl"
      />
      <motion.img
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.8 }}
        viewport={{ once: true }}
        src="https://xgdzyqfalbibzelpdpvr.supabase.co/storage/v1/object/sign/restyle-media/57c4ddb3-054a-479a-a9df-792883a91fa0/9cf10f8f-6736-46a1-8e69-38d995170605.png?token=eyJraWQiOiIwZDIyMTA2Yi1iMThmLTRhMzMtYTQzMi1jODQxN2Y0ZTE2YmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN0eWxlLW1lZGlhLzU3YzRkZGIzLTA1NGEtNDc5YS1hOWRmLTc5Mjg4M2E5MWZhMC85Y2YxMGY4Zi02NzM2LTQ2YTEtOGU2OS0zOGQ5OTUxNzA2MDUucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MTU1ODQzNCwiZXhwIjoyMTA2OTE4NDM0fQ.98QJjf8pt-xmqCs0Ua7_0S2yA5IPeOWVWfjrIMGcJMI"
        alt="Lego Icon"
        className="absolute top-[4%] right-[2%] sm:right-[3%] w-[100px] sm:w-[150px] md:w-[200px] object-contain pointer-events-none drop-shadow-xl"
      />
      <motion.img
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        src="https://xgdzyqfalbibzelpdpvr.supabase.co/storage/v1/object/sign/restyle-media/57c4ddb3-054a-479a-a9df-792883a91fa0/a09baedb-6f79-493e-8936-fcb451b39627.png?token=eyJraWQiOiIwZDIyMTA2Yi1iMThmLTRhMzMtYTQzMi1jODQxN2Y0ZTE2YmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN0eWxlLW1lZGlhLzU3YzRkZGIzLTA1NGEtNDc5YS1hOWRmLTc5Mjg4M2E5MWZhMC9hMDliYWVkYi02Zjc5LTQ5M2UtODkzNi1mY2I0NTFiMzk2MjcucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MTU1ODQzNCwiZXhwIjoyMTA2OTE4NDM0fQ.-cMI7cuBbYxN0OgGs27ZIlEiBSMhShxYLEylnmMe580"
        alt="3D Object"
        className="absolute bottom-[6%] left-[2%] sm:left-[4%] w-[90px] sm:w-[130px] md:w-[170px] object-contain pointer-events-none drop-shadow-xl"
      />
      <motion.img
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        viewport={{ once: true }}
        src="https://xgdzyqfalbibzelpdpvr.supabase.co/storage/v1/object/sign/restyle-media/57c4ddb3-054a-479a-a9df-792883a91fa0/80ea13ac-2482-4a5f-ab4d-c5540f90910f.png?token=eyJraWQiOiIwZDIyMTA2Yi1iMThmLTRhMzMtYTQzMi1jODQxN2Y0ZTE2YmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN0eWxlLW1lZGlhLzU3YzRkZGIzLTA1NGEtNDc5YS1hOWRmLTc5Mjg4M2E5MWZhMC84MGVhMTNhYy0yNDgyLTRhNWYtYWI0ZC1jNTU0MGY5MDkxMGYucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MTU1ODQzMSwiZXhwIjoyMTA2OTE4NDMxfQ.wQBqeOEnwmTDGGrQXTJWNEohPb1wrlSRl3vett1bybc"
        alt="3D Group"
        className="absolute bottom-[6%] right-[2%] sm:right-[4%] w-[110px] sm:w-[150px] md:w-[200px] object-contain pointer-events-none drop-shadow-xl"
      />

      {/* 巨幅主标题 */}
      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(2.8rem,10vw,150px)] z-10"
      >
        12Y Odyssey
      </motion.h2>

      {/* 核心逐字点亮叙事文本 */}
      <div className="flex flex-col items-center mt-8 sm:mt-12 md:mt-16 z-10 gap-12 sm:gap-16 md:gap-20 max-w-4xl">
        <p
          ref={containerRef}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px] text-[clamp(1.05rem,2vw,1.4rem)] flex flex-wrap justify-center font-sans px-2"
        >
          {characters.map((char, i) => {
            const start = i / characters.length;
            const end = start + 1 / characters.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.22, 1]);
            return (
              <motion.span key={i} style={{ opacity }}>
                {char}
              </motion.span>
            );
          })}
        </p>

        {/* 三项核心指标 */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16 text-[#D7E2EA] text-center font-mono">
          <div className="flex flex-col">
            <span className="font-black text-[clamp(1.4rem,3vw,2.4rem)] text-white">2014.04.01</span>
            <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-[clamp(0.65rem,0.9vw,0.85rem)] pt-1">
              ORIGIN 愚人节
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[clamp(1.4rem,3vw,2.4rem)] text-emerald-400">2,000+</span>
            <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-[clamp(0.65rem,0.9vw,0.85rem)] pt-1">
              实体餐饮门店服务
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[clamp(1.4rem,3vw,2.4rem)] text-white">4,380</span>
            <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-[clamp(0.65rem,0.9vw,0.85rem)] pt-1">
              DAYS 摸爬滚打
            </span>
          </div>
        </div>

        <ContactButton text="与 Salin 聊聊历程" onClick={onOpenQr} />
      </div>
    </section>
  );
};

// 极昼纯白卡片：What I Do (五大业务矩阵)
const ServicesSection = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-14 py-20 sm:py-24 md:py-32 w-full select-none"
    >
      <h2 className="font-black uppercase text-center text-[clamp(2.8rem,11vw,150px)] mb-12 sm:mb-18 md:mb-24 leading-none">
        What I Do
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col">
        {SERVICES.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 md:gap-12 py-7 sm:py-9 md:py-11 border-b border-[#0C0C0C]/15 last:border-b-0 text-left"
          >
            <span className="font-black text-[clamp(2.5rem,8vw,120px)] leading-none text-[#0C0C0C]/85 md:w-1/3 shrink-0 font-mono">
              {item.num}
            </span>
            <div className="flex flex-col justify-center">
              <h3 className="font-bold uppercase text-[clamp(1.2rem,2.2vw,2.2rem)] mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="font-normal leading-relaxed max-w-2xl text-[clamp(0.88rem,1.4vw,1.15rem)] opacity-70 font-sans">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// 叠层物理卡片 (Sticky Stacking Card + 饿狸实时 AI 决策模拟舱)
const Card = ({
  project,
  index,
  totalCards,
}: {
  project: any;
  index: number;
  totalCards: number;
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (totalCards - 1 - index) * 0.03]);

  // 饿狸 AI 模拟交互状态
  const [activePrompt, setActivePrompt] = useState(0);
  const [showSimulator, setShowSimulator] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyCommand = () => {
    if (project.command) {
      navigator.clipboard.writeText(project.command);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  return (
    <div
      ref={cardRef}
      className="md:sticky md:h-[88vh] flex items-center justify-center w-full py-4 md:py-0"
      style={{ top: `${80 + index * 24}px` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl min-h-[560px] md:h-full md:max-h-[820px] bg-[#0C0C0C] rounded-[28px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA] p-5 sm:p-7 md:p-9 flex flex-col justify-between gap-5 shadow-2xl relative overflow-hidden"
      >
        {/* 卡片头部 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0 border-b border-[#D7E2EA]/15 pb-4">
          <div className="flex items-center gap-4 sm:gap-6 text-left">
            <span className="font-black text-[clamp(2.5rem,7vw,90px)] leading-none text-[#D7E2EA] font-mono">
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[#D7E2EA]/60 uppercase tracking-widest text-xs mb-1">
                {project.label}
              </span>
              <h3 className="font-bold text-[#D7E2EA] text-[clamp(1.4rem,2.8vw,2.4rem)] tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            {project.hasSimulator && (
              <button
                onClick={() => setShowSimulator(!showSimulator)}
                className="px-3.5 py-1.5 rounded-full border border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showSimulator ? "查看实景大图" : "切换「问问饿狸」AI 推演"}</span>
              </button>
            )}

            {project.command && (
              <button
                onClick={handleCopyCommand}
                className="px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                {copiedCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCmd ? "已复制命令" : "复制 CLI"}</span>
              </button>
            )}

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-[#D7E2EA] px-5 py-1.5 uppercase tracking-widest text-xs text-[#D7E2EA] transition-all hover:bg-[#D7E2EA] hover:text-[#0C0C0C] font-mono font-bold whitespace-nowrap inline-flex items-center gap-1"
            >
              <span>Live Project</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 卡片主视窗：非对称三联大图 OR 现场 AI 决策推演舱 */}
        {showSimulator && project.hasSimulator ? (
          <div className="flex-1 flex flex-col justify-center rounded-[24px] sm:rounded-[36px] bg-white/[0.03] border border-emerald-500/40 p-4 sm:p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-2">
                <Bot className="w-4 h-4" />
                「问问饿狸」现场推演舱 · 实体餐饮 12 年方法论打包
              </span>
              <span className="font-mono text-[11px] text-white/50">用时 0.4s · 真实餐饮实战方案</span>
            </div>

            {/* 3 个实战问题标签 */}
            <div className="flex flex-wrap gap-2">
              {ELI_PROMPTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePrompt(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activePrompt === idx
                      ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : "bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* AI 策略回答卡 */}
            <div className="p-4 rounded-2xl bg-black/70 border border-emerald-500/30 space-y-3 font-sans">
              <div className="text-xs font-mono text-emerald-400 font-bold">
                💡 【{ELI_PROMPTS[activePrompt].tag}】实操策略：
              </div>
              <div className="text-sm text-white/95 leading-relaxed font-medium">
                {ELI_PROMPTS[activePrompt].response.strategy}
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre-line">
                {ELI_PROMPTS[activePrompt].response.copy}
              </div>
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/10 font-mono text-xs text-white/60 gap-2">
                <span>📈 {ELI_PROMPTS[activePrompt].response.metric}</span>
                <a
                  href="https://youeli.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
                >
                  在 youeli.com 完整生成 ↗
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-hidden">
            <div className="flex flex-col gap-4 w-full md:w-[40%] h-full">
              <img
                src={project.img1}
                alt={`${project.name} 预览 1`}
                className="w-full object-cover rounded-[20px] sm:rounded-[32px] md:rounded-[40px] h-[140px] sm:h-[180px] md:h-[220px] border border-white/10"
              />
              <img
                src={project.img2}
                alt={`${project.name} 预览 2`}
                className="w-full object-cover rounded-[20px] sm:rounded-[32px] md:rounded-[40px] h-[160px] sm:h-[200px] md:h-[260px] flex-1 border border-white/10"
              />
            </div>
            <div className="w-full md:w-[60%] h-full">
              <img
                src={project.img3}
                alt={`${project.name} 预览 3`}
                className="w-full h-full object-cover rounded-[20px] sm:rounded-[32px] md:rounded-[40px] min-h-[220px] border border-white/10"
              />
            </div>
          </div>
        )}

        {/* 卡片底部简要描述 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 text-left gap-2">
          <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-sans max-w-2xl leading-relaxed">
            {project.desc}
          </p>
          <span className="font-mono text-xs text-emerald-400 font-bold shrink-0">
            [ {project.badge} ]
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// 数字军火库 (Arsenal)
const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-12 py-20 pb-36 w-full select-none"
    >
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.8rem,11vw,150px)] mb-12 sm:mb-18 md:mb-24 leading-none">
        Arsenal
      </h2>

      <div className="flex flex-col">
        {PROJECTS.map((proj, i) => (
          <Card key={i} project={proj} index={i} totalCards={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
};

// 触达与收官页脚 (极简浅钢蓝 + 微信二维码高清弹窗)
const Footer = ({ onOpenQr }: { onOpenQr: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="w-full bg-[#D7E2EA] text-[#0C0C0C] py-18 px-6 flex flex-col items-center justify-center gap-7 text-center select-none"
    >
      <ContactButton text="Get In Touch" onClick={onOpenQr} />

      <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs sm:text-sm text-[#0C0C0C]/80 mt-2">
        <span>微信号 {siteConfig.wechat} · {siteConfig.email}</span>
        <button
          onClick={handleCopy}
          className="hover:text-black transition-colors p-1 rounded hover:bg-black/10 cursor-pointer inline-flex items-center gap-1 font-bold"
          title="复制微信号"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "已复制微信" : "复制"}</span>
        </button>
        <span>·</span>
        <button
          onClick={onOpenQr}
          className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer inline-flex items-center gap-1"
        >
          <Scan className="w-3.5 h-3.5" />
          <span>查看微信二维码</span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-5 sm:gap-8 uppercase tracking-widest text-xs sm:text-sm font-mono font-bold pt-2">
        <a href="https://youeli.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">
          饿狸 ↗
        </a>
        <a href="https://salin.wang/ui" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">
          Salin UI ↗
        </a>
        <a href="https://zl.eyu.ink" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">
          狗哥资源库 ↗
        </a>
        <a href="https://github.com/wangsalin" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">
          GitHub ↗
        </a>
        <a href="https://x.com/EyuSalin" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">
          X ↗
        </a>
      </div>

      <div className="text-xs font-mono font-medium tracking-widest opacity-50 mt-6">
        © 2014—2026 SALIN · LINYI, CHINA
      </div>
    </footer>
  );
};

// ==========================================
// 4. MAIN APP EXPORT
// ==========================================

export function ModernFounderHome() {
  const [showQrModal, setShowQrModal] = useState(false);
  const [openingStep, setOpeningStep] = useState(0); // 0: init, 1: stay 1.2s, 2: dolly-in, 3: done
  const [copiedWechat, setCopiedWechat] = useState(false);

  // 触发 Scheme A 电影开幕
  const triggerOpening = () => {
    setOpeningStep(0);
    setTimeout(() => setOpeningStep(1), 80);
    setTimeout(() => setOpeningStep(2), 1280); // 1.2s 留白呼吸
    setTimeout(() => setOpeningStep(3), 2680); // 1.4s 电影推轨拉焦穿透
  };

  useEffect(() => {
    triggerOpening();
  }, []);

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(siteConfig.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-[#D7E2EA] selection:text-[#0C0C0C] overflow-x-clip relative">
      {/* 核心段落 */}
      <HeroSection onOpenQr={() => setShowQrModal(true)} onReplayOpening={triggerOpening} />
      <MarqueeSection />
      <AboutSection onOpenQr={() => setShowQrModal(true)} />
      <ServicesSection />
      <ProjectsSection />
      <Footer onOpenQr={() => setShowQrModal(true)} />

      {/* 微信二维码高清弹窗 (Modal) */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowQrModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-[#121614] border border-emerald-500/40 p-6 sm:p-7 text-center shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="font-mono text-xs text-emerald-400 font-bold tracking-wider">
                  WECHAT DIRECT // 微信直接沟通
                </div>
                <h3 className="text-xl font-bold text-white">扫描二维码添加微信</h3>
                <p className="text-xs text-white/60 font-mono">
                  微信号: <code className="text-emerald-400 font-bold">{siteConfig.wechat}</code>
                </p>
              </div>

              <div className="relative w-56 h-56 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-white p-2 shadow-inner">
                <img
                  src="/images/wechat-qr.jpg"
                  alt="Salin 微信二维码"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div className="pt-1">
                <button
                  onClick={handleCopyWechat}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  {copiedWechat ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedWechat ? "微信号已成功复制" : "复制微信号 50219067"}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* Scheme A: 电影级大片开幕 · SALIN 字母雕塑视窗推轨穿透拉焦 */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
          openingStep >= 3 ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* 深邃黑夜底衬 */}
        <div
          className={`absolute inset-0 bg-[#040605] transition-opacity duration-1000 ease-out ${
            openingStep >= 2 ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* 穿透中心主体：巨型 SALIN 字母雕塑 (1400ms 电影级慢速推轨穿透) */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            openingStep === 0
              ? "scale-90 opacity-0"
              : openingStep === 1
              ? "scale-100 opacity-100"
              : "scale-[24] opacity-0"
          }`}
        >
          {/* 字母框与辉光轮廓 (现代雕塑体 Syne Monument) */}
          <div className="relative font-black leading-none select-none uppercase font-monument tracking-[0.16em] text-[22vw] sm:text-[16vw]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-emerald-300 drop-shadow-[0_0_90px_rgba(16,185,129,0.7)]">
              SALIN
            </span>
            <div
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-emerald-200/50 to-transparent pointer-events-none"
              style={{
                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.7)",
              }}
            >
              SALIN
            </div>
          </div>

          <div
            className={`mt-4 sm:mt-6 flex items-center gap-2 font-mono text-[10px] sm:text-xs text-white/50 tracking-[0.4em] uppercase transition-opacity duration-500 ${
              openingStep === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>[ 2014 — 2026 ODYSSEY ]</span>
          </div>
        </div>

        {/* 穿透光晕爆发 */}
        <div
          className={`absolute w-[700px] h-[700px] rounded-full bg-radial from-emerald-300/40 via-emerald-500/15 to-transparent blur-3xl pointer-events-none transition-all duration-[1400ms] ease-out ${
            openingStep === 2 ? "scale-[4] opacity-80" : "scale-50 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
