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
} from "lucide-react";
import { siteConfig } from "@/data/site";

// 桌面手办与灵感物件 (somehowliving 风格)
const DESK_TOYS = [
  {
    id: "luffy",
    name: "路飞手办",
    series: "海贼王 · 出海少年",
    desc: "认准了当海贼王就绝不回头。永远保持出海冒险的少年热血与坚韧。",
    image: "/images/toys/luffy-figure.jpg",
    tag: "ONE PIECE // LUFFY",
  },
  {
    id: "genji",
    name: "源氏手办",
    series: "守望先锋 · 机械游侠",
    desc: "身虽为机械，心犹是人魂。AI 是最锋利的刀，真实的业务洞察是灵魂。",
    image: "/images/toys/overwatch-figure.jpg",
    tag: "OVERWATCH // GENJI",
  },
  {
    id: "dog",
    name: "狗哥柴犬",
    series: "图腾 · 真实皮实",
    desc: "接地气、不装逼、皮实耐造。十几年只认一条死理：做点有趣且真实的事。",
    image: "/images/toys/dog-mascot.jpg",
    tag: "MASCOT // SHIBA",
  },
  {
    id: "eyu",
    name: "饿鱼 2014",
    series: "图腾 · 2000+ 餐饮服务",
    desc: "2014-2021《舌尖上的临沂》官方徽章。吃包子的鳄鱼，记录 2000 多家小店的烟火气。",
    image: "/images/brand/eyu-logo.png",
    tag: "EYU // 2014 VINTAGE",
  },
];

// 英雄大图交互热点
const HERO_HOTSPOTS = [
  {
    id: "eli",
    title: "01 // 饿狸 AI 获客系统",
    desc: "2026 主导项目：针对实体门店内容生产困难与活动引流乏力的自研 AI 武器库。",
    coords: "left-[48%] top-[45%]",
  },
  {
    id: "offline",
    title: "02 // 实体店压粉锤与票据",
    desc: "4年亲历开店、管店的实战物证。每天算损耗、搞品控，深知实体生意的血与泪。",
    coords: "left-[68%] top-[60%]",
  },
  {
    id: "salinui",
    title: "03 // Salin UI 军火库",
    desc: "252+ 纯净 TSX 组件库，专为 Cursor、Claude 与 Agent 打造的高颜值代码系统。",
    coords: "left-[32%] top-[65%]",
  },
  {
    id: "eyulogo",
    title: "04 // 2014 饿鱼图腾",
    desc: "12年前从愚人节起步，服务超2000家餐饮。初心不改，始终站在实体经营者身旁。",
    coords: "left-[50%] top-[78%]",
  },
];

