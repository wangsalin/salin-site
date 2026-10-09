"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  UtensilsCrossed,
  BookOpen,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Clock,
  Compass,
  Cpu,
  TrendingDown,
  Camera,
  Scan,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Send,
  Eye,
  X,
} from "lucide-react";
import { siteConfig } from "@/data/site";

// 实战手记精选列表
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
    slug: "food-supply-chain-recovery",
    title: "下场开店亏损 30 万后，我如何用自研供应链系统扭亏为盈",
    category: "餐饮操盘",
    date: "2026-02",
    readTime: "12 分钟",
    summary: "下沉市场餐饮开店血泪教训：后厨原料损耗如何偷走所有净利润，以及动态 BOM 是如何帮门店逆风翻盘的。",
  },
  {
    slug: "salin-ui-architecture-for-ai",
    title: "面向 AI 编程的 UI 架构范式：为什么我们放弃了重型组件库",
    category: "技术架构",
    date: "2026-02",
    readTime: "6 分钟",
    summary: "为什么 AntD / MUI 在 AI 编程时代变得笨重？单文件 TSX 零幽灵依赖为什么是 Cursor 时代的终极答案。",
  },
];

// Arbatov 风格数字能力评分与雷达指标
const CAPABILITY_METRICS = [
  {
    id: "01",
    label: "线下实体商业操盘",
    sublabel: "选址测算 · 供应链动态 BOM · 单店扭亏",
    score: 98,
    highlight: "3 家实体门店操盘经验，真实损耗从 22% 降到 4%",
  },
  {
    id: "02",
    label: "AI Agent & MCP 协议架构",
    sublabel: "Claude Code · 多智能体集群 · 私有工具流",
    score: 96,
    highlight: "原生 MCP 协议研发，打通 AI 与企业内网系统",
  },
  {
    id: "03",
    label: "UI/UX 设计系统与极致交付",
    sublabel: "Salin UI 架构 · 苹果级排版 · 微动效",
    score: 96,
    highlight: "收录 252+ 高精组件，单文件 TSX 零幽灵依赖",
  },
  {
    id: "04",
    label: "商业算账与 ROI 交付模型",
    sublabel: "成本穿透 · 现金流管控 · 客户付费闭环",
    score: 95,
    highlight: "拒绝自嗨，只做能在客户财报上看见正反馈的系统",
  },
  {
    id: "05",
    label: "全栈现代工程开发",
    sublabel: "Next.js 16 · React 19 · TS · Python 自动化",
    score: 92,
    highlight: "高并发 API、流式响应、服务端无状态高可用架构",
  },
  {
    id: "06",
    label: "FDE 前线工程与跨界落地",
    sublabel: "下沉后厨一线 · 跨越代码与生意的认知鸿沟",
    score: 90,
    highlight: "既能与一线厨师/店长无缝沟通，又能与架构师深度对齐",
  },
];

