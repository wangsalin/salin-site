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
  Utensils,
  Gamepad2,
  Tv,
} from "lucide-react";
import { siteConfig } from "@/data/site";

// ==========================================
// 1. DATA ASSETS (Salin 本人真实项目与物料矩阵)
// ==========================================

// 图二：完全替换为 Salin 自己的项目、网站、物证与品牌资产 (双向滚动画廊)
const SALIN_SHOWCASE_ROW1 = [
  {
    id: "eli-main",
    title: "饿狸 youeli.com",
    tag: "FLAGSHIP AI",
    desc: "餐饮营销没思路，问问饿狸 · 0.4s 实战策略生成",
    image: "/images/projects/eli/eli-scene-kitchen.jpg",
    link: "https://youeli.com",
  },
  {
    id: "salin-ui",
    title: "Salin UI 前端军火库",
    tag: "DEV ARSENAL",
    desc: "252+ 纯净 TSX 组件 · React 19 · 原生 MCP 协议",
    image: "/images/showcase/project-salin-ui.jpg",
    link: "https://salin.wang/ui",
  },
  {
    id: "gouge-hub",
    title: "狗哥资源库 Gouge Hub",
    tag: "2400+ ASSETS",
    desc: "12年真实落地商业资产 · 终身免费开放下载",
    image: "/images/showcase/project-gouge-hub.jpg",
    link: "https://zl.eyu.ink",
  },
  {
    id: "shejian-14",
    title: "《舌尖上的临沂》印鉴",
    tag: "2014 ORIGIN",
    desc: "地方自媒体萌芽时代拓荒 · 饿鱼吃包子官方图腾",
    image: "/images/brand/shejian-official-hi-res.png",
    link: "#about",
  },
  {
    id: "foodops-ai",
    title: "FoodOps 餐饮智能决策",
    tag: "CATERING SAAS",
    desc: "实体餐饮外卖毛利核算与客流翻台率算法引擎",
    image: "/images/showcase/project-foodops.jpg",
    link: "https://youeli.com",
  },
  {
    id: "eli-desk",
    title: "饿狸 AI 智能文案舱",
    tag: "VIRAL COPY",
    desc: "大众点评与小红书沉浸五感探店爆款文案生成",
    image: "/images/projects/eli/eli-scene-desk.jpg",
    link: "https://youeli.com",
  },
  {
    id: "workbench-26",
    title: "2026 实操开发工作台",
    tag: "BUILDER WORKBENCH",
    desc: "咖啡手柄、iPad 看板与深夜全栈 AI 终端",
    image: "/images/showcase/salin-hero-workbench.jpg",
    link: "#projects",
  },
];

const SALIN_SHOWCASE_ROW2 = [
  {
    id: "salin-mcp",
    title: "Salin UI 开发者终端",
    tag: "MCP PROTOCOL",
    desc: "$ npx salin-ui add @mcp/server 极速开箱即用",
    image: "/images/evidence/ai-dashboard.png",
    link: "https://salin.wang/ui",
  },
  {
    id: "flag-17",
    title: "2017 探店大旗物证",
    tag: "4380 DAYS EVIDENCE",
    desc: "吃遍临沂大街小巷 · 旗帜与相机实拍原件",
    image: "/images/portrait/salin-2017-flag-full.jpg",
    link: "#about",
  },
  {
    id: "hotpot-17",
    title: "2017 探店千人火锅",
    tag: "2000+ MERCHANTS",
    desc: "见证 2000 多家小店的排队火爆与深夜坚守",
    image: "/images/portrait/salin-2017-food.png",
    link: "#about",
  },
  {
    id: "eli-meeting",
    title: "饿狸 商家增长罗盘",
    tag: "LOCAL COMMERCE",
    desc: "找客流 | 做活动 | 写文案，实体餐饮专属",
    image: "/images/projects/eli/eli-scene-meeting.jpg",
    link: "https://youeli.com",
  },
  {
    id: "kitchen-frontline",
    title: "实体后厨深水区一线",
    tag: "STORE OWNER",
    desc: "亲自下场开店管店四年 · 从岸上变成店老板",
    image: "/images/evidence/kitchen-frontline.png",
    link: "#about",
  },
  {
    id: "local-matrix",
    title: "本地生活自媒体矩阵",
    tag: "COMMERCE ENGINE",
    desc: "百万级同城流量矩阵从 0 到 1 商业变现实战",
    image: "/images/evidence/local-life.png",
    link: "#services",
  },
  {
    id: "salin-2025-road",
    title: "2025 山路实拍纪实",
    tag: "SALIN 狗哥",
    desc: "认准了就走到底，不装逼，做点有趣且真实的事",
    image: "/images/portrait/salin-2025.jpg",
    link: "#contact",
  },
];

