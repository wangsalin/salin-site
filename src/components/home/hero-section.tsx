"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Terminal, CheckCircle2, ShieldCheck, Zap, Building2 } from "lucide-react";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const previewTabs = [
  { id: "fde", label: "FDE 驻场 AI 落地" },
  { id: "workspace", label: "今日智能工作台" },
  { id: "ai-prompt", label: "全渠道差评预警" },
  { id: "calendar", label: "营销内容日历" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("fde");

  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center py-12 md:py-24 overflow-hidden bg-grid-pattern">
      {/* 粒子交互背景 */}
      <ParticleCanvas />

      {/* 背景光晕装饰 */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full opacity-25 pointer-events-none blur-3xl neon-glow"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, var(--brand) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* 左侧主内容 */}
          <div>
            {/* 定位与状态徽章 */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold tracking-wider uppercase px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[var(--brand)] bg-[var(--brand)] text-[var(--brand-foreground)] shadow-md"
              >
                <Building2 size={13} />
                FDE 模式企业 AI 驻场落地
              </span>
              <span
                className="text-[11px] sm:text-xs font-bold px-3 py-1 sm:py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]"
                style={{ color: "var(--text-primary)" }}
              >
                前向部署工程师 · 拒绝概念脱节
              </span>
            </div>

            {/* 主标题 - H5 移动端字号自适应 */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-5"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              用 AI，
              <br />
              把生意
              <br />
              <span className="relative inline-block text-[var(--brand)] font-black">
                重新做一遍。
                <svg className="absolute left-0 bottom-[-4px] w-full h-3" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C50 3 150 3 198 10" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* 介绍 */}
            <p
              className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              做过本地生活内容，也亲自下场经营餐饮。现在把十多年积累的商业、内容和产品经验，变成真正能落地的 AI 工具与解决方案。
            </p>

            {/* 行动按钮 - H5 端全宽 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 sm:mb-10">
              <Button href="/projects" size="lg" variant="primary" className="shadow-lg shadow-[var(--brand)]/20 justify-center">
                查看 FDE 落地案例
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="justify-center">
                预约 FDE 驻场诊断
              </Button>
            </div>

            {/* 核心关注焦点指标列 - H5 移动端单列自适应 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--border)]">
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
                <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <ShieldCheck size={15} className="text-[var(--brand)] shrink-0" /> FDE 驻场陪跑
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>工程师直接深入企业一线</div>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
                <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Zap size={15} className="text-[var(--brand)] shrink-0" /> 极简 Agent
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>无需新软件，微信企微交互</div>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
                <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <CheckCircle2 size={15} className="text-[var(--brand)] shrink-0" /> 量化 ROI
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>实际节省工时与错误率验收</div>
              </div>
            </div>
          </div>

          {/* 右侧：交互式真实工作台演示组件 (H5 横向滑动 Tab 适配) */}
          <div className="relative">
            <div
              className="rounded-2xl border-2 border-[var(--brand)] shadow-2xl overflow-hidden glass-card-hover"
              style={{ background: "var(--surface)" }}
            >
              {/* 模拟系统窗口 Header */}
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-muted)]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 opacity-90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-green-400 opacity-90 shadow-sm" />
                  <span className="ml-1 sm:ml-2 text-xs font-mono font-bold" style={{ color: "var(--text-primary)" }}>
                    Salin FDE Engine v1.0
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-bold border border-emerald-500/30 shrink-0">
                  <Sparkles size={11} /> FDE LIVE
                </div>
              </div>

              {/* H5 移动端支持左右滑动的 Tab Header */}
              <div className="flex border-b border-[var(--border)] bg-[var(--surface)] px-2 overflow-x-auto no-scrollbar">
                {previewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-3 py-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0",
                      activeTab === tab.id
                        ? "border-[var(--brand)] text-[var(--brand)] font-extrabold bg-[var(--surface-muted)]/50"
                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 演示内容区块 */}
              <div className="p-4 sm:p-5 min-h-[280px]">
                {activeTab === "fde" && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold tracking-wide uppercase flex justify-between items-center" style={{ color: "var(--text-secondary)" }}>
                      <span>FDE 驻场 4 阶段落地管线</span>
                      <span className="text-[11px] font-mono text-[var(--brand)] font-bold">1-2周交付</span>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[var(--brand)]">Day 1-3 现场诊断</span>
                        <span className="text-emerald-600 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded">已完成</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        FDE 驻场跟踪运营与采购流，定位“报价核对”与“客情回复”两大高频断点
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[var(--brand)]">Day 4-7 知识库与 Agent 开发</span>
                        <span className="text-emerald-600 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded">已完成</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        清洗 500 份私有产品文档构建向量库，开发微信群@AI 报价助手 Agent
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[var(--brand)]">Day 8-14 嵌入与员工陪跑</span>
                        <span className="text-amber-600 font-bold text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded">进行中</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        直接在现有微信群内协同，目标缩短 60% 重复工时
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "workspace" && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold tracking-wide uppercase flex justify-between items-center" style={{ color: "var(--text-secondary)" }}>
                      <span>本日待办核心任务 (3)</span>
                      <span className="text-[11px] font-mono text-[var(--brand)]">8:30 AM</span>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[var(--background)]">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700">高优处理</span>
                          <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>大众点评 2 星差评自动得体抚慰</span>
                        </div>
                        <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                          “水煮鱼稍咸，拿米饭迟钝…” 智能回复与 20 元优惠券建议已生成
                        </p>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-1 rounded bg-[var(--brand)] text-[var(--brand-foreground)] shrink-0 self-end sm:self-auto">
                        一键应用
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[var(--background)]">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-700">营销排期</span>
                          <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>小红书立秋推文草稿审核</span>
                        </div>
                        <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                          结合“立秋贴秋膘”时令，包含美食组图描述与短文案
                        </p>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-1 rounded border border-[var(--border)] shrink-0 self-end sm:self-auto">
                        查看草稿
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "ai-prompt" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 text-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-700 pb-2 text-xs">
                        <Terminal size={14} /> 智能差评抚慰 Prompt 输出
                      </div>
                      <div className="text-slate-200 text-xs leading-relaxed bg-slate-800/80 p-2.5 rounded border border-slate-700">
                        “非常抱歉水煮鱼咸度没有合您口意！我们已对后厨调料配比复核。私信送您 20 元代金券，下次来我亲自为您安排！”
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "calendar" && (
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-7 gap-1 text-center font-bold pb-1 text-[11px]" style={{ color: "var(--text-secondary)" }}>
                      <div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div className="text-[var(--brand)]">六</div><div className="text-[var(--brand)]">日</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      <div className="p-1.5 rounded border border-[var(--border)] bg-[var(--surface-muted)] opacity-50">21</div>
                      <div className="p-1.5 rounded border border-[var(--border)]">22</div>
                      <div className="p-1.5 rounded border border-[var(--border)] bg-emerald-500/10 text-emerald-700 font-bold">23</div>
                      <div className="p-1.5 rounded border border-[var(--border)]">24</div>
                      <div className="p-1.5 rounded border border-[var(--border)]">25</div>
                      <div className="p-1.5 rounded border border-[var(--border)] bg-[var(--brand)] text-[var(--brand-foreground)] font-bold">26</div>
                      <div className="p-1.5 rounded border border-[var(--border)]">27</div>
                    </div>
                    <p className="text-[11px] pt-2" style={{ color: "var(--text-secondary)" }}>
                      📅 7月26日：《立秋特惠双人餐》小红书+抖音自动分发
                    </p>
                  </div>
                )}
              </div>

              {/* 演示底部 status */}
              <div className="px-4 py-2.5 bg-[var(--surface-muted)] border-t border-[var(--border)] flex items-center justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
                <span>FDE 驻场响应 0 隔阂</span>
                <span className="font-bold text-[var(--brand)]">满意度 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
