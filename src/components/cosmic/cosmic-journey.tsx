"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CosmicCanvas } from "./cosmic-canvas";
import { PlanetRender, PlanetType } from "./planet-render";
import { CosmicHUD, WAYPOINTS } from "./cosmic-hud";
import { PlanetModal, ProjectDetail } from "./planet-modal";
import { ArrowUpRight, Sparkles, ChevronDown, MessageSquare, Mail, RotateCcw, Glasses } from "lucide-react";

const CELESTIAL_STATIONS = [
  {
    id: "earth",
    type: "earth" as PlanetType,
    name: "地球 (EARTH // 母港)",
    au: 0.0,
    kicker: "MISSION LAUNCH // 启航坐标",
    title: "汪狗哥 (Wang Salin)",
    subtitle: "做过实体商业，踩过开店的坑，写过生产级代码。现在专注用 AI 架构赋能真实商业落地。",
    tags: ["实体商业操盘", "AI 架构落地", "全栈交付"],
    ctaLabel: "查阅个人坐标",
    projectDetail: {
      id: "salin-origin",
      planetName: "地球母港",
      badge: "ORIGIN · 商业与 AI 操盘手",
      title: "汪狗哥 (Wang Salin)",
      tagline: "实体商业 x 技术研发 x AI 生产力落地",
      description:
        "这里是星际航程的母港。我是汪狗哥，具有线下实体开店经验和多年全栈架构能力。不聊空洞概念，只做能落地交付的商业产品，帮助企业与创业者用 AI 实现真正降本增效。",
      highlights: [
        "10+ 年商业与技术实操经验",
        "餐饮供应链实操操盘手",
        "技术栈覆盖 Next.js / AI Agent / MCP",
        "极度注重 ROI 与客户真实买单意愿",
      ],
      metrics: [
        { label: "实操沉淀", value: "10+ 年" },
        { label: "交付标准", value: "生产级" },
        { label: "落地率", value: "100% 真实" },
      ],
      primaryLink: { label: "预约深入交流", href: "/contact" },
      secondaryLink: { label: "阅读实战笔记", href: "/notes" },
      accentColor: "border-sky-400",
    },
  },
  {
    id: "moon",
    type: "moon" as PlanetType,
    name: "月球 (MOON // 界面弹药库)",
    au: 0.0026,
    kicker: "0.0026 AU // 近地 AI 界面军械库",
    title: "Salin UI",
    subtitle: "专为 Cursor / Claude / v0 打造的现代界面弹药库。252+ 资产组件，单文件 TSX 零依赖，原生 MCP 协议直连。",
    tags: ["252+ 优质组件", "MCP 原生直连", "零依赖单文件复制"],
    ctaLabel: "检阅 Salin UI 军械库",
    projectDetail: {
      id: "salin-ui",
      planetName: "月球界面基地",
      badge: "FLAGSHIP · AI 界面弹药库",
      title: "Salin UI",
      tagline: "专为 AI 编程打造的开箱即用高质量组件库",
      description:
        "包含 68 个基础组件、88 个业务场景组件、40 个动效组件、31 个完整页面模板及 24 个复合区块。每个组件均支持原生 MCP 协议直接注入 AI 上下文，彻底告别低质拼凑感。",
      highlights: [
        "单文件 TSX 复制即用无幽灵依赖",
        "专为现代商业界面定制美学规范",
        "原生 MCP 协议直连 Cursor / Claude",
        "完整覆盖 H5 移动端与桌面端自适应",
      ],
      metrics: [
        { label: "精选组件", value: "252+" },
        { label: "核心类目", value: "5 大类" },
        { label: "MCP 支持", value: "原生直连" },
      ],
      primaryLink: { label: "直达弹药库界面", href: "/ui/" },
      secondaryLink: { label: "查看项目详情", href: "/projects/salin-ui" },
      accentColor: "border-emerald-400",
    },
  },
  {
    id: "mars",
    type: "mars" as PlanetType,
    name: "火星 (MARS // 实体数字化)",
    au: 0.52,
    kicker: "0.52 AU // 实体数字化实战",
    title: "FoodOps 餐饮数字化系统",
    subtitle: "下场开店、踩坑亏钱、自研系统。把真实的餐饮供应链痛点转化为可落地的降本增效系统。",
    tags: ["供应链降本 18%", "后厨效率 +35%", "多门店实时看板"],
    ctaLabel: "查看实战全案",
    projectDetail: {
      id: "foodops",
      planetName: "火星开拓基地",
      badge: "ENTERPRISE FDE · 实体餐饮数字化",
      title: "FoodOps 餐饮数字化系统",
      tagline: "实体餐饮开店与供应链实战降本系统",
      description:
        "从真实开店的原料损耗率、后厨排班断层、各门店采购比价不透明等真实痛点出发，重构供应链采购、智能排班与损耗监控，帮助实体餐饮省去巨额隐形成本。",
      highlights: [
        "动态 BOM 原料损耗实时监控",
        "后厨智能工单与出餐节拍看板",
        "智能多门店比价与采购协同流",
        "单店综合损耗率实测降低 18%",
      ],
      metrics: [
        { label: "损耗降低", value: "18%" },
        { label: "效率提升", value: "+35%" },
        { label: "系统状态", value: "生产级落地" },
      ],
      primaryLink: { label: "查看实战项目", href: "/projects/foodops" },
      accentColor: "border-rose-400",
    },
  },
  {
    id: "jupiter",
    type: "jupiter" as PlanetType,
    name: "木星 (JUPITER // 知识引力场)",
    au: 4.2,
    kicker: "4.2 AU // 实体商业沉淀与实操引力",
    title: "狗哥资源库 (Gouge Hub)",
    subtitle: "聚集真实商业与创业实战资料。从 0 到 1 开店 SOP、本地生活全域获客与高性价比 AI 提效工具。",
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
    id: "blackhole",
    type: "blackhole" as PlanetType,
    name: "终极奇点 · 黑洞 (BLACK HOLE // 终点站)",
    au: 15.0,
    kicker: "15.0 AU // 宇宙引力奇点 · 视界边缘",
    title: "引力奇点 · 商业合作与共创指挥部",
    subtitle: "所有星际航程的终极引力汇聚点。从概念到落地，从技术到商业变现。在此打破维度壁垒，开启深度商业合作、企业 AI 定制与项目共创。",
    tags: ["无限引力吸积", "企业 AI 全案交付", "Salin UI 商业化", "项目共创深度合作"],
    ctaLabel: "进入奇点引力场",
    projectDetail: {
      id: "blackhole-singularity",
      planetName: "终极奇点 · 黑洞",
      badge: "EVENT HORIZON · 终极商业奇点",
      title: "引力奇点 · 商业合作与共创",
      tagline: "在时空弯曲的终点，把 AI 生产力与商业价值压缩为真实结果",
      description:
        "这里是汪狗哥（Salin）所有业务与思考的引力中心。不讲虚无概念，只做能落地交付的真实商业闭环。支持企业 AI 工作流深度定制、餐饮数字化全案、Salin UI 商业授权与私有化、早期创业联合共创。",
      highlights: [
        "企业级 AI Agent 与 MCP 基础设施定制交付",
        "实体连锁与餐饮供应链降本增效全案落地",
        "Salin UI 商业化授权、共建与私有部署",
        "创始人直联深度交流与项目操盘诊断",
      ],
      metrics: [
        { label: "引力场强", value: "∞ 奇点" },
        { label: "交付质量", value: "生产级" },
        { label: "响应速度", value: "24h 内直联" },
      ],
      primaryLink: { label: "立即预约深度沟通", href: "/contact" },
      accentColor: "border-amber-400",
    },
  },
];

