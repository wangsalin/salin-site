"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Radio } from "lucide-react";

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
  { id: "outpost", name: "深空前哨基站", distanceAU: 15.0, label: "商业合作", progressTarget: 0.98 },
];

interface HUDProps {
  currentAU: number;
  activeWaypointIndex: number;
  warpMultiplier: number;
  onWarpTo: (progress: number) => void;
}

export function CosmicHUD({
  currentAU,
  activeWaypointIndex,
  warpMultiplier,
  onWarpTo,
}: HUDProps) {
  const activeWp = WAYPOINTS[activeWaypointIndex] || WAYPOINTS[0];

  return (
    <>
      {/* Top Telemetry Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none flex items-center justify-between font-mono">
        {/* Left Mission Identity */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-950/80 backdrop-blur-xl px-4 py-2.5 rounded-full border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-white">
              WANG SALIN // 狗哥
            </span>
            <span className="text-[10px] text-cyan-400 font-medium hidden sm:inline">
              INTERSTELLAR ODYSSEY · 星际产品航行
            </span>
          </div>
        </div>

        {/* Right Telemetry Readout */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-950/80 backdrop-blur-xl px-4 py-2.5 rounded-full border border-cyan-500/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          <div className="text-right">
            <div className="text-[10px] text-cyan-400 tracking-wider uppercase font-semibold flex items-center justify-end gap-1.5">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span>{activeWp.name}</span>
            </div>
            <div className="text-xs sm:text-sm font-black tabular-nums tracking-tight">
              {currentAU.toFixed(2)} AU
              <span className="text-[10px] text-slate-400 font-normal ml-1 hidden sm:inline">
                ({Math.round(currentAU * 149597870).toLocaleString()} KM)
              </span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/15 mx-1" />

          <div className="text-right">
            <div className="text-[9px] text-amber-400 uppercase font-semibold">VELOCITY</div>
            <div className="text-xs font-bold text-amber-300 tabular-nums">
              {warpMultiplier > 0.2 ? `WARP ${(1 + warpMultiplier * 3).toFixed(1)}` : "SUB-LIGHT"}
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Interplanetary Waypoint Rail */}
      <nav
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto font-mono max-w-[95vw] overflow-x-auto no-scrollbar"
        aria-label="Cosmic Waypoint Selector"
      >
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
          {WAYPOINTS.map((wp, idx) => {
            const isCurrent = idx === activeWaypointIndex;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onWarpTo(wp.progressTarget)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/30 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{wp.name.split(" ")[0]}</span>
                <span className="text-[9px] opacity-75 hidden md:inline">
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
