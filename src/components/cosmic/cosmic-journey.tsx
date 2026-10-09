"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CosmicCanvas } from "./cosmic-canvas";
import { PlanetRender, PlanetType } from "./planet-render";
import { CosmicHUD, WAYPOINTS } from "./cosmic-hud";
import { PlanetModal, ProjectDetail } from "./planet-modal";
import { ArrowUpRight, Sparkles, ChevronDown, MessageSquare, Mail, RotateCcw } from "lucide-react";

const CELESTIAL_STATIONS = [
  {
    id: "earth",
    type: "earth" as PlanetType,
    name: "地球 (EARTH // 母港)",
    au: 0.0,
    kicker: "MISSION LAUNCH // 启航母星",
    title: "狗哥 (Wang Salin)",
    subtitle: "做过本地生活内容，亲自下场经营过餐饮。把十多年商业积淀，变成真正能交付的 AI 工具。",
    tags: ["实体商业操盘", "AI 架构设计", "全案代码交付"],
    ctaLabel: "查看核心档案",
    projectDetail: {
      id: "salin-origin",
      planetName: "地球母港",
      badge: "ORIGIN · 商业与 AI 实践",
      title: "狗哥 (Wang Salin)",
      tagline: "实体商业 × 商业敏锐度 × AI 产品落地",
      description:
        "在餐饮实体前线经营过门店、管理过团队、跑通了整套供应链降本。在 AI 爆发期，将这些不可替代的商业手感转化成了可落地的工具与数字化系统。",
      highlights: [
        "10+ 年线下商业与数字化经验",
        "亲自下场开店餐饮实战操盘",
        "全栈掌握 Next.js / AI Agent / MCP",
        "坚持 ROI 导向，拒绝空洞概念",
      ],
      metrics: [
        { label: "商业积淀", value: "10+ 年" },
        { label: "实操案例", value: "多店落地" },
        { label: "核心交付", value: "100% 真实" },
      ],
      primaryLink: { label: "了解合作方向", href: "/contact" },
      secondaryLink: { label: "实战笔记", href: "/notes" },
      accentColor: "border-sky-400",
    },
  },
  {
    id: "moon",
    type: "moon" as PlanetType,
    name: "月球 (MOON // 轨道军械库)",
    au: 0.0026,
    kicker: "0.0026 AU // 旗舰级 AI 界面弹药库",
    title: "Salin UI",
    subtitle: "面向 Cursor / Claude / v0 的专业级界面弹药库。252+ 资产，单文件 TSX 复制，原生 MCP 协议直连。",
    tags: ["252+ 全栈资产", "MCP 协议直连", "全案样板间一键复刻"],
    ctaLabel: "进入 Salin UI 弹药库",
    projectDetail: {
      id: "salin-ui",
      planetName: "月球轨道前哨",
      badge: "FLAGSHIP · AI 界面弹药库",
      title: "Salin UI",
      tagline: "面向 AI 编程时代（Cursor / Claude / v0）的专业武器库",
      description:
        "收录 68 核心组件、88 交互动效、40 骨架布局、31 风格系统与 24 数据图表。支持在编辑器内通过 MCP 协议让 AI 自行调取，几秒内构建殿堂级高颜值商业前端。",
      highlights: [
        "单文件 TSX 零侵入复制运行",
        "全景商业样板间一键复刻克隆",
        "原生 MCP 协议直连 IDE 提示词",
        "全响应式 H5 移动端与桌面双向适配",
      ],
      metrics: [
        { label: "全栈资产", value: "252+" },
        { label: "核心分类", value: "5 大类" },
        { label: "MCP 状态", value: "原生直连" },
      ],
      primaryLink: { label: "立即进入弹药库", href: "/ui/" },
      secondaryLink: { label: "查看项目档案", href: "/projects/salin-ui" },
      accentColor: "border-emerald-400",
    },
  },
  {
    id: "mars",
    type: "mars" as PlanetType,
    name: "火星 (MARS // 红色开拓基地)",
    au: 0.52,
    kicker: "0.52 AU // 实体下场数字化操盘",
    title: "FoodOps 数字化系统",
    subtitle: "亲自下场开店、管后厨、跑供应链。将真实门店痛点转化为自动化成本分析与数字化工单排班全案。",
    tags: ["供应链降本 18%", "后厨效能 +35%", "多店实测落地"],
    ctaLabel: "查看实战复盘",
    projectDetail: {
      id: "foodops",
      planetName: "火星开拓基地",
      badge: "ENTERPRISE FDE · 餐饮门店供应链",
      title: "FoodOps 数字化全案",
      tagline: "餐饮门店经营与供应链数字化实战系统",
      description:
        "针对餐饮门店食材损耗大、后厨出单混乱、排班不合理等顽疾，构建全流程动态盘点、自动补货模型与工单看板，经真实单店与连锁店持续验证。",
      highlights: [
        "食材 BOM 成本动态损耗追踪",
        "后厨工单看板与出餐节拍平衡",
        "连锁多店供应链集中采购结算",
        "综合降低食材与损耗成本 18%",
      ],
      metrics: [
        { label: "供应链降本", value: "18%" },
        { label: "效能提升", value: "+35%" },
        { label: "测试验证", value: "多店落地" },
      ],
      primaryLink: { label: "查看实战案例", href: "/projects/foodops" },
      accentColor: "border-rose-400",
    },
  },
  {
    id: "jupiter",
    type: "jupiter" as PlanetType,
    name: "木星 (JUPITER // 知识巨引源)",
    au: 4.2,
    kicker: "4.2 AU // 本地商业与实体知识库",
    title: "狗哥资源库 (Gouge Hub)",
    subtitle: "连接真实商业场景的知识库。实体获客 SOP、餐饮创业避坑手册与精选工具导航，赋能创业团队。",
    tags: ["40+ 实操手册", "私域全域打通", "持续高频收录"],
    ctaLabel: "调取知识档案",
    projectDetail: {
      id: "gouge-hub",
      planetName: "木星引力枢纽",
      badge: "KNOWLEDGE BASE · 实体商业知识库",
      title: "狗哥资源库",
      tagline: "真实本地商业与创业实操资料库",
      description:
        "不讲假大空的商业理论，专门沉淀从 0 到 1 开店、本地生活全域获客、私域精细化运营与各类提效工具。帮助创业者省去数万元试错成本。",
      highlights: [
        "40+ 套真实落地商用操作指南",
        "小红书/美团本地获客 SOP 拆解",
        "精选高性价比 AI 提效工具集",
        "高频持续更新收录",
      ],
      metrics: [
        { label: "实操手册", value: "40+ 套" },
        { label: "避坑指南", value: "100% 真实" },
        { label: "更新状态", value: "持续收录" },
      ],
      primaryLink: { label: "深入项目档案", href: "/projects/gouge-hub" },
      accentColor: "border-amber-400",
    },
  },
  {
    id: "saturn",
    type: "saturn" as PlanetType,
    name: "土星 (SATURN // 思考光环)",
    au: 9.5,
    kicker: "9.5 AU // 商业落地复盘笔记",
    title: "AI 时代实战手记",
    subtitle: "记录从实体商业到 AI 架构的心得。拆解为什么大多数 AI 工具没人用，以及什么样的应用能产生商业现金流。",
    tags: ["10+ 篇深度长文", "100% 真实复盘", "商业现金流导向"],
    ctaLabel: "查阅全部手记",
    projectDetail: {
      id: "notes",
      planetName: "土星思考光环",
      badge: "FIELD NOTES · 实战复盘手记",
      title: "AI 时代思考与实战手记",
      tagline: "不聊空洞概念，只交付客户愿意买单的价值",
      description:
        "收录《AI 产品不是功能堆出来的》、《为什么很多 AI 项目赚不到钱》、《餐饮供应链数字化的真实痛点》等多篇高赞实战复盘。",
      highlights: [
        "10+ 篇真实商业操盘深度长文",
        "从痛点定义到技术选型的真实过程",
        "剖析企业客户真正愿意买单的心理",
        "持续更新创业与 AI 实践复盘",
      ],
      metrics: [
        { label: "深度文章", value: "10+ 篇" },
        { label: "真实度", value: "100%" },
        { label: "思考维度", value: "商业/产品/技术" },
      ],
      primaryLink: { label: "阅读最新手记", href: "/notes" },
      accentColor: "border-yellow-400",
    },
  },
  {
    id: "outpost",
    type: "outpost" as PlanetType,
    name: "深空前哨 (OUTPOST // 商业合作)",
    au: 15.0,
    kicker: "15.0 AU // 深空指挥部",
    title: "商业合作与业务对接",
    subtitle: "聊点真实的业务，做点能交付的作品。提供企业 AI 工具落地、餐饮供应链数字化全案、Salin UI 商业共建。",
    tags: ["企业 AI 定制", "餐饮数字化全案", "Salin UI 共建", "项目共创"],
    ctaLabel: "立即对接合作",
    projectDetail: {
      id: "cooperation",
      planetName: "深空前哨指挥部",
      badge: "COOPERATION · 合作对接中心",
      title: "商业合作与项目共创",
      tagline: "把成熟的实战经验，转化为您的商业增长动力",
      description:
        "适合交流：中小企业内部 AI 知识库与 Agent 工作流定制、餐饮与连锁品牌供应链降本增效全案、Salin UI 私有化商业部署、早期创业项目共创合作。",
      highlights: [
        "支持驻场 FDE 诊断与敏捷开发",
        "从原型设计到生产级代码全栈交付",
        "提供长期运维与技术迭代支持",
        "支持微信直接沟通需求",
      ],
      metrics: [
        { label: "交付周期", value: "敏捷迭代" },
        { label: "合作方式", value: "咨询/全案/共创" },
        { label: "响应速度", value: "24h 内" },
      ],
      primaryLink: { label: "提交合作需求", href: "/contact" },
      accentColor: "border-emerald-400",
    },
  },
];

