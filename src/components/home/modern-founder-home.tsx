"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Terminal,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Scan,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  Store,
  Compass,
  Zap,
  Flame,
  Award,
  Layers,
  Bot,
  MapPin,
  TrendingUp,
  Cpu,
  Coffee,
  Database,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/data/site";

// 桌面手办与灵感物件
const DESK_TOYS = [
  {
    id: "luffy",
    name: "路飞手办",
    series: "海贼王 · 出海少年",
    motto: "认准了当海贼王就绝不回头",
    desc: "12年创业无论顺境逆境，永远保持出海冒险的少年热血。认准了就走到底。",
    image: "/images/toys/luffy-figure.jpg",
    tag: "ONE PIECE // LUFFY",
  },
  {
    id: "genji",
    name: "源氏手办",
    series: "守望先锋 · 机械游侠",
    motto: "身虽为机械，心犹是人魂",
    desc: "AI 与代码是最锋利的刃，但实体商业的真实痛点与洞察才是不可替代的灵魂。",
    image: "/images/toys/overwatch-figure.jpg",
    tag: "OVERWATCH // GENJI",
  },
  {
    id: "dog",
    name: "狗哥柴犬",
    series: "图腾 · 真实皮实",
    motto: "不装逼，做点有趣且真实的事",
    desc: "接地气、诚恳、皮实耐造。十几年来在小店烟火气与代码终端之间自由穿行。",
    image: "/images/toys/dog-mascot.jpg",
    tag: "MASCOT // SHIBA",
  },
  {
    id: "eyu",
    name: "饿鱼 2014",
    series: "图腾 · 2000+ 餐饮服务",
    motto: "始于舌尖，不忘初心",
    desc: "2014-2021《舌尖上的临沂》官方徽章。吃包子的鳄鱼，记录 2000 多家实体店的烟火记忆。",
    image: "/images/brand/eyu-official-hi-res.png",
    tag: "EYU // 2014 VINTAGE",
  },
];

// 英雄大图交互热点 (基于实战工作台大图)
const HERO_HOTSPOTS = [
  {
    id: "elidashboard",
    title: "01 // 饿狸 (youeli.com) 餐饮看板",
    desc: "平板实时运行饿狸增长引擎，实时解析实体门店翻台率、毛利率与引流数据。",
    coords: "left-[76%] top-[50%]",
  },
  {
    id: "offline",
    title: "02 // 实体店压粉锤与前台小票夹",
    desc: "4年亲历开店、开吧台的实操物证。每天算毛利、抠损耗，深知实体生意的艰难。",
    coords: "left-[18%] top-[45%]",
  },
  {
    id: "toys",
    title: "03 // 出海少年与机械身代码",
    desc: "桌面常驻海贼王路飞与源氏手办。身虽由机械与代码铸就，心永远保持少年的热血出海。",
    coords: "left-[79%] top-[24%]",
  },
  {
    id: "eyutotem",
    title: "04 // 2014 饿鱼图腾与十年笔记",
    desc: "桌角真实的绿色吃包子鳄鱼徽章与创业手账本。2014 愚人节起步，12年不改其志。",
    coords: "left-[30%] top-[72%]",
  },
];

// 饿狸实战 3D 场景切换配置 (图三、四、五修改整合)
const ELI_SCENES = [
  {
    id: "kitchen",
    label: "后厨毛利分析",
    sub: "菜品成本与毛利率精细核算",
    image: "/images/projects/eli/eli-scene-kitchen.jpg",
    desc: "实时把脉招牌菜与低效菜品，精准把控食材毛利与出品品质。",
  },
  {
    id: "meeting",
    label: "餐饮增长中心",
    sub: "门店营业额与翻台率推演",
    image: "/images/projects/eli/eli-scene-meeting.jpg",
    desc: "推演淡季引流套餐与客流复购，让每一次营销活动都有据可依。",
  },
  {
    id: "desk",
    label: "商家获客工作台",
    sub: "小红书/点评文案与内容日历",
    image: "/images/projects/eli/eli-scene-desk.jpg",
    desc: "一键生成探店文案与爆款笔记，彻底告别老板不会写、员工不愿拍。",
  },
];

