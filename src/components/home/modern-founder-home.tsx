"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  UtensilsCrossed,
  BookOpen,
  MessageSquare,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Flame,
  Clock,
  ArrowRight,
  Compass,
} from "lucide-react";
import { siteConfig } from "@/data/site";

const NOW_ITEMS = [
  {
    tag: "持续高频迭代",
    tagColor: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    title: "Salin UI (AI 界面弹药库)",
    desc: "专为 Cursor / Claude / v0 打造的现代界面弹药库。收录 252+ 资产组件，坚持单文件 TSX 零幽灵依赖，原生 MCP 协议直连，3 次点击把高质量 UI 投喂给 AI。",
    link: "/ui/",
    linkLabel: "检阅弹药库 /ui/ ↗",
    isExternal: false,
  },
  {
    tag: "生产级落地",
    tagColor: "text-rose-700 dark:text-rose-300 bg-rose-500/10 border-rose-500/20",
    title: "实体餐饮供应链数字化 (FoodOps)",
    desc: "将线下下场开店亏钱踩坑的实战经验，沉淀为餐饮供应链降本系统。重构动态 BOM 损耗监控、后厨智能排班与跨门店采购比价，帮助品牌原料损耗降低 18%。",
    link: "/projects/foodops",
    linkLabel: "查看案例复盘 ↗",
    isExternal: false,
  },
  {
    tag: "10+ 篇深度长文",
    tagColor: "text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/20",
    title: "商业与 AI 实战复盘手记",
    desc: "持续写作输出一线真实复盘。拆解《AI 产品不是功能堆出来的》、《为什么很多 AI 项目赚不到钱》，剖析企业客户真正愿意买单的价值点。",
    link: "/notes",
    linkLabel: "阅读全部手记 ↗",
    isExternal: false,
  },
];

const FEATURED_NOTES = [
  {
    slug: "ai-products-not-from-features",
    title: "AI 产品不是功能堆出来的：聊聊企业客户为什么真正愿意买单",
    category: "商业复盘",
    date: "2026-03",
    readTime: "8 分钟",
    summary: "技术自嗨往往解决不了真实问题。从企业客户的账本出发，聊聊什么样的 AI 解决方案能让客户爽快买单。",
  },
  {
    slug: "ai-real-business",
    title: "为什么很多 AI 项目赚不到钱：技术狂欢与商业现金流的鸿沟",
    category: "实战心得",
    date: "2026-02",
    readTime: "12 分钟",
    summary: "剖析独立开发与 AI 项目常见的死穴：为什么调用几个 API 拼出来的工具留不住人，如何建立真实的壁垒与现金流。",
  },
  {
    slug: "foodops-retrospective",
    title: "餐饮供应链数字化的真实痛点：从亏钱踩坑中趟出的工程经验",
    category: "行业实操",
    date: "2026-01",
    readTime: "15 分钟",
    summary: "下场开店亏过数十万后，我才明白餐饮供应链的死结根本不在收银机上，而是在后厨原料的动态 BOM 损耗模型里。",
  },
  {
    slug: "project-worth-continuing",
    title: "什么样的项目才值得坚持做：聊聊产品生命周期与商业闭环",
    category: "思考复盘",
    date: "2025-12",
    readTime: "10 分钟",
    summary: "做项目不能凭感觉死撑。一套判定产品是否值得持续投入的量化指标体系与自我纠偏原则。",
  },
];