export function CosmicJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [currentAU, setCurrentAU] = useState(0);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [warpMultiplier, setWarpMultiplier] = useState(0);

  // Selected project for modal detail inspection
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [showWechatModal, setShowWechatModal] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const scrollTop = -rect.top;
      const p = Math.max(0, Math.min(1, scrollTop / totalScrollable));
      setScrollProgress(p);

      // Calculate instantaneous scroll speed for warp effect
      const now = Date.now();
      const dt = Math.max(16, now - lastTime);
      const dy = Math.abs(scrollTop - lastScrollTop);
      const velocity = dy / dt; // pixels per ms
      const warp = Math.min(1, velocity * 0.45);
      setWarpMultiplier(warp);

      lastScrollTop = scrollTop;
      lastTime = now;

      // Map progress to distance in AU (0 to 15 AU)
      const au = p * 15.0;
      setCurrentAU(au);

      // Determine active station
      const idx = Math.min(
        CELESTIAL_STATIONS.length - 1,
        Math.floor(p * CELESTIAL_STATIONS.length)
      );
      setActiveStationIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWarpTo = (targetProgress: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetY = targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const currentStation = CELESTIAL_STATIONS[activeStationIndex] || CELESTIAL_STATIONS[0];

  return (
    <div className="relative bg-slate-950 text-white min-h-screen select-none font-sans overflow-x-hidden">
      {/* 3D Deep Space Starfield & Warp Streaks Canvas */}
      <CosmicCanvas warpSpeed={warpMultiplier} />

      {/* Flight Telemetry HUD & Waypoint Selector */}
      <CosmicHUD
        currentAU={currentAU}
        activeWaypointIndex={activeStationIndex}
        warpMultiplier={warpMultiplier}
        onWarpTo={handleWarpTo}
      />

      {/* 600vh Scroll Runway */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "600vh" }}
      >
        {/* Sticky 100vh Observation Cockpit Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Ambient Cosmic Radial Nebulae */}
          <div className="absolute inset-0 bg-radial from-cyan-950/20 via-transparent to-slate-950 pointer-events-none" />

          {/* Central 3D Celestial Body Display */}
          <div
            className="relative z-10 flex items-center justify-center transition-all duration-300 ease-out"
            style={{
              transform: `scale(${1 - warpMultiplier * 0.15}) translateY(${
                Math.sin(scrollProgress * 20) * 10
              }px)`,
            }}
          >
            <PlanetRender type={currentStation.type} size={280} />
          </div>

          {/* Tactical Project Glass Card Floating Below/Alongside Planet */}
          <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 w-[92vw] max-w-xl pointer-events-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-300 hover:border-cyan-400/60">
              {/* Luminous top border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              {/* Station Kicker & AU Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider">
                  {currentStation.kicker}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {currentStation.au.toFixed(2)} AU
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                {currentStation.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {currentStation.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentStation.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-[10px] sm:text-[11px] font-mono text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(currentStation.projectDetail)}
                  className="px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentStation.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {currentStation.id === "moon" && (
                  <Link
                    href="/ui/"
                    className="px-4 py-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 font-bold text-xs sm:text-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>直达弹药库 ↗</span>
                  </Link>
                )}

                {currentStation.id === "outpost" && (
                  <button
                    type="button"
                    onClick={() => setShowWechatModal(true)}
                    className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>微信咨询</span>
                  </button>
                )}

                <div className="text-[10px] font-mono text-slate-400 ml-auto hidden sm:block">
                  滑动探索下一个星球 ↓
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Guidance Prompt on Earth */}
          {scrollProgress < 0.08 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 text-xs font-mono text-cyan-400/80 animate-bounce">
              <span>向下滚动 · 启动曲率引擎前往月球</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Deep Space Terminal Station / Final Landing Area (0 to 15 AU destination) */}
      <section
        id="terminal-base"
        className="relative z-30 bg-slate-950 border-t border-cyan-500/20 py-20 px-4 sm:px-6 lg:px-8 text-white"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 font-mono text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>15.0 AU · 星际航线已全部贯通</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            深空前哨指挥部 · 合作与启航
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            从地球母港的商业启航，到月球 Salin UI 界面军械库、火星 FoodOps 餐饮实战、木星商业知识库、土星实战手记。
            不聊空洞概念，只交付客户愿意买单的真实生产力。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowWechatModal(true)}
              className="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>微信沟通合作</span>
            </button>

            <Link
              href="/ui/"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Salin UI 弹药库 ↗</span>
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>商务对接通道</span>
            </Link>

            <button
              type="button"
              onClick={() => handleWarpTo(0)}
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs sm:text-sm border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重返地球母港再次航行 ↺</span>
            </button>
          </div>

          {/* Terminal Footer */}
          <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
            <div>© {new Date().getFullYear()} WANG SALIN · ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/wangsalin" target="_blank" className="hover:text-slate-300">
                GitHub
              </Link>
              <Link href="https://x.com/EyuSalin" target="_blank" className="hover:text-slate-300">
                X (Twitter)
              </Link>
              <Link href="/ui/" className="hover:text-emerald-400">
                Salin UI 弹药库
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tactical Project Modal */}
      <PlanetModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* WeChat Modal */}
      {showWechatModal && (
        <div
          onClick={() => setShowWechatModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 max-w-sm w-full text-center space-y-4 shadow-2xl"
          >
            <h4 className="text-lg font-bold text-white">添加狗哥微信</h4>
            <p className="text-xs text-slate-400">
              请备注来意（如：AI 工具定制 / 商业合作 / Salin UI）
            </p>
            <div className="relative w-56 h-56 mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white p-2">
              <img
                src="/images/wechat-qr.jpg"
                alt="狗哥微信二维码"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowWechatModal(false)}
              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