// 核心大图项目展厅 (dsgnbyhl 风格大图卡片)
const SHOWCASE_PROJECTS = [
  {
    id: "salin-ui",
    num: "01",
    title: "Salin UI · AI 时代开发者界面弹药库",
    enTitle: "DEVELOPER AI UI ARSENAL & DESIGN SYSTEM",
    category: "AI Developer Tooling",
    year: "2026",
    tag: "持续高频迭代 · v5.2",
    image: "/images/showcase/project-salin-ui.jpg",
    summary:
      "专为 Cursor、Claude Code、v0 打造的现代 Web 资产枢纽。收录 252+ 高质量界面组件，彻底告别 NPM 重型依赖包缠绕，原生支持 MCP 协议直连，3 次点击把高质量 UI 投喂给 AI。",
    specs: [
      { label: "组件收录", val: "252+ TSX 资产" },
      { label: "依赖架构", val: "0 幽灵依赖" },
      { label: "投喂效率", val: "3-Click Ingest" },
      { label: "协议支持", val: "Native MCP 2.0" },
    ],
    primaryLink: "/ui/",
    primaryLabel: "检阅弹药库 /ui/ ↗",
    secondaryAction: "copy-mcp",
  },
  {
    id: "foodops",
    num: "02",
    title: "FoodOps · 线下餐饮供应链数字化降本系统",
    enTitle: "OFFLINE F&B SUPPLY CHAIN & BOM CONTROL SYSTEM",
    category: "Enterprise FDE & Supply Chain",
    year: "2026",
    tag: "生产级落地 · 3+ 门店",
    image: "/images/showcase/project-foodops.jpg",
    summary:
      "将线下真金白银开店亏钱踩坑的实战血泪，转化为餐饮供应链降本系统。重构动态 BOM 损耗预警、后厨智能备料排班与跨门店采购比价，帮助品牌门店原料损耗降低 18%。",
    specs: [
      { label: "原料损耗", val: "-18% 成本节省" },
      { label: "单店落地", val: "3 家实操直营店" },
      { label: "BOM 算法", val: "动态损耗实时计算" },
      { label: "回本周期", val: "45 天收回软件成本" },
    ],
    primaryLink: "/projects/foodops",
    primaryLabel: "查看案例深度复盘 ↗",
    secondaryAction: "view-calc",
  },
  {
    id: "gouge-hub",
    num: "03",
    title: "Gouge Hub · 全域内容中枢与 AI 自动化集群",
    enTitle: "OMNI-CHANNEL CONTENT AUTOMATION & AGENT COCKPIT",
    category: "Multi-Agent Swarms & Distribution",
    year: "2026",
    tag: "团队内测中",
    image: "/images/showcase/project-gouge-hub.jpg",
    summary:
      "狗哥团队自用的全域内容智能分发中枢。多 Agent 自动追踪行业热点、生成多平台深度长文草稿、微信生态私域线索沉淀与自动打标，打造 7×24 小时不间断的数字内容资产中枢。",
    specs: [
      { label: "支持模型", val: "Claude / DeepSeek" },
      { label: "分发通道", val: "微信 / 知乎 / 独立站" },
      { label: "线索沉淀", val: "自动化私域归档" },
      { label: "执行效率", val: "提升 600% 输出能效" },
    ],
    primaryLink: "/projects",
    primaryLabel: "查看项目矩阵 ↗",
    secondaryAction: "learn-more",
  },
];

// 英雄大图交互热点
const HERO_HOTSPOTS = [
  {
    id: "phone",
    title: "01 // Salin UI 原型机",
    desc: "252+ 纯净 TSX 组件，为 Cursor / Claude 喂养干净优雅的代码结构。",
    coords: "left-[48%] top-[55%]",
  },
  {
    id: "tamper",
    title: "02 // 实体餐饮压粉锤与小票夹",
    desc: "线下开店的真实物证。用代码解决后厨跑冒滴漏与真实商业算账。",
    coords: "left-[63%] top-[62%]",
  },
  {
    id: "cube",
    title: "03 // 翡翠 AI 核心",
    desc: "MCP 协议原生直连，自动化 Agent 编排，连接数字与现实。",
    coords: "left-[56%] top-[78%]",
  },
  {
    id: "watch",
    title: "04 // 钛金属计时器",
    desc: "7+ 年实战交付经验。拒绝概念自嗨，只做经得起时间考验的作品。",
    coords: "left-[38%] top-[52%]",
  },
];

