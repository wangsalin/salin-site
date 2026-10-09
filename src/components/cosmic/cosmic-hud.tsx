"use client";

import React from "react";
import Link from "next/link";
import { Compass, Glasses, Gauge, Radio, ShieldCheck } from "lucide-react";

export interface Waypoint {
  id: string;
  name: string;
  distanceAU: number;
  label: string;
  progressTarget: number;
}

export const WAYPOINTS: Waypoint[] = [
  { id: "earth", name: "地球 (母港)", distanceAU: 0, label: "启航港", progressTarget: 0 },
  { id: "moon", name: "月球 (Salin UI)", distanceAU: 0.0026, label: "界面弹药库", progressTarget: 0.2 },
  { id: "mars", name: "火星 (FoodOps)", distanceAU: 0.52, label: "实体数字化", progressTarget: 0.4 },
  { id: "jupiter", name: "木星 (资源库)", distanceAU: 4.2, label: "知识引力场", progressTarget: 0.6 },
  { id: "saturn", name: "土星 (实战手记)", distanceAU: 9.5, label: "思考光环", progressTarget: 0.8 },
  { id: "blackhole", name: "终极黑洞 (奇点)", distanceAU: 15.0, label: "引力奇点", progressTarget: 1.0 },
];

interface HUDProps {
  currentAU: number;
  activeWaypointIndex: number;
  warpMultiplier: number;
  stereo3D: boolean;
  onToggleStereo3D: () => void;
  onWarpTo: (progress: number) => void;
}

export function CosmicHUD({
  currentAU,
  activeWaypointIndex,
  warpMultiplier,
  stereo3D,
  onToggleStereo3D,
  onWarpTo,
}: HUDProps) {
  const activeWp = WAYPOINTS[activeWaypointIndex] || WAYPOINTS[0];

  return (
    <>
      {/* Top Cockpit Aerospace Telemetry Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-5 pointer-events-none flex items-center justify-between font-mono gap-2">
        {/* Left: Starship Flight Deck Status Indicator (Ultra-sleek Minimalist Monospace) */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-black text-white tracking-widest">
              SALIN-01
            </span>
            <span className="text-slate-600 text-[10px] hidden sm:inline">/</span>
            <span className="text-[10px] text-cyan-400 font-semibold tracking-wider hidden sm:inline">
              穿梭舰巡航
            </span>
          </div>
        </div>

        {/* Right: 3D Glasses Stereo Toggle + Real-Time Telemetry Coordinates */}
        <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
          {/* 3D Glasses Stereo Mode Switch */}
          <button
            type="button"
            onClick={onToggleStereo3D}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-xl border ${
              stereo3D
                ? "bg-gradient-to-r from-rose-500/30 via-slate-900 to-cyan-500/30 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                : "bg-slate-950/75 border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40"
            }`}
            title="切换 3D 立体眼镜视差模式"
          >
            <Glasses className={`w-3.5 h-3.5 ${stereo3D ? "text-cyan-300 animate-pulse" : "text-slate-400"}`} />
            <span className="hidden sm:inline">3D眼镜</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                stereo3D ? "bg-rose-500 text-white" : "bg-white/10 text-slate-400"
              }`}
            >
              {stereo3D ? "ON" : "OFF"}
            </span>
          </button>

          {/* Telemetry Coordinates Box */}
          <div className="flex items-center gap-2.5 bg-slate-950/75 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/10 text-white shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <div className="text-right">
              <div className="text-[9px] text-cyan-400 tracking-wider uppercase font-semibold flex items-center justify-end gap-1">
                <Compass className="w-2.5 h-2.5 text-cyan-400" />
                <span className="truncate max-w-[80px] sm:max-w-none">{activeWp.name.split(" ")[0]}</span>
              </div>
              <div className="text-xs font-black tabular-nums tracking-tight">
                {currentAU.toFixed(2)} AU
              </div>
            </div>

            <div className="h-5 w-[1px] bg-white/15" />

            <div className="text-right">
              <div className="text-[8px] text-amber-400 uppercase font-semibold">VELOCITY</div>
              <div className="text-xs font-bold text-amber-300 tabular-nums">
                {warpMultiplier > 0.2 ? `WARP ${(1 + warpMultiplier * 3).toFixed(1)}` : "0.15 c"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Interplanetary Waypoint Rail */}
      <nav
        className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto font-mono max-w-[96vw] overflow-x-auto no-scrollbar"
        aria-label="Cosmic Waypoint Selector"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-slate-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
          {WAYPOINTS.map((wp, idx) => {
            const isCurrent = idx === activeWaypointIndex;
            const isBlackHole = wp.id === "blackhole";

            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onWarpTo(wp.progressTarget)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? isBlackHole
                      ? "bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black shadow-lg shadow-amber-500/40 scale-105"
                      : "bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-400/30 scale-105"
                    : isBlackHole
                    ? "text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{wp.name.split(" ")[0]}</span>
                <span className="text-[9px] opacity-70 hidden lg:inline">
                  {wp.distanceAU} AU
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
