"use client";

import React from "react";

interface AltimeterProps {
  altitude: number; // in feet (13500 down to 0)
  verticalSpeed: number; // in mph
  phase: string;
  onSkipToGround: () => void;
}

export function FreefallAltimeter({
  altitude,
  verticalSpeed,
  phase,
  onSkipToGround,
}: AltimeterProps) {
  // Normalize altitude progress (0 at 13500, 1 at 0)
  const normProgress = Math.max(0, Math.min(1, (13500 - altitude) / 13500));
  const tapeOffset = normProgress * 76;

  const ticks = [
    { label: "13.5", major: true },
    { label: "", major: false },
    { label: "12.0", major: true },
    { label: "", major: false },
    { label: "10.5", major: true },
    { label: "", major: false },
    { label: "9.0", major: true },
    { label: "", major: false },
    { label: "7.5", major: true },
    { label: "", major: false },
    { label: "6.0", major: true },
    { label: "", major: false },
    { label: "4.5", major: true },
    { label: "", major: false },
    { label: "3.0", major: true },
    { label: "", major: false },
    { label: "1.5", major: true },
    { label: "", major: false },
    { label: "0.0", major: true },
  ];

  return (
    <aside
      className="fixed top-5 right-4 sm:right-8 z-50 pointer-events-auto select-none"
      aria-label="Aviation Narrative Altimeter"
    >
      <div className="flex items-center gap-3 bg-slate-950/85 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.7)] rounded-2xl p-2.5 sm:p-3 text-white font-mono transition-all duration-300">
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-[10px] sm:text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALTITUDE</span>
          </div>

          <div className="flex items-baseline justify-end gap-1 my-0.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white tabular-nums drop-shadow-md">
              {Math.round(altitude).toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-slate-400">FT</span>
          </div>

          <div className="flex items-center justify-end gap-2 text-[10px] text-slate-300 border-t border-white/10 pt-1 mt-1">
            <span className="text-amber-400 font-bold tabular-nums">
              V/S {verticalSpeed} MPH
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-300 font-medium truncate max-w-[90px] sm:max-w-[120px]">
              {phase}
            </span>
          </div>
        </div>

        <div className="relative w-6 sm:w-8 h-20 sm:h-24 bg-black/60 rounded-lg overflow-hidden border border-white/15">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center z-20 pointer-events-none">
            <div className="w-2 h-1 bg-amber-400 rounded-r-xs shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            <div className="flex-1 h-[1px] bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
          </div>

          <div
            className="absolute left-0 right-0 transition-transform duration-75 ease-out flex flex-col justify-between"
            style={{
              top: "50%",
              transform: `translateY(-${tapeOffset}%)`,
            }}
          >
            {ticks.map((t, idx) => (
              <div
                key={idx}
                className="h-3 sm:h-3.5 flex items-center justify-end pr-1.5 text-[8px] sm:text-[9px] font-mono text-slate-300 gap-1"
              >
                {t.major && <span>{t.label}</span>}
                <span
                  className={`h-[1px] bg-white/40 ${
                    t.major ? "w-2.5 bg-emerald-400" : "w-1.5 bg-white/30"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {altitude > 600 && (
        <button
          onClick={onSkipToGround}
          type="button"
          className="mt-2 w-full py-1.5 px-3 rounded-xl bg-slate-900/90 hover:bg-emerald-600 text-[11px] font-medium text-slate-200 hover:text-white border border-white/15 hover:border-emerald-400/50 backdrop-blur-md shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer group"
        >
          <span>直达地面基站</span>
          <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
        </button>
      )}
    </aside>
  );
}