export function ModernFounderHome() {
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Mini Interactive Teaser State for Salin UI
  const [activeTeaserTab, setActiveTeaserTab] = useState<"tsx" | "mcp" | "prompt">("tsx");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyWechat = () => {
    navigator.clipboard.writeText("50219067").then(() => {
      setCopiedWechat(true);
      setTimeout(() => setCopiedWechat(false), 2000);
    });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(
      "请为我生成一个符合 Salin UI 极简设计规范的 Modern KPI Metric Card，要求单文件 TSX 零幽灵依赖，带微光动效与无障碍标签。"
    ).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          SECTION 1: HERO & EXECUTIVE INTRO (从容极简的创始人开篇)
          ========================================================================= */}
      <section className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 pt-12 sm:pt-20 pb-16">
        {/* Status Micro-Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>实体商业操盘 × 生产级系统架构 · 专注商业落地交付</span>
        </div>

        {/* Confident Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.12] mb-6">
          让真实商业算得过账，
          <br className="hidden sm:inline" />
          让 AI 工具真正产生现金流。
        </h1>

        {/* Lead Narrative Bio */}
        <div className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl space-y-3 mb-8">
          <p>
            我是 <strong className="text-[var(--text-primary)] font-bold">汪狗哥 (Wang Salin)</strong>。
            曾亲自下场开过连锁餐饮店，踩过实体商业亏钱踩坑的真实教训；也是拥有多年全栈架构经验的工程研发者。
          </p>
          <p>
            我不相信脱离业务实际的技术狂欢，专注于把 AI 大模型、MCP 协议与现代化工作流，转化为企业客户真正愿意买单的生产力。
            目前我主理专为 AI 辅助编程打造的专业界面资产库 <Link href="/ui/" className="text-[var(--brand)] font-bold hover:underline">Salin UI 弹药库</Link>（252+ 资产组件），并主导 <Link href="/projects/foodops" className="text-[var(--brand)] font-bold hover:underline">FoodOps</Link> 餐饮供应链数字化系统落地。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Link
            href="/ui/"
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[var(--brand)] text-[var(--brand-foreground)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>检阅 Salin UI 军械库</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href="#projects"
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-[var(--surface-solid)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-muted)] transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>探索代表作与案例</span>
            <ChevronDown className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-[var(--surface-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-muted)] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>微信直联</span>
          </button>

          <Link
            href="/contact"
            className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-all flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>预约咨询交流</span>
          </Link>
        </div>

        {/* 4-Column Credibility Metrics (极简可信度数据矩阵) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[var(--border)]">
          <div className="p-4 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] font-mono">10+ 年</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">实体开店操盘与研发积淀</div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--brand)] font-mono">252+ 项</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Salin UI 原生界面资产</div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] font-mono">18%</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">餐饮供应链实测降本幅度</div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">坚守商业现金流与真实 ROI</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: NOW · 当前核心主线 (Real-Time Focus)
          ========================================================================= */}
      <section className="bg-[var(--surface-muted)]/40 border-y border-[var(--border)] py-14 sm:py-18">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono font-bold text-[var(--brand)] uppercase tracking-wider">
                // NOW · 当前核心主线
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mt-1">
                正在构建与落地的实战业务
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
              持续更新 · 2026
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {NOW_ITEMS.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[var(--brand)]/30 transition-all duration-200"
              >
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border mb-3 ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href={item.link}
                  className="text-xs font-bold text-[var(--brand)] hover:underline inline-flex items-center gap-1"
                >
                  <span>{item.linkLabel}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FLAGSHIP WORKS (核心精选代表作)
          ========================================================================= */}
      <section id="projects" className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-xs font-mono font-bold text-[var(--brand)] uppercase tracking-wider">
              // FLAGSHIP WORKS · 核心精选代表作
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight mt-1">
              不讲概念，只展示交付成果
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
          >
            <span>全部项目档案 →</span>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Card 1: Salin UI (Flagship AI UI Asset Center) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    FLAGSHIP · AI 资产库
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)]">
                    MCP 原生直连
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)]">
                    252+ 项组件
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  Salin UI · 专为 AI 辅助编程打造的专业界面弹药库
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/ui/"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:shadow-md transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>检阅弹药库 ↗</span>
                </Link>
                <Link
                  href="/projects/salin-ui"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-all"
                >
                  <span>架构文档</span>
                </Link>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed my-6">
              面向 AI 辅助编程（Cursor / Claude / v0）打造的高保真组件与资产库。收录 68 核心组件、88 业务场景、40 动效组件与 31 套风格系统。
              坚持单文件 TSX 源码复制即用，杜绝底层黑盒依赖，3 次点击把高质量 UI 投喂给 AI，彻底告别低质拼凑感。
            </p>

            {/* Interactive Live Component Preview Bar (卡片内置真实 UI 试玩体验) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                    LIVE TEASER // 实战组件试玩
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[var(--surface-solid)] p-0.5 rounded-lg border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setActiveTeaserTab("tsx")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      activeTeaserTab === "tsx"
                        ? "bg-[var(--brand)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    TSX 单文件
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTeaserTab("mcp")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      activeTeaserTab === "mcp"
                        ? "bg-[var(--brand)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    MCP 直连
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTeaserTab("prompt")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      activeTeaserTab === "prompt"
                        ? "bg-[var(--brand)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    AI Prompt
                  </button>
                </div>
              </div>

              {activeTeaserTab === "tsx" && (
                <div className="p-3.5 rounded-xl bg-[var(--surface-solid)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>import &#123; MetricCard, StatPulse &#125; from &quot;@/salin-ui&quot;;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      零外部依赖
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">TypeScript 5 + Tailwind</span>
                  </div>
                </div>
              )}

              {activeTeaserTab === "mcp" && (
                <div className="p-3.5 rounded-xl bg-[var(--surface-solid)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>mcp://salin-ui.local/components/search?q=kpi-card</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    已打通 Cursor / Claude Desktop
                  </span>
                </div>
              )}

              {activeTeaserTab === "prompt" && (
                <div className="p-3.5 rounded-xl bg-[var(--surface-solid)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
                  <div className="truncate max-w-lg">
                    “生成符合 Salin UI 规范的 Modern KPI Metric Card，要求单文件 TSX 零幽灵依赖...”
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="px-2.5 py-1 rounded bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--text-primary)] text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? "已复制" : "一键提货"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: FoodOps 餐饮数字化供应链系统 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                    ENTERPRISE FDE · 实体数字化
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)]">
                    损耗降低 18%
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)]">
                    排班效率 +35%
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  FoodOps · 下场开店踩坑自研的餐饮供应链降本系统
                </h3>
              </div>

              <Link
                href="/projects/foodops"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:shadow-md transition-all flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <span>查看实战全案 ↗</span>
              </Link>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed my-6">
              从真实开店的原料损耗、后厨断层、采购比价不透明出发，重构供应链采购、智能排班与动态 BOM 损耗监控。
              帮助实体餐饮品牌省去巨额隐形成本，单店综合损耗率实测降低 18%，后厨出餐效率提升 35%。
            </p>

            <div className="grid grid-cols-3 gap-3 font-mono text-center pt-2">
              <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
                <div className="text-lg font-black text-rose-600 dark:text-rose-400">18%</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">原料损耗降低</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
                <div className="text-lg font-black text-[var(--text-primary)]">+35%</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">后厨协同效率</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-muted)]">
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">生产级</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">现场驻场落地</div>
              </div>
            </div>
          </div>

          {/* Card 3: 狗哥资源库 (Gouge Hub) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    KNOWLEDGE BASE · 实操资料库
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)]">
                    40+ 套落地 SOP
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  狗哥资源库 · 真实实体商业与本地获客实操手册
                </h3>
              </div>

              <Link
                href="/projects/gouge-hub"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>调取手册档案 ↗</span>
              </Link>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
              不讲假大空的商业理论，专门沉淀从 0 到 1 开店、本地生活美团/小红书全域获客与私域精细化运营，帮助创业者省去数万元试错成本。
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FEATURED WRITING & THOUGHTS (精选实战长文)
          ========================================================================= */}
      <section className="bg-[var(--surface-muted)]/40 border-y border-[var(--border)] py-16 sm:py-20">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs font-mono font-bold text-[var(--brand)] uppercase tracking-wider">
                // WRITING & THOUGHTS · 真实复盘长文
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight mt-1">
                一线商业与技术复盘
              </h2>
            </div>
            <Link
              href="/notes"
              className="text-xs font-bold text-[var(--brand)] hover:underline inline-flex items-center gap-1"
            >
              <span>阅读全部 10+ 篇手记 →</span>
            </Link>
          </div>

          <div className="space-y-3">
            {FEATURED_NOTES.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="block p-5 sm:p-6 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs hover:border-[var(--brand)]/40 hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-muted)] font-medium">
                      {note.category}
                    </span>
                    <span className="text-[var(--text-muted)]">{note.date}</span>
                  </div>
                  <span className="text-[var(--text-muted)] text-[11px]">{note.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors mb-1.5 font-sans">
                  {note.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans line-clamp-2">
                  {note.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CAPABILITIES & TECH STACK (实战能力与技术栈)
          ========================================================================= */}
      <section className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <div className="text-xs font-mono font-bold text-[var(--brand)] uppercase tracking-wider">
            // CAPABILITIES · 交付能力与方法论
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight mt-1">
            商业与工程跨界能力矩阵
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">实体商业操盘</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              下场开店摸透的真实商业常识。不相信空中楼阁，关注现金流与单店模型。
            </p>
            <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono">
              <div>✓ 美团/小红书本地生活全域获客</div>
              <div>✓ 餐饮供应链多门店采购比价</div>
              <div>✓ 动态 BOM 原料损耗模型</div>
              <div>✓ 门店动线与出餐节拍优化</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">AI 架构与 Agent 落地</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              将大模型能力真正注入企业生产工作流，解决幻觉、延迟与数据安全痛点。
            </p>
            <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono">
              <div>✓ 企业级 AI Agent 工作流编排</div>
              <div>✓ 原生 MCP 协议服务端与工具链</div>
              <div>✓ 企业私有知识库 (RAG) 定制</div>
              <div>✓ Prompt 评测与生产级防劣化</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">全栈工程研发</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              现代 Web 与移动端全栈开发标准，坚持干净可维护的工程实践。
            </p>
            <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono">
              <div>✓ Next.js 16 (App Router) / React 19</div>
              <div>✓ TypeScript + TailwindCSS 4</div>
              <div>✓ Node.js / Python 后端微服务</div>
              <div>✓ 自动化部署与性能优化</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: COOPERATION & DIRECT CONTACT (商业合作与直接联系)
          ========================================================================= */}
      <section id="contact" className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 pb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--surface-solid)] border border-[var(--border)] shadow-xs text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>COOPERATION // 合作与直接联系</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight max-w-xl mx-auto">
            聊点真实的业务，做点能交付的作品。
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            适合交流：企业内部 AI 知识库与 Agent 工作流深度定制、餐饮与连锁品牌供应链降本增效全案、Salin UI 商业授权与私有部署、早期项目商业咨询与共创。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[var(--brand)] text-[var(--brand-foreground)] hover:shadow-md transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>微信直接沟通</span>
            </button>

            <button
              type="button"
              onClick={handleCopyWechat}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedWechat ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedWechat ? "已复制微信号" : "复制微信号 50219067"}</span>
            </button>

            <a
              href="mailto:salin910525@gmail.com"
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>邮件直达</span>
            </a>
          </div>

          <div className="text-xs text-[var(--text-muted)] font-mono pt-4 border-t border-[var(--border)]">
            响应速度：一般在 24 小时内回复 · 保证创始人一对一沟通
          </div>
        </div>
      </section>

      {/* WeChat Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-solid)] border border-[var(--border)] max-w-sm w-full text-center space-y-4 shadow-2xl"
          >
            <h4 className="text-lg font-bold text-[var(--text-primary)]">添加汪狗哥微信</h4>
            <p className="text-xs text-[var(--text-secondary)]">
              请备注来意（如：AI 工具定制 / 餐饮数字化 / Salin UI 商业合作）
            </p>
            <div className="relative w-52 h-52 mx-auto rounded-2xl overflow-hidden border border-[var(--border)] bg-white p-2 shadow-xs">
              <Image
                src="/images/wechat-qr.jpg"
                alt="汪狗哥微信二维码"
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)]">
              微信号：<strong className="text-[var(--text-primary)] font-bold">50219067</strong>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyWechat}
                className="flex-1 py-2.5 rounded-xl bg-[var(--brand)] text-[var(--brand-foreground)] text-xs font-bold cursor-pointer"
              >
                {copiedWechat ? "已复制" : "复制微信号"}
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