export function CosmicJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [currentAU, setCurrentAU] = useState(0);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [warpMultiplier, setWarpMultiplier] = useState(0);

  // 3D Parallax & Stereoscopic Glasses states
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [stereo3D, setStereo3D] = useState(false);

  // Selected project for modal detail inspection
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [showWechatModal, setShowWechatModal] = useState(false);

  // Mouse move listener for 3D stereoscopic tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

      // Instantaneous scroll velocity for hyperspace warp streak
      const now = Date.now();
      const dt = Math.max(16, now - lastTime);
      const dy = Math.abs(scrollTop - lastScrollTop);
      const velocity = dy / dt; // px per ms
      const warp = Math.min(1, velocity * 0.45);
      setWarpMultiplier(warp);

      lastScrollTop = scrollTop;
      lastTime = now;

      // Map progress to distance in AU (0 to 15 AU)
      const au = p * 15.0;
      setCurrentAU(au);

      // Determine active station based on scroll thresholds
      if (p < 0.12) {
        setActiveStationIndex(0); // Earth
      } else if (p < 0.32) {
        setActiveStationIndex(1); // Moon
      } else if (p < 0.52) {
        setActiveStationIndex(2); // Mars
      } else if (p < 0.72) {
        setActiveStationIndex(3); // Jupiter
      } else if (p < 0.88) {
        setActiveStationIndex(4); // Saturn
      } else {
        setActiveStationIndex(5); // Black Hole
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWarpTo = (targetProgress: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;

    const targetTop = container.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  const currentStation = CELESTIAL_STATIONS[activeStationIndex] || CELESTIAL_STATIONS[0];
  const isNearBlackHole = scrollProgress > 0.84;

  return (
    <div className="relative bg-slate-950 text-white min-h-screen selection:bg-cyan-500 selection:text-slate-950">
      {/* 3D Cosmic Canvas (Starfield, warp streaks, gravitational lensing, 3D anaglyph) */}
      <CosmicCanvas
        warpSpeed={warpMultiplier}
        mouseOffset={mouseOffset}
        stereo3D={stereo3D}
        isNearBlackHole={isNearBlackHole}
      />

      {/* Cosmic HUD Telemetry & Interplanetary Waypoint Rail */}
      <CosmicHUD
        currentAU={currentAU}
        activeWaypointIndex={activeStationIndex}
        warpMultiplier={warpMultiplier}
        stereo3D={stereo3D}
        onToggleStereo3D={() => setStereo3D((prev) => !prev)}
        onWarpTo={handleWarpTo}
      />

      {/* Scroll Odyssey Track (6 viewport heights for smooth planet warping) */}
      <div ref={containerRef} className="relative h-[640vh] w-full">
        {/* Sticky 3D Space Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8">
          {/* Subtle Ambient Cosmic Glow tailored to current planet */}
          <div
            className={`absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ${
              currentStation.id === "earth"
                ? "bg-sky-500/15"
                : currentStation.id === "moon"
                ? "bg-slate-400/15"
                : currentStation.id === "mars"
                ? "bg-rose-500/15"
                : currentStation.id === "jupiter"
                ? "bg-amber-500/15"
                : currentStation.id === "saturn"
                ? "bg-yellow-500/15"
                : "bg-amber-500/25"
            }`}
          />

          {/* Central Celestial Stage (Planet + Tactical Data Card) */}
          <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
            {/* Left: 3D Photorealistic Celestial Body */}
            <div className="flex-1 flex items-center justify-center py-4">
              <PlanetRender
                type={currentStation.type}
                size={
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 250
                    : currentStation.id === "saturn"
                    ? 440
                    : currentStation.id === "blackhole"
                    ? 400
                    : 340
                }
                mouseOffset={mouseOffset}
                stereo3D={stereo3D}
              />
            </div>

            {/* Right: Holographic Tactical Station Card */}
            <div
              className={`flex-1 w-full max-w-xl bg-slate-950/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 border border-cyan-500/30 shadow-[0_24px_80px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                stereo3D ? "stereo-3d-active border-rose-500/40" : ""
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${mouseOffset.x * 6}deg) rotateX(${-mouseOffset.y * 6}deg) translateZ(40px)`,
                transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Station Kicker & Telemetry Coordinates */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  {currentStation.kicker}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                  STATION {activeStationIndex + 1} / 6
                </span>
              </div>

              {/* Station Planet Name */}
              <div className="text-xs font-mono text-slate-400 mb-1 tracking-wider uppercase">
                {currentStation.name}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                {currentStation.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
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
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(currentStation.projectDetail)}
                  className={`px-5 py-2.5 rounded-full font-black text-xs sm:text-sm transition-all shadow-lg flex items-center gap-1.5 cursor-pointer ${
                    currentStation.id === "blackhole"
                      ? "bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 shadow-amber-400/30"
                      : "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-400/25 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
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

                {currentStation.id === "blackhole" && (
                  <button
                    type="button"
                    onClick={() => setShowWechatModal(true)}
                    className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/25"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>微信直联</span>
                  </button>
                )}

                <div className="text-[10px] font-mono text-slate-400 ml-auto hidden sm:block">
                  {activeStationIndex < 5 ? "滑动前往下一个星球 ↓" : "已抵达终极奇点 ✦"}
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

      {/* Event Horizon Final Terminal / Black Hole Singularity Landing Base */}
      <section
        id="terminal-base"
        className="relative z-30 bg-slate-950 border-t border-amber-500/30 py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
      >
        {/* Background Singularity Accretion Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow text-amber-400" />
            <span>15.0 AU · 终极奇点引力场已完全激活</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
            引力奇点 · 商业与未来共创指挥部
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            从地球母港的商业启航，经历月球 Salin UI 界面军械库、火星 FoodOps 餐饮实操数字化、木星实战知识库、土星商业手记，最终抵达时空终极黑洞奇点。
            把技术与真实商业闭环深度融合，只交付客户愿意买单的高价值成果。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowWechatModal(true)}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>微信直接沟通需求</span>
            </button>

            <Link
              href="/ui/"
              className="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-2 cursor-pointer"
            >
              <span>检阅 Salin UI 弹药库 ↗</span>
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>提交商务合作需求</span>
            </Link>

            <button
              type="button"
              onClick={() => handleWarpTo(0)}
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs sm:text-sm border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重返地球母港再次启航 ↺</span>
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
              <Link href="/ui/" className="hover:text-cyan-400">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 max-w-sm w-full text-center space-y-4 shadow-[0_24px_80px_rgba(245,158,11,0.25)]"
          >
            <h4 className="text-xl font-black text-white">添加汪狗哥微信</h4>
            <p className="text-xs text-slate-300">
              请备注来意（如：AI 工具定制 / 餐饮数字化 / Salin UI 商业合作）
            </p>
            <div className="relative w-56 h-56 mx-auto rounded-2xl overflow-hidden border border-white/15 bg-white p-2">
              <img
                src="/images/wechat-qr.jpg"
                alt="汪狗哥微信二维码"
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