// 破冰交流建议话题
const CONVERSATION_STARTERS = [
  "你好 Salin，我想聊聊实体门店接入「饿狸」AI 获客工具",
  "Salin 好，想交流下 Salin UI 前端设计系统与 MCP 工作流",
  "你好狗哥，看了你的 12 年餐饮经历，想交流下本地生活与自媒体",
];

export function ModernFounderHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeStr, setTimeStr] = useState("");
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTopic, setCopiedTopic] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [selectedToy, setSelectedToy] = useState<typeof DESK_TOYS[0]>(DESK_TOYS[0]);
  const [activeEliScene, setActiveEliScene] = useState<typeof ELI_SCENES[0]>(ELI_SCENES[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = 5;

  // 实时时钟更新
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
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 监听容器滚动，计算当前 Slide 索引
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeSlide && index >= 0 && index < totalSlides) {
      setActiveSlide(index);
    }
  };

  // 跳转到指定 Slide
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const targetY = index * containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  // 键盘快捷键监听 (上/下方向键)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (activeSlide < totalSlides - 1) {
          scrollToSlide(activeSlide + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeSlide > 0) {
          scrollToSlide(activeSlide - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(siteConfig.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  const handleCopyMcp = () => {
    navigator.clipboard.writeText("npx salin-ui add @mcp/server");
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyTopic = (topic: string) => {
    navigator.clipboard.writeText(topic);
    setCopiedTopic(topic);
    setTimeout(() => setCopiedTopic(null), 2000);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050806] text-[#E1E8E3] select-none font-sans">
      {/* 顶部悬浮取景器 HUD */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/[0.07] bg-[#050806]/80 backdrop-blur-md">
        {/* 左侧：Salin 品牌与实时坐标 */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => scrollToSlide(0)}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-emerald-400 transition-colors">
              SALIN // BUILDER & FOUNDER
            </span>
          </button>
          <span className="hidden md:inline text-white/30 text-xs font-mono">|</span>
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-white/60">
            <span>LINYI [35.1041° N, 118.3561° E]</span>
            <span className="text-white/30">·</span>
            <span className="text-emerald-400 font-semibold">{timeStr || "21:10:00"} CST</span>
            <span className="text-white/30">·</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
              12Y ODYSSEY
            </span>
          </div>
        </div>

        {/* 中间：全屏画卷 5 大页快速切换器 */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] shadow-inner font-mono text-xs">
          {[
            { id: 0, label: "01 封面画卷" },
            { id: 1, label: "02 十二年历程" },
            { id: 2, label: "03 饿狸 (youeli.com)" },
            { id: 3, label: "04 军火库 (SalinUI+资源库)" },
            { id: 4, label: "05 生活与连接" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSlide(tab.id)}
              className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === tab.id
                  ? "bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 右侧：触达与页码指示 */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 font-mono text-xs">
          <button
            onClick={handleCopyWechat}
            className="px-2.5 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs"
          >
            {copiedWechat ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copiedWechat ? "已复制微信" : `微信号: ${siteConfig.wechat}`}</span>
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            className="hidden sm:inline-flex px-2.5 py-1 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.04] text-white/80 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <Scan className="w-3 h-3 mr-1 text-emerald-400" />
            二维码
          </button>
          <div className="px-2 py-1 rounded bg-white/[0.06] border border-white/10 text-white font-mono text-[11px] font-bold">
            [{String(activeSlide + 1).padStart(2, "0")} / 05]
          </div>
        </div>
      </header>

      {/* 右侧垂直滑动导轨与指示器 */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3">
        <button
          onClick={() => activeSlide > 0 && scrollToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          className="p-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 disabled:opacity-20 text-white/70 hover:text-white transition-all cursor-pointer"
          title="上一页 (Arrow Up)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-2 py-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              title={`跳转到第 ${idx + 1} 页`}
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? "w-2.5 h-6 bg-emerald-400 shadow-[0_0_10px_#10b981]"
                    : "w-2 h-2 bg-white/20 group-hover:bg-white/50"
                }`}
              />
              <span className="absolute right-6 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => activeSlide < totalSlides - 1 && scrollToSlide(activeSlide + 1)}
          disabled={activeSlide === totalSlides - 1}
          className="p-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 disabled:opacity-20 text-white/70 hover:text-white transition-all cursor-pointer"
          title="下一页 (Arrow Down)"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 全屏滑动主体容器 (Snap Scrolling 100vh) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ============================================================ */}
        {/* SLIDE 01: 封面画卷 (实战工作台大图 · 融合开店物证与 AI 终端) */}
        {/* ============================================================ */}
        <section
          id="slide-0"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-between px-4 sm:px-12 lg:px-20 pt-18 pb-6"
        >
          {/* 取景器四角十字标记 */}
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">+</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">+</div>
          <div className="absolute bottom-6 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">+</div>
          <div className="absolute bottom-6 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">+</div>

          {/* 背景巨型建筑字体水印 SALIN (高质感镂空描边 + 微光渐变底色) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
            {/* 氛围绿色极弱光晕 */}
            <div className="absolute w-[70vw] h-[35vh] top-[18%] rounded-full bg-emerald-500/[0.05] blur-[100px]" />
            <div className="relative flex items-center justify-center -translate-y-4 sm:-translate-y-8">
              <span
                className="text-[24vw] sm:text-[22vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/[0.18] via-white/[0.07] to-transparent whitespace-nowrap font-mono select-none"
                style={{
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.16)",
                  letterSpacing: "-0.04em",
                }}
              >
                SALIN
              </span>
            </div>
          </div>

          {/* 顶部居中宣言栏 */}
          <div className="relative z-10 text-center max-w-4xl mx-auto pt-2 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SALIN // 2014.04.01 — 2026 ODYSSEY
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              从实体餐饮 <span className="text-emerald-400 font-serif italic">2000+</span> 商家服务，到自研 AI 商业化落地。
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto font-sans">
              我是 <strong className="text-white font-semibold">Salin</strong>（身边朋友大多叫我<span className="text-emerald-400 font-semibold">狗哥</span>）。12年真实摸爬滚打 · 实体店创业者 · 全栈独立开发者 · 饿狸 (youeli.com) 创始人
            </p>
          </div>

          {/* 中间核心：实战创作者工作台 16:9 巨幅画卷大图 */}
          <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 max-h-[50vh] min-h-[260px] my-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black group">
              <Image
                src="/images/showcase/salin-hero-workbench.jpg"
                alt="Salin 真实创作者与开店实操工作台大图"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* 交互探针 */}
              {HERO_HOTSPOTS.map((spot) => (
                <div
                  key={spot.id}
                  className={`absolute ${spot.coords} -translate-x-1/2 -translate-y-1/2 z-20`}
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    className="relative flex items-center justify-center w-7 h-7 rounded-full bg-black/70 border border-emerald-400/80 text-emerald-300 hover:scale-125 transition-all shadow-[0_0_12px_rgba(16,185,129,0.6)] cursor-pointer"
                    title={spot.title}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </button>

                  {/* 弹出式微型卡片 */}
                  {activeHotspot === spot.id && (
                    <div className="absolute left-1/2 bottom-9 -translate-x-1/2 w-64 p-3 rounded-xl bg-black/95 border border-emerald-500/50 backdrop-blur-xl shadow-2xl z-30 font-sans text-left">
                      <div className="font-mono text-[11px] text-emerald-400 font-bold mb-1">
                        {spot.title}
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        {spot.desc}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* 展柜底部参数标签 */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/60">
                <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10">
                  [ ARTIFACT // SALIN'S FOUNDER WORKBENCH ]
                </span>
                <span className="text-emerald-400 hidden sm:inline">
                  ● 点击发光探针检视开店物证、手办与 AI 看板
                </span>
              </div>
            </div>
          </div>

          {/* 底部：三大核心数据与行动胶囊 */}
          <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-white/10 font-mono text-xs">
            <div className="sm:col-span-8 flex flex-wrap items-center gap-4 sm:gap-6 text-left">
              <div>
                <span className="text-white/40 text-[10px] block">ORIGIN</span>
                <span className="text-white font-bold">2014.04.01 愚人节</span>
              </div>
              <div>
                <span className="text-white/40 text-[10px] block">RESTAURANTS</span>
                <span className="text-emerald-400 font-bold">2,000+ 实体餐饮</span>
              </div>
              <div>
                <span className="text-white/40 text-[10px] block">DEV ARSENAL</span>
                <span className="text-white font-bold">252+ TSX / 2400+ 资源</span>
              </div>
            </div>

            <div className="sm:col-span-4 flex items-center justify-end gap-2.5">
              <a
                href="https://youeli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>饿狸 (youeli.com) ↗</span>
              </a>
              <button
                onClick={() => scrollToSlide(1)}
                className="p-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.05] text-white transition-all cursor-pointer"
                title="检阅 12 年史诗"
              >
                <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 02: 十二年餐饮摸爬滚打史诗 (左实拍胶片带官方饿鱼标，右阶梯纵向轴) */}
        {/* ============================================================ */}
        <section
          id="slide-1"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#050806] via-[#080d09] to-[#050806]"
        >
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[02]</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            ARCHIVE // 2014—2026
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧 (45%)：2017 实拍热气腾腾大照片 + 官方高保真饿鱼 Logo (X盘源文件) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] max-h-[58vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <Image
                  src="/images/portrait/salin-2017-food.png"
                  alt="2017年舌尖上的临沂热气腾腾实拍"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* 饿鱼 2014 正版官方 Logo 标牌 (来自 X:\舌尖上的临沂\【logo】) */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/85 border border-emerald-500/40 backdrop-blur-md shadow-xl">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/10 p-0.5">
                    <Image
                      src="/images/brand/eyu-official-hi-res.png"
                      alt="2014 饿鱼官方Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-white flex items-center gap-1">
                      <span>饿鱼 · EYU</span>
                      <span className="text-[10px] text-emerald-400">2014 ORIGIN</span>
                    </div>
                    <div className="text-[10px] text-white/60">《舌尖上的临沂》官方图腾</div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/70">
                  <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10">
                    [ EXPOSURE // 2017.06.18 LINYI ]
                  </span>
                  <span className="text-emerald-400">实拍真实烟火</span>
                </div>
              </div>
            </div>

            {/* 右侧 (55%)：垂直时间阶梯轴 */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  THE 12-YEAR FOUNDER ODYSSEY
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  创业开了一个愚人节玩笑，
                  <br />
                  我用十二年把它变成对实体商业的敬畏。
                </h2>
              </div>

              <div className="space-y-2.5 font-sans">
                {/* 阶段 1 */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-0.5">
                    <span className="font-bold">2014.04.01 · 创业的愚人节</span>
                    <span className="text-white/40">STAGE 01</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    创业就像开了一个天大的愚人节玩笑。从 0 到 1 创立《舌尖上的临沂》，投身地方自媒体浪潮。
                  </p>
                </div>

                {/* 阶段 2 */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-0.5">
                    <span className="font-bold">2014 — 2021 · 餐饮服务者 (7年深耕)</span>
                    <span className="text-white/40">2,000+ RESTAURANTS</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    自媒体矩阵累计服务超 2000 家餐饮，亲眼见证餐饮老板每一个营销、流量与生存痛点。
                  </p>
                </div>

                {/* 阶段 3 */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-amber-400 mb-0.5">
                    <span className="font-bold">2021 — 2025 · 餐饮从业者 (4年躬身开店)</span>
                    <span className="text-white/40">IN THE TRENCHES</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    从岸上服务者下场变成水里的店老板。亲自管店、抓品控、算损耗，体会每天跑冒滴漏之苦。
                  </p>
                </div>

                {/* 阶段 4 */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 hover:border-emerald-500/60 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-emerald-300 mb-0.5">
                    <span className="font-bold">2026 · 认知觉醒，重返服务者</span>
                    <span className="text-emerald-400">AI × MERCHANTS</span>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    带着对实体商业刻骨铭心的深度认知与自研 AI 重新杀回服务者行列。打造「饿狸」，彻底斩断获客困境！
                  </p>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between font-mono text-xs text-white/50">
                <span>“只有真刀真枪开过店的人，做出的 AI 才不飘。”</span>
                <button
                  onClick={() => scrollToSlide(2)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  前往饿狸 (youeli.com) →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 03: 旗舰项目 · 饿狸 (实战 3D 餐饮场景切换与标语) */}
        {/* ============================================================ */}
        <section
          id="slide-2"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#050806] via-[#08120d] to-[#050806]"
        >
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[03]</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            FLAGSHIP // youeli.com
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧 (52%)：标语、官方网址与三大实战解法 */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                    <Bot className="w-3.5 h-3.5" />
                    FLAGSHIP // 实体商家 AI 获客武器
                  </div>
                  <a
                    href="https://youeli.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] text-white font-mono text-xs transition-colors"
                  >
                    <span>官方网址: youeli.com</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>

                {/* 用户钦定主标语 */}
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  “餐饮营销没思路，
                  <br />
                  <span className="text-emerald-400 font-serif italic">问问饿狸。”</span>
                </h2>

                <div className="text-base sm:text-xl font-bold font-mono text-emerald-300 tracking-wide">
                  找客流 | 做活动 | 写文案，问问饿狸。
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                实体老板不需要假大空的数字化报表。饿狸把复杂的 AI Agent 包装成极简工具，解决小店最头疼的“怎么发小红书、怎么做营销活动、怎么把客人招揽进门”。
              </p>

              {/* 三大实战功能卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-sans pt-1">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                    01 // 爆款内容日历
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    大众点评、小红书、抖音探店文案一键产出，解决老板不会写、员工不愿拍。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                    02 // 引流活动策划
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    工作日淡季、开业周年庆引流方案智能推演，核算真实毛利，拒绝瞎打折。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                    03 // 差评公关诊断
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    深度解析差评根因，智能输出高情商回复，把脉门店复购率与客单价。
                  </p>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://youeli.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  立即访问 youeli.com ↗
                </a>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-mono text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Scan className="w-4 h-4 text-emerald-400" />
                  预约门店 AI 方案
                </button>
              </div>
            </div>

            {/* 右侧 (48%)：饿狸 3D 真实实战场景画卷 (支持 3 场景交互切换) */}
            <div className="lg:col-span-6 flex flex-col items-center space-y-2.5">
              {/* 场景切换药丸 */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px]">
                {ELI_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveEliScene(scene)}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeEliScene.id === scene.id
                        ? "bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {scene.label}
                  </button>
                ))}
              </div>

              {/* 大图容器 */}
              <div className="relative w-full aspect-[16/10] max-h-[50vh] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-black group">
                <Image
                  src={activeEliScene.image}
                  alt={activeEliScene.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-white/80">
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-emerald-500/30 text-emerald-300">
                    [ {activeEliScene.label} // {activeEliScene.sub} ]
                  </span>
                  <a
                    href="https://youeli.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-bold transition-colors"
                  >
                    youeli.com ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 04: 双核开发者与商业军火库 (Salin UI + 狗哥资源库) */}
        {/* ============================================================ */}
        <section
          id="slide-3"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#050806] via-[#090e0b] to-[#050806]"
        >
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[04]</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            DUAL ARSENAL // UI & RESOURCES
          </div>

          <div className="max-w-7xl mx-auto w-full space-y-4">
            <div className="text-center max-w-3xl mx-auto space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                <Database className="w-3.5 h-3.5" />
                BUILDER ECOSYSTEM // 开发者与实体商业双核弹药
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                前端纯净代码库，与两千份落地商业资产。
              </h2>
            </div>

            {/* 双大卡横向对比布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pt-1">
              {/* 卡片 A: Salin UI */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div className="space-y-3">
                  <div className="relative w-full aspect-[16/9] max-h-[28vh] rounded-xl overflow-hidden border border-white/10 bg-black">
                    <Image
                      src="/images/showcase/project-salin-ui.jpg"
                      alt="Salin UI 开发者组件弹药库大图"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 font-mono text-[10px] text-emerald-400">
                      252+ TSX COMPONENTS
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                      <span className="font-bold">SALIN UI // 前端设计军火库</span>
                      <span className="text-white/40">REACT 19 & TAILWIND V4</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      专为 Cursor、Claude、Antigravity 调教极致优雅的前端骨架。零冗余三方包、纯净 TSX，原生 MCP 协议支持。
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/80 border border-white/10 font-mono text-xs flex items-center justify-between">
                    <code className="text-emerald-300 text-[11px] truncate">
                      npx salin-ui add @mcp/server
                    </code>
                    <button
                      onClick={handleCopyMcp}
                      className="px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedMcp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedMcp ? "已复制" : "复制"}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10 font-mono text-xs">
                  <span className="text-white/40 text-[11px]">文档: salin.wang/ui</span>
                  <a
                    href="https://salin.wang/ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>体验 Salin UI ↗</span>
                  </a>
                </div>
              </div>

              {/* 卡片 B: 狗哥资源站 (Gouge Hub) */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div className="space-y-3">
                  <div className="relative w-full aspect-[16/9] max-h-[28vh] rounded-xl overflow-hidden border border-white/10 bg-black">
                    <Image
                      src="/images/showcase/project-gouge-hub.jpg"
                      alt="狗哥资源库 2400+ 免费商业资产大图"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 font-mono text-[10px] text-emerald-400">
                      2,400+ 免费商业与 AI 资产
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                      <span className="font-bold">狗哥资源库 // GOUGE HUB</span>
                      <span className="text-white/40">zl.eyu.ink · 免费开放</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      汇集 12 年沉淀的餐饮营销策划、自媒体运营模版、实战 Prompt 词库与商业闭环 SOP，永久免费开放给全国创业者与开发者。
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-white/80">
                      2400+ 资产
                    </div>
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-white/80">
                      实体店策划
                    </div>
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-emerald-400">
                      永久免费
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10 font-mono text-xs">
                  <span className="text-white/40 text-[11px]">备用: ziliaoku.fun</span>
                  <a
                    href="https://zl.eyu.ink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>进入狗哥资源库 ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 05: 真实生活、手办与触达优化 (三栏画卷 左实拍人物，中手办展柜，右触达控制台) */}
        {/* ============================================================ */}
        <section
          id="slide-4"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-6 bg-gradient-to-b from-[#050806] via-[#09100c] to-[#040605]"
        >
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[05]</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            STUDIO & CONNECT // 真实与触达
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 栏 1 (左 28%)：2025 山路人物实拍大图 */}
            <div className="lg:col-span-3 hidden lg:flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] max-h-[56vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <Image
                  src="/images/portrait/salin-2025.jpg"
                  alt="2025年 Salin 在山路上的实拍照片"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-white/70 flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-black/70 border border-white/10">
                    2025 · MOUNTAIN ROAD
                  </span>
                  <span className="text-emerald-400">KEEP REAL</span>
                </div>
              </div>
            </div>

            {/* 栏 2 (中 44%)：桌面手办与灵感物件展柜 */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 tracking-wider mb-1">
                  <Coffee className="w-3.5 h-3.5" />
                  DESK TOYS & SPIRIT INSPIRATION
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  桌面上的公仔，写代码时的少年气。
                </h3>
              </div>

              {/* 4 个手办网格 */}
              <div className="grid grid-cols-4 gap-2">
                {DESK_TOYS.map((toy) => (
                  <button
                    key={toy.id}
                    onClick={() => setSelectedToy(toy)}
                    className={`p-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedToy.id === toy.id
                        ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                    }`}
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/60 mb-1">
                      <Image
                        src={toy.image}
                        alt={toy.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="font-mono text-[11px] font-bold text-white truncate text-center">
                      {toy.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* 当前选中手办独白 */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-emerald-500/30 font-sans space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-emerald-400">{selectedToy.series}</span>
                  <span className="text-white/40 text-[10px]">{selectedToy.tag}</span>
                </div>
                <div className="text-xs font-bold text-white italic">
                  “{selectedToy.motto}”
                </div>
                <p className="text-[11px] text-white/75 leading-relaxed">
                  {selectedToy.desc}
                </p>
              </div>

              {/* 破冰交流建议 */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="text-white/40 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>点击快捷复制沟通意向（可直接在微信中粘贴）：</span>
                </div>
                <div className="flex flex-col gap-1">
                  {CONVERSATION_STARTERS.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyTopic(topic)}
                      className="px-2.5 py-1 rounded bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-left text-white/80 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span className="truncate">{topic}</span>
                      <span className="text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        {copiedTopic === topic ? "已复制!" : "复制"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 栏 3 (右 28%~32%)：直达连接控制台 */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 shadow-xl">
              <div>
                <div className="font-mono text-xs text-emerald-400 font-bold mb-1">
                  DIRECT ACCESS // 快速联系
                </div>
                <h4 className="text-lg font-bold text-white">随时与 Salin 打个招呼</h4>
                <p className="text-xs text-white/60 pt-0.5">
                  实体获客、代码合作、亦或交流创业经历，皆可直接沟通。
                </p>
              </div>

              {/* 微信控制卡片 */}
              <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="relative w-14 h-14 rounded-lg overflow-hidden border border-emerald-500/50 bg-white p-0.5 shrink-0 cursor-pointer group"
                    title="点击放大二维码"
                  >
                    <Image
                      src="/images/wechat-qr.jpg"
                      alt="Salin 微信二维码缩略图"
                      fill
                      className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-white/40 font-mono">WECHAT ID</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 truncate">
                      {siteConfig.wechat}
                    </div>
                    <div className="text-[10px] text-white/60">扫码或复制均可添加</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                  <button
                    onClick={handleCopyWechat}
                    className="py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold inline-flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedWechat ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWechat ? "已复制" : "复制微信"}</span>
                  </button>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="py-1.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-medium inline-flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Scan className="w-3 h-3 text-emerald-400" />
                    <span>查看大码</span>
                  </button>
                </div>
              </div>

              {/* 邮箱直达 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs">
                <div className="truncate">
                  <span className="text-white/40 text-[10px] block">EMAIL</span>
                  <span className="text-white text-xs">{siteConfig.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-1 rounded bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* 阵地链接 */}
              <div className="pt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-white/50 border-t border-white/10 pt-2">
                <a href="https://github.com/wangsalin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  GitHub ↗
                </a>
                <a href="https://x.com/EyuSalin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  X (Twitter) ↗
                </a>
                <a href="https://zl.eyu.ink" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  资源库 ↗
                </a>
                <span>公众号: 狗哥的胡思乱想</span>
              </div>
            </div>
          </div>

          {/* 极简底部声明 */}
          <div className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[10px] text-white/25">
            © 2014—2026 SALIN. ALL RIGHTS RESERVED. 35.1041° N, 118.3561° E.
          </div>
        </section>
      </div>

      {/* 微信二维码高清弹窗 */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#0c120e] border border-emerald-500/40 p-6 text-center shadow-2xl space-y-4">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="font-mono text-xs text-emerald-400 font-bold tracking-wider">
                WECHAT DIRECT // 微信直接沟通
              </div>
              <h3 className="text-xl font-bold text-white">扫描二维码添加微信</h3>
              <p className="text-xs text-white/60">
                微信号: <code className="text-emerald-400 font-mono font-bold">{siteConfig.wechat}</code>
              </p>
            </div>

            <div className="relative w-56 h-56 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500/50 bg-white p-2 shadow-inner">
              <Image
                src="/images/wechat-qr.jpg"
                alt="Salin 微信二维码"
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="pt-1">
              <button
                onClick={handleCopyWechat}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copiedWechat ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWechat ? "微信号已成功复制" : "复制微信号 50219067"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
