"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Store, Code2, Users, CheckCircle2, ChefHat, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

const heroTabs = [
  {
    id: "restaurant",
    title: "实体餐饮与商业视角",
    subtitle: "做过 6 年探店、服务 2000+ 商家、亲自投钱开店 3 年",
    points: [
      "深谙大众点评好评防御、团购套餐与客情留存痛点",
      "理解店长与后厨被繁碎杂务切割的真实经营工时",
      "拒绝对着空洞报表谈经营，优先解决现场生产死结",
    ],
    badge: "实体经营死结拆解",
    icon: ChefHat,
  },
  {
    id: "fde",
    title: "FDE 模式企业 AI 驻场",
    subtitle: "Palantir 模式前向部署，工程师深入办公与生产现场",
    points: [
      "驻场 1-2 周抓取高频重复断点流程，量化计算 ROI",
      "搭建企业私有 RAG 知识库，剔除通用模型套话",
      "极简工具交付，微信/企微协同无门槛上手",
    ],
    badge: "1-2周驻场交付",
    icon: Building2,
  },
  {
    id: "foodops",
    title: "FoodOps 旗舰开源",
    subtitle: "连锁餐饮 AI 运营与内容协同工作流",
    points: [
      "美团/点评全渠道差评监控与情绪化得体抚慰",
      "连锁店长“今日智能工作台”早晨自动任务下发",
      "商家品牌知识库与小红书/抖音营销素材自动衍生",
    ],
    badge: "开源持续验证",
    icon: Code2,
  },
];

export function HeroSection() {
  const [activeTabId, setActiveTabId] = useState("restaurant");
  const activeTab = heroTabs.find((t) => t.id === activeTabId) ?? heroTabs[0];

  return (
    <section className="relative flex items-center pt-8 pb-12 sm:pt-14 sm:pb-20 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* 左侧：主标题与品牌定位 */}
          <div className="space-y-6">
            {/* 实时状态 Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold px-3.5 py-1 rounded-full bg-[var(--brand)] text-[var(--brand-foreground)] shadow-sm">
                <Building2 size={13} />
                {siteConfig.name}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {siteConfig.location} · 全国可出差驻场
              </span>
            </div>

            {/* 极其震撼的大标题 */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              用 AI，
              <br />
              把生意
              <br />
              <span className="relative inline-block text-[var(--brand)]">
                重新做一遍。
                <svg className="absolute left-0 bottom-[-6px] w-full h-3.5" viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11C55 4 145 4 197 11" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* 个人故事定位文案 */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              做过本地生活内容，也亲自下场经营餐饮。现在把十多年积累的商业、内容和产品经验，变成真正能落地的 AI 工具与解决方案。
            </p>

            {/* 行动按钮双重方案 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button href="/projects/foodops" size="lg" variant="primary" className="justify-center shadow-lg shadow-[var(--brand)]/15">
                查看 FoodOps 旗舰案例
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="justify-center">
                预约 30 分钟拆解沟通
              </Button>
            </div>

            {/* 3 大核心支柱迷你特征 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--border)]">
              <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
                <div className="text-xs font-extrabold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Store size={14} className="text-[var(--brand)] shrink-0" /> 实体餐饮经验
                </div>
                <div className="text-[11px] mt-1 text-[var(--text-secondary)]">6年探店 + 服务2000+商家</div>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
                <div className="text-xs font-extrabold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Code2 size={14} className="text-[var(--brand)] shrink-0" /> 真实 AI 工具
                </div>
                <div className="text-[11px] mt-1 text-[var(--text-secondary)]">针对断点流程打造 MVP</div>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
                <div className="text-xs font-extrabold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <Users size={14} className="text-[var(--brand)] shrink-0" /> 务实落地合作
                </div>
                <div className="text-[11px] mt-1 text-[var(--text-secondary)]">不务虚概念，以结果验收</div>
              </div>
            </div>
          </div>

          {/* 右侧：现代感互动卡片 (三大视角切换) */}
          <div className="relative">
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xl space-y-6">
              {/* 顶栏头像与身份说明 */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0">
                    <Image
                      src="/images/salin-brand-logo.png"
                      alt="狗哥 Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[var(--text-primary)] leading-none">
                      狗哥 (Wang Salin)
                    </h3>
                    <p className="text-[11px] font-mono text-[var(--text-secondary)] mt-1">
                      连续创业者 / AI 商业实践者
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
                  {activeTab.badge}
                </span>
              </div>

              {/* 视角切换 Tab Header */}
              <div className="flex p-1 rounded-xl bg-[var(--surface-muted)] gap-1">
                {heroTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={cn(
                        "flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                        isActive
                          ? "bg-[var(--surface)] text-[var(--brand)] shadow-sm"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      <Icon size={13} />
                      <span className="hidden sm:inline">{tab.title.slice(0, 4)}</span>
                      <span className="sm:hidden">{tab.title.slice(0, 2)}</span>
                    </button>
                  );
                })}
              </div>

              {/* 视角切换内容体 */}
              <div className="space-y-4 pt-1 min-h-[190px]">
                <div>
                  <h4 className="font-extrabold text-base text-[var(--text-primary)] mb-1">
                    {activeTab.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {activeTab.subtitle}
                  </p>
                </div>

                <ul className="space-y-2 pt-1">
                  {activeTab.points.map((pt) => (
                    <li key={pt} className="text-xs text-[var(--text-primary)] flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={14} className="text-[var(--brand)] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 卡片底栏 */}
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" /> 拒绝空中楼阁套话
                </span>
                <Link href="/projects/foodops" className="text-[var(--brand)] font-bold hover:underline">
                  查看 FoodOps 详情 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
