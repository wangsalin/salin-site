"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, MessageSquareQuote, Footprints, Sparkles, Play, Pause } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";

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

const WALKING_QUOTES = [
  "“四处溜达溜达，巡视一下现场~”",
  "“走，带你看看我的实战工作台！”",
  "“实干家从来不坐着，巡店去！”",
  "“溜达到这边瞧瞧，找找业务灵感。”",
  "“实体餐饮的死结，往往藏在不起眼的动线里。”",
  "“四处巡视一圈，稳妥！”",
];

// Presets for autonomous roaming waypoints
const DESKTOP_ROAM_SPOTS = [-220, -120, 0, 140, 240];
const MOBILE_ROAM_SPOTS = [-24, -12, 0, 12, 24];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [quoteText, setQuoteText] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [quoteTimer, setQuoteTimer] = useState<NodeJS.Timeout | null>(null);

  // --- 自由走动与自主漫游系统 (Free Roam & Autonomous Walking System) ---
  const [walkX, setWalkX] = useState(0); // Position offset in px from anchor
  const [facing, setFacing] = useState<"right" | "left">("right");
  const [isWalking, setIsWalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [autoRoam, setAutoRoam] = useState(true); // Autonomous walking on by default!
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const lastInteractionRef = useRef(Date.now());
  const walkXRef = useRef(0);
  walkXRef.current = walkX;

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

  // Pose 2: Bending forward with hands on knees (90px -> 380px)
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

  // Trigger speech bubble
  const triggerQuote = useCallback(
    (customText?: string) => {
      if (quoteTimer) clearTimeout(quoteTimer);
      if (customText) {
        setQuoteText(customText);
      } else {
        const currentY = scrollY.get();
        let pool = STANDING_QUOTES;
        if (isWalking) {
          pool = WALKING_QUOTES;
        } else if (currentY > 320) {
          pool = PRONE_QUOTES;
        } else if (currentY > 100) {
          pool = BENDING_QUOTES;
        }
        const randomQuote = pool[Math.floor(Math.random() * pool.length)];
        setQuoteText(randomQuote);
      }
      setShowQuote(true);
      const timer = setTimeout(() => setShowQuote(false), 3600);
      setQuoteTimer(timer);
    },
    [isWalking, quoteTimer, scrollY]
  );

  // Click on the character directly
  const handleCharacterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    lastInteractionRef.current = Date.now();
    triggerQuote();
  };

  // --- Click Ground to Walk There ---
  const handleGroundClick = (e: React.MouseEvent<HTMLElement>) => {
    // If clicked on an interactive link/button, ignore
    if ((e.target as HTMLElement).closest("a, button, input, [role='button']")) {
      return;
    }
    if (!containerRef.current) return;
    lastInteractionRef.current = Date.now();

    const isMobileDevice = window.innerWidth < 768;

    if (isMobileDevice) {
      // On mobile, keep character subtly moving within its right-side corridor
      const targetOffset = (Math.random() - 0.5) * 44; // -22px to +22px
      setFacing(targetOffset > walkX ? "right" : "left");
      setIsWalking(true);
      setWalkX(targetOffset);

      const rect = containerRef.current.getBoundingClientRect();
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setClickRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);

      setTimeout(() => setIsWalking(false), 450);
      if (Math.random() > 0.6) setTimeout(() => triggerQuote(), 250);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const clickXFromCenter = e.clientX - (rect.left + rect.width / 2);

    // Limit walking boundaries so character doesn't walk completely off screen
    const maxBound = Math.min(rect.width * 0.38, 420);
    const clampedX = Math.max(-maxBound, Math.min(maxBound, clickXFromCenter));

    // Direction and walk trigger
    setFacing(clampedX > walkX ? "right" : "left");
    setIsWalking(true);
    setWalkX(clampedX);

    // Add visual click ripple indicator on the floor
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setClickRipples((prev) => [...prev.slice(-4), newRipple]);
    setTimeout(() => {
      setClickRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);

    // Walk duration timer
    const distance = Math.abs(clampedX - walkX);
    const walkDuration = Math.max(500, Math.min(1200, distance * 2.5));
    setTimeout(() => setIsWalking(false), walkDuration);

    // Occasionally speak when walking
    if (Math.random() > 0.65) {
      setTimeout(() => triggerQuote(), 250);
    }
  };

  // --- Keyboard Walking: Arrow keys / WASD & Space to Jump ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")) return;
      lastInteractionRef.current = Date.now();

      const step = 48;
      const maxBound = 420;

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setFacing("left");
        setIsWalking(true);
        setWalkX((prev) => Math.max(prev - step, -maxBound));
        setTimeout(() => setIsWalking(false), 300);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setFacing("right");
        setIsWalking(true);
        setWalkX((prev) => Math.min(prev + step, maxBound));
        setTimeout(() => setIsWalking(false), 300);
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 550);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- 核心灵魂：自主漫步与巡店 AI (Autonomous Wandering Loop) ---
  useEffect(() => {
    if (!autoRoam) return;

    const wanderInterval = setInterval(() => {
      // 1. If user interacted recently (< 3.5s), don't interrupt
      if (Date.now() - lastInteractionRef.current < 3500) return;

      // 2. If user scrolled down (> 60px), character is busy bending/prone, don't wander
      if (scrollY.get() > 60) return;

      const isMobileDevice = window.innerWidth < 768;
      const spots = isMobileDevice ? MOBILE_ROAM_SPOTS : DESKTOP_ROAM_SPOTS;
      const threshold = isMobileDevice ? 10 : 70;

      // 3. Choose a random spot from predefined comfortable waypoints
      const current = walkXRef.current;
      const otherSpots = spots.filter((s) => Math.abs(s - current) >= threshold);
      if (otherSpots.length === 0) return;

      const target = otherSpots[Math.floor(Math.random() * otherSpots.length)];
      const distance = Math.abs(target - current);
      const direction = target > current ? "right" : "left";

      setFacing(direction);
      setIsWalking(true);
      setWalkX(target);

      // Walk duration proportional to distance
      const duration = Math.max(500, Math.min(1300, distance * (isMobileDevice ? 16 : 2.8)));
      setTimeout(() => {
        setIsWalking(false);

        // Chance of popping up a casual wandering reflection after arriving
        if (Math.random() < 0.28) {
          triggerQuote();
        }
      }, duration);
    }, 5500); // Decides next wander step every ~5.5s

    return () => clearInterval(wanderInterval);
  }, [autoRoam, scrollY, triggerQuote]);

  useEffect(() => {
    return () => {
      if (quoteTimer) clearTimeout(quoteTimer);
    };
  }, [quoteTimer]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onClick={handleGroundClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[var(--background)] text-[var(--text-primary)] transition-colors cursor-crosshair select-none"
      style={{
        backgroundImage:
          "radial-gradient(var(--border) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        perspective: "1200px",
      }}
      title="点击地面任意位置，让狗哥走动"
    >
      {/* 苹果风柔和弥散发光背景环境层 (Ambient Luminous Emerald Mesh) */}
      <div className="absolute top-[-10%] right-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-emerald-500/12 dark:bg-emerald-500/16 blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-[5%] left-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-lime-500/10 dark:bg-lime-500/12 blur-[100px] pointer-events-none -z-0" />

      {/* 01. Giant Typographic Backdrop: "SALIN" */}
      {/* Desktop (md+) Horizontal Layout: starts cleanly to the right of Introduction (left-[34vw]), with character corridor */}
      <div
        className="hidden md:flex absolute top-[21.5vh] left-[33vw] lg:left-[35vw] right-[2vw] items-center justify-between pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <motion.div
          style={{
            y: bgTextY,
            opacity: bgTextOpacity,
            x: mousePos.x * -14,
          }}
          className="w-full flex items-center justify-between"
        >
          <h2
            className="w-full m-0 font-black text-[clamp(90px,16.5vw,320px)] leading-[0.82] text-emerald-950/[0.04] dark:text-white/[0.04] select-none uppercase tracking-wider flex items-center justify-between"
            style={{
              fontFamily:
                'Impact, "Arial Black", "Arial Narrow", "Helvetica Neue", -apple-system, sans-serif',
            }}
          >
            {/* Letter S: sits cleanly in the space between Introduction and Character */}
            <span className="flex items-center justify-center shrink-0 pr-2">
              <span>S</span>
            </span>

            {/* Breathing corridor for the 3D character (centered at 50vw) */}
            <span
              className="w-[14vw] lg:w-[16vw] xl:w-[18vw] shrink-0 pointer-events-none"
              aria-hidden="true"
            />

            {/* Right group: A L I N in the spacious open right stage */}
            <span className="flex-1 flex items-center justify-between gap-4 md:gap-5 lg:gap-7 pl-2">
              <span>A</span>
              <span>L</span>
              <span>I</span>
              <span>N</span>
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Mobile (<md) Backdrop: Vertical SALIN watermark on the right stage behind the character (avoids colliding with left text) */}
      <div
        className="md:hidden absolute right-1 sm:right-3 top-[12vh] sm:top-[14vh] w-[46vw] sm:w-[48vw] flex flex-col items-center justify-start pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <motion.div
          style={{
            y: bgTextY,
            opacity: bgTextOpacity,
          }}
          className="flex flex-col items-center"
        >
          <h2
            className="m-0 flex flex-col items-center gap-1 sm:gap-1.5 font-black text-[clamp(42px,11vw,60px)] leading-none text-emerald-950/[0.04] dark:text-white/[0.05] select-none uppercase tracking-tight"
            style={{
              fontFamily:
                'Impact, "Arial Black", "Arial Narrow", "Helvetica Neue", -apple-system, sans-serif',
            }}
          >
            <span>S</span>
            <span>A</span>
            <span>L</span>
            <span>I</span>
            <span>N</span>
          </h2>
        </motion.div>
      </div>

      {/* Ground Click Ripples (Footstep Destinations) */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{ left: ripple.x, top: ripple.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[var(--brand)] pointer-events-none z-10 flex items-center justify-center bg-[var(--brand)]/10"
          >
            <Footprints size={13} className="text-[var(--brand)] opacity-85" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 02. Interactive Free-Roaming Character Stage (Poses 1 & 2: Standing & Bending) */}
      <motion.div
        animate={{
          x: walkX,
        }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 17,
        }}
        drag="x"
        dragConstraints={{ left: isMobile ? -30 : -400, right: isMobile ? 30 : 400 }}
        dragElastic={0.08}
        onDragStart={() => {
          lastInteractionRef.current = Date.now();
          setIsWalking(true);
        }}
        onDragEnd={(_, info) => {
          lastInteractionRef.current = Date.now();
          setIsWalking(false);
          setWalkX((prev) => prev + info.offset.x * (isMobile ? 0.12 : 0.3));
        }}
        className="absolute right-0 sm:right-3 md:right-auto md:left-1/2 md:-translate-x-1/2 bottom-0 z-10 md:z-20 flex flex-col items-center pointer-events-auto select-none w-[46vw] sm:w-[48vw] md:w-full md:max-w-[760px] cursor-grab active:cursor-grabbing"
        style={{ perspective: "1000px" }}
      >
        {/* Floating Speech Bubble Above Character */}
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-10 sm:-top-16 z-30 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-[var(--surface-glass-heavy)] backdrop-blur-2xl text-[var(--text-primary)] font-bold text-[11px] sm:text-sm rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] max-w-[180px] sm:max-w-[340px] text-center pointer-events-none right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
          >
            <div className="flex items-center justify-center gap-1.5">
              <MessageSquareQuote size={13} className="text-[var(--brand)] shrink-0" />
              <span className="leading-snug">{quoteText}</span>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute right-6 sm:right-auto sm:left-1/2 -bottom-1.5 sm:-translate-x-1/2 w-3 h-3 bg-[var(--surface-glass-heavy)] border-r border-b border-[var(--border)] rotate-45" />
          </motion.div>
        )}

        {/* --- Poses 1 & 2: Standing & Bending (Scroll 0 -> 350px) --- */}
        <motion.div
          onClick={handleCharacterClick}
          animate={{
            y: isJumping ? -42 : isWalking ? [0, -10, 0, -10, 0] : 0,
            scaleX: facing === "left" ? -1 : 1, // Turn around left/right smoothly!
          }}
          transition={{
            y: isJumping
              ? { duration: 0.5, ease: "easeOut" }
              : isWalking
              ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 },
            scaleX: { duration: 0.2 },
          }}
          style={{
            transformOrigin: "50% 92%", // Ground anchor
            rotateX: smoothRotateX,
            scale: smoothScale,
            rotateY: mousePos.x * 6,
          }}
          className="relative w-full flex justify-center cursor-pointer group"
          title="点击狗哥互动，或直接拖拽他！"
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
              className="h-[50vh] xs:h-[53vh] sm:h-[62vh] md:h-[83vh] max-h-[850px] min-h-[320px] sm:min-h-[440px] md:min-h-[500px] w-auto object-contain object-bottom drop-shadow-[0_16px_28px_rgba(25,27,38,0.24)] sm:drop-shadow-[0_22px_36px_rgba(25,27,38,0.26)] pointer-events-none"
            />
          </motion.div>

          {/* Pose 2: Bending Forward (hands on knees) */}
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
              className="h-[50vh] xs:h-[53vh] sm:h-[62vh] md:h-[83vh] max-h-[850px] min-h-[320px] sm:min-h-[440px] md:min-h-[500px] w-auto object-contain object-bottom drop-shadow-[0_18px_32px_rgba(25,27,38,0.28)] sm:drop-shadow-[0_28px_42px_rgba(25,27,38,0.32)] pointer-events-none"
            />
          </motion.div>

          {/* Walking dust animation indicator */}
          {isWalking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0.3, 0.8, 0], scale: [0.8, 1.4, 1.6] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="absolute -bottom-1 w-12 sm:w-16 h-3 sm:h-4 rounded-full bg-slate-400/40 blur-xs pointer-events-none"
            />
          )}
        </motion.div>

        {/* Standing / Bending Ground Shadow */}
        <motion.div
          animate={{
            scale: isJumping ? 0.6 : isWalking ? [1, 0.88, 1] : 1,
            opacity: isJumping ? 0.2 : 0.4,
          }}
          transition={{ repeat: isWalking ? Infinity : 0, duration: 0.5 }}
          style={{ opacity: standingShadowOpacity }}
          className="w-32 sm:w-56 md:w-72 h-3.5 sm:h-6 rounded-[100%] bg-black/35 blur-sm sm:blur-md -mt-2 sm:-mt-3 shrink-0 pointer-events-none"
        />
      </motion.div>

      {/* --- Pose 3: Lying Prone On Ground Looking Over The Bottom Edge (Scroll 320px+) --- */}
      <motion.div
        onClick={handleCharacterClick}
        style={{
          opacity: pose3Opacity,
          y: smoothProneY,
          x: mousePos.x * 10,
        }}
        className="absolute bottom-0 inset-x-0 w-full z-[15] md:z-20 flex flex-col items-center justify-end pointer-events-auto select-none cursor-pointer group"
        title="点击狗哥互动"
      >
        <div className="relative w-full max-w-[720px] flex justify-center px-4">
          <Image
            src="/images/salin-hero-prone-alpha.png"
            alt="Wang Salin 狗哥 3D 虚拟形象 (趴在地上查看姿态)"
            width={1376}
            height={768}
            className="h-[22vh] sm:h-[36vh] md:h-[45vh] max-h-[440px] min-h-[140px] sm:min-h-[220px] w-auto object-contain object-bottom drop-shadow-[0_18px_32px_rgba(25,27,38,0.36)] pointer-events-none"
          />
        </div>

        {/* Prone pose horizontal contact shadow */}
        <motion.div
          style={{ opacity: proneShadowOpacity }}
          className="w-[85%] max-w-[580px] h-4 sm:h-6 rounded-[100%] bg-black/45 blur-md sm:blur-lg -mt-2 sm:-mt-3 shrink-0 pointer-events-none"
        />

        {/* Playful prone status pill */}
        <span className="absolute -top-4 sm:-top-6 right-3 sm:right-16 px-3 py-1 rounded-full bg-[var(--surface-elevated)]/90 backdrop-blur-md text-[var(--brand)] text-[10px] sm:text-[11px] font-bold border border-[var(--brand)]/30 shadow-md shadow-emerald-500/10 pointer-events-none">
          趴下查看中 👀
        </span>
      </motion.div>

      {/* 03. Left Column: Editorial Headline & Tactile Stickers */}
      <div className="relative z-20 w-full max-w-[55vw] xs:max-w-[56vw] sm:max-w-[50vw] md:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] pl-3.5 sm:pl-8 lg:pl-16 pt-[84px] sm:pt-[110px] md:pt-28 lg:pt-32 pb-14 sm:pb-16 flex flex-col items-start gap-3 sm:gap-4 lg:gap-5 pointer-events-none">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)] shadow-xs pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse shrink-0" />
          <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] text-[var(--brand)] uppercase">
            AI APPLICATION & BUSINESS PRACTITIONER
          </span>
        </div>

        {/* Big Impact Headline: cleanly structured into two natural unbreakable phrases */}
        <h1 className="text-[23px] xs:text-2xl sm:text-4xl md:text-[42px] lg:text-[50px] xl:text-[54px] font-extrabold tracking-[-0.035em] text-[var(--text-primary)] leading-[1.18] sm:leading-[1.14] pointer-events-auto">
          <span className="block whitespace-nowrap">
            你好，我是<strong className="text-[var(--brand)] font-black">狗哥。</strong>
          </span>
          <span className="block whitespace-nowrap text-[var(--text-primary)] mt-0.5 sm:mt-1 opacity-90">
            欢迎来到我的现场。
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="text-[11.5px] sm:text-[14.5px] lg:text-[15.5px] text-[var(--text-secondary)] font-medium leading-[1.65] sm:leading-[1.75] max-w-[480px] pointer-events-auto">
          <span className="hidden sm:inline">用代码与实战经验探索 AI 落地。做过 6 年探店，亲自下场开过餐厅。把十多年摸爬滚打的商业死结，变成真正能跑通的 AI 实战工具。</span>
          <span className="sm:hidden">用代码与实战经验探索 AI 落地，把十多年实体商业摸爬滚打的死结，变成真正能跑通的 AI 实战工具。</span>
        </p>

        {/* Apple-style Frosted Glass Floating Cards Stack */}
        <div className="flex flex-col items-start gap-2 pt-1 pointer-events-auto" aria-label="狗哥身份与态度标签">
          {/* Card 1: Emerald Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] backdrop-blur-xl text-[var(--text-primary)] font-bold text-[10px] sm:text-xs border border-[var(--border)] shadow-xs hover:border-[var(--brand)] transition-all cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse shrink-0" />
            <span className="truncate">身份卡 · 实体创业老兵 · 山东临沂</span>
          </div>

          {/* Card 2: Glass Note (Tilted -1deg) */}
          <div className="inline-block px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-2xl bg-[var(--surface)] backdrop-blur-xl text-[var(--text-primary)] font-bold text-[11px] sm:text-sm border border-[var(--border)] shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-card)] hover:border-[var(--border-hover)] transform -rotate-1 hover:rotate-0 transition-all cursor-default">
            喜欢把「死磕现场」
            <em className="not-italic text-[var(--brand)] font-extrabold ml-1 underline decoration-[var(--accent)] decoration-2">
              写成真的。
            </em>
          </div>

          {/* Card 3: Glass Note (Tilted +1deg) */}
          <div className="inline-block px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-2xl bg-[var(--surface)] backdrop-blur-xl text-[var(--text-primary)] font-bold text-[11px] sm:text-sm border border-[var(--border)] shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-card)] hover:border-[var(--border-hover)] transform rotate-1 hover:rotate-0 transition-all cursor-default">
            <span className="hidden sm:inline">主导 FoodOps 餐饮连锁 AI 落地，让好点子在现场活下去。</span>
            <span className="sm:hidden">
              主导 FoodOps 餐饮 AI
              <em className="not-italic text-[var(--brand)] font-extrabold ml-1">现场落地。</em>
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 pointer-events-auto">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-[var(--brand-foreground)] font-bold text-xs sm:text-sm shadow-[0_6px_24px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_35px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20"
          >
            <span>进入我的工作台</span>
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* 04. Right Column: Status pill */}
      <div className="hidden sm:inline-flex items-center gap-2.5 absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-20 px-4 py-2 rounded-full bg-[var(--surface)] backdrop-blur-2xl border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] shadow-xs pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>全国驻场 · 现场交付中</span>
      </div>

      {/* Interactive Roaming HUD: Toggle Auto Wander / Manual Walk */}
      <div className="absolute left-3 sm:left-12 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] sm:bottom-5 z-20 pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setAutoRoam(!autoRoam);
            triggerQuote(autoRoam ? "“收到，那我先在原地站会儿~”" : "“巡店模式开启！四处溜达溜达~”");
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)] text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] shadow-xs hover:border-[var(--brand)] hover:bg-[var(--surface-muted)] transition-all cursor-pointer"
          title={autoRoam ? "点击暂停自主走动" : "点击开启自主走动"}
        >
          {autoRoam ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>自动漫步中</span>
              <Pause size={9} className="ml-0.5 opacity-70" />
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>漫步已暂停</span>
              <Play size={9} className="ml-0.5 opacity-70" />
            </>
          )}
        </button>

        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)]/70 backdrop-blur-md border border-[var(--border)] text-[11px] font-medium text-[var(--text-secondary)]">
          <Sparkles size={11} className="text-[var(--brand)]" />
          <span>点击地面唤他走动 · 空格跳跃</span>
        </div>

        {/* 交互效果：滑动进入下一区按钮 */}
        <a
          href="#credibility"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("credibility")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface-solid)] hover:bg-[var(--surface-muted)] text-[var(--brand)] border border-[var(--border)] text-[11px] font-bold shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
          title="点击平滑滑动至下一分区"
        >
          <span>滑动进入下一区</span>
          <ArrowDown size={11} className="animate-bounce" />
        </a>
      </div>

      <div className="hidden lg:block absolute right-12 bottom-12 z-20 max-w-[240px] text-right pointer-events-auto">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--text-muted)] uppercase block mb-1">
          ABOUT THIS SPACE
        </span>
        <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
          七个章节，一点点认识我的经历、实战项目和正在探索的方向。
        </p>
      </div>
    </section>
  );
}
