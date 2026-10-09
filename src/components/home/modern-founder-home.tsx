"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Terminal,
  BookOpen,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Scan,
  ChevronRight,
  Send,
  Eye,
  X,
  Heart,
  Smile,
  Compass,
  Sword,
  Bot,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/data/site";

// 真实手记长文精选
const FEATURED_NOTES = [
  {
    slug: "ai-products-not-from-features",
    title: "AI 产品不是功能堆出来的：聊聊企业客户为什么真正愿意买单",
    category: "商业复盘",
    date: "2026-03",
    readTime: "8 分钟",
    summary: "技术自嗨往往解决不了真实问题。从企业客户的账本出发，剖析什么样的 AI 解决方案能让客户爽快买单。",
  },
  {
    slug: "ai-real-business",
    title: "为什么很多 AI 项目赚不到钱：技术狂欢与商业现金流的鸿沟",
    category: "实战心得",
    date: "2026-03",
    readTime: "10 分钟",
    summary: "脱离业务场景的 AI 无论多炫目都会死于续费率。拆解从 Demo 到商业现金流必须跨越的三个死穴。",
  },
  {
    slug: "salin-ui-architecture-for-ai",
    title: "面向 AI 编程的 UI 架构范式：为什么我们放弃了重型组件库",
    category: "技术架构",
    date: "2026-02",
    readTime: "6 分钟",
    summary: "为什么 AntD / MUI 在 AI 编程时代变得笨重？单文件 TSX 零幽灵依赖为什么是 Cursor 时代的终极答案。",
  },
  {
    slug: "ten-years-from-local-food-to-ai",
    title: "从 2017《舌尖上的临沂》到 2026 AI 架构：十年摸爬滚打的生存哲学",
    category: "创业随笔",
    date: "2026-02",
    readTime: "12 分钟",
    summary: "从街头巷尾端着相机做美食博主，到下场开店摸爬滚打，再到手搓 AI 界面。这十年我学到的唯一道理：永远保持对真实世界的敬畏。",
  },
];

// 精选手办与日常好奇心物件 (somehowliving 风格)
const DESK_TOYS = [
  {
    id: "luffy",
    name: "海贼王 · 蒙奇·D·路飞",
    sub: "ONE PIECE · LUFFY",
    tag: "桌面精神图腾",
    desc: "认准了要当海贼王，就绝不回头。写代码和创业一样，要永远保持出海冒险的热血与好奇心。",
    image: "/images/toys/luffy-figure.jpg",
    badge: "冒险与出海",
  },
  {
    id: "genji",
    name: "守望先锋 · 源氏",
    sub: "OVERWATCH · GENJI",
    tag: "机械身，人类心",
    desc: "身虽为机械，心犹是人魂。AI 是最锋利的数字忍刀，但解决真实问题的核心永远是对人性和商业的洞察。",
    image: "/images/toys/overwatch-figure.jpg",
    badge: "人机协同",
  },
  {
    id: "doge",
    name: "汪狗哥 · 柴犬公仔",
    sub: "SALIN MASCOT",
    tag: "接地气 · 咬定青山",
    desc: "为什么大家都叫狗哥？因为接地气。认准了要做的事，咬住了就不松口，必须把交付成果做出来。",
    image: "/images/toys/dog-mascot.jpg",
    badge: "务实交付",
  },
  {
    id: "eyu",
    name: "饿鱼 · 2017 舌尖经典",
    sub: "EYU 2017 · 临沂美食向导",
    tag: "创业起点",
    desc: "2017 年《舌尖上的临沂》旗帜上的小鳄鱼。曾是 10万+ 临沂人的美食向导，如今化作资源库 zl.eyu.ink，初心未改。",
    image: "/images/portrait/eyu-mascot-crop.jpg",
    badge: "十年初心",
  },
];

