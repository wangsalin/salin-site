"use client";

import React from "react";
import Link from "next/link";
import { Compass, Glasses, Sparkles } from "lucide-react";

export interface Waypoint {
  id: string;
  name: string;
  distanceAU: number;
  label: string;
  progressTarget: number;
}

export const WAYPOINTS: Waypoint[] = [
  { id: "earth", name: "地球 (母星)", distanceAU: 0, label: "启航港", progressTarget: 0 },
  { id: "moon", name: "月球 (Salin UI)", distanceAU: 0.0026, label: "界面弹药库", progressTarget: 0.22 },
  { id: "mars", name: "火星 (FoodOps)", distanceAU: 0.52, label: "实体数字化", progressTarget: 0.42 },
  { id: "jupiter", name: "木星 (资源库)", distanceAU: 4.2, label: "知识引力场", progressTarget: 0.62 },
  { id: "saturn", name: "土星 (实战手记)", distanceAU: 9.5, label: "思考光环", progressTarget: 0.8 },
  { id: "blackhole", name: "终极黑洞 (奇点)", distanceAU: 15.0, label: "引力奇点", progressTarget: 0.98 },
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
      {/* Top Telemetry Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-5 pointer-events-none flex items-center justify-between font-mono gap-2">
        {/* Left Mission Identity */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-xl px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-white">
              WANG SALIN // 汪狗哥
            </span>
            <span className="text-[10px] text-cyan-400 font-medium hidden sm:inline">
              INTERSTELLAR ODYSSEY · 太阳系至终极黑洞
            </span>
          </div>
        </div>

        {/* Center/Right Controls: 3D Glasses Stereo Toggle + Telemetry */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* 3D Glasses Stereo Mode Switch */}
          <button
            type="button"
            onClick={onToggleStereo3D}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] font-mono font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-xl border ${
              stereo3D
                ? "bg-gradient-to-r from-rose-500/30 via-slate-900 to-cyan-500/30 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                : "bg-slate-950/80 border-white/20 text-slate-300 hover:text-white hover:border-cyan-400/50"
            }`}
            title="切换 3D 立体眼镜视差模式"
          >
            <Glasses className={`w-3.5 h-3.5 ${stereo3D ? "text-cyan-300 animate-pulse" : "text-slate-400"}`} />
            <span className="hidden sm:inline">3D眼镜模式</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                stereo3D ? "bg-rose-500 text-white" : "bg-white/10 text-slate-400"
              }`}
            >
              {stereo3D ? "ON" : "OFF"}
            </span>
          </button>

          {/* Right Telemetry Readout */}
          <div className="flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-xl px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-cyan-500/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
            <div className="text-right">
              <div className="text-[10px] text-cyan-400 tracking-wider uppercase font-semibold flex items-center justify-end gap-1">
                <Compass className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[90px] sm:max-w-none">{activeWp.name.split(" ")[0]}</span>
              </div>
              <div className="text-xs sm:text-sm font-black tabular-nums tracking-tight">
                {currentAU.toFixed(2)} AU
                <span className="text-[10px] text-slate-400 font-normal ml-1 hidden md:inline">
                  ({Math.round(currentAU * 149597870).toLocaleString()} KM)
                </span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-white/15 mx-0.5 sm:mx-1" />

            <div className="text-right">
              <div className="text-[9px] text-amber-400 uppercase font-semibold">VELOCITY</div>
              <div className="text-xs font-bold text-amber-300 tabular-nums">
                {warpMultiplier > 0.2 ? `WARP ${(1 + warpMultiplier * 3).toFixed(1)}` : "SUB-LIGHT"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Interplanetary Waypoint Rail */}
      <nav
        className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto font-mono max-w-[96vw] overflow-x-auto no-scrollbar"
        aria-label="Cosmic Waypoint Selector"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-slate-950/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
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
                <span className="text-[9px] opacity-75 hidden lg:inline">
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
