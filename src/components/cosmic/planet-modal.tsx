"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, X, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";

export interface ProjectDetail {
  id: string;
  planetName: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  accentColor: string;
}

interface ModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function PlanetModal({ project, onClose }: ModalProps) {
  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full rounded-3xl p-6 sm:p-10 bg-slate-950/95 border border-cyan-500/40 shadow-[0_24px_80px_rgba(6,182,212,0.3)] text-white font-sans overflow-hidden"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="关闭项目窗口"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{project.badge}</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-cyan-300/90 font-medium mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights List */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
            KEY CAPABILITIES // 核心指标与交付亮点
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.04] p-2.5 rounded-xl border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/10 mb-8 bg-white/[0.02] rounded-2xl px-3 font-mono">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="text-base sm:text-lg font-black text-white">{m.value}</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={project.primaryLink.href}
            className="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{project.primaryLink.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {project.secondaryLink && (
            <Link
              href={project.secondaryLink.href}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{project.secondaryLink.label}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-white text-xs font-mono ml-auto cursor-pointer"
          >
            返回星图 ESC
          </button>
        </div>
      </div>
    </div>
  );
}