// 核心大图项目展厅 (去掉 FoodOps，专注 Salin UI、Gouge Hub、狗哥资源库)
const SELECTED_PROJECTS = [
  {
    id: "salin-ui",
    num: "01",
    title: "Salin UI · 开发者 AI 界面弹药库",
    enTitle: "DEVELOPER AI UI ARSENAL & DESIGN SYSTEM",
    category: "AI Developer Tooling",
    year: "2026",
    tag: "持续高频迭代 · v5.2",
    image: "/images/showcase/project-salin-ui.jpg",
    summary:
      "专为 Cursor、Claude Code、v0 打造的现代 Web 资产枢纽。收录 252+ 单文件纯净 TSX 组件，彻底告别 NPM 重型依赖包缠绕，原生支持 MCP 协议直连，3 次点击把高质量 UI 投喂给 AI。",
    specs: [
      { label: "组件收录", val: "252+ 纯净 TSX" },
      { label: "依赖架构", val: "0 幽灵依赖" },
      { label: "投喂效率", val: "3-Click Ingest" },
      { label: "协议支持", val: "Native MCP 2.0" },
    ],
    primaryLink: "/ui/",
    primaryLabel: "检阅弹药库 /ui/ ↗",
    secondaryAction: "copy-mcp",
  },
  {
    id: "gouge-hub",
    num: "02",
    title: "Gouge Hub · 全域内容中枢与 AI 自动化集群",
    enTitle: "OMNI-CHANNEL CONTENT AUTOMATION & AGENT COCKPIT",
    category: "Multi-Agent Swarms & Distribution",
    year: "2026",
    tag: "团队自用生产环境",
    image: "/images/showcase/project-gouge-hub.jpg",
    summary:
      "狗哥团队自用的全域内容智能分发中枢。多 Agent 自动追踪行业热点、生成多平台长文草稿、多端自动化分发与微信生态私域线索打标，构建 7×24 小时不间断的数字内容资产系统。",
    specs: [
      { label: "底层模型", val: "Claude / DeepSeek" },
      { label: "分发通道", val: "微信 / 知乎 / 独立站" },
      { label: "线索沉淀", val: "私域自动化打标" },
      { label: "能效提升", val: "提升 600% 输出效率" },
    ],
    primaryLink: "/projects",
    primaryLabel: "查看项目矩阵 ↗",
    secondaryAction: "learn-more",
  },
  {
    id: "ziliaoku",
    num: "03",
    title: "狗哥资源库 (zl.eyu.ink) · 十年创业与实战手册",
    enTitle: "ENTREPRENEURIAL FIELD KNOWLEDGE REPOSITORY",
    category: "Knowledge Base & Local Commerce",
    year: "2017—2026",
    tag: "持续沉淀更新",
    image: "/images/projects/ziliaoku-cover.jpg",
    summary:
      "承接 2017 年“饿鱼 / 舌尖上的临沂”创业基因，沉淀十余年一线实战经验的独立知识库。收录实体获客、本地流量逻辑、AI 工具落地操作手册与踩坑血泪经验。",
    specs: [
      { label: "知识收录", val: "数百篇精选实操" },
      { label: "源起品牌", val: "舌尖上的临沂 · 饿鱼" },
      { label: "访问域名", val: "zl.eyu.ink" },
      { label: "服务对象", val: "创业者 / 实体老板" },
    ],
    primaryLink: "https://zl.eyu.ink",
    primaryLabel: "打开狗哥资源库 ↗",
    secondaryAction: "external",
  },
];

