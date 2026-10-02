"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageSquareQuote } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const STANDING_QUOTES = [
  "“代码跑通了，现场看一眼？”",
  "“餐饮的毛利是扣出来的，AI 是帮人省时间的。”",
  "“先看懂生意的死结，再敲第一行 Prompt。”",
  "“拒绝空中楼阁，只做能帮生意算过账的 AI。”",
];

const BENDING_QUOTES = [
  "“哎？我弯腰看看下面写了啥……”",
  "“这几个经历数据，都是肉身在门店踩出来的。”",
  "“继续往下滑，带你看看现场做了什么。”",
];

const PRONE_QUOTES = [
  "“被你发现了…… 趴着看更清楚！👀”",
  "“下面的每一个案例，我都深入现场驻场交付过。”",
  "“慢点滑，我都快趴到屏幕边缘外面去了哈哈！”",
  "“做实战就是得伏下身子，死磕到底。”",
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [quoteText, setQuoteText] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [quoteTimer, setQuoteTimer] = useState<NodeJS.Timeout | null>(null);

  // Mouse parallax interaction (desktop)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Scroll-driven animation physics
  const { scrollY } = useScroll();

  // Pose 1: Standing upright (0 -> 180px)
  const pose1Opacity = useTransform(scrollY, [0, 80, 180], [1, 0.9, 0]);

  // Pose 2: Bending forward with hands on knees (100px -> 380px)
  const pose2Opacity = useTransform(scrollY, [90, 180, 310, 390], [0, 1, 1, 0]);

  // Pose 3: Lying prone on the ground peering down over the edge (310px -> 500px+)
  const pose3Opacity = useTransform(scrollY, [310, 420], [0, 1]);

  // 3D forward lean physics for standing/bending poses
  const rawRotateX = useTransform(scrollY, [0, 340], [0, 20]);
  const rawScale = useTransform(scrollY, [0, 340], [1, 1.06]);
  const rawTranslateY = useTransform(scrollY, [0, 340], [0, 32]);

  const smoothRotateX = useSpring(rawRotateX, { stiffness: 140, damping: 22 });
  const smoothScale = useSpring(rawScale, { stiffness: 140, damping: 22 });
  const smoothTranslateY = useSpring(rawTranslateY, { stiffness: 140, damping: 22 });

  // Prone pose specific motion: gently sliding right to the bottom edge
  const rawProneY = useTransform(scrollY, [310, 520], [25, 0]);
  const smoothProneY = useSpring(rawProneY, { stiffness: 140, damping: 22 });

  // Shadows
  const standingShadowOpacity = useTransform(scrollY, [0, 220, 330], [0.35, 0.48, 0]);
  const proneShadowOpacity = useTransform(scrollY, [310, 420], [0, 0.42]);

  // Background text parallax & fade
  const bgTextY = useTransform(scrollY, [0, 450], [0, -50]);
  const bgTextOpacity = useTransform(scrollY, [0, 360], [0.95, 0.3]);

  // Dynamic speech bubble triggered by click
  const handleCharacterClick = () => {
    if (quoteTimer) clearTimeout(quoteTimer);
    const currentY = scrollY.get();
    let pool = STANDING_QUOTES;
    if (currentY > 320) {
      pool = PRONE_QUOTES;
    } else if (currentY > 100) {
      pool = BENDING_QUOTES;
    }
    const randomQuote = pool[Math.floor(Math.random() * pool.length)];
    setQuoteText(randomQuote);
    setShowQuote(true);
    const timer = setTimeout(() => setShowQuote(false), 3600);
    setQuoteTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (quoteTimer) clearTimeout(quoteTimer);
    };
  }, [quoteTimer]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#c8cbe0] dark:bg-[#12141c] text-[#1c1d24] dark:text-[#f2f1eb] transition-colors"
      style={{
        backgroundImage:
          "radial-gradient(rgba(32, 33, 40, 0.13) 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
        perspective: "1200px",
      }}
    >
      {/* 01. Giant Typographic Backdrop: "SALIN" */}
      {/* Positioned high up behind head and shoulders with wide horizontal tracking */}
      <motion.div
        style={{
          y: bgTextY,
          opacity: bgTextOpacity,
          x: mousePos.x * -14,
        }}
        className="absolute top-[clamp(52px,9vh,90px)] inset-x-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-black text-[clamp(115px,18.5vw,290px)] leading-[0.92] text-white/95 dark:text-white/10 select-none drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
          style={{
            fontFamily:
              'Impact, "Arial Narrow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: "clamp(12px, 3.2vw, 46px)",
            marginRight: "clamp(-12px, -3.2vw, -46px)",
          }}
        >
          SALIN
        </span>
      </motion.div>

      {/* 02. Interactive 3D Character Area */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-auto select-none w-full max-w-[760px]"
        style={{ perspective: "1000px" }}
      >
        {/* Floating speech bubble when clicked */}
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-14 sm:-top-16 z-30 px-4 py-2.5 bg-[#fffefa] text-[#202126] font-black text-xs sm:text-sm rounded-2xl border-2 border-[#202126] shadow-[4px_4px_0px_#202126] max-w-[340px] text-center pointer-events-none"
          >
            <div className="flex items-center justify-center gap-1.5">
              <MessageSquareQuote size={15} className="text-[#5867d2] shrink-0" />
              <span>{quoteText}</span>
            </div>
            {/* Triangle tail */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3.5 h-3.5 bg-[#fffefa] border-r-2 border-b-2 border-[#202126] rotate-45" />
          </motion.div>
        )}

        {/* --- Poses 1 & 2: Standing & Bending Forward (Scroll 0 -> 350px) --- */}
        <motion.div
          onClick={handleCharacterClick}
          style={{
            transformOrigin: "50% 92%", // Tilt forward from feet
            rotateX: smoothRotateX,
            scale: smoothScale,
            y: smoothTranslateY,
            rotateY: mousePos.x * 6,
          }}
          className="relative w-full flex justify-center cursor-pointer group"
          title="点击狗哥互动"
        >
          {/* Pose 1: Standing Upright */}
          <motion.div
            style={{ opacity: pose1Opacity }}
            className="w-full flex justify-center"
          >
            <Image
              src="/images/salin-hero-alpha.png"
              alt="Wang Salin 狗哥 3D 虚拟形象 (站姿)"
              width={768}
              height={1376}
              priority
              fetchPriority="high"
              className="h-[75vh] sm:h-[83vh] max-h-[850px] min-h-[500px] w-auto object-contain object-bottom drop-shadow-[0_22px_36px_rgba(25,27,38,0.26)] pointer-events-none"
            />
          </motion.div>

          {/* Pose 2: Bending Forward with hands on knees */}
          <motion.div
            style={{ opacity: pose2Opacity }}
            className="absolute inset-0 w-full flex justify-center"
          >
            <Image
              src="/images/salin-hero-bending-alpha.png"
              alt="Wang Salin 狗哥 3D 虚拟形象 (弯腰探视姿态)"
              width={768}
              height={1376}
              priority
              fetchPriority="high"
              className="h-[75vh] sm:h-[83vh] max-h-[850px] min-h-[500px] w-auto object-contain object-bottom drop-shadow-[0_28px_42px_rgba(25,27,38,0.32)] pointer-events-none"
            />
          </motion.div>

          {/* Hover hint */}
          <span className="absolute bottom-28 sm:bottom-36 right-1/4 translate-x-12 px-2.5 py-1 rounded-full bg-[#d5f085] text-[#1c1d24] text-[10px] font-black border border-[#202126] shadow-[2px_2px_0px_#202126] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            点我一下 💬
          </span>
        </motion.div>

        {/* Standing & Bending Ground Shadow */}
        <motion.div
          style={{ opacity: standingShadowOpacity }}
          className="w-56 sm:w-72 h-6 rounded-[100%] bg-black/35 blur-md -mt-3 shrink-0 pointer-events-none"
        />

        {/* --- Pose 3: Lying Prone On Ground Looking Over The Bottom Edge (Scroll 320px+) --- */}
        <motion.div
          onClick={handleCharacterClick}
          style={{
            opacity: pose3Opacity,
            y: smoothProneY,
            x: mousePos.x * 10,
          }}
          className="absolute bottom-0 inset-x-0 w-full flex flex-col items-center justify-end cursor-pointer group"
          title="点击狗哥互动"
        >
          <div className="relative w-full max-w-[720px] flex justify-center px-4">
            <Image
              src="/images/salin-hero-prone-alpha.png"
              alt="Wang Salin 狗哥 3D 虚拟形象 (趴在地上查看姿态)"
              width={1376}
              height={768}
              className="h-[36vh] sm:h-[45vh] max-h-[440px] min-h-[220px] w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(25,27,38,0.38)] pointer-events-none"
            />
          </div>

          {/* Prone pose horizontal contact shadow */}
          <motion.div
            style={{ opacity: proneShadowOpacity }}
            className="w-[70%] sm:w-[80%] max-w-[580px] h-6 rounded-[100%] bg-black/45 blur-lg -mt-3 shrink-0 pointer-events-none"
          />

          {/* Playful prone status pill */}
          <span className="absolute -top-6 right-8 sm:right-16 px-3 py-1 rounded-full bg-[#d5f085] text-[#1c1d24] text-[11px] font-black border border-[#202126] shadow-[3px_3px_0px_#202126] pointer-events-none">
            趴下查看中 👀
          </span>
        </motion.div>
      </div>

      {/* 03. Left Column: Editorial Headline & Tactile Stickers */}
      <div className="relative z-20 max-w-[480px] pl-6 sm:pl-10 lg:pl-16 pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col items-start gap-4 sm:gap-5">
        {/* Eyebrow badge */}
        <p className="font-mono text-[11px] sm:text-xs font-black tracking-[0.22em] text-[#474f67] dark:text-[#a0a8c2] uppercase">
          AI APPLICATION & BUSINESS PRACTITIONER
        </p>

        {/* Big Impact Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-[-0.04em] text-[#1b1d24] dark:text-white leading-[1.12]">
          你好，我是<strong className="text-[#0d0e12] dark:text-white">狗哥。</strong>
          <br />
          欢迎来到我的现场。
        </h1>

        {/* Subtitle description */}
        <p className="text-sm sm:text-[15px] text-[#424657] dark:text-[#b0b8c8] font-medium leading-[1.8] max-w-[420px]">
          用代码与实战经验探索 AI 落地。做过 6 年探店，亲自下场开过餐厅。把十多年摸爬滚打的商业死结，变成真正能跑通的 AI 实战工具。
        </p>

        {/* Tactile Stickers Stack */}
        <div className="flex flex-col items-start gap-2.5 pt-1.5" aria-label="狗哥身份与态度标签">
          {/* Sticker 1: Lime Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d5f085] text-[#1c1d24] font-black text-xs border border-[#202126] shadow-[2px_2px_0px_#202126] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>身份卡 / 实体餐饮老兵 · 临沂</span>
          </div>

          {/* Sticker 2: White Paper Note (Tilted -1deg) */}
          <div className="inline-block px-4 py-2.5 rounded-md bg-[#fffefa] text-[#202126] font-bold text-xs sm:text-sm border border-[#202126] shadow-[3px_3px_0px_#202126] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
            喜欢把「死磕现场」
            <em className="not-italic text-[#4f5fc8] font-black underline decoration-[#c7ec73] decoration-2 ml-1">
              写成真的。
            </em>
          </div>

          {/* Sticker 3: White Paper Note (Tilted +1deg) */}
          <div className="inline-block px-4 py-2.5 rounded-md bg-[#fffefa] text-[#202126] font-bold text-xs sm:text-sm border border-[#202126] shadow-[3px_3px_0px_#202126] transform rotate-1 hover:rotate-0 transition-transform cursor-default">
            主导 FoodOps 餐饮连锁 AI 落地，
            <em className="not-italic text-[#4f5fc8] font-black ml-1">
              让好点子在现场活下去。
            </em>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#fffefa] hover:bg-[#d5f085] text-[#1c1d24] font-black text-sm border-2 border-[#202126] shadow-[4px_4px_0px_#202126] hover:shadow-[5px_6px_0px_#202126] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>进入我的工作台</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* 04. Right Column: Status pill & Side Note */}
      <div className="hidden sm:inline-flex items-center gap-2 absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-20 px-3.5 py-1.5 rounded-full bg-white/75 dark:bg-[#1d202b]/80 backdrop-blur border border-[#202126]/30 text-xs font-bold text-[#292c3a] dark:text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>全国驻场 · 现场交付中</span>
      </div>

      <div className="hidden lg:block absolute right-12 bottom-12 z-20 max-w-[240px] text-right pointer-events-auto">
        <span className="text-[10px] font-mono font-black tracking-widest text-[#555d77] dark:text-[#8d96b0] uppercase block mb-1">
          ABOUT THIS SPACE
        </span>
        <p className="text-xs text-[#3f4559] dark:text-[#b4bccf] font-semibold leading-relaxed">
          七个章节，一点点认识我的经历、实战项目和正在探索的方向。
        </p>
      </div>
    </section>
  );
}
