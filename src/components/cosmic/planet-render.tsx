"use client";

import React from "react";

export type PlanetType = "earth" | "moon" | "mars" | "jupiter" | "saturn" | "outpost";

interface PlanetProps {
  type: PlanetType;
  size?: number; // size in px or responsive
}

export function PlanetRender({ type, size = 320 }: PlanetProps) {
  switch (type) {
    case "earth":
      return (
        <div
          className="relative rounded-full select-none"
          style={{
            width: size,
            height: size,
            background:
              "radial-gradient(circle at 35% 35%, #60a5fa 0%, #2563eb 45%, #1e3a8a 80%, #0f172a 100%)",
            boxShadow:
              "inset -30px -30px 60px rgba(0,0,0,0.85), 0 0 80px rgba(59,130,246,0.45), 0 0 140px rgba(14,165,233,0.25)",
          }}
        >
          {/* Earth Continents Texture (SVG overlay) */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-85 mix-blend-overlay">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M40 70 Q60 50 90 65 T140 80 T160 120 T110 140 T60 120 Z"
                fill="#10b981"
                opacity="0.8"
              />
              <path
                d="M100 130 Q120 120 140 140 T150 170 T120 180 Z"
                fill="#059669"
                opacity="0.75"
              />
              <path
                d="M50 30 Q70 20 85 35 T70 60 Z"
                fill="#34d399"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Swirling Clouds */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-60 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-very-slow">
              <path
                d="M20 90 Q70 70 120 95 T180 85 Q160 110 110 100 T30 110 Z"
                fill="#ffffff"
                opacity="0.7"
              />
              <path
                d="M40 130 Q90 120 140 135 T170 150 Q130 160 80 145 Z"
                fill="#ffffff"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Atmospheric Rim Light */}
          <div className="absolute inset-0 rounded-full ring-2 ring-sky-300/40 pointer-events-none" />
        </div>
      );

    case "moon":
      return (
        <div
          className="relative rounded-full select-none"
          style={{
            width: size,
            height: size,
            background:
              "radial-gradient(circle at 35% 35%, #e2e8f0 0%, #94a3b8 45%, #475569 80%, #0f172a 100%)",
            boxShadow:
              "inset -30px -30px 60px rgba(0,0,0,0.9), 0 0 60px rgba(226,232,240,0.3), 0 0 100px rgba(148,163,184,0.15)",
          }}
        >
          {/* Craters */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="65" cy="55" r="14" fill="#334155" />
              <circle cx="120" cy="80" r="20" fill="#334155" />
              <circle cx="85" cy="120" r="16" fill="#1e293b" />
              <circle cx="140" cy="135" r="12" fill="#1e293b" />
              <circle cx="45" cy="100" r="8" fill="#334155" />
            </svg>
          </div>
          {/* High-Tech Tactical Grid Glow (Arsenal Vibe) */}
          <div className="absolute inset-0 rounded-full ring-2 ring-emerald-400/30 pointer-events-none shadow-[0_0_30px_rgba(52,211,153,0.3)]" />
        </div>
      );

    case "mars":
      return (
        <div
          className="relative rounded-full select-none"
          style={{
            width: size,
            height: size,
            background:
              "radial-gradient(circle at 35% 35%, #f87171 0%, #dc2626 40%, #991b1b 75%, #450a0a 100%)",
            boxShadow:
              "inset -30px -30px 60px rgba(0,0,0,0.9), 0 0 80px rgba(239,68,68,0.45), 0 0 120px rgba(185,28,28,0.25)",
          }}
        >
          {/* Martian Canyon & Dark Volcanic Plates */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-50 mix-blend-multiply">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M30 100 Q80 80 130 95 T180 110 L170 125 Q120 110 70 120 Z"
                fill="#450a0a"
              />
              <circle cx="70" cy="65" r="18" fill="#450a0a" />
              <circle cx="140" cy="140" r="22" fill="#450a0a" />
            </svg>
          </div>

          {/* Polar Ice Cap */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-white/70 blur-[2px]" />
          <div className="absolute inset-0 rounded-full ring-2 ring-rose-400/30 pointer-events-none" />
        </div>
      );

    case "jupiter":
      return (
        <div
          className="relative rounded-full select-none"
          style={{
            width: size,
            height: size,
            background:
              "radial-gradient(circle at 35% 35%, #fed7aa 0%, #fb923c 35%, #c2410c 70%, #431407 100%)",
            boxShadow:
              "inset -35px -35px 70px rgba(0,0,0,0.92), 0 0 90px rgba(249,115,22,0.4), 0 0 150px rgba(194,65,12,0.2)",
          }}
        >
          {/* Atmospheric Gas Bands */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-75">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect y="35" width="200" height="15" fill="#ea580c" opacity="0.6" />
              <rect y="60" width="200" height="20" fill="#9a3412" opacity="0.75" />
              <rect y="90" width="200" height="12" fill="#fed7aa" opacity="0.5" />
              <rect y="110" width="200" height="25" fill="#c2410c" opacity="0.7" />
              <rect y="145" width="200" height="18" fill="#7c2d12" opacity="0.6" />
              {/* The Great Red Spot */}
              <ellipse cx="130" cy="122" rx="20" ry="12" fill="#b91c1c" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full ring-2 ring-amber-400/30 pointer-events-none" />
        </div>
      );

    case "saturn":
      return (
        <div
          className="relative flex items-center justify-center select-none"
          style={{ width: size * 1.5, height: size * 1.2 }}
        >
          {/* Ring Behind Planet */}
          <div
            className="absolute z-0 rounded-full pointer-events-none"
            style={{
              width: size * 1.45,
              height: size * 0.45,
              border: `${Math.round(size * 0.12)}px solid rgba(253, 224, 71, 0.45)`,
              boxShadow:
                "0 0 40px rgba(234,179,8,0.35), inset 0 0 20px rgba(202,138,4,0.4)",
              transform: "rotate(-24deg)",
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            }}
          />

          {/* Saturn Body */}
          <div
            className="relative z-10 rounded-full"
            style={{
              width: size * 0.75,
              height: size * 0.75,
              background:
                "radial-gradient(circle at 35% 35%, #fef08a 0%, #facc15 40%, #a16207 75%, #422006 100%)",
              boxShadow:
                "inset -25px -25px 50px rgba(0,0,0,0.85), 0 0 70px rgba(234,179,8,0.35)",
            }}
          >
            {/* Soft atmospheric stripes */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-50">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <rect y="45" width="200" height="14" fill="#ca8a04" />
                <rect y="75" width="200" height="18" fill="#854d0e" />
                <rect y="105" width="200" height="15" fill="#eab308" />
                <rect y="130" width="200" height="20" fill="#713f12" />
              </svg>
            </div>
          </div>

          {/* Ring In Front of Planet */}
          <div
            className="absolute z-20 rounded-full pointer-events-none"
            style={{
              width: size * 1.45,
              height: size * 0.45,
              border: `${Math.round(size * 0.12)}px solid rgba(253, 224, 71, 0.45)`,
              boxShadow:
                "0 0 40px rgba(234,179,8,0.35), inset 0 0 20px rgba(202,138,4,0.4)",
              transform: "rotate(-24deg)",
              clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            }}
          />
        </div>
      );

    case "outpost":
      return (
        <div
          className="relative flex items-center justify-center select-none"
          style={{ width: size, height: size }}
        >
          {/* Orbital Station Rings */}
          <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-emerald-400/40 border-dashed animate-spin-slow shadow-[0_0_50px_rgba(16,185,129,0.3)]" />
          <div className="absolute w-[60%] h-[60%] rounded-full border-2 border-cyan-400/50 animate-reverse-spin" />

          {/* Central Command Core */}
          <div
            className="relative z-10 rounded-3xl p-6 flex flex-col items-center justify-center bg-slate-900/90 border border-emerald-400/60 shadow-[0_0_80px_rgba(16,185,129,0.5)]"
            style={{ width: size * 0.45, height: size * 0.45 }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping mb-2" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300">
              BASE
            </span>
          </div>

          {/* Solar Panel Wings */}
          <div className="absolute w-[110%] h-3 bg-gradient-to-r from-cyan-500/80 via-blue-600/90 to-cyan-500/80 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
        </div>
      );
  }
}
