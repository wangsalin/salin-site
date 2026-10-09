"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FreefallAltimeter } from "./freefall-altimeter";
import { FreefallCanvas } from "./freefall-canvas";
import { FreefallMilestones } from "./freefall-milestones";
import { FreefallLandingBaseCamp } from "./freefall-landing";
import { ChevronDown, Sparkles } from "lucide-react";

export function FreefallJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [altitude, setAltitude] = useState(13500);
  const [verticalSpeed, setVerticalSpeed] = useState(0);
  const [phase, setPhase] = useState("AT THE DOOR");

  useEffect(() => {
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

      let currentAlt = 13500;
      let currentVs = 0;
      let currentPhase = "AT THE DOOR";

      if (p < 0.12) {
        currentAlt = 13500 - (p / 0.12) * 500;
        currentVs = Math.round((p / 0.12) * 40);
        currentPhase = "AT THE DOOR";
      } else if (p < 0.32) {
        const norm = (p - 0.12) / 0.2;
        currentAlt = 13000 - norm * 2800;
        currentVs = Math.round(40 + norm * 80); // up to 120 mph
        currentPhase = "LEAP & LAUNCH";
      } else if (p < 0.78) {
        const norm = (p - 0.32) / 0.46;
        currentAlt = 10200 - norm * 6700;
        currentVs = 120;
        currentPhase = "FREEFALL · 120 MPH";
      } else if (p < 0.92) {
        const norm = (p - 0.78) / 0.14;
        currentAlt = 3500 - norm * 3000;
        currentVs = Math.round(120 - norm * 105);
        currentPhase = "PARACHUTE DEPLOY";
      } else {
        const norm = (p - 0.92) / 0.08;
        currentAlt = Math.max(0, 500 - norm * 500);
        currentVs = Math.round(Math.max(0, 15 - norm * 15));
        currentPhase = "TOUCHDOWN";
      }

      setAltitude(currentAlt);
      setVerticalSpeed(currentVs);
      setPhase(currentPhase);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSkipToGround = () => {
    const ground = document.getElementById("ground-camp");
    if (ground) {
      ground.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleJumpAgain = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Kinetic phase calculations
  const doorOpenProgress = Math.min(1, scrollProgress / 0.12);
  const leapProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.22));
  const isFreefalling = scrollProgress > 0.14 && scrollProgress < 0.92;
  const isParachuteOpen = scrollProgress >= 0.78 && scrollProgress < 0.94;

  const speedIntensity =
    scrollProgress < 0.1
      ? 0
      : scrollProgress < 0.32
      ? (scrollProgress - 0.1) / 0.22
      : scrollProgress < 0.78
      ? 1
      : scrollProgress < 0.92
      ? Math.max(0, 1 - (scrollProgress - 0.78) / 0.14)
      : 0;

  return (
    <div className="relative bg-slate-950 text-white min-h-screen">
      {/* Aviation Navigation Header (Minimal, Sleek) */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none flex items-center justify-between">
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-white">
            WANG SALIN
          </span>
          <span className="text-slate-500 text-xs">/</span>
          <span className="text-[11px] font-mono text-emerald-400/90 hidden sm:inline">
            FREEFALL · 13,500 FT
          </span>
        </div>

        <nav className="pointer-events-auto hidden md:flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs font-mono">
          <Link
            href="/ui/"
            className="px-3 py-1 rounded-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors font-bold"
          >
            Salin UI 弹药库 ↗
          </Link>
          <Link
            href="/projects"
            className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors"
          >
            精选作品
          </Link>
          <Link
            href="/notes"
            className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors"
          >
            实战手记
          </Link>
          <Link
            href="/contact"
            className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors"
          >
            联系合作
          </Link>
        </nav>
      </header>

      {/* Flight Altimeter HUD */}
      <FreefallAltimeter
        altitude={altitude}
        verticalSpeed={verticalSpeed}
        phase={phase}
        onSkipToGround={handleSkipToGround}
      />

      {/* 500vh Interactive Scroll Stage */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
          {/* Layer 1: Atmospheric Sky & Earth Background */}
          <div
            className="absolute inset-0 bg-[#162a3f] transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${1 + scrollProgress * 0.25})`,
            }}
          >
            <Image
              src="/environment/exact-sky.webp"
              alt="High Altitude Atmosphere"
              fill
              priority
              className="object-cover object-top opacity-95"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/80 pointer-events-none" />
          </div>

          {/* Layer 2: Speed lines & Cloud Puffs Canvas */}
          <FreefallCanvas
            speedIntensity={speedIntensity}
            isFreefalling={isFreefalling}
          />

          {/* Layer 3: Airplane Cabin Door Frame & Interior */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-15"
            style={{
              opacity: Math.max(0, 1 - leapProgress * 1.6),
              transform: `scale(${1 + leapProgress * 0.45}) translateZ(0)`,
            }}
          >
            {/* Cabin Wall Interior */}
            <div className="absolute inset-0">
              <Image
                src="/environment/exact-cabin.webp"
                alt="Airplane Cabin"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Sliding Doors Aperture */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[92vw] sm:w-[48vw] h-full overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-75 ease-out"
                style={{
                  transform: `translateX(-${doorOpenProgress * 105}%)`,
                }}
              >
                <Image
                  src="/environment/door-panel.webp"
                  alt="Left Door Panel"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div
                className="absolute top-0 right-0 w-1/2 h-full transition-transform duration-75 ease-out"
                style={{
                  transform: `translateX(${doorOpenProgress * 105}%) scaleX(-1)`,
                }}
              >
                <Image
                  src="/environment/door-panel.webp"
                  alt="Right Door Panel"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Lettering on Doors */}
              <div
                className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] text-center transition-all duration-100"
                style={{
                  opacity: Math.max(0, 1 - doorOpenProgress * 2),
                  transform: `translate(-50%, -50%) scale(${1 - doorOpenProgress * 0.3})`,
                }}
              >
                <div className="px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono shadow-2xl">
                  <div className="text-[10px] sm:text-xs text-amber-400 font-bold tracking-widest uppercase mb-1">
                    GOOD IDEAS JUMP TOO
                  </div>
                  <div className="text-sm sm:text-lg font-black tracking-tight text-white">
                    创业就是一场纵身一跃
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Title & Subtitle */}
            <div
              className="absolute top-[17%] left-1/2 -translate-x-1/2 text-center pointer-events-none transition-all duration-200 w-[90%] max-w-xl"
              style={{
                opacity: Math.max(0, 1 - leapProgress * 2),
                transform: `translate(-50%, -${leapProgress * 40}px)`,
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>WANG SALIN · 狗哥</span>
              </div>
              <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                GOOD IDEAS JUMP TOO
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                做过本地生活内容，亲自下场经营过餐饮。把十多年商业积淀，变成真正能交付的 AI 工具。
              </p>
            </div>

            {/* Scroll to Exit Prompt */}
            {scrollProgress < 0.1 && (
              <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase px-5 py-2 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/30 text-white shadow-2xl flex items-center gap-2">
                  <span>SCROLL TO EXIT · 向下滚动即刻出舱</span>
                  <ChevronDown className="w-4 h-4 text-emerald-400" />
                </span>
              </div>
            )}
          </div>

          {/* Layer 4: First-Person Hands (Holding Door vs Freefall Spread) */}
          <div
            className="absolute inset-0 pointer-events-none z-25 transition-opacity duration-300"
            style={{
              opacity: scrollProgress > 0.88 ? Math.max(0, 1 - (scrollProgress - 0.88) * 8) : 1,
            }}
          >
            {/* Left Hand */}
            <div
              className="absolute bottom-[-4vh] left-[4vw] sm:left-[16vw] w-[36vw] sm:w-[22vw] aspect-[3/4] transition-transform duration-100"
              style={{
                transform:
                  scrollProgress < 0.14
                    ? `translateY(${doorOpenProgress * 20}px) rotate(-3deg)`
                    : `translateY(${Math.sin(scrollProgress * 20) * 8}px) scale(1.05) rotate(-6deg)`,
              }}
            >
              <Image
                src={
                  scrollProgress < 0.14
                    ? "/environment/exact-hand-brace.webp"
                    : "/environment/exact-hand-freefall.webp"
                }
                alt="First Person Hand Left"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Right Hand */}
            <div
              className="absolute bottom-[-4vh] right-[4vw] sm:right-[16vw] w-[36vw] sm:w-[22vw] aspect-[3/4] transition-transform duration-100"
              style={{
                transform:
                  scrollProgress < 0.14
                    ? `translateY(${doorOpenProgress * 20}px) scaleX(-1) rotate(-3deg)`
                    : `translateY(${Math.sin(scrollProgress * 20 + 1) * 8}px) scaleX(-1) scale(1.05) rotate(-6deg)`,
              }}
            >
              <Image
                src={
                  scrollProgress < 0.14
                    ? "/environment/exact-hand-brace.webp"
                    : "/environment/exact-hand-freefall.webp"
                }
                alt="First Person Hand Right"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Layer 5: Parachute Canopy Deploy Lines (3,500 - 1,500 FT) */}
          {isParachuteOpen && (
            <div className="absolute inset-0 pointer-events-none z-22 flex items-start justify-center transition-opacity duration-300 animate-fade-in">
              <div className="w-full h-[40vh] relative">
                <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
                  <path d="M500 400 L200 0" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <path d="M500 400 L350 0" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                  <path d="M500 400 L500 0" stroke="rgba(16,185,129,0.7)" strokeWidth="2.5" />
                  <path d="M500 400 L650 0" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                  <path d="M500 400 L800 0" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                </svg>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500/90 text-slate-950 font-mono font-bold text-xs shadow-xl">
                  🪂 降落伞已完全展开 · 减速滑翔着陆中
                </div>
              </div>
            </div>
          )}

          {/* Layer 6: High-Altitude Tactical Milestones (Encounters) */}
          <FreefallMilestones currentAltitude={altitude} />
        </div>
      </div>

      {/* Ground Base Camp (Touchdown & Full Overview) */}
      <FreefallLandingBaseCamp onJumpAgain={handleJumpAgain} />
    </div>
  );
}
