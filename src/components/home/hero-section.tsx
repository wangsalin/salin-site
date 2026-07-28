"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Store, Code2, Users, ChefHat, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

const bentoTabs = [
  {
    id: "restaurant",
    title: "01 / 实体餐饮视角",
    subtitle: "做过 6 年探店 · 服务 2000+ 商家 · 投钱开店 3 年",
    desc: "熟悉美团点评防守、团购损耗控制与后厨经营死结，拒对着空洞报表谈经营。",
    badge: "实操死结拆解",
    icon: ChefHat,
  },
  {
    id: "fde",
    title: "02 / FDE 企业 AI 驻场",
    subtitle: "Palantir 模式前向部署 · 工程师深入企业现场",
    desc: "1-2 周驻场抓取高频工时死结，搭建私有知识库，微信/企微极简交付零门槛。",
    badge: "1-2周驻场交付",
    icon: Building2,
  },
  {
    id: "foodops",
    title: "03 / FoodOps 旗舰开源",
    subtitle: "餐饮连锁 AI 运营与内容协同工作流",
    desc: "差评自动化抚慰、连锁店长今日智能工作台、多渠道营销素材自动化衍生。",
    badge: "开源持续验证",
    icon: Code2,
  },
];

export function HeroSection() {
  const [activeTabId, setActiveTabId] = useState("restaurant");
  const activeTab = bentoTabs.find((t) => t.id === activeTabId) ?? bentoTabs[0];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 md:py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        
        {/* Neo-Brutalist Bento Master Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Cell 1 (Left 7 Cols): Master Headline & Persona */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-9 flex flex-col justify-between space-y-6 bg-[var(--surface)]">
            <div className="space-y-5">
              {/* Status Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bento-badge bg-[var(--brand)] text-[var(--brand-foreground)]">
                  <Building2 size={13} />
                  {siteConfig.name}
                </span>
                <span className="bento-badge">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  {siteConfig.location} · 可全国驻场
                </span>
                <span className="bento-badge bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <Zap size={13} /> FDE AI 落地
                </span>
              </div>

              {/* Ultra-Bold Neo-Brutalist H1 Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
              >
                用 AI，
                <br />
                把生意
                <br />
                <span className="relative inline-block text-[var(--brand)] underline decoration-[var(--accent)] decoration-wavy decoration-4">
                  重新做一遍。
                </span>
              </h1>

              {/* Bio Summary */}
              <p className="text-base sm:text-lg leading-relaxed font-medium text-[var(--text-secondary)] max-w-xl">
                做过本地生活内容，也亲自下场经营餐饮。现在把十多年积累的商业、内容和产品经验，变成真正能落地的 AI 工具与解决方案。
              </p>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t-2 border-[var(--border)]">
              <Button href="/projects/foodops" size="lg" variant="primary" className="justify-center shadow-[4px_4px_0px_0px_var(--border)]">
                查看 FoodOps 旗舰案例
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="justify-center shadow-[4px_4px_0px_0px_var(--border)]">
                预约 30 分钟拆解沟通
              </Button>
            </div>
          </div>

          {/* Bento Cell 2 (Right 5 Cols): Interactive Bento Persona Switcher */}
          <div className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[var(--surface-muted)]/40">
            {/* Cell Header */}
            <div className="flex items-center justify-between border-b-2 border-[var(--border)] pb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl border-2 border-[var(--border)] bg-slate-900 overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_var(--border)]">
                  <Image
                    src="/images/salin-brand-logo.png"
                    alt="狗哥 Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-black text-base text-[var(--text-primary)]">
                    狗哥 (Wang Salin)
                  </h3>
                  <p className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                    连续创业者 / AI 商业实践者
                  </p>
                </div>
              </div>

              <span className="bento-badge bg-[var(--accent)] text-[var(--accent-foreground)]">
                {activeTab.badge}
              </span>
            </div>

            {/* Bento Selector Pills */}
            <div className="grid grid-cols-3 gap-2">
              {bentoTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "py-2.5 px-2 rounded-xl text-xs font-mono font-extrabold transition-all border-2 flex flex-col items-center gap-1 cursor-pointer",
                      isActive
                        ? "border-[var(--border)] bg-[var(--brand)] text-[var(--brand-foreground)] shadow-[2px_2px_0px_0px_var(--border)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    <Icon size={16} />
                    <span>{tab.title.slice(5, 9)}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Content Showcase Box */}
            <div className="p-4 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] shadow-[3px_3px_0px_0px_var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--brand)]">
                <span>{activeTab.title}</span>
                <ShieldCheck size={14} />
              </div>
              <h4 className="text-sm font-black text-[var(--text-primary)]">
                {activeTab.subtitle}
              </h4>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-medium">
                {activeTab.desc}
              </p>
            </div>

            {/* Bento Cell Footer Link */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-[var(--text-secondary)]">
              <span>拒绝虚幻概念套话</span>
              <Link href="/projects/foodops" className="text-[var(--brand)] hover:underline font-extrabold">
                探索 FoodOps →
              </Link>
            </div>
          </div>

          {/* Bento Sub-Grid (Bottom 3 Feature Cards) */}
          <div className="lg:col-span-4 bento-card p-5 bg-[var(--surface)] glass-card-hover">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--brand)] text-[var(--brand-foreground)] shadow-[2px_2px_0px_0px_var(--border)]">
                <Store size={18} />
              </span>
              <div>
                <h4 className="text-sm font-black text-[var(--text-primary)]">实体餐饮一线经历</h4>
                <p className="text-xs text-[var(--text-secondary)] font-bold">6年探店 + 服务2000+商家 + 投钱开店</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bento-card p-5 bg-[var(--surface)] glass-card-hover">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[2px_2px_0px_0px_var(--border)]">
                <Code2 size={18} />
              </span>
              <div>
                <h4 className="text-sm font-black text-[var(--text-primary)]">真实 AI 工具与 MVP</h4>
                <p className="text-xs text-[var(--text-secondary)] font-bold">断点死结优先 · 微信群极简 Agent 嵌入</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bento-card p-5 bg-[var(--surface)] glass-card-hover">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_var(--border)]">
                <Users size={18} />
              </span>
              <div>
                <h4 className="text-sm font-black text-[var(--text-primary)]">务实落地与双向选择</h4>
                <p className="text-xs text-[var(--text-secondary)] font-bold">不先承诺庞大概念 · 以实际 ROI 验收</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
