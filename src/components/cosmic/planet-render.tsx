"use client";

import React from "react";

export type PlanetType = "earth" | "moon" | "mars" | "jupiter" | "saturn" | "blackhole";

interface PlanetProps {
  type: PlanetType;
  size?: number; // size in px
  mouseOffset?: { x: number; y: number }; // normalized -1 to 1
  stereo3D?: boolean; // 3D glasses anaglyph chromatic split mode
  warpFactor?: number; // 0 to 1 warp flight distortion
}

export function PlanetRender({
  type,
  size = 360,
  mouseOffset = { x: 0, y: 0 },
  stereo3D = false,
  warpFactor = 0,
}: PlanetProps) {
  // 3D parallax tilt degrees
  const tiltX = (mouseOffset.y || 0) * -14;
  const tiltY = (mouseOffset.x || 0) * 14;
  const depthZ = stereo3D ? 45 : 25;

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    perspective: 1200,
    transformStyle: "preserve-3d",
  };

  const orbTransformStyle: React.CSSProperties = {
    transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${depthZ}px)`,
    transition: "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",
    transformStyle: "preserve-3d",
  };

  switch (type) {
    case "earth":
      return (
        <div
          className={`relative flex items-center justify-center select-none ${stereo3D ? "stereo-3d-active" : ""}`}
          style={containerStyle}
        >
          {/* Orbital Satellite Trajectory Ring */}
          <div
            className="absolute pointer-events-none rounded-full border border-cyan-400/30 border-dashed animate-spin-slow"
            style={{
              width: size * 1.3,
              height: size * 1.3,
              transform: "rotate(28deg)",
            }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-950/90 px-2 py-0.5 rounded-full border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[9px] font-mono text-cyan-300 font-bold tracking-wider">
                COMM-SAT // 0.0 AU
              </span>
            </div>
          </div>

          {/* Earth Body (Pure Transparent PNG with Spherical Lighting) */}
          <div
            className="relative rounded-full overflow-hidden flex items-center justify-center filter drop-shadow-[0_0_50px_rgba(56,189,248,0.45)] drop-shadow-[0_0_100px_rgba(14,165,233,0.25)]"
            style={{
              width: size,
              height: size,
              ...orbTransformStyle,
            }}
          >
            {/* Transparent PNG Texture */}
            <img
              src="/planets/earth.png"
              alt="Photorealistic Transparent Earth"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />

            {/* Directional Sunlight Terminator & 3D Spherical Volume */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.4) 68%, rgba(2,6,23,0.92) 100%)",
                boxShadow: "inset -25px -25px 60px rgba(0,0,0,0.92)",
              }}
            />

            {/* Atmosphere Rayleigh Scattering Edge Glow */}
            <div className="absolute inset-0 rounded-full ring-2 ring-sky-400/35 pointer-events-none" />
          </div>
        </div>
      );

    case "moon":
      return (
        <div
          className={`relative flex items-center justify-center select-none ${stereo3D ? "stereo-3d-active" : ""}`}
          style={containerStyle}
        >
          {/* Tactical Targeting Grid (Salin UI Arsenal Station Beacon) */}
          <div
            className="absolute pointer-events-none rounded-full border border-emerald-400/35 animate-spin-slow"
            style={{
              width: size * 1.25,
              height: size * 1.25,
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400/60 flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-emerald-300">
                SALIN UI ARSENAL // 0.0026 AU
              </span>
            </div>
          </div>

          {/* Moon Body (Pure Transparent PNG) */}
          <div
            className="relative rounded-full overflow-hidden flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(226,232,240,0.35)] drop-shadow-[0_0_80px_rgba(148,163,184,0.18)]"
            style={{
              width: size,
              height: size,
              ...orbTransformStyle,
            }}
          >
            {/* Transparent PNG Texture */}
            <img
              src="/planets/moon.png"
              alt="Photorealistic Transparent Moon"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />

            {/* Stark Solar Terminator Shading */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.96) 100%)",
                boxShadow: "inset -28px -28px 60px rgba(0,0,0,0.96)",
              }}
            />

            {/* Tactical High-Tech Reticle */}
            <div className="absolute inset-0 rounded-full ring-2 ring-emerald-400/30 pointer-events-none shadow-[0_0_25px_rgba(52,211,153,0.3)]" />
          </div>
        </div>
      );

    case "mars":
      return (
        <div
          className={`relative flex items-center justify-center select-none ${stereo3D ? "stereo-3d-active" : ""}`}
          style={containerStyle}
        >
          {/* Orbital Logistics Supply Track (FoodOps Trajectory) */}
          <div
            className="absolute pointer-events-none rounded-full border border-dashed border-rose-400/35 animate-reverse-spin"
            style={{
              width: size * 1.3,
              height: size * 1.3,
              transform: "rotate(-15deg)",
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-rose-400/50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span className="text-[9px] font-mono font-bold text-rose-300">
                FOODOPS SUPPLY ROUTE // 0.52 AU
              </span>
            </div>
          </div>

          {/* Mars Body (Pure Transparent PNG) */}
          <div
            className="relative rounded-full overflow-hidden flex items-center justify-center filter drop-shadow-[0_0_50px_rgba(239,68,68,0.45)] drop-shadow-[0_0_110px_rgba(185,28,28,0.25)]"
            style={{
              width: size,
              height: size,
              ...orbTransformStyle,
            }}
          >
            {/* Transparent PNG Texture */}
            <img
              src="/planets/mars.png"
              alt="Photorealistic Transparent Mars"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />

            {/* Martian Spherical Shading & Canyons Contrast */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.48) 70%, rgba(30,5,5,0.95) 100%)",
                boxShadow: "inset -28px -28px 60px rgba(0,0,0,0.92)",
              }}
            />

            {/* Dusty Crimson Limb Glow */}
            <div className="absolute inset-0 rounded-full ring-2 ring-rose-400/35 pointer-events-none" />
          </div>
        </div>
      );

    case "jupiter":
      return (
        <div
          className={`relative flex items-center justify-center select-none ${stereo3D ? "stereo-3d-active" : ""}`}
          style={containerStyle}
        >
          {/* Gravitational Field & Galilean Moon Orbit */}
          <div
            className="absolute pointer-events-none rounded-full border border-amber-400/30 border-dashed animate-spin-slow"
            style={{
              width: size * 1.35,
              height: size * 1.35,
            }}
          >
            {/* Galilean Moon Io */}
            <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#f59e0b] animate-pulse" />
            {/* Moon Europa */}
            <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-sky-200 shadow-[0_0_10px_#bae6fd]" />
          </div>

          {/* Jupiter Body (Pure Transparent PNG) */}
          <div
            className="relative rounded-full overflow-hidden flex items-center justify-center filter drop-shadow-[0_0_60px_rgba(249,115,22,0.45)] drop-shadow-[0_0_130px_rgba(194,65,12,0.22)]"
            style={{
              width: size,
              height: size,
              ...orbTransformStyle,
            }}
          >
            {/* Transparent PNG Texture */}
            <img
              src="/planets/jupiter.png"
              alt="Photorealistic Transparent Jupiter"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />

            {/* Colossal Gas Giant Spherical Terminator */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.5) 68%, rgba(20,5,0,0.95) 100%)",
                boxShadow: "inset -32px -32px 70px rgba(0,0,0,0.94)",
              }}
            />

            {/* Amber Radiation Belt Glow */}
            <div className="absolute inset-0 rounded-full ring-2 ring-amber-400/30 pointer-events-none" />
          </div>
        </div>
      );

    case "saturn":
      return (
        <div
          className={`relative flex items-center justify-center select-none ${stereo3D ? "stereo-3d-active" : ""}`}
          style={{
            width: size * 1.45,
            height: size * 1.1,
            perspective: 1200,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ring Plane Field Telemetry */}
          <div
            className="absolute pointer-events-none rounded-full border border-yellow-400/25 border-dashed animate-reverse-spin"
            style={{
              width: size * 1.5,
              height: size * 1.5,
              transform: "rotate(-22deg)",
            }}
          />

          {/* Saturn Body with Majestic Rings (Pure Transparent PNG with No Square Background!) */}
          <div
            className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_0_60px_rgba(234,179,8,0.4)] drop-shadow-[0_0_140px_rgba(202,138,4,0.2)]"
            style={orbTransformStyle}
          >
            {/* Transparent PNG Texture (Planet Globe + Tilted Rings Floating in Transparent Space!) */}
            <img
              src="/planets/saturn.png"
              alt="Photorealistic Transparent Saturn with Rings"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      );

    case "blackhole":
      return (
        <div
          className={`relative flex items-center justify-center select-none ${stereo3D ? "stereo-3d-active" : ""}`}
          style={{
            width: size * 1.4,
            height: size * 1.4,
            perspective: 1400,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Spacetime Gravitational Wave Expansions (Expanding Ripples) */}
          <div
            className="absolute pointer-events-none rounded-full border-2 border-amber-500/30 animate-gravity-wave"
            style={{ width: size * 1.5, height: size * 1.5 }}
          />
          <div
            className="absolute pointer-events-none rounded-full border border-cyan-400/20 animate-gravity-wave"
            style={{ width: size * 1.8, height: size * 1.8, animationDelay: "1.8s" }}
          />

          {/* Relativistic Accretion Ring Halo (Luminous Plasma Disk) */}
          <div
            className="absolute rounded-full border-4 border-amber-400/40 shadow-[0_0_80px_rgba(245,158,11,0.7),0_0_160px_rgba(217,119,6,0.5)] animate-spin-slow pointer-events-none"
            style={{
              width: size * 1.25,
              height: size * 1.25,
              transform: "rotate(15deg)",
            }}
          />

          {/* Black Hole Singularity Core (Pure Transparent PNG with Accretion Glow Floating in Space!) */}
          <div
            className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_0_80px_rgba(245,158,11,0.7)] drop-shadow-[0_0_180px_rgba(180,83,9,0.4)]"
            style={orbTransformStyle}
          >
            {/* Transparent PNG Texture */}
            <img
              src="/planets/blackhole.png"
              alt="Supermassive Black Hole Transparent"
              className="w-full h-full object-contain select-none pointer-events-none animate-accretion"
              draggable={false}
            />

            {/* Central Event Horizon Singularity (Total Light Trapping Core) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black pointer-events-none shadow-[0_0_40px_#000]"
              style={{
                width: size * 0.32,
                height: size * 0.32,
                boxShadow: "0 0 25px rgba(0,0,0,1), inset 0 0 15px rgba(0,0,0,1)",
              }}
            >
              {/* Einstein Photon Ring Razor Edge */}
              <div className="absolute inset-0 rounded-full ring-2 ring-amber-300/80 shadow-[0_0_20px_rgba(252,211,77,0.9)]" />
            </div>
          </div>

          {/* Telemetry Indicator */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 border border-amber-500/50 px-3 py-1 rounded-full text-center shadow-lg pointer-events-none">
            <div className="text-[10px] font-mono font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>EVENT HORIZON // 终极引力奇点</span>
            </div>
          </div>
        </div>
      );
  }
}
