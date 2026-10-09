"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CosmicCanvas } from "./cosmic-canvas";
import { PlanetRender, PlanetType } from "./planet-render";
import { CosmicHUD, WAYPOINTS } from "./cosmic-hud";
import { PlanetModal, ProjectDetail } from "./planet-modal";
import {
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Mail,
  RotateCcw,
  Zap,
  Radio,
  Play,
  Atom,
  Clock,
  Flame,
  Maximize2,
} from "lucide-react";

interface CelestialStation {
  id: string;
  type: PlanetType;
  name: string;
  au: number;
  kicker: string;
  title: string;
  subtitle: string;
  tags: string[];
  ctaLabel: string;
  approachVector: { enterX: number; enterY: number; exitX: number; exitY: number };
  projectDetail: ProjectDetail;
}

const CELESTIAL_STATIONS: CelestialStation[] = [
  {
    id: "earth",
    type: "earth",
    name: "地球 (EARTH // 空间母港)",
    au: 0.0,
    kicker: "MISSION LAUNCH // 空间母港",
    title: "汪狗哥 (Wang Salin)",
    subtitle: "线下实体商业操盘 × 生产级系统架构。用 AI 架构赋能真实商业落地，交付客户愿意买单的生产力。",
    tags: ["实体商业操盘", "AI 架构落地", "全栈工程交付"],
    ctaLabel: "检阅个人坐标档案",
    approachVector: { enterX: 0, enterY: 0, exitX: -240, exitY: -160 },
    projectDetail: {
      id: "salin-origin",
      planetName: "地球母港空间站",
      badge: "ORIGIN · 商业与 AI 操盘手",
      title: "汪狗哥 (Wang Salin)",
      tagline: "实体商业 x 技术研发 x AI 生产力落地",
      description:
        "这里是星际穿梭舰的母港。我是汪狗哥，具备多年线下实体开店操盘实战与全栈技术架构能力。不聊空洞虚无的概念，只做能落地交付的商业产品，帮助企业与创业者用 AI 实现真实降本增效。",
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
    type: "moon",
    name: "月球 (MOON // 界面弹药库)",
    au: 0.0026,
    kicker: "0.0026 AU // 近地轨道界面军械库",
    title: "Salin UI",
    subtitle: "专为 Cursor / Claude / v0 打造的现代界面弹药库。252+ 资产组件，单文件 TSX 零依赖，原生 MCP 协议直连。",
    tags: ["252+ 资产组件", "MCP 原生直连", "零依赖单文件复制"],
    ctaLabel: "检阅 Salin UI 军械库",
    approachVector: { enterX: 220, enterY: -140, exitX: 180, exitY: 200 },
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
    type: "mars",
    name: "火星 (MARS // 实体数字化)",
    au: 0.52,
    kicker: "0.52 AU // 实体数字化实战基地",
    title: "FoodOps 餐饮数字化系统",
    subtitle: "下场开店、踩坑亏钱、自研系统。把真实的餐饮供应链痛点转化为可落地的降本增效系统。",
    tags: ["供应链降本 18%", "后厨效率 +35%", "多门店实时看板"],
    ctaLabel: "查看实战全案",
    approachVector: { enterX: -260, enterY: 130, exitX: -160, exitY: -180 },
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
    type: "jupiter",
    name: "木星 (JUPITER // 知识引力场)",
    au: 4.2,
    kicker: "4.2 AU // 实体商业沉淀与实操引力",
    title: "狗哥资源库 (Gouge Hub)",
    subtitle: "聚集真实商业与创业实战资料。从 0 到 1 开店 SOP、本地生活全域获客与高性价比 AI 提效工具。",
    tags: ["40+ 实操手册", "私域全域打通", "持续高频收录"],
    ctaLabel: "调取知识档案",
    approachVector: { enterX: 240, enterY: 90, exitX: 160, exitY: -220 },
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
    type: "saturn",
    name: "土星 (SATURN // 思考光环)",
    au: 9.5,
    kicker: "9.5 AU // 商业落地复盘笔记",
    title: "AI 时代实战手记",
    subtitle: "记录从实体商业到 AI 架构的心得。拆解为什么大多数 AI 工具没人用，以及什么样的应用能产生商业现金流。",
    tags: ["10+ 篇深度长文", "100% 真实复盘", "商业现金流导向"],
    ctaLabel: "查阅全部手记",
    approachVector: { enterX: -200, enterY: -150, exitX: -90, exitY: 220 },
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
    type: "blackhole",
    name: "终极奇点 · 黑洞 (BLACK HOLE // 终点站)",
    au: 15.0,
    kicker: "15.0 AU // 宇宙引力奇点 · 视界边缘",
    title: "引力奇点 · 商业合作与共创指挥部",
    subtitle: "所有星际航程的终极引力汇聚点。从概念到落地，从技术到商业变现。在此打破维度壁垒，开启深度商业合作、企业 AI 定制与项目共创。",
    tags: ["无限引力吸积", "企业 AI 全案交付", "Salin UI 商业化", "项目共创深度合作"],
    ctaLabel: "进入奇点引力场",
    approachVector: { enterX: 0, enterY: 0, exitX: 0, exitY: 0 },
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

// Physical & Business Attributes of the Supermassive Black Hole
const BLACK_HOLE_ATTRIBUTES = [
  {
    id: "horizon",
    title: "事件视界 (Event Horizon)",
    subtitle: "史瓦西单向边界 · Rs = 2GM/c²",
    icon: Atom,
    physics: "光线无法逃逸的单向因果曲面，跨过视界即绝对闭合。",
    business: "【确定性闭环交付】不玩半成品或虚假概念，只交付 100% 生产级上线系统。",
    tag: "不可逆交付",
    color: "border-amber-400/40 text-amber-300",
  },
  {
    id: "dilation",
    title: "引力时间膨胀 (Time Dilation)",
    subtitle: "相对论时空弯曲 · Γ → ∞",
    icon: Clock,
    physics: "极端引力场使本地时间相对外界陷入停滞（1小时等同外界数年）。",
    business: "【帮客户节省 80% 试错时间】高维成熟架构降维落地，数天完成团队数月的摸索周期。",
    tag: "试错成本压缩",
    color: "border-rose-400/40 text-rose-300",
  },
  {
    id: "accretion",
    title: "相对论吸积盘 (Accretion Disk)",
    subtitle: "超高温等离子流 · T > 10⁷ K",
    icon: Flame,
    physics: "物质高速公转摩擦释放出宇宙中最狂暴的能量与耀眼光芒。",
    business: "【汪狗哥全域业务引力场】企业 AI Agent、餐饮供应链数字化、Salin UI 私有化商业部署。",
    tag: "全案业务承接",
    color: "border-cyan-400/40 text-cyan-300",
  },
  {
    id: "singularity",
    title: "终极引力奇点 (Singularity Core)",
    subtitle: "无限密度中心 · ρ → ∞",
    icon: Sparkles,
    physics: "时空曲率与能量密度收敛至无穷大的几何核心点。",
    business: "【商业现金流与真实 ROI】剥离一切概念泡沫，唯一考核客户真实买单意愿与现金流回报。",
    tag: "核心商业价值",
    color: "border-emerald-400/40 text-emerald-300",
  },
];

export function CosmicJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [currentAU, setCurrentAU] = useState(0);
  const [warpMultiplier, setWarpMultiplier] = useState(0);
  const [isManualWarping, setIsManualWarping] = useState(false);

  // 3D Parallax & Stereoscopic Glasses states
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [stereo3D, setStereo3D] = useState(false);

  // Modal inspection states
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

  // Continuous Scroll Flight Computation
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
      const velocity = dy / dt;
      const warp = Math.min(1, velocity * 0.5);
      setWarpMultiplier(warp);

      lastScrollTop = scrollTop;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5 Corridors between 6 stations
  const totalSegments = CELESTIAL_STATIONS.length - 1; // 5
  const exactStationPos = scrollProgress * totalSegments; // 0.0 to 5.0
  const baseStationIdx = Math.min(totalSegments - 1, Math.floor(exactStationPos));
  const segmentFraction = exactStationPos - baseStationIdx; // 0.0 to 1.0

  // Calculate dynamic AU distance
  const currentStationAu = CELESTIAL_STATIONS[baseStationIdx].au;
  const nextStationAu = CELESTIAL_STATIONS[baseStationIdx + 1]?.au ?? 15.0;
  const calculatedAU = currentStationAu + (nextStationAu - currentStationAu) * segmentFraction;

  useEffect(() => {
    setCurrentAU(calculatedAU);
  }, [calculatedAU]);

  // Is at Black Hole (station 5)
  const isAtBlackHole = exactStationPos >= 4.3;

  // Interstellar Warp Transition Zone (between planets):
  const isWarpFlight =
    isManualWarping ||
    (segmentFraction > 0.15 && segmentFraction < 0.85 && exactStationPos < totalSegments);

  const warpIntensity = isManualWarping
    ? 1.0
    : isWarpFlight
    ? Math.sin(((segmentFraction - 0.15) / (0.85 - 0.15)) * Math.PI)
    : 0;

  const activeHudIndex = Math.min(
    CELESTIAL_STATIONS.length - 1,
    Math.round(exactStationPos)
  );

  const currentStation = CELESTIAL_STATIONS[baseStationIdx];
  const nextStation = CELESTIAL_STATIONS[baseStationIdx + 1] || currentStation;

  // Spatial vector offsets: planets approach and exit from different quadrants!
  const originExitX = currentStation.approachVector.exitX * segmentFraction;
  const originExitY = currentStation.approachVector.exitY * segmentFraction;
  const originScale = 1.0 + segmentFraction * 1.8;
  const originOpacity = Math.max(0, 1.0 - segmentFraction * 2.5);

  const destEmergence = Math.max(0, (segmentFraction - 0.38) / 0.62); // 0 to 1
  const destEnterX = nextStation.approachVector.enterX * (1 - destEmergence);
  const destEnterY = nextStation.approachVector.enterY * (1 - destEmergence);
  const destScale = 0.2 + destEmergence * 0.8;
  const destOpacity = Math.min(1.0, destEmergence * 1.6);

  // Holographic card opacity & blur
  const cardOpacity = Math.max(0, 1.0 - warpIntensity * 1.5);
  const cardBlur = warpIntensity * 10;

  const handleWarpTo = (targetProgress: number) => {
    setIsManualWarping(true);
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

    setTimeout(() => {
      setIsManualWarping(false);
    }, 1100);
  };

  return (
    <div className="relative bg-slate-950 text-white min-h-screen selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 3D Cosmic Canvas (Nebulae, starfield, warp streaks, gravitational lensing, 3D anaglyph) */}
      <CosmicCanvas
        warpSpeed={Math.max(warpMultiplier, warpIntensity * 0.85)}
        mouseOffset={mouseOffset}
        stereo3D={stereo3D}
        isNearBlackHole={isAtBlackHole}
        isWarpFlight={isWarpFlight}
      />

      {/* Cosmic HUD Telemetry & Interplanetary Waypoint Rail */}
      <CosmicHUD
        currentAU={currentAU}
        activeWaypointIndex={activeHudIndex}
        warpMultiplier={Math.max(warpMultiplier, warpIntensity)}
        stereo3D={stereo3D}
        onToggleStereo3D={() => setStereo3D((prev) => !prev)}
        onWarpTo={handleWarpTo}
      />

      {/* =========================================================================
          SPACESHIP COCKPIT CANOPY FRAME & HUD FLIGHT RETICLE (穿梭舰座舱前风挡)
          ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Subtle Cockpit Canopy Frame Corner Struts */}
        <div className="absolute top-0 left-0 w-36 h-36 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-36 h-36 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-36 h-36 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl opacity-60 pointer-events-none" />

        {/* Center Flight Crosshair */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-30 transition-transform duration-75 pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${mouseOffset.x * 25}px), calc(-50% + ${mouseOffset.y * 25}px))`,
          }}
        >
          <div className="w-10 h-10 border border-cyan-400/40 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-400/60 rounded-full" />
          </div>
          <div className="absolute w-16 h-[1px] bg-cyan-400/30" />
          <div className="absolute h-16 w-[1px] bg-cyan-400/30" />
        </div>
      </div>

      {/* Scroll Odyssey Track (680vh for luxurious smooth warp travel) */}
      <div ref={containerRef} className="relative h-[680vh] w-full">
        {/* Sticky 3D Space Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8">
          {/* Ambient Cosmic Sector Glow */}
          <div
            className={`absolute w-[760px] h-[760px] rounded-full blur-[220px] pointer-events-none transition-all duration-1000 ${
              isAtBlackHole
                ? "bg-amber-500/30"
                : isWarpFlight
                ? "bg-cyan-500/20"
                : currentStation.id === "earth"
                ? "bg-sky-500/15"
                : currentStation.id === "moon"
                ? "bg-slate-400/15"
                : currentStation.id === "mars"
                ? "bg-rose-500/15"
                : currentStation.id === "jupiter"
                ? "bg-amber-500/15"
                : "bg-yellow-500/15"
            }`}
          />

          {/* =========================================================================
              FIRST SCREEN: SPACE CAPSULE BOARDING DECK (登录太空舱 / 启航第一幕)
              ========================================================================= */}
          {scrollProgress < 0.05 && (
            <div className="absolute top-16 sm:top-20 z-35 flex flex-col items-center text-center pointer-events-auto px-4 max-w-xl mx-auto space-y-3 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>SALIN-01 // 太空舱已加压锁闭 · 就绪</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                汪狗哥 · 星际穿梭旗舰
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                坐上星际穿梭舰，穿越太阳系前往终极引力黑洞。每一个星球都是一个实战落地项目。
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleWarpTo(0.18)}
                  className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(34,211,238,0.5)] flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>启动引擎 · 启航深空</span>
                </button>

                <div className="text-[11px] font-mono text-cyan-400/80 flex items-center gap-1">
                  <span>向下滚动推杆</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              INTERSTELLAR HYPERSPACE WARP TUNNEL OVERLAY (星际曲率穿梭隧道特效)
              ========================================================================= */}
          {isWarpFlight && !isAtBlackHole && (
            <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
              <div className="absolute w-72 h-72 rounded-full border-2 border-cyan-400/70 animate-warp-ring-1" />
              <div className="absolute w-72 h-72 rounded-full border-2 border-sky-300/60 animate-warp-ring-2" />
              <div className="absolute w-72 h-72 rounded-full border-2 border-purple-400/60 animate-warp-ring-3" />
              <div className="absolute w-72 h-72 rounded-full border-2 border-cyan-200/80 animate-warp-ring-4" />

              <div
                className="absolute inset-0 bg-gradient-radial from-cyan-400/15 via-transparent to-transparent pointer-events-none"
                style={{ opacity: warpIntensity }}
              />

              <div className="w-16 h-16 rounded-full bg-cyan-300/40 blur-xl animate-ping" />

              <div
                className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30 font-mono text-center space-y-1.5 transition-all duration-300 pointer-events-none"
                style={{ opacity: Math.min(1, warpIntensity * 1.5) }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/90 border border-cyan-400/60 text-cyan-300 text-[11px] font-bold shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                  <span>WARP 9.8 // 星际超空间跃迁中</span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center justify-center gap-2 font-semibold">
                  <span>{currentStation.name.split(" ")[0]}</span>
                  <span className="text-cyan-400 font-bold tracking-widest">━━━━▶</span>
                  <span className="text-cyan-300">{nextStation.name.split(" ")[0]}</span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({calculatedAU.toFixed(2)} AU)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              CASE A: SUPERMASSIVE BLACK HOLE COLOSSAL CENTERSTAGE (巨型黑洞置于屏幕中央)
              ========================================================================= */}
          {isAtBlackHole ? (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
              {/* Colossal Center Black Hole (Dominates the entire screen center) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <PlanetRender
                    type="blackhole"
                    size={
                      typeof window !== "undefined" && window.innerWidth < 640
                        ? 380
                        : typeof window !== "undefined" && window.innerWidth < 1024
                        ? 600
                        : 820
                    }
                    mouseOffset={mouseOffset}
                    stereo3D={stereo3D}
                  />
                </div>
              </div>

              {/* Centered Holographic Black Hole Attributes & Telemetry Console */}
              <div className="relative z-20 max-w-4xl w-full mx-auto px-4 mt-auto sm:mb-8 font-mono">
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-amber-400/60 text-amber-300 text-xs font-bold shadow-[0_0_30px_rgba(245,158,11,0.5)] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  <span>15.00 AU · 终极引力奇点 · 事件视界核心</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-xl mb-4 font-sans">
                  终极黑洞奇点 · 商业与未来共创指挥部
                </h2>

                {/* The 4 Distinct Scientific & Business Attributes Grid (明确黑洞的属性) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-left mb-5">
                  {BLACK_HOLE_ATTRIBUTES.map((attr) => {
                    const IconComp = attr.icon;
                    return (
                      <div
                        key={attr.id}
                        className={`holo-console rounded-xl p-3 border ${attr.color} shadow-lg transition-all duration-300 hover:border-amber-400`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <IconComp className="w-4 h-4 text-amber-400" />
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                            {attr.tag}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white tracking-wide">
                          {attr.title}
                        </div>
                        <div className="text-[10px] text-amber-400/80 mb-1.5 font-medium">
                          {attr.subtitle}
                        </div>
                        <div className="text-[10px] text-slate-300 leading-snug font-sans">
                          {attr.business}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tactical Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowWechatModal(true)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 hover:from-amber-300 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>微信直联创始人 (对接全案)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(CELESTIAL_STATIONS[5].projectDetail)}
                    className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>调取终极全案清单</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWarpTo(0)}
                    className="px-4 py-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>重返地球母港再次航行 ↺</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
               CASE B: PLANETARY STATIONS (EARTH, MOON, MARS, JUPITER, SATURN)
               ========================================================================= */
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 pt-8 sm:pt-0">
              {/* Left: 3D Celestial Body Stage (Unique Spatial Vectors & Continuous Spinning) */}
              <div className="flex-1 flex items-center justify-center py-4 relative min-h-[380px] sm:min-h-[460px]">
                {/* Origin Planet (Exit trajectory along unique spatial vector) */}
                {originOpacity > 0.02 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
                    style={{
                      opacity: originOpacity,
                      transform: `translate3d(${originExitX}px, ${originExitY}px, 0px) scale(${originScale})`,
                      pointerEvents: originOpacity > 0.4 ? "auto" : "none",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 border border-cyan-400/20 border-dashed rounded-full animate-spin-slow pointer-events-none" />
                      <PlanetRender
                        type={currentStation.type}
                        size={
                          typeof window !== "undefined" && window.innerWidth < 640
                            ? 250
                            : currentStation.id === "saturn"
                            ? 440
                            : 350
                        }
                        mouseOffset={mouseOffset}
                        stereo3D={stereo3D}
                        warpFactor={warpIntensity}
                      />
                    </div>
                  </div>
                )}

                {/* Destination Planet (Approaching along unique spatial vector from deep space) */}
                {segmentFraction > 0.35 && destOpacity > 0.02 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
                    style={{
                      opacity: destOpacity,
                      transform: `translate3d(${destEnterX}px, ${destEnterY}px, 0px) scale(${destScale})`,
                      pointerEvents: destOpacity > 0.4 ? "auto" : "none",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 border border-cyan-400/20 border-dashed rounded-full animate-spin-slow pointer-events-none" />
                      <PlanetRender
                        type={nextStation.type}
                        size={
                          typeof window !== "undefined" && window.innerWidth < 640
                            ? 250
                            : nextStation.id === "saturn"
                            ? 440
                            : 350
                        }
                        mouseOffset={mouseOffset}
                        stereo3D={stereo3D}
                        warpFactor={warpIntensity}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Holographic Flight Console Project Screen (全息战术控制台) */}
              <div
                className={`flex-1 w-full max-w-xl holo-console rounded-2xl p-6 sm:p-8 transition-all duration-300 font-mono ${
                  stereo3D ? "stereo-3d-active border-rose-500/50" : ""
                }`}
                style={{
                  opacity: isWarpFlight ? cardOpacity : 1,
                  filter: isWarpFlight ? `blur(${cardBlur}px)` : "none",
                  transform: `perspective(1000px) rotateY(${mouseOffset.x * 5}deg) rotateX(${-mouseOffset.y * 5}deg) translateZ(40px)`,
                  pointerEvents: cardOpacity > 0.4 ? "auto" : "none",
                }}
              >
                {/* Sci-Fi Corner Brackets */}
                <div className="absolute top-2 left-2 text-[10px] text-cyan-400/50 select-none">┌</div>
                <div className="absolute top-2 right-2 text-[10px] text-cyan-400/50 select-none">┐</div>
                <div className="absolute bottom-2 left-2 text-[10px] text-cyan-400/50 select-none">└</div>
                <div className="absolute bottom-2 right-2 text-[10px] text-cyan-400/50 select-none">┘</div>

                {/* Station Kicker & Telemetry Coordinates */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-cyan-500/20">
                  <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{(segmentFraction > 0.5 ? nextStation : currentStation).kicker}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    NAV-LOG #{activeHudIndex + 1}
                  </span>
                </div>

                {/* Station Planet Name */}
                <div className="text-[11px] text-slate-400 mb-1 tracking-wider uppercase">
                  {(segmentFraction > 0.5 ? nextStation : currentStation).name}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mb-2 font-sans">
                  {(segmentFraction > 0.5 ? nextStation : currentStation).title}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans">
                  {(segmentFraction > 0.5 ? nextStation : currentStation).subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(segmentFraction > 0.5 ? nextStation : currentStation).tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] sm:text-[11px] text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tactical Actions */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-cyan-500/20">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProject(
                        (segmentFraction > 0.5 ? nextStation : currentStation).projectDetail
                      )
                    }
                    className="px-4 py-2 rounded-lg font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-400/25"
                  >
                    <span>{(segmentFraction > 0.5 ? nextStation : currentStation).ctaLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {(segmentFraction > 0.5 ? nextStation : currentStation).id === "moon" && (
                    <Link
                      href="/ui/"
                      className="px-3.5 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>直达弹药库 ↗</span>
                    </Link>
                  )}

                  <div className="text-[10px] text-slate-500 ml-auto hidden sm:block">
                    推进推杆继续穿梭 ↓
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          TERMINAL BASE: EVENT HORIZON SINGULARITY COMMAND (终极奇点 · 商业指挥部)
          ========================================================================= */}
      <section
        id="terminal-base"
        className="relative z-30 bg-slate-950 border-t border-amber-500/30 py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 font-sans">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow text-amber-400" />
            <span>15.0 AU · 终极奇点引力场已完全激活</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            引力奇点 · 商业与未来共创指挥部
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            从地球母港的商业启航，经历月球 Salin UI 界面军械库、火星 FoodOps 餐饮实操数字化、木星实战知识库、土星商业手记，最终抵达时空终极黑洞奇点。
            把技术与真实商业闭环深度融合，只交付客户愿意买单的高价值成果。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono">
            <button
              type="button"
              onClick={() => setShowWechatModal(true)}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>微信直接沟通需求</span>
            </button>

            <Link
              href="/ui/"
              className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-2 cursor-pointer"
            >
              <span>检阅 Salin UI 弹药库 ↗</span>
            </Link>

            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>提交商务合作需求</span>
            </Link>

            <button
              type="button"
              onClick={() => handleWarpTo(0)}
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-cyan-500/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重返地球母港再次启航 ↺</span>
            </button>
          </div>

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
            className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-amber-500/40 max-w-sm w-full text-center space-y-4 shadow-[0_24px_80px_rgba(245,158,11,0.25)] font-mono"
          >
            <h4 className="text-lg font-black text-white font-sans">添加汪狗哥微信</h4>
            <p className="text-xs text-slate-300 font-sans">
              请备注来意（如：AI 工具定制 / 餐饮数字化 / Salin UI 商业合作）
            </p>
            <div className="relative w-52 h-52 mx-auto rounded-xl overflow-hidden border border-white/15 bg-white p-2">
              <img
                src="/images/wechat-qr.jpg"
                alt="汪狗哥微信二维码"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowWechatModal(false)}
              className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