export function ModernFounderHome() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [filmGrain, setFilmGrain] = useState(false);
  const [activeToy, setActiveToy] = useState<string | null>(null);

  // 临沂真实城市时钟
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("zh-CN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(siteConfig.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMcp = () => {
    const config = `{
  "mcpServers": {
    "salin-ui": {
      "command": "npx",
      "args": ["-y", "salin-ui@latest", "mcp"]
    }
  }
}`;
    navigator.clipboard.writeText(config);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  return (
    <div className={`relative min-h-screen bg-[#FBFBFA] dark:bg-[#0B0E0C] text-[#131714] dark:text-[#E8ECE6] transition-colors duration-300 ${filmGrain ? "grain-active" : ""}`}>
      {/* 胶片颗粒质感层 (dsgnbyhl 风格) */}
      {filmGrain && (
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* ========================================================
          HUD 顶部取景器与实时状态栏 (Calissa / dsgnbyhl 灵感)
          ======================================================== */}
      <section className="border-b border-[#E3E7E0] dark:border-[#1E2520] bg-white/70 dark:bg-[#101512]/70 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-[#626B64] dark:text-[#8D968F] gap-3">
          {/* 左侧：城市、时间、状态 */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
            <span className="tracking-wide">
              SHANDONG · LINYI <span className="text-[#141815] dark:text-white font-semibold">{timeStr || "20:45:00"}</span> CST
            </span>
            <span className="hidden md:inline text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden md:inline text-[11px]">35.1041° N, 118.3564° E</span>
          </div>

          {/* 右侧：历程标线与颗粒切换 */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] opacity-80">
              [ 2017 舌尖上的临沂 → 2026 SALIN UI ]
            </span>
            <button
              onClick={() => setFilmGrain(!filmGrain)}
              className={`text-[11px] px-2 py-0.5 rounded border transition-all ${
                filmGrain
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                  : "border-[#DDE2D9] dark:border-[#27302A] hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
              title="切换胶片微噪点质感"
            >
              [ GRAIN: {filmGrain ? "ON" : "OFF"} ]
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
            >
              微信扫码 ↗
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          HERO SECTION: 巨幅 Typography + 真实大图展台 (CHI, QUÁCH + SOURAV BERA)
          ======================================================== */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* 背景柔和呼吸光影 */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* 上半部分：极简大字排版 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
            {/* 左侧：巨幅姓名与真实双重定位 */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300 text-xs font-mono tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                10-YEAR FOUNDER · LOCAL LIFE TO AI CRAFTSMAN
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0F1410] dark:text-[#F3F5F2] font-serif leading-[1.05]">
                WANG SALIN<br />
                <span className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200">
                  汪狗哥
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#4A534D] dark:text-[#A1ABA4] max-w-2xl font-normal leading-relaxed">
                从 2017 年创办《舌尖上的临沂》（吉祥物饿鱼），到 2026 年打造面向 AI 时代的 Salin UI 界面弹药库。
                <br className="hidden sm:inline" />
                深入过市井街巷搞实体，也通宵敲过代码做系统。不端着，不吹牛，只做能真正交付的作品。
              </p>
            </div>

            {/* 右侧：纵向极简导航目录 (CHI, QUÁCH 侧边目录) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#E2E6DF] dark:border-[#222A24] pt-4 lg:pt-0 lg:pl-8 space-y-3 font-mono text-xs text-[#525B54] dark:text-[#9AA39C]">
              <div
                className="flex justify-between items-center group cursor-pointer"
                onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="tracking-wider">01 // STORY</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">
                  十年真实创业历程 ↗
                </span>
              </div>
              <div
                className="flex justify-between items-center group cursor-pointer"
                onClick={() => document.getElementById("toys")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="tracking-wider">02 // TOYS</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">
                  桌面手办与好奇心 ↗
                </span>
              </div>
              <div
                className="flex justify-between items-center group cursor-pointer"
                onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="tracking-wider">03 // WORKS</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">
                  Salin UI 旗舰大图 ↗
                </span>
              </div>
              <div
                className="flex justify-between items-center group cursor-pointer"
                onClick={() => document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="tracking-wider">04 // WRITING</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">
                  一线实战长文 ↗
                </span>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="flex-1 py-2 px-3 rounded bg-[#0F1410] dark:bg-[#F3F5F2] text-white dark:text-[#0F1410] font-sans font-medium text-xs text-center transition-opacity hover:opacity-90"
                >
                  加狗哥微信
                </button>
                <Link
                  href="/ui/"
                  className="py-2 px-3 rounded border border-[#D5DDD2] dark:border-[#2C372F] font-sans font-medium text-xs hover:border-emerald-500/50 transition-colors text-center"
                >
                  检阅 Salin UI
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================
              下半部分：核心“大图双幕展台” (真实生活照 + 2017 创业对比物证)
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 左侧 8 列：2025 主大图 (山谷公路比耶照片，真实自信) */}
            <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] overflow-hidden shadow-xl sm:shadow-2xl relative group flex flex-col justify-between">
              {/* 取景器角标 */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] flex items-center gap-1.5 select-none bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-md">
                <span className="text-emerald-400 font-bold">+</span>
                <span>2025 // MOUNTAIN EXPEDITION · WANG SALIN</span>
              </div>
              <div className="absolute top-4 right-4 z-20 font-mono text-[11px] select-none bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-md flex items-center gap-2">
                <span>LINYI, SHANDONG</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* 核心真实照片大图 */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral-900 overflow-hidden">
                <Image
                  src="/images/portrait/salin-2025.jpg"
                  alt="汪狗哥 (Wang Salin) 2025 年近照"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                {/* 底部渐变半透明注解 */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                  <div className="font-mono text-xs text-emerald-400 font-semibold mb-1">
                    [ 2025 · 依然热血，步履不停 ]
                  </div>
                  <p className="text-sm text-neutral-200 max-w-xl">
                    十年过去，眼神里的笃定和对未知世界的探索欲丝毫未减。从市井烟火到代码键盘，一直在做真正交付的实事。
                  </p>
                </div>
              </div>
            </div>

            {/* 右侧 4 列：2017 经典“舌尖上的临沂”火锅扯面与旗帜物证卡片 */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              {/* 2017 火锅扯面生活照 (极具感染力与真实感) */}
              <div className="rounded-2xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] p-4 shadow-lg group relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-3">
                  <Image
                    src="/images/portrait/salin-2017-food.png"
                    alt="2017 舌尖上的临沂 火锅扯面"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                    2017 · 舌尖上的临沂
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#141815] dark:text-[#EFF2EE] mb-1">
                    从一碗热气腾腾的面开始
                  </h3>
                  <p className="text-xs text-[#525B54] dark:text-[#9AA39C] leading-relaxed">
                    走遍大街小巷，用文字和镜头记录临沂的味道。做过 10万+ 人的美食向导，深知真实用户的信任来之不易。
                  </p>
                </div>
              </div>

              {/* 2017 饿鱼旗帜与十年初心 */}
              <div className="rounded-2xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] p-4 shadow-lg flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-emerald-500/30">
                  <Image
                    src="/images/portrait/eyu-mascot-crop.jpg"
                    alt="饿鱼 logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    ORIGIN // 饿鱼 (EYU)
                  </div>
                  <div className="text-xs text-[#525B54] dark:text-[#9AA39C]">
                    10万+ 临沂人的美食向导图腾。如今延续为 <span className="font-mono font-semibold text-[#141815] dark:text-white">zl.eyu.ink</span> 实战资源库。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 01: THE JOURNEY · 十年实战心路历程 (致敬 somehowliving.tech)
          ======================================================== */}
      <section id="journey" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621] bg-[#F7F9F6] dark:bg-[#0E1310]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 01 · THE JOURNEY · 真实创业旅程
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                十年摸爬滚打，一直在解决真问题
              </h2>
            </div>
            <p className="text-sm text-[#5A645D] dark:text-[#9AA39C] max-w-md font-sans">
              从手持微单穿梭后厨的美食博主，到下场踩坑创业，再到写出支持 MCP 原生协议的 Salin UI。
            </p>
          </div>

          {/* 时间轴里程碑 (somehowliving 风格) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono">
            {/* Milestone 1 */}
            <div className="p-6 rounded-2xl border border-[#DFE3DC] dark:border-[#222A23] bg-white dark:bg-[#121814] flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-sm">
              <div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                  2017 // ORIGIN
                </div>
                <h3 className="text-base font-bold font-sans text-[#141815] dark:text-white mb-2">
                  舌尖上的临沂 · 饿鱼诞生
                </h3>
                <p className="text-xs font-sans text-[#525B54] dark:text-[#9AA39C] leading-relaxed">
                  跑遍临沂 500+ 家餐厅，拍视频做内容。做到 10万+ 粉丝的本地美食向导，第一次摸透流量与实体生意的本质。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] text-[11px] text-[#717A73]">
                关键词: 市井烟火 · 内容流量
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="p-6 rounded-2xl border border-[#DFE3DC] dark:border-[#222A23] bg-white dark:bg-[#121814] flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-sm">
              <div>
                <div className="text-xs text-amber-700 dark:text-amber-400 font-bold mb-2">
                  2019-2023 // HARD TRUTH
                </div>
                <h3 className="text-base font-bold font-sans text-[#141815] dark:text-white mb-2">
                  下场实体商业 · 肉身算账
                </h3>
                <p className="text-xs font-sans text-[#525B54] dark:text-[#9AA39C] leading-relaxed">
                  真金白银下场开店、做实体经营。摸透了库存损耗、店长排班、供应链跑冒滴漏，明白了为什么很多看似风光的生意其实在亏钱。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] text-[11px] text-[#717A73]">
                关键词: 账本穿透 · 敬畏现实
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="p-6 rounded-2xl border border-[#DFE3DC] dark:border-[#222A23] bg-white dark:bg-[#121814] flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-sm">
              <div>
                <div className="text-xs text-blue-700 dark:text-blue-400 font-bold mb-2">
                  2024-2025 // EMBRACE AI
                </div>
                <h3 className="text-base font-bold font-sans text-[#141815] dark:text-white mb-2">
                  全面融入 AI 辅助编程
                </h3>
                <p className="text-xs font-sans text-[#525B54] dark:text-[#9AA39C] leading-relaxed">
                  深度使用 Cursor、Claude Code、v0。发现市面上重型组件库与 AI 生成逻辑严重脱节，萌生了重塑一套属于 AI 时代界面库的想法。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] text-[11px] text-[#717A73]">
                关键词: 极客觉醒 · 协议打通
              </div>
            </div>

            {/* Milestone 4 */}
            <div className="p-6 rounded-2xl border border-[#DFE3DC] dark:border-[#222A23] bg-white dark:bg-[#121814] flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-sm">
              <div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                  2026 // NOW SHIPPING
                </div>
                <h3 className="text-base font-bold font-sans text-[#141815] dark:text-white mb-2">
                  Salin UI 弹药库交付
                </h3>
                <p className="text-xs font-sans text-[#525B54] dark:text-[#9AA39C] leading-relaxed">
                  上线 Salin UI v5.2，收录 252+ 纯净 TSX 组件，支持 MCP 协议直连投喂。搭建 Gouge Hub 自动化内容中枢，高频迭代。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] text-[11px] text-[#717A73]">
                关键词: 纯净架构 · 持续交付
              </div>
            </div>
          </div>

          {/* 建造者闭环 (The Loop，致敬 somehowliving.tech) */}
          <div className="mt-12 p-8 rounded-2xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] text-center font-mono">
            <div className="text-xs text-[#7A837C] dark:text-[#8D968F] mb-4">
              // THE BUILDER'S LOOP · 狗哥做事的方法论
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm font-bold text-[#141815] dark:text-[#E8ECE6]">
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">肉身踩坑</span>
              <span className="text-emerald-500">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">账本穿透</span>
              <span className="text-emerald-500">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">手搓代码</span>
              <span className="text-emerald-500">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">拿到交付</span>
              <span className="text-emerald-500">→</span>
              <span className="font-serif italic text-emerald-600 dark:text-emerald-400 text-lg">repeat.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 02: DESK TOYS · 桌面手办与日常爱好 (致敬 somehowliving.tech)
          ======================================================== */}
      <section id="toys" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 02 · DESK TOYS & INSPIRATIONS · 桌面手办与玩物
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                代码和生意之外，是手办和少年气
              </h2>
            </div>
            <p className="text-sm text-[#5A645D] dark:text-[#9AA39C] max-w-md font-sans">
              桌面上的公仔不仅是摆件，也是随时提醒自己保持热血、保持好奇心、不忘初心的精神图腾。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESK_TOYS.map((toy) => (
              <div
                key={toy.id}
                className="rounded-2xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] p-5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                onMouseEnter={() => setActiveToy(toy.id)}
                onMouseLeave={() => setActiveToy(null)}
              >
                <div>
                  {/* 手办图片展台 */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 mb-4 p-2">
                    <Image
                      src={toy.image}
                      alt={toy.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      {toy.badge}
                    </div>
                  </div>

                  <div className="font-mono text-[11px] text-[#717A73] dark:text-[#8D968F] mb-1">
                    {toy.sub}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#141815] dark:text-[#E8ECE6] mb-2">
                    {toy.name}
                  </h3>
                  <p className="text-xs text-[#525B54] dark:text-[#9AA39C] leading-relaxed">
                    {toy.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] font-mono text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                  <span>{toy.tag}</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 03: SELECTED WORKS · 大图旗舰展厅 (dsgnbyhl 质感大图卡片)
          ======================================================== */}
      <section id="works" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621] bg-[#F7F9F6] dark:bg-[#0E1310]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 03 · SELECTED WORKS · 旗舰作品展厅
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                大图实证：只展示交付成果
              </h2>
            </div>
            <p className="text-sm text-[#5A645D] dark:text-[#9AA39C] max-w-md font-sans">
              不搞 PPT 概念，每一个项目都全量运行在生产环境，真实可用。
            </p>
          </div>

          {/* 旗舰大图列表 */}
          <div className="space-y-16 sm:space-y-24">
            {SELECTED_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl sm:rounded-3xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                {/* 顶部元数据标尺 */}
                <div className="border-b border-[#EAEFE7] dark:border-[#1E2520] px-6 py-3.5 bg-[#FAFBF9] dark:bg-[#131915] flex flex-wrap items-center justify-between text-xs font-mono text-[#6A736C] dark:text-[#8D968F] gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#141815] dark:text-white">
                      [{proj.num}]
                    </span>
                    <span className="uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
                      {proj.tag}
                    </span>
                    <span>{proj.year}</span>
                  </div>
                </div>

                {/* 核心巨幅实景截图 (大图！) */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-100 dark:bg-neutral-900 overflow-hidden cursor-pointer">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                  {/* 取景器悬浮标签 */}
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-xs flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VIEW LIVE ARTIFACT</span>
                  </div>
                </div>

                {/* 下半部分：项目说明与技术规格指标 */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                      {proj.enTitle}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#141815] dark:text-[#EFF2EE]">
                      {proj.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4E5650] dark:text-[#99A29B] leading-relaxed">
                      {proj.summary}
                    </p>
                    <div className="pt-3 flex flex-wrap gap-3">
                      {proj.secondaryAction === "external" ? (
                        <a
                          href={proj.primaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1410] dark:bg-[#F3F5F2] text-white dark:text-[#0F1410] font-sans font-medium text-xs tracking-wide hover:opacity-90 transition-opacity"
                        >
                          {proj.primaryLabel}
                        </a>
                      ) : (
                        <Link
                          href={proj.primaryLink}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1410] dark:bg-[#F3F5F2] text-white dark:text-[#0F1410] font-sans font-medium text-xs tracking-wide hover:opacity-90 transition-opacity"
                        >
                          {proj.primaryLabel}
                        </Link>
                      )}

                      {proj.secondaryAction === "copy-mcp" && (
                        <button
                          onClick={handleCopyMcp}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D5DDD2] dark:border-[#2C372F] text-xs font-mono font-medium hover:border-emerald-500/50 transition-colors"
                        >
                          {copiedMcp ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedMcp ? "已复制 MCP 协议配置" : "复制 MCP 协议配置"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 右侧：规格指标列表 (dsgnbyhl 标尺) */}
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#EAEFE7] dark:border-[#1E2520] pt-4 lg:pt-0 lg:pl-8 grid grid-cols-2 gap-4 font-mono">
                    {proj.specs.map((sp, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#FAFBF9] dark:bg-[#131915] border border-[#EAEFE7] dark:border-[#1F2620]">
                        <div className="text-[11px] text-[#717A73] dark:text-[#8D968F] mb-1">
                          {sp.label}
                        </div>
                        <div className="text-sm font-bold text-[#141815] dark:text-[#E8EAE6]">
                          {sp.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 04: WRITING · 实战手记 (致敬 arbatov.dev)
          ======================================================== */}
      <section id="writing" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 04 · WRITING · 一线真实长文手记
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-serif">
                商业与技术复盘：未经滤镜的思考
              </h2>
            </div>
            <Link
              href="/notes"
              className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium hover:underline inline-flex items-center gap-1 self-start md:self-end"
            >
              浏览全部 10+ 篇复盘 <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="border border-[#DFE3DC] dark:border-[#222A23] rounded-2xl bg-white dark:bg-[#121814] divide-y divide-[#EEF2EB] dark:divide-[#1F2621] overflow-hidden shadow-sm">
            {FEATURED_NOTES.map((note, idx) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F9FAF8] dark:hover:bg-[#151D17] transition-colors group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#717A73] dark:text-[#8D968F]">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#4E5650] dark:text-[#99A29B]">
                      {note.category}
                    </span>
                    <span>{note.date}</span>
                    <span className="hidden sm:inline">· {note.readTime}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-[#141815] dark:text-[#E8EAE6] group-hover:text-emerald-600 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B645E] dark:text-[#949E97] line-clamp-1">
                    {note.summary}
                  </p>
                </div>
                <div className="font-mono text-xs text-[#717A73] dark:text-[#8D968F] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1 self-end md:self-center transition-colors">
                  <span>阅读全文</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 05: LET'S TALK & ELSEWHERE · 即时联络 (致敬 somehowliving.tech & arbatov)
          ======================================================== */}
      <section id="contact" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621] bg-[#F7F9F6] dark:bg-[#0E1310]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] p-8 sm:p-12 shadow-xl relative overflow-hidden">
            {/* 取景器角标 */}
            <div className="absolute top-4 left-4 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] select-none">
              [ + ] CHANNEL: DIRECT_ACCESS
            </div>
            <div className="absolute top-4 right-4 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] select-none">
              REF: SALIN-2026
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LET'S TALK // OPEN TO DIALOGUE
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#0F1410] dark:text-[#F3F5F2]">
                  来聊聊吧，<br />
                  做点有趣且真实的事。
                </h2>
                <p className="text-sm sm:text-base text-[#4A534D] dark:text-[#A1ABA4] leading-relaxed max-w-xl">
                  无论是讨论前端 UI/UX 设计系统、Agent 自动化工作流，还是实体商业流量合作，随时欢迎直接与狗哥打个招呼。
                </p>

                <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
                  <button
                    onClick={handleCopyWechat}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium inline-flex items-center gap-2 transition-all shadow-sm"
                  >
                    {copiedWechat ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedWechat ? "已复制微信号" : `复制微信: ${siteConfig.wechat}`}
                  </button>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="px-4 py-2.5 rounded-xl border border-[#D5DDD2] dark:border-[#2C372F] font-medium inline-flex items-center gap-2 hover:border-emerald-500/50 transition-colors"
                  >
                    <Scan className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    扫微信二维码
                  </button>
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-2.5 rounded-xl border border-[#D5DDD2] dark:border-[#2C372F] font-medium inline-flex items-center gap-2 hover:border-emerald-500/50 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Mail className="w-3.5 h-3.5" />}
                    {copiedEmail ? "已复制邮箱" : siteConfig.email}
                  </button>
                </div>
              </div>

              {/* 右侧：全网矩阵 */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#EAEFE7] dark:border-[#1E2520] pt-6 lg:pt-0 lg:pl-10 space-y-4 font-mono text-xs">
                <div className="text-[#7A837C] dark:text-[#8D968F] font-bold tracking-wider">
                  // ELSEWHERE · 全网矩阵
                </div>
                <div className="space-y-2.5">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-3 rounded-lg bg-[#FAFBF9] dark:bg-[#141B16] hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                  >
                    <span>GitHub: wangsalin</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={siteConfig.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-3 rounded-lg bg-[#FAFBF9] dark:bg-[#141B16] hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                  >
                    <span>X (Twitter): @EyuSalin</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={siteConfig.ziliaokuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-3 rounded-lg bg-[#FAFBF9] dark:bg-[#141B16] hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                  >
                    <span>狗哥资源库: zl.eyu.ink</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#FAFBF9] dark:bg-[#141B16]">
                    <span>微信公众号: {siteConfig.gongzhonghao}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">+关注</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 微信二维码弹窗 Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#141A16] border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
              WECHAT // DIRECT CONTACT
            </div>
            <h3 className="text-lg font-bold font-serif mb-4">
              微信直接扫码加好友
            </h3>
            <div className="relative w-56 h-56 mx-auto rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 p-2 mb-4">
              <Image
                src="/images/wechat-qr.jpg"
                alt="狗哥微信二维码"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-xs text-neutral-500 font-mono mb-4">
              微信号: <span className="text-neutral-900 dark:text-white font-bold">{siteConfig.wechat}</span>
            </div>
            <button
              onClick={handleCopyWechat}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {copiedWechat ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedWechat ? "微信号已复制！" : "一键复制微信号"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