// 图三：重新设计的 4 大桌面精神饰件 (奶茶 / 小吃 / 手办 / 游戏)
const DESK_TOTEMS = [
  {
    id: "milktea",
    name: "奶茶 · 本地生活",
    subtitle: "MILK TEA // LOCAL BEVERAGE",
    desc: "走街串巷吃遍临沂，探店两千家实体餐饮的烟火记忆。",
    image: "/images/assets/3d-milktea.png",
    pos: "top-[4%] left-[2%] sm:left-[3%]",
    tag: "餐饮烟火",
  },
  {
    id: "snack",
    name: "小吃 · 2000+ 门店",
    subtitle: "STREET FOOD // MERCHANTS",
    desc: "后厨滋滋作响的热气，见证无数小店老板的坚韧奋斗。",
    image: "/images/assets/3d-snack.png",
    pos: "top-[4%] right-[2%] sm:right-[3%]",
    tag: "深耕实战",
  },
  {
    id: "figure",
    name: "手办 · 初心热血",
    subtitle: "ANIME HERO // LUFFY FIGURE",
    desc: "桌面常伴的草帽海贼王：认准了航向就一往无前走到底。",
    image: "/images/assets/3d-figure.png",
    pos: "bottom-[6%] left-[2%] sm:left-[4%]",
    tag: "少年纯粹",
  },
  {
    id: "game",
    name: "游戏 · 极客之魂",
    subtitle: "CYBER GAMING // GENJI & PAD",
    desc: "深夜敲代码与手柄对决，保持极客专注与极限操作。",
    image: "/images/assets/3d-game.png",
    pos: "bottom-[6%] right-[2%] sm:right-[4%]",
    tag: "硬核探索",
  },
];

// 饿狸 AI 3 大实战推演题库
const ELI_PROMPTS = [
  {
    id: "traffic",
    label: "🔥 3公里客流引爆",
    tag: "开业裂变打法",
    question: "新开社区火锅店，开业前三天怎么利用社群与短视频引爆周边 3 公里客流？",
    response: {
      strategy: "【饿狸 3 公里透雨打法】：锁定周边 25 个成熟小区物业群，实施『邻里抢鲜内测券』+ 抖音同城 50 位本地达人阶梯佣金爆破。",
      copy: "“临沂街坊邻居，我们把后厨底料熬透了！凭本条视频到店，首锅鲜切牛肉直接由老板请客，不限量送完即止。”",
      metric: "预期首周引流 1,200+ 堂食桌次 · 真实获客成本降低 62%",
    },
  },
  {
    id: "campaign",
    label: "❄️ 周二淡季裂变",
    tag: "午市毛利优化",
    question: "周二中午上座率不到 30%，如何设计不伤毛利的限时引流活动？",
    response: {
      strategy: "【饿狸 阶梯毛利拼团】：针对周边写字楼推出『双人午市元气包』，主打出餐 8 分钟以内的预制高毛利组合，绑定下周晚餐抵扣券锁定复购。",
      copy: "“打工人的周二不该吃对付的盒饭！热气腾腾的招牌小锅仅限午市 11:30-13:30，吃完再送 20 元深夜食堂券。”",
      metric: "午市翻台率提升 45% · 晚餐二阶段复购转化率达 28%",
    },
  },
  {
    id: "copy",
    label: "✍️ 爆款探店推文",
    tag: "沉浸五感文案",
    question: "想在大众点评和小红书发打卡笔记，如何写出既真实自然又能过审的爆款推文？",
    response: {
      strategy: "【饿狸 沉浸五感文案算法】：抛弃死板推销词，从『深夜厨房的锅气声』『红油翻滚的气味』切入，以本地食客第一人称对话展开。",
      copy: "“在临沂挖到这家藏在巷子深处的宝藏小馆！刚掀开帘子就被满屋热腾腾的牛骨香治愈了，老板亲自掌勺 10 年，第一口汤就鲜掉眉毛…”",
      metric: "同城曝光率提升 3.8 倍 · 收藏与到店打卡转化率提升 55%",
    },
  },
];