export function ModernFounderHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeStr, setTimeStr] = useState("");
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
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

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060907] text-[#E1E8E3] select-none font-sans">
      {/* 顶部悬浮取景器 HUD (dsgnbyhl.com & arbatov.dev 极简风格) */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/[0.07] bg-[#060907]/80 backdrop-blur-md">
        {/* 左侧：品牌与坐标 */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => scrollToSlide(0)}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-emerald-400 transition-colors">
              WANG SALIN // 汪狗哥
            </span>
          </button>
          <span className="hidden md:inline text-white/30 text-xs font-mono">|</span>
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-white/60">
            <span>LINYI [35.1041° N, 118.3561° E]</span>
            <span className="text-white/30">·</span>
            <span className="text-emerald-400 font-semibold">{timeStr || "20:55:00"} CST</span>
            <span className="text-white/30">·</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
              12Y FOUNDER
            </span>
          </div>
        </div>

        {/* 中间：全屏画卷 5 大页快速切换器 */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] shadow-inner font-mono text-xs">
          {[
            { id: 0, label: "01 封面画卷" },
            { id: 1, label: "02 十二年历程" },
            { id: 2, label: "03 饿狸 ELI" },
            { id: 3, label: "04 SALIN UI" },
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
        {/* SLIDE 01: 封面画卷 (THE FOUNDER CANVAS // 大图视觉) */}
        {/* ============================================================ */}
        <section
          id="slide-0"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8"
        >
          {/* 取景器四角十字标记 (dsgnbyhl.com 标志性元素) */}
          <div className="absolute top-20 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">+</div>
          <div className="absolute top-20 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">+</div>
          <div className="absolute bottom-8 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">+</div>
          <div className="absolute bottom-8 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">+</div>

          {/* 背景巨型建筑字体水印 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.04]">
            <span className="text-[22vw] font-black tracking-tighter text-white whitespace-nowrap select-none font-mono">
              WANG SALIN
            </span>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧：巨幅核心物证大图 (CHI, QUÁCH & dsgnbyhl 风格) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[55vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-gradient-to-b from-white/[0.05] to-transparent p-2 group">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/showcase/hero-editorial-curated.jpg"
                    alt="汪狗哥创作者核心装备与物证"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* 暗调渐变保护 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* 交互热点探针 */}
                  {HERO_HOTSPOTS.map((spot) => (
                    <div
                      key={spot.id}
                      className={`absolute ${spot.coords} -translate-x-1/2 -translate-y-1/2 z-20`}
                    >
                      <button
                        onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                        className="relative flex items-center justify-center w-7 h-7 rounded-full bg-black/60 border border-emerald-400/80 text-emerald-300 hover:scale-125 transition-all shadow-[0_0_12px_rgba(16,185,129,0.5)] cursor-pointer"
                        title={spot.title}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </button>

                      {/* 弹出式微型标签卡 */}
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

                  {/* 底部悬浮参数 */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/60">
                    <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10">
                      [ ARTIFACT 01 // FOUNDER TOTE & SPECIMENS ]
                    </span>
                    <span className="text-emerald-400 hidden sm:inline">
                      ● 点击发光探针检视物证
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：宣言与核心主张 */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                2014.04.01 — 2026 // 12-YEAR ODYSSEY
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                从实体餐饮 <span className="text-emerald-400 font-serif italic">2000+</span> 商家服务，
                <br />
                到自研 AI 商业化落地。
              </h1>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                我是<strong className="text-white font-semibold">狗哥 (Wang Salin)</strong>。
                2014 年愚人节以《舌尖上的临沂》起步，经历了 7 年自媒体餐饮服务，又亲自下场开了 4 年实体店。
                2026 年，带着对实体商业刀刀见血的理解重返服务者行列，用自研 AI 为商家斩断获客困境。
              </p>

              {/* 三大硬核指标 */}
              <div className="grid grid-cols-3 gap-3 pt-2 font-mono border-y border-white/10 py-3 text-left">
                <div>
                  <div className="text-xs text-white/40">ORIGIN</div>
                  <div className="text-lg sm:text-xl font-bold text-white">2014.04.01</div>
                  <div className="text-[10px] text-white/60">愚人节开局</div>
                </div>
                <div>
                  <div className="text-xs text-white/40">RESTAURANTS</div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">2,000+</div>
                  <div className="text-[10px] text-white/60">深度服务商家</div>
                </div>
                <div>
                  <div className="text-xs text-white/40">DEV ARSENAL</div>
                  <div className="text-lg sm:text-xl font-bold text-white">252+ TSX</div>
                  <div className="text-[10px] text-white/60">Salin UI 弹药</div>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSlide(2)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  体验旗舰：饿狸 AI 获客
                </button>
                <button
                  onClick={() => scrollToSlide(1)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-mono text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>滑动检阅 12 年史诗</span>
                  <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                </button>
              </div>
            </div>
          </div>

          {/* 底部滚动引导 */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/40 tracking-widest hidden sm:flex items-center gap-2">
            <span>SCROLL DOWN // 滑动滚轮或按下方向键探索</span>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 02: 十二年餐饮摸爬滚打史诗 (12-YEAR ODYSSEY // 大图实拍) */}
        {/* ============================================================ */}
        <section
          id="slide-1"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#060907] via-[#090e0b] to-[#060907]"
        >
          {/* 四角标记 */}
          <div className="absolute top-20 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[02]</div>
          <div className="absolute top-20 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            ARCHIVE // 2014—2026
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧：超大 2017 实拍老照片 + 饿鱼徽章 (真实大图) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[56vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <Image
                  src="/images/portrait/salin-2017-food.png"
                  alt="2017年舌尖上的临沂热气腾腾的实拍现场"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* 饿鱼 2014 正版 Logo 烙印贴纸 */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/85 border border-emerald-500/40 backdrop-blur-md shadow-xl">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 p-0.5">
                    <Image
                      src="/images/brand/eyu-logo.png"
                      alt="2014 饿鱼官方Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-white flex items-center gap-1">
                      <span>饿鱼 · EYU</span>
                      <span className="text-[10px] text-emerald-400">2014</span>
                    </div>
                    <div className="text-[10px] text-white/60">《舌尖上的临沂》官方图腾</div>
                  </div>
                </div>

                {/* 照片底部参数 */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/70">
                  <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10">
                    [ EXPOSURE // 2017.06.18 LINYI HOTPOT ]
                  </span>
                  <span className="text-emerald-400">
                    实战记录 · 真实烟火
                  </span>
                </div>
              </div>
            </div>

            {/* 右侧：4阶段跌宕起伏的历程卡片 */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
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

              <div className="space-y-3 font-sans">
                {/* 阶段 1 */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                    <span className="font-bold">2014.04.01 · 创业的愚人节</span>
                    <span className="text-white/40">STAGE 01</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    创业就像开了一个天大的愚人节玩笑。从 0 到 1 创立《舌尖上的临沂》，投身地方自媒体浪潮。
                  </p>
                </div>

                {/* 阶段 2 */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                    <span className="font-bold">2014 — 2021 · 餐饮服务者 (7年)</span>
                    <span className="text-white/40">2,000+ RESTAURANTS</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    自媒体公众号矩阵累计服务超 2000 家餐饮，见证了无数小店的火爆与落幕，深谙实体获客痛点。
                  </p>
                </div>

                {/* 阶段 3 */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-amber-400 mb-1">
                    <span className="font-bold">2021 — 2025 · 餐饮从业者 (4年躬身开店)</span>
                    <span className="text-white/40">IN THE TRENCHES</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    从岸上的服务者下场变成水里的店老板。算毛利、抠损耗、顶房租，真实体会开店经营之苦。
                  </p>
                </div>

                {/* 阶段 4 */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 hover:border-emerald-500/60 transition-colors">
                  <div className="flex items-center justify-between font-mono text-xs text-emerald-300 mb-1">
                    <span className="font-bold">2026 · 认知觉醒，重返服务者</span>
                    <span className="text-emerald-400">AI × MERCHANTS</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    带着对实体商业刻骨铭心的认知与全栈 AI 能力再次出发。打造「饿狸」，让 AI 真正解决餐饮痛点！
                  </p>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between font-mono text-xs text-white/50">
                <span>“只有自己亏过、赚过、管过店，做出的 AI 才不飘。”</span>
                <button
                  onClick={() => scrollToSlide(2)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  检阅饿狸产品 →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 03: 旗舰项目 · 饿狸 ELI (专为实体商家打造的 AI 获客武器) */}
        {/* ============================================================ */}
        <section
          id="slide-2"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#060907] via-[#08120d] to-[#060907]"
        >
          {/* 四角标记 */}
          <div className="absolute top-20 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[03]</div>
          <div className="absolute top-20 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            FLAGSHIP // 饿狸 ELI
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧：饿狸 3D 官方品牌大图 (1024x1024 独立大图) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[480px] max-h-[54vh] rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-gradient-to-b from-emerald-950/40 to-black p-2 group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
                  <Image
                    src="/images/brand/eli-brand-full.png"
                    alt="饿狸 ELI - 实体商家 AI 获客武器"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/60">
                    <span className="px-2 py-0.5 rounded bg-black/80 border border-emerald-500/30 text-emerald-400">
                      [ 饿狸 ELI · 3D 吉祥物与品牌大标 ]
                    </span>
                    <span className="text-white/50">专为实体商家研发</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：核心标语与三大痛点解决方案 */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                  <Bot className="w-3.5 h-3.5" />
                  FLAGSHIP PRODUCT // 实体商家 AI 获客
                </div>

                {/* 用户钦定主副标语 */}
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
                实体老板不是大厂高管，不需要假大空的报表。饿狸把复杂的 AI Agent 包装成极简工具，解决小店最头疼的“怎么发小红书、怎么做营销活动、怎么把客人招揽进门”。
              </p>

              {/* 三大实战功能 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-sans pt-1">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                    01 // 爆款内容日历
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    大众点评、小红书、抖音探店笔记一键生成，解决老板不会写、员工不愿拍。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                    02 // 引流活动策划
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    工作日淡季、开业周年庆引流方案智能推演，核算成本毛利，拒绝瞎打折。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">
                    03 // 差评公关诊断
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    智能解析差评核心根因，输出高情商公关回复，把脉门店复购率与客单价。
                  </p>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://eli.eyu.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  立即体验饿狸 (eli.eyu.ink) ↗
                </a>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-mono text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Scan className="w-4 h-4 text-emerald-400" />
                  预约门店 AI 诊断
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 04: SALIN UI 开发者军火库 (252+ TSX AI UI 弹药库大图) */}
        {/* ============================================================ */}
        <section
          id="slide-3"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#060907] via-[#090d0b] to-[#060907]"
        >
          {/* 四角标记 */}
          <div className="absolute top-20 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[04]</div>
          <div className="absolute top-20 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            DEV ARSENAL // SALIN UI
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧：Salin UI 16:9 巨幅设计系统大图 */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full aspect-[16/10] max-h-[55vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <Image
                  src="/images/showcase/project-salin-ui.jpg"
                  alt="Salin UI 开发者组件弹药库高保真设计图"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* 底部悬浮参数 */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/70">
                  <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10">
                    [ 252+ CLEAN TSX ARSENAL · TAILWIND V4 ]
                  </span>
                  <span className="text-emerald-400">
                    原生 MCP 协议支持
                  </span>
                </div>
              </div>
            </div>

            {/* 右侧：开发者特性与一键终端命令 */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                  <Code2 className="w-3.5 h-3.5" />
                  DESIGN SYSTEM // 开发者弹药库
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Salin UI · 专为 AI Agent
                  <br />
                  打造的纯净前端军火库。
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                为 Cursor、Claude、Antigravity 调教极致优雅的前端骨架。无冗余三方包、纯净 TSX、Tailwind CSS v4，随拷随用。
              </p>

              {/* 终端 MCP 协议一键复制 */}
              <div className="p-3.5 rounded-xl bg-black/80 border border-emerald-500/30 shadow-inner font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-white/40 text-[10px]">
                  <span>TERMINAL // MCP PROTOCOL</span>
                  <span className="text-emerald-400">READY</span>
                </div>
                <div className="flex items-center justify-between bg-white/[0.04] p-2 rounded-lg border border-white/10">
                  <code className="text-emerald-300 font-semibold text-xs sm:text-sm">
                    npx salin-ui add @mcp/server
                  </code>
                  <button
                    onClick={handleCopyMcp}
                    className="px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedMcp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMcp ? "已复制" : "复制"}</span>
                  </button>
                </div>
              </div>

              {/* 核心特性 */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-white/40 text-[10px]">COMPONENTS</div>
                  <div className="text-base font-bold text-white">252+ 独立TSX</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-white/40 text-[10px]">FRAMEWORK</div>
                  <div className="text-base font-bold text-emerald-400">React 19 & V4</div>
                </div>
              </div>

              {/* 外链 */}
              <div className="flex items-center gap-3 pt-1 font-mono text-xs">
                <a
                  href="https://ui.eyu.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>访问 Salin UI 文档 (ui.eyu.ink)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </a>
                <a
                  href="https://github.com/wangsalin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 05: 真实生活、手办与直接触达 (LIFE, TOYS & CONNECT // 大图实拍) */}
        {/* ============================================================ */}
        <section
          id="slide-4"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#060907] via-[#0a0f0d] to-[#040605]"
        >
          {/* 四角标记 */}
          <div className="absolute top-20 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[05]</div>
          <div className="absolute top-20 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            LIFE & CONTACT // 真实触达
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧：日常桌面手办灵感网格 (somehowliving.tech 风格) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider mb-1">
                  <Coffee className="w-3.5 h-3.5" />
                  DESK ARTIFACTS & PERSONAL PASSIONS
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  来聊聊吧，做点有趣且真实的事。
                </h2>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans pt-1">
                  生活里爱收集手办公仔，写代码时认准坚韧出海。无论是门店 AI 获客合作、前端设计系统交流，还是聊聊创业路上的坑，随时打个招呼。
                </p>
              </div>

              {/* 4 大手办与图腾大图卡片 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-sans">
                {DESK_TOYS.map((toy) => (
                  <div
                    key={toy.id}
                    className="p-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/60 mb-2">
                      <Image
                        src={toy.image}
                        alt={toy.name}
                        fill
                        sizes="(max-width: 640px) 45vw, 15vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                        <span>{toy.name}</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono mb-1">{toy.series}</div>
                      <p className="text-[10px] text-white/60 leading-tight line-clamp-2">
                        {toy.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 直接联系动作栏 */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 font-mono text-xs">
                <button
                  onClick={handleCopyWechat}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold inline-flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer transition-colors"
                >
                  {copiedWechat ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWechat ? "已复制微信" : `复制微信: ${siteConfig.wechat}`}</span>
                </button>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-medium inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Scan className="w-3.5 h-3.5 text-emerald-400" />
                  <span>扫微信二维码</span>
                </button>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white/80 hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? "已复制邮箱" : siteConfig.email}</span>
                </button>
              </div>

              {/* 阵地外链矩阵 */}
              <div className="pt-1 flex flex-wrap items-center gap-4 font-mono text-[11px] text-white/50">
                <a href="https://github.com/wangsalin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  GitHub: wangsalin ↗
                </a>
                <a href="https://x.com/EyuSalin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  X (Twitter): @EyuSalin ↗
                </a>
                <a href="https://z1.eyu.ink" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  智库: z1.eyu.ink ↗
                </a>
                <span>公众号: 狗哥的胡思乱想</span>
              </div>
            </div>

            {/* 右侧：超大 2025 实拍人物大图 (山路实拍探索) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] max-h-[58vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <Image
                  src="/images/portrait/salin-2025.jpg"
                  alt="2025年狗哥在山路上的实拍照片"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* 底部悬浮标签 */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/70">
                  <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10">
                    [ 2025 SALIN // MOUNTAIN ROAD EXPEDITION ]
                  </span>
                  <span className="text-emerald-400">
                    KEEP REAL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 极简底部版权标记 */}
          <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] text-white/30">
            © 2014—2026 WANG SALIN. ALL RIGHTS RESERVED. 35.1041° N, 118.3561° E.
          </div>
        </section>
      </div>

      {/* 微信二维码弹窗 (高保真大图弹窗) */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#0d1410] border border-emerald-500/40 p-6 text-center shadow-2xl space-y-4">
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
              <h3 className="text-xl font-bold text-white">扫描二维码添加狗哥微信</h3>
              <p className="text-xs text-white/60">
                微信号: <code className="text-emerald-400 font-mono font-bold">{siteConfig.wechat}</code>
              </p>
            </div>

            <div className="relative w-56 h-56 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500/50 bg-white p-2 shadow-inner">
              <Image
                src="/images/wechat-qr.jpg"
                alt="狗哥微信二维码"
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
