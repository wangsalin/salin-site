"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Terminal, UtensilsCrossed, BookOpen } from "lucide-react";

export interface MilestoneItem {
  id: string;
  altitudeTrigger: number; // e.g. 11000
  altitudeRange: [number, number]; // [min, max]
  badge: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  gradient: string;
  accentColor: string;
}

export const MILESTONES: MilestoneItem[] = [
  {
    id: "salin-ui",
    altitudeTrigger: 11000,
    altitudeRange: [9800, 12500],
    badge: "11,000 FT · 旗舰战略装备",
    title: "Salin UI (AI 界面弹药库)",
    tagline: "面向 Cursor / Claude / v0 的专业级界面弹药库",
    description:
      "收录 252+ 项全栈界面资产与全景商业样板间，支持单文件 TSX 源码复制与原生 MCP 协议直连，为 AI 编程提供强悍武器补给。",
    metrics: [
      { label: "资产收录", value: "252+" },
      { label: "MCP 协议", value: "原生直连" },
      { label: "样板复刻", value: "全景一键" },
    ],
    primaryLink: { label: "进入 Salin UI 弹药库", href: "/ui/" },
    secondaryLink: { label: "查看项目档案", href: "/projects/salin-ui" },
    gradient: "from-emerald-500/25 via-cyan-500/10 to-transparent",
    accentColor: "border-emerald-500/40 text-emerald-400",
  },
  {
    id: "gouge-hub",
    altitudeTrigger: 8500,
    altitudeRange: [7200, 9800],
    badge: "8,500 FT · 本地商业与实体知识库",
    title: "狗哥资源库 (Gouge Hub)",
    tagline: "连接真实商业场景的知识与实操资料库",
    description:
      "聚合本地商业操盘手册、实体获客经验与 AI 赋能教程，帮助创业者和团队快速避坑、找准可落地的商业现金流路径。",
    metrics: [
      { label: "实操手册", value: "40+ 套" },
      { label: "私域获客", value: "全域打通" },
      { label: "持续迭代", value: "高频收录" },
    ],
    primaryLink: { label: "深入项目档案", href: "/projects/gouge-hub" },
    gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
    accentColor: "border-amber-500/40 text-amber-400",
  },
  {
    id: "foodops",
    altitudeTrigger: 6200,
    altitudeRange: [4900, 7200],
    badge: "6,200 FT · 亲自下场实体数字化操盘",
    title: "FoodOps 数字化系统",
    tagline: "餐饮门店经营与供应链数字化全案实战",
    description:
      "亲自下场开店、管后厨、跑供应链。将实体经营真实痛点沉淀为自动化成本分析、后厨工单排班与连锁管理数字化系统。",
    metrics: [
      { label: "供应链降本", value: "18%" },
      { label: "后厨效能", value: "+35%" },
      { label: "实战验证", value: "多店落地" },
    ],
    primaryLink: { label: "查看实战复盘", href: "/projects/foodops" },
    secondaryLink: { label: "项目档案", href: "/projects/foodops" },
    gradient: "from-rose-500/25 via-pink-500/10 to-transparent",
    accentColor: "border-rose-500/40 text-rose-400",
  },
  {
    id: "notes",
    altitudeTrigger: 4000,
    altitudeRange: [2800, 4900],
    badge: "4,000 FT · 商业落地复盘笔记",
    title: "AI 时代思考与实战手记",
    tagline: "不聊空洞概念，只交付客户愿意买单的价值",
    description:
      "记录从实体餐饮到 AI 产品架构的真实心得。拆解为什么很多 AI 工具没人用，以及什么样的应用能产生真实商业现金流。",
    metrics: [
      { label: "深度长文", value: "10+ 篇" },
      { label: "商业复盘", value: "100% 真实" },
      { label: "交付导向", value: "以作品说话" },
    ],
    primaryLink: { label: "阅读最新手记", href: "/notes" },
    gradient: "from-blue-500/25 via-indigo-500/10 to-transparent",
    accentColor: "border-blue-500/40 text-blue-400",
  },
];

export function FreefallMilestones({ currentAltitude }: { currentAltitude: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {MILESTONES.map((item) => {
        const [minAlt, maxAlt] = item.altitudeRange;
        const isActive = currentAltitude >= minAlt && currentAltitude <= maxAlt;

        const dist = Math.abs(currentAltitude - item.altitudeTrigger);
        const maxDist = (maxAlt - minAlt) / 2;
        const progress = Math.max(0, 1 - dist / maxDist);

        if (!isActive && progress <= 0.05) return null;

        const depthScale = 0.82 + progress * 0.22;
        const translateY = (currentAltitude - item.altitudeTrigger) * 0.04;

        return (
          <div
            key={item.id}
            className="absolute transition-all duration-300 ease-out max-w-xl w-full pointer-events-auto"
            style={{
              opacity: Math.min(1, progress * 1.5),
              transform: `perspective(1000px) scale(${depthScale}) translateY(${translateY}px) translateZ(0)`,
            }}
          >
            <div
              className={`relative rounded-3xl p-6 sm:p-8 bg-slate-950/92 backdrop-blur-2xl border border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)]`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 pointer-events-none`}
              />

              <div className="relative flex items-center justify-between gap-3 mb-4">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border text-[11px] sm:text-xs font-mono font-medium ${item.accentColor}`}
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>{item.badge}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {Math.round(currentAltitude)} FT
                </span>
              </div>

              <div className="relative mb-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-emerald-400/90 mt-1">
                  {item.tagline}
                </p>
              </div>

              <p className="relative text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="relative grid grid-cols-3 gap-2 sm:gap-3 py-3 border-y border-white/10 mb-6 bg-white/[0.03] rounded-xl px-2">
                {item.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex flex-wrap items-center gap-3">
                <Link
                  href={item.primaryLink.href}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{item.primaryLink.label}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {item.secondaryLink && (
                  <Link
                    href={item.secondaryLink.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/15 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>{item.secondaryLink.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