// 狗哥资源库 4 大核心分类交互
const GOUGE_CATEGORIES = [
  {
    id: "catering",
    label: "实体餐饮全案",
    count: "1,500+ 份",
    desc: "从选址评估、开业筹备到淡旺季引流套餐方案完整打法。",
  },
  {
    id: "sop",
    label: "连锁运营 SOP",
    count: "380+ 套",
    desc: "后厨出品标准、前厅服务流程与店长每日巡店考核表。",
  },
  {
    id: "scripts",
    label: "爆款营销话术",
    count: "820+ 篇",
    desc: "朋友圈私域促单、大众点评好评引导与会员储值活动脚本。",
  },
  {
    id: "video",
    label: "探店短视频脚本",
    count: "560+ 个",
    desc: "同城探店达人拍摄镜头脚本、黄金前三秒吸睛文案范式。",
  },
];

// 图四：真正换成我们自己的 3 大项目真实多联实景截图！
const PROJECTS_DATA = [
  {
    num: "01",
    label: "Flagship AI · 实体商家 AI 获客武器",
    name: "饿狸 youeli.com",
    link: "https://youeli.com",
    desc: "餐饮营销没思路，问问饿狸。找客流 | 做活动 | 写文案，0.4 秒生成真实餐饮实战方案，后厨毛利动态追踪。",
    badge: "12年实体餐饮一线方法论打包",
    // 真实饿狸 3D 实战多联大图
    img1: "/images/projects/eli/eli-scene-desk.jpg",
    img2: "/images/projects/eli/eli-scene-kitchen.jpg",
    img3: "/images/projects/eli/eli-scene-meeting.jpg",
    type: "eli",
  },
  {
    num: "02",
    label: "Dev Arsenal · 252+ TSX · 原生 MCP",
    name: "Salin UI",
    link: "https://salin.wang/ui",
    desc: "专为 Cursor、Claude、Antigravity 调教的高美学纯净前端骨架。零冗余三方依赖、复制即用纯 TSX，原生 MCP 协议支持。",
    badge: "React 19 · Tailwind v4 · 纯净 TSX",
    command: "npx salin-ui add @mcp/server",
    // 真实 Salin UI 实景多联图
    img1: "/images/evidence/ai-dashboard.png",
    img2: "/images/showcase/salin-hero-workbench.jpg",
    img3: "/images/showcase/project-salin-ui.jpg",
    type: "salin-ui",
  },
  {
    num: "03",
    label: "2,400+ 商业资产 · 永久免费",
    name: "狗哥资源库 Gouge Hub",
    link: "https://zl.eyu.ink",
    desc: "12 年摸爬滚打沉淀的商业资产枢纽。涵盖实体餐饮全案策划、连锁运营规范手册、爆款营销话术库与探店短视频脚本。",
    badge: "2400+ 免费资产 · 终身免费开放",
    // 真实狗哥资源库多联图
    img1: "/images/evidence/merchant-service.png",
    img2: "/images/evidence/local-life.png",
    img3: "/images/showcase/project-gouge-hub.jpg",
    type: "gouge-hub",
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
// 2. SECTIONS
// ==========================================

// 【图一优化】：全屏指针跟随 3D 头像 + 新生成的 Salin 本人 3D 肖像
const HeroSection = ({
  onOpenQr,
  onReplayOpening,
}: {
  onOpenQr: () => void;
  onReplayOpening: () => void;
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 顺滑弹簧物理系统：全屏范围内平滑转头并微移
  const springConfig = { stiffness: 90, damping: 18, mass: 0.12 };
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-35, 35]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // 归一化指针坐标（以窗口中心为 0, -0.5 到 +0.5）
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-clip px-5 sm:px-8 md:px-12 pt-4 pb-8"
      style={{ perspective: 1200 }}
    >
      {/* 极简顶栏导航 */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex w-full items-center justify-between pt-4 md:pt-6 z-20"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          {/* 网站品牌名称 Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-sm sm:text-base md:text-lg font-black tracking-wider text-white group-hover:text-emerald-400 transition-colors uppercase">
              SALIN
            </span>
          </a>
          <span className="text-white/20 font-mono text-xs hidden sm:inline">|</span>
          <a
            href="#about"
            className="text-xs sm:text-sm md:text-base font-mono font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            Odyssey
          </a>
          <a
            href="#services"
            className="text-xs sm:text-sm md:text-base font-mono font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            饿狸 AI
          </a>
          <a
            href="#projects"
            className="text-xs sm:text-sm md:text-base font-mono font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            Arsenal
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onReplayOpening}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-emerald-500/40 bg-white/[0.04] hover:bg-emerald-500/10 text-white/70 hover:text-emerald-300 font-mono text-xs transition-colors cursor-pointer"
            title="重播电影开幕光效"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>电影开幕</span>
          </button>
          <button
            onClick={onOpenQr}
            className="px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>微信 {siteConfig.wechat}</span>
          </button>
        </div>
      </motion.nav>

      {/* 巨幅背景字：HI, I'M SALIN */}
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

      {/* 【核心重磅更新】：根据 Salin 真人照片重新生成的 3D 肖像 + 随鼠标全局全视角注视跟随 */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
          transformStyle: "preserve-3d",
        }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[270px] sm:w-[370px] md:w-[460px] lg:w-[530px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] select-none"
      >
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          src="/images/portrait/salin_avatar_3d.png"
          alt="Salin 狗哥 3D 肖像 (注视指针)"
          className="w-full h-auto object-contain select-none"
        />
      </motion.div>

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
          <button
            onClick={onOpenQr}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D7E2EA]/30 bg-transparent px-6 py-3 text-[#D7E2EA] transition-all hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] cursor-pointer"
          >
            <span className="font-medium uppercase tracking-widest text-sm">Get In Touch</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// 【图二优化】：换成 Salin 本人的 14 组真实作品、网站、品牌与纪实大图！
const MarqueeSection = () => {
  const { scrollY } = useScroll();

  const x1 = useTransform(scrollY, (v) => v * 0.28 - 150);
  const x2 = useTransform(scrollY, (v) => -(v * 0.28) + 150);

  const seamlessRow1 = [...SALIN_SHOWCASE_ROW1, ...SALIN_SHOWCASE_ROW1, ...SALIN_SHOWCASE_ROW1];
  const seamlessRow2 = [...SALIN_SHOWCASE_ROW2, ...SALIN_SHOWCASE_ROW2, ...SALIN_SHOWCASE_ROW2];

  return (
    <section className="bg-[#0C0C0C] pt-16 sm:pt-24 md:pt-32 pb-10 overflow-hidden w-full flex flex-col gap-4 select-none">
      {/* 轨道 1：向右移动 */}
      <motion.div style={{ x: x1, willChange: "transform" }} className="flex gap-4 whitespace-nowrap min-w-max">
        {seamlessRow1.map((item, i) => (
          <a
            key={`r1-${i}`}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative w-[320px] sm:w-[400px] md:w-[440px] h-[200px] sm:h-[250px] md:h-[280px] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shrink-0 transition-transform hover:scale-[1.02]"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />

            {/* 顶部标签 */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 border border-emerald-500/40 font-mono text-[10px] text-emerald-300 font-bold backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {item.tag}
            </div>

            {/* 底部信息 */}
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <div className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center justify-between">
                <span>{item.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 line-clamp-1 pt-0.5">
                {item.desc}
              </div>
            </div>
          </a>
        ))}
      </motion.div>

      {/* 轨道 2：向左移动 */}
      <motion.div style={{ x: x2, willChange: "transform" }} className="flex gap-4 whitespace-nowrap min-w-max">
        {seamlessRow2.map((item, i) => (
          <a
            key={`r2-${i}`}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative w-[320px] sm:w-[400px] md:w-[440px] h-[200px] sm:h-[250px] md:h-[280px] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shrink-0 transition-transform hover:scale-[1.02]"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />

            {/* 顶部标签 */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 border border-white/20 font-mono text-[10px] text-white/80 font-bold backdrop-blur-md">
              {item.tag}
            </div>

            {/* 底部信息 */}
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <div className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center justify-between">
                <span>{item.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 line-clamp-1 pt-0.5">
                {item.desc}
              </div>
            </div>
          </a>
        ))}
      </motion.div>
    </section>
  );
};

// 【图三优化】：重新设计的 4 大桌面精神饰件 (奶茶 / 小吃 / 手办 / 游戏)
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
      {/* 4 大全新定制桌面精神物证饰件 (奶茶 / 小吃 / 手办 / 游戏) */}
      {DESK_TOTEMS.map((totem, i) => (
        <motion.div
          key={totem.id}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 * i, duration: 0.8 }}
          viewport={{ once: true }}
          className={`absolute ${totem.pos} z-10 group cursor-pointer flex flex-col items-center`}
        >
          <motion.div
            animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
            transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
            className="relative w-[110px] sm:w-[160px] md:w-[210px] aspect-square transition-transform group-hover:scale-110 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            <img
              src={totem.image}
              alt={totem.name}
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>

          {/* 悬停说明卡片 */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mt-1 px-3 py-1.5 rounded-xl bg-black/90 border border-emerald-500/40 text-left font-mono text-[11px] shadow-2xl backdrop-blur-md">
            <span className="text-emerald-400 font-bold block">{totem.name}</span>
            <span className="text-white/70 text-[10px] block">{totem.desc}</span>
          </div>
        </motion.div>
      ))}

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

        <button
          onClick={onOpenQr}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D7E2EA]/30 bg-transparent px-6 py-3 text-[#D7E2EA] transition-all hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] cursor-pointer"
        >
          <span className="font-medium uppercase tracking-widest text-sm">与 Salin 聊聊历程</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
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

// 【图四优化】：补齐现场交互！换掉花草图片，使用 Salin 真实项目 3D 实景与实时推演器
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
  const [activeEliPrompt, setActiveEliPrompt] = useState(0);
  const [showEliSimulator, setShowEliSimulator] = useState(false);

  // Salin UI 命令复制
  const [copiedCmd, setCopiedCmd] = useState(false);

  // 狗哥资源库分类选中
  const [activeGougeCategory, setActiveGougeCategory] = useState(0);

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
        className="w-full max-w-6xl min-h-[580px] md:h-full md:max-h-[820px] bg-[#0C0C0C] rounded-[28px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA] p-5 sm:p-7 md:p-8 flex flex-col justify-between gap-4 shadow-2xl relative overflow-hidden"
      >
        {/* 卡片头部 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 shrink-0 border-b border-[#D7E2EA]/15 pb-3">
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

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            {/* 饿狸卡片专属交互：直接切换模拟器 */}
            {project.type === "eli" && (
              <button
                onClick={() => setShowEliSimulator(!showEliSimulator)}
                className="px-3.5 py-1.5 rounded-full border border-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{showEliSimulator ? "查看 3D 实景多联大图" : "⚡ 现场体验「问问饿狸」AI 决策"}</span>
              </button>
            )}

            {/* Salin UI 专属交互：复制 CLI */}
            {project.command && (
              <button
                onClick={handleCopyCommand}
                className="px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCmd ? "已复制命令" : "复制 CLI 命令"}</span>
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

        {/* 卡片主视窗：【真实项目大图】 与 【深度交互】 */}
        {project.type === "eli" && showEliSimulator ? (
          // 饿狸深度交互：现场「问问饿狸」AI 决策舱
          <div className="flex-1 flex flex-col justify-between rounded-[24px] sm:rounded-[36px] bg-white/[0.03] border border-emerald-500/40 p-4 sm:p-6 text-left space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-2">
                <Bot className="w-4 h-4" />
                现场推演舱 · 实体餐饮 12 年一线实战方法论打包
              </span>
              <span className="font-mono text-[11px] text-white/50">用时 0.4s · 真实餐饮解决方案</span>
            </div>

            {/* 3 个实战问题标签 */}
            <div className="flex flex-wrap gap-2">
              {ELI_PROMPTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveEliPrompt(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeEliPrompt === idx
                      ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : "bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* AI 策略回答卡 */}
            <div className="p-4 rounded-2xl bg-black/75 border border-emerald-500/30 space-y-2.5 font-sans">
              <div className="text-xs font-mono text-emerald-400 font-bold">
                💡 【{ELI_PROMPTS[activeEliPrompt].tag}】实操策略：
              </div>
              <div className="text-sm text-white/95 leading-relaxed font-medium">
                {ELI_PROMPTS[activeEliPrompt].response.strategy}
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre-line">
                {ELI_PROMPTS[activeEliPrompt].response.copy}
              </div>
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/10 font-mono text-xs text-white/60 gap-2">
                <span>📈 {ELI_PROMPTS[activeEliPrompt].response.metric}</span>
                <a
                  href="https://youeli.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
                >
                  前往 youeli.com 完整体验 ↗
                </a>
              </div>
            </div>
          </div>
        ) : (
          // 真实项目多联实景截图 (彻底清除花草等不相干图片！)
          <div className="flex flex-col md:flex-row gap-3.5 flex-1 overflow-hidden">
            <div className="flex flex-col gap-3.5 w-full md:w-[40%] h-full">
              <div className="relative w-full rounded-[20px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden border border-white/15 h-[140px] sm:h-[180px] md:h-[210px] group">
                <img
                  src={project.img1}
                  alt={`${project.name} 真实截图 1`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 font-mono text-[10px] text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                  {project.type === "eli"
                    ? "实操工作台"
                    : project.type === "salin-ui"
                    ? "组件库交互"
                    : "商家服务实录"}
                </div>
              </div>

              <div className="relative w-full rounded-[20px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden border border-white/15 h-[150px] sm:h-[190px] md:h-[240px] flex-1 group">
                <img
                  src={project.img2}
                  alt={`${project.name} 真实截图 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 font-mono text-[10px] text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                  {project.type === "eli"
                    ? "后厨实战联动"
                    : project.type === "salin-ui"
                    ? "开发工作台"
                    : "同城自媒体资产"}
                </div>
              </div>
            </div>

            <div className="w-full md:w-[60%] h-full relative rounded-[20px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden border border-white/15 min-h-[220px] group">
              <img
                src={project.img3}
                alt={`${project.name} 全景主图`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              {/* 右侧大图内部覆盖的专属高阶交互卡 */}
              {project.type === "gouge-hub" && (
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-md">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {GOUGE_CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveGougeCategory(idx);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          activeGougeCategory === idx
                            ? "bg-amber-400 text-black font-bold"
                            : "bg-white/[0.05] text-white/70 hover:text-white"
                        }`}
                      >
                        {cat.label} ({cat.count})
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white/80 font-sans line-clamp-1">
                    {GOUGE_CATEGORIES[activeGougeCategory].desc}
                  </p>
                </div>
              )}

              {project.type === "salin-ui" && (
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/85 border border-emerald-500/30 backdrop-blur-md flex items-center justify-between">
                  <div className="font-mono text-xs text-emerald-300 truncate mr-2">
                    <span className="text-emerald-500 mr-1.5">$</span>
                    <code>npx salin-ui add @mcp/server</code>
                  </div>
                  <button
                    onClick={handleCopyCommand}
                    className="shrink-0 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCmd ? "已复制" : "复制命令"}</span>
                  </button>
                </div>
              )}

              {project.type === "eli" && (
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/85 border border-emerald-500/30 backdrop-blur-md flex items-center justify-between">
                  <div className="text-xs text-white/90 font-medium font-sans">
                    “餐饮营销没思路，问问饿狸。”
                  </div>
                  <button
                    onClick={() => setShowEliSimulator(true)}
                    className="shrink-0 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>现场试玩 ↗</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 卡片底部简要描述 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-1 text-left gap-2 border-t border-white/10">
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
        {PROJECTS_DATA.map((proj, i) => (
          <Card key={i} project={proj} index={i} totalCards={PROJECTS_DATA.length} />
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
      <button
        onClick={onOpenQr}
        className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#0C0C0C]/30 bg-transparent px-6 py-3 text-[#0C0C0C] transition-all hover:border-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-[#D7E2EA] cursor-pointer"
      >
        <span className="font-medium uppercase tracking-widest text-sm">Get In Touch</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

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
// 3. MAIN APP EXPORT
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