export function ModernFounderHome() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>("");
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [filmGrain, setFilmGrain] = useState(false);

  // 实时城市时钟 (临沂 CST 时间)
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
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className={`relative min-h-screen bg-[#FBFBFA] dark:bg-[#0C0F0D] text-[#141815] dark:text-[#E8EAE6] transition-colors duration-300 ${filmGrain ? "grain-active" : ""}`}>
      {/* 胶片颗粒层 (dsgnbyhl 质感可选项) */}
      {filmGrain && (
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* 顶部微观取景器标线与状态栏 (dsgnbyhl / Sourav Bera HUD) */}
      <section className="border-b border-[#E5E8E2] dark:border-[#1F2621] bg-white/70 dark:bg-[#111613]/70 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-[#626A64] dark:text-[#8E9790] gap-3">
          {/* 左侧：城市与实时时钟 (Calissa 风格) */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
            <span className="tracking-wide">
              SHANDONG · LINYI <span className="text-[#141815] dark:text-white font-semibold">{timeStr || "20:25:00"}</span> CST
            </span>
            <span className="hidden md:inline text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden md:inline text-[11px]">35.1041° N, 118.3564° E</span>
          </div>

          {/* 右侧：取景器参数与胶片颗粒切换 */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] opacity-75">
              <Scan className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              [ 4K EDITORIAL · ISO 100 · F/1.4 ]
            </span>
            <button
              onClick={() => setFilmGrain(!filmGrain)}
              className={`text-[11px] px-2 py-0.5 rounded border transition-all ${
                filmGrain
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                  : "border-[#DDE2D9] dark:border-[#27302A] hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
              title="切换胶片颗粒噪点质感"
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
          HERO SECTION (CHI, QUÁCH + SOURAV BERA + 大图视觉冲击)
          ======================================================== */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* 背景轻微呼吸光影 */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* 上半部分：极简大字排版 (CHI, QUÁCH 风格) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-14">
            {/* 左侧：巨幅姓名与核心双重定位 */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300 text-xs font-mono tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                OFFLINE COMMERCE × AI ARCHITECTURE
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0F1410] dark:text-[#F3F5F2] font-serif leading-[1.05]">
                WANG SALIN<br />
                <span className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200">
                  汪狗哥
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#4A534D] dark:text-[#A1ABA4] max-w-2xl font-normal leading-relaxed">
                线下餐饮操盘手 × AI 架构与界面工匠。
                <br className="hidden sm:inline" />
                下过厨房算过损耗，写过代码搞过 Agent。让真实商业算得过账，让 AI 工具真正落地变现。
              </p>
            </div>

            {/* 右侧：纵向极简导航元数据 (CHI, QUÁCH 侧边目录) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#E2E6DF] dark:border-[#222A24] pt-4 lg:pt-0 lg:pl-8 space-y-3 font-mono text-xs text-[#525B54] dark:text-[#9AA39C]">
              <div className="flex justify-between items-center group cursor-pointer" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="tracking-wider">01 // SALIN UI</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">AI 界面弹药库 ↗</span>
              </div>
              <div className="flex justify-between items-center group cursor-pointer" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="tracking-wider">02 // FOODOPS</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">实体餐饮降本系统 ↗</span>
              </div>
              <div className="flex justify-between items-center group cursor-pointer" onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="tracking-wider">03 // CAPABILITY</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">6 维实操评分 ↗</span>
              </div>
              <div className="flex justify-between items-center group cursor-pointer" onClick={() => document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="tracking-wider">04 // UNFILTERED</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-semibold">一线实战手记 ↗</span>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="flex-1 py-2 px-3 rounded bg-[#0F1410] dark:bg-[#F3F5F2] text-white dark:text-[#0F1410] font-sans font-medium text-xs text-center transition-opacity hover:opacity-90"
                >
                  即时开启对话
                </button>
                <Link
                  href="/ui/"
                  className="py-2 px-3 rounded border border-[#D5DDD2] dark:border-[#2C372F] font-sans font-medium text-xs hover:border-emerald-500/50 transition-colors text-center"
                >
                  探索 UI 资产
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================
              下半部分：核心“大图”展台 (CHI, QUÁCH 透明物证巨像 + dsgnbyhl 标尺)
              ======================================================== */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] overflow-hidden shadow-xl sm:shadow-2xl group">
            {/* 取景器四角十字与刻度标尺 (dsgnbyhl 灵感) */}
            <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] flex items-center gap-1.5 select-none">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">+</span>
              <span>CAM_01 // CURATED ARTIFACTS</span>
            </div>
            <div className="absolute top-4 right-4 z-20 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] flex items-center gap-2 select-none">
              <span>FRAME: 2026.10</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] select-none hidden sm:block">
              [ PHYSICAL KITCHEN TAMPER × NEURAL AI CUBE ]
            </div>
            <div className="absolute bottom-4 right-4 z-20 font-mono text-[11px] text-[#8C968F] dark:text-[#6E7870] select-none">
              [ + ] EXP: CLEAN EDITORIAL
            </div>

            {/* 核心大图展示 */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#F7F8F6] dark:bg-[#0E1310] flex items-center justify-center overflow-hidden">
              <Image
                src="/images/showcase/hero-editorial-curated.jpg"
                alt="Wang Salin Curated Artifacts - Transparent Bag with Kitchen & AI Tools"
                fill
                priority
                className="object-contain object-center transform group-hover:scale-[1.01] transition-transform duration-700"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* 交互热点浮动指示器 */}
              {HERO_HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspot === hotspot.id;
                return (
                  <div
                    key={hotspot.id}
                    className={`absolute ${hotspot.coords} z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                    onMouseEnter={() => setActiveHotspot(hotspot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                  >
                    {/* 呼吸脉冲热点圆环 */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-6 h-6 rounded-full bg-emerald-500/20 animate-ping" />
                      <span className="relative w-4 h-4 rounded-full bg-emerald-500/90 border-2 border-white dark:border-neutral-900 shadow-md flex items-center justify-center text-[8px] font-bold text-white">
                        +
                      </span>
                    </div>

                    {/* 悬停或点击弹出的卡片说明 */}
                    {isActive && (
                      <div className="absolute left-1/2 bottom-7 -translate-x-1/2 w-64 p-3 rounded-xl bg-white/95 dark:bg-[#161D18]/95 backdrop-blur-md border border-emerald-500/30 shadow-2xl text-left z-40 animate-in fade-in zoom-in-95 duration-200">
                        <div className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                          {hotspot.title}
                        </div>
                        <p className="text-xs text-[#4A534D] dark:text-[#A1ABA4] leading-relaxed">
                          {hotspot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 大图下方的实战凭证指标栏 (Sourav Bera HUD 质感) */}
            <div className="border-t border-[#E5E8E2] dark:border-[#202822] bg-[#FAFBF9] dark:bg-[#131915] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono">
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#141815] dark:text-[#EFF2EE]">
                  252+
                </div>
                <div className="text-xs text-[#6C766F] dark:text-[#8E9790]">
                  Salin UI 资产组件 (MCP 原生)
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  -18%
                </div>
                <div className="text-xs text-[#6C766F] dark:text-[#8E9790]">
                  FoodOps 实体原料损耗控制
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#141815] dark:text-[#EFF2EE]">
                  7+ 年
                </div>
                <div className="text-xs text-[#6C766F] dark:text-[#8E9790]">
                  线下商业操盘 × 全栈软件交付
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#141815] dark:text-[#EFF2EE]">
                  100%
                </div>
                <div className="text-xs text-[#6C766F] dark:text-[#8E9790]">
                  真实业务账本 · 拒绝概念自嗨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 01: NOW · 当前聚焦 (Arbatov 风格)
          ======================================================== */}
      <section className="py-14 sm:py-20 border-t border-[#E5E8E2] dark:border-[#1F2621]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 01 · NOW · 当前重心
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-serif">
                此时此刻，汪狗哥正在推进什么？
              </h2>
            </div>
            <p className="text-sm text-[#5A645D] dark:text-[#9AA39C] max-w-md font-sans">
              构建面向生产级环境的 AI 工具系统与实体经营操作系统 —— 既有给开发者的界面弹药库，也有给真实餐饮老板的降本账本。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Now 1: Salin UI */}
            <div className="p-6 rounded-2xl border border-[#E2E6DF] dark:border-[#222A24] bg-white dark:bg-[#121814] relative group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
                  v5.2.0 高频更新
                </span>
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif group-hover:text-emerald-600 transition-colors">
                Salin UI (开发者 AI 界面弹药库)
              </h3>
              <p className="text-sm text-[#4E5650] dark:text-[#99A29B] leading-relaxed mb-6">
                专为 Cursor、Claude Code、v0 打造的现代 Web 资产枢纽。坚持单文件 TSX 零幽灵依赖，原生 MCP 协议直连，3 次点击完成高质量 UI 投喂。
              </p>
              <div className="pt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] flex justify-between items-center">
                <Link
                  href="/ui/"
                  className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  检阅弹药库 /ui/ <ArrowUpRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={handleCopyMcp}
                  className="text-[11px] font-mono text-[#727C75] dark:text-[#88928B] hover:text-emerald-600 inline-flex items-center gap-1"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedPrompt ? "已复制 MCP" : "复制 MCP"}
                </button>
              </div>
            </div>

            {/* Now 2: FoodOps */}
            <div className="p-6 rounded-2xl border border-[#E2E6DF] dark:border-[#222A24] bg-white dark:bg-[#121814] relative group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold">
                  生产级驻场实施
                </span>
                <UtensilsCrossed className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif group-hover:text-emerald-600 transition-colors">
                FoodOps 实体餐饮供应链数字化
              </h3>
              <p className="text-sm text-[#4E5650] dark:text-[#99A29B] leading-relaxed mb-6">
                把下场开店亏损 30 万的惨痛实操教训，凝炼为一套降本软件系统。动态 BOM 原料损耗实时监控与跨店采购比价，让餐饮门店把利润省出来。
              </p>
              <div className="pt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] flex justify-between items-center">
                <Link
                  href="/projects/foodops"
                  className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  查看案例复盘 <ArrowUpRight className="w-3 h-3" />
                </Link>
                <span className="text-[11px] font-mono text-[#727C75] dark:text-[#88928B]">
                  已降损 18%
                </span>
              </div>
            </div>

            {/* Now 3: 写作与认知沉淀 */}
            <div className="p-6 rounded-2xl border border-[#E2E6DF] dark:border-[#222A24] bg-white dark:bg-[#121814] relative group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold">
                  一线真实长文
                </span>
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif group-hover:text-emerald-600 transition-colors">
                商业与技术复盘手记
              </h3>
              <p className="text-sm text-[#4E5650] dark:text-[#99A29B] leading-relaxed mb-6">
                持续输出一线真实商业手记。深度拆解《企业客户为什么真正买单》、《AI 技术狂欢与商业现金流鸿沟》，拒绝任何概念堆砌与自嗨。
              </p>
              <div className="pt-4 border-t border-[#EEF2EB] dark:border-[#1F2621] flex justify-between items-center">
                <Link
                  href="/notes"
                  className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  阅读全部手记 <ArrowUpRight className="w-3 h-3" />
                </Link>
                <span className="text-[11px] font-mono text-[#727C75] dark:text-[#88928B]">
                  10+ 篇深度复盘
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 02: CAPABILITIES · 能力坐标 (Arbatov 风格数字清单)
          ======================================================== */}
      <section id="capabilities" className="py-14 sm:py-20 border-t border-[#E5E8E2] dark:border-[#1F2621] bg-[#F7F9F6] dark:bg-[#0F1411]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 02 · CAPABILITIES · 实战能力矩阵
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-serif">
                跨界能力指标与交付确定性
              </h2>
            </div>
            <p className="text-sm text-[#5A645D] dark:text-[#9AA39C] max-w-md font-sans">
              基于 20+ 真实项目沉淀与一线实体下场操盘经验。技术不是炫耀的摆件，而是实现商业闭环的确定性杠杆。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono">
            {CAPABILITY_METRICS.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-[#DFE3DC] dark:border-[#222A23] bg-white dark:bg-[#131915] flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#828B84] dark:text-[#6C766F] font-bold">
                      [{item.id}]
                    </span>
                    <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                      {item.score} <span className="text-xs font-normal opacity-60">/ 100</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-sans text-[#141815] dark:text-[#E8ECE6] mb-1">
                    {item.label}
                  </h3>
                  <div className="text-xs text-[#707972] dark:text-[#8D968F] mb-3">
                    {item.sublabel}
                  </div>
                </div>

                <div>
                  {/* 进度条 (Arbatov 风格) */}
                  <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-3">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-sans text-[#565E58] dark:text-[#9AA39C] leading-tight">
                    {item.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 03: SELECTED WORKS · 大图旗舰展厅 (dsgnbyhl 质感大图卡片)
          ======================================================== */}
      <section id="projects" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 03 · SELECTED WORKS · 旗舰作品展厅
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                大图实证：只展示交付物与真实闭环
              </h2>
            </div>
            <p className="text-sm text-[#5A645D] dark:text-[#9AA39C] max-w-md font-sans">
              每一个项目都配有真实的系统运行截图与一线复盘。绝非概念玩具，全量运行于生产级环境。
            </p>
          </div>

          {/* 旗舰大图列表 */}
          <div className="space-y-16 sm:space-y-24">
            {SHOWCASE_PROJECTS.map((proj) => (
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
                      <Link
                        href={proj.primaryLink}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1410] dark:bg-[#F3F5F2] text-white dark:text-[#0F1410] font-sans font-medium text-xs tracking-wide hover:opacity-90 transition-opacity"
                      >
                        {proj.primaryLabel}
                      </Link>
                      {proj.secondaryAction === "copy-mcp" && (
                        <button
                          onClick={handleCopyMcp}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D5DDD2] dark:border-[#2C372F] text-xs font-mono font-medium hover:border-emerald-500/50 transition-colors"
                        >
                          {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedPrompt ? "已复制 MCP 协议" : "复制 MCP 协议配置"}
                        </button>
                      )}
                      {proj.secondaryAction === "view-calc" && (
                        <Link
                          href="/tools/foodops-calculator"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D5DDD2] dark:border-[#2C372F] text-xs font-mono font-medium hover:border-emerald-500/50 transition-colors"
                        >
                          打开损耗模拟计算器 ↗
                        </Link>
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
          SECTION 04: WRITING · 实战手记 (Arbatov 风格目录)
          ======================================================== */}
      <section id="writing" className="py-16 sm:py-20 border-t border-[#E5E8E2] dark:border-[#1F2621] bg-[#F7F9F6] dark:bg-[#0E1310]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider mb-2">
                // 04 · WRITING · 一线真实长文手记
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-serif">
                复盘与认知沉淀：未经滤镜的商业现场
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
          SECTION 05: CONTACT & COOPERATION · 即时联络 (Arbatov + dsgnbyhl)
          ======================================================== */}
      <section id="contact" className="py-16 sm:py-24 border-t border-[#E5E8E2] dark:border-[#1F2621]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl border border-[#DFE4DC] dark:border-[#222C24] bg-white dark:bg-[#111713] p-8 sm:p-12 shadow-xl relative overflow-hidden">
            {/* 取景器装饰角标 */}
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
                  OPEN TO CONSULTING & COOPERATION
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#0F1410] dark:text-[#F3F5F2]">
                  聊点真实的业务，<br />
                  做点能交付的作品。
                </h2>
                <p className="text-sm sm:text-base text-[#4A534D] dark:text-[#A1ABA4] leading-relaxed max-w-xl">
                  无论你是正在寻找企业 AI 落地方案的实体老板，还是需要高质量 UI/UX 设计系统与 Agent 工作流的技术团队，随时欢迎与狗哥深度交流。
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

              {/* 右侧：社交与矩阵链接 (Arbatov Elsewhere 风格) */}
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
