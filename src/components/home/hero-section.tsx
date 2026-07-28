"use client";

import { ArrowRight, Sparkles, Building2, Store, Code2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex items-center pt-10 pb-12 sm:pt-16 sm:pb-20 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* 左侧主内容 */}
          <div>
            {/* 狗哥品牌身份 */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-[var(--brand)] text-[var(--brand-foreground)] shadow-sm"
              >
                <Building2 size={13} />
                狗哥 · WANG SALIN
              </span>
              <span
                className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
              >
                连续创业者 / AI 商业实践者
              </span>
            </div>

            {/* 主标题 */}
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
              <Button href="/projects/foodops" size="lg" variant="primary" className="justify-center">
                查看 FoodOps 旗舰案例
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="justify-center">
                联系合作与沟通
              </Button>
            </div>

            {/* 核心关注焦点 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--border)]">
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Store size={15} className="text-[var(--brand)] shrink-0" /> 餐饮一线经历
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>6年探店 + 服务2000+商家</div>
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Code2 size={15} className="text-[var(--brand)] shrink-0" /> 真实 AI 工具
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>针对断点流程打造 MVP</div>
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Users size={15} className="text-[var(--brand)] shrink-0" /> 务实落地合作
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>不务虚概念，以结果验收</div>
              </div>
            </div>
          </div>

          {/* 右侧：纯粹书卷质感卡片展示 */}
          <div className="relative">
            <div
              className="rounded-3xl border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-lg bg-[var(--surface)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)] flex items-center gap-1.5">
                  <Sparkles size={14} /> GOU GE PRACTICE ROADMAP
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--text-secondary)] font-medium">
                  狗哥的实践视角
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[var(--surface-muted)]/50 border border-[var(--border)] space-y-1">
                  <span className="text-xs font-bold text-[var(--brand)]">01. 真实断点优先</span>
                  <p className="text-xs text-[var(--text-primary)] font-bold">先找工时耗费大、重复率高的死结</p>
                  <p className="text-[11px] text-[var(--text-secondary)]">不从模型参数出发，而从谁正为此付代价出发。</p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--surface-muted)]/50 border border-[var(--border)] space-y-1">
                  <span className="text-xs font-bold text-[var(--brand)]">02. 极简交付界面</span>
                  <p className="text-xs text-[var(--text-primary)] font-bold">微信群/企微即时交互，无门槛上手</p>
                  <p className="text-[11px] text-[var(--text-secondary)]">绝不让一线员工学习复杂的第二套系统软件。</p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--surface-muted)]/50 border border-[var(--border)] space-y-1">
                  <span className="text-xs font-bold text-[var(--brand)]">03. 资产私有化沉淀</span>
                  <p className="text-xs text-[var(--text-primary)] font-bold">将老员工经验转化为专属向量知识库</p>
                  <p className="text-[11px] text-[var(--text-secondary)]">摆脱套话输出，让 AI 输出具备独特的烟火气与专业度。</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
                <span>实战积累 · 拒绝对套话</span>
                <span className="text-[var(--brand)] font-bold">Salin.wang</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
