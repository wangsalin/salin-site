import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, GitFork, Clock, CheckCircle2, MessageSquare, Share2, Bookmark, ArrowRight, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { contactDirections } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { CopyButton } from "@/components/ui/copy-button";

export const metadata: Metadata = {
  title: "联系合作",
  description:
    "与王善林 (Salin) 联系，探讨 FDE 企业 AI 驻场落地、餐饮商业数字化 (FoodOps/饿狸)、美业 SaaS (悦颜智店) 与个人关系网络项目交流。",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const processSteps = [
  { step: "01", title: "微信 / 邮件初步沟通", desc: "简要说明您的业务背景、遇到的具体痛点或想验证的产品方向。" },
  { step: "02", title: "30 分钟问题拆解会", desc: "在线沟通，共同梳理业务流程、识别输入输出，判断 AI 介入的可行性与投入产出比。" },
  { step: "03", title: "制定 FDE 驻场验证方案", desc: "明确 1-2 周驻场交付的边界与量化 ROI 指标，快速部署并以真实效果验收。" }
];

export default function ContactPage() {
  const suitable = contactDirections.filter((d) => d.suitable);
  const unsuitable = contactDirections.filter((d) => !d.suitable);

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div 
        className="pointer-events-none absolute -top-40 right-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* 页面标题 */}
      <div className="relative max-w-3xl mb-16 sm:mb-20">
        <SectionHeading
          label="联系合作与 FDE 驻场预约"
          title="先说真实业务断点，再谈技术落地。"
          description="不聊空洞高大上的概念。适合有具体业务痛点、想找具备实体经营经验的技术人一起深入现场落地 AI 产品的朋友。"
        />
      </div>

      {/* 合作流程卡片 */}
      <div className="relative mb-20">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
            STANDARD PROCESS · 合作流转标准流程
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {processSteps.map((s) => (
            <div 
              key={s.step} 
              className="relative p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md hover:shadow-xl hover:border-[var(--brand)]/30 hover:bg-[var(--surface-elevated)]/80 transition-all duration-300 group"
            >
              <div className="text-4xl font-mono font-black mb-3 text-[var(--brand)]/40 group-hover:text-[var(--brand)] transition-colors">
                {s.step}
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col lg:grid lg:grid-cols-[1fr_390px] gap-10 lg:gap-14">
        {/* 微信二维码与联系卡片 (移动端优先置顶展示) */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* 响应 SLA */}
          <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 font-medium backdrop-blur-md">
            <Clock size={17} className="shrink-0 text-emerald-500 animate-pulse" />
            <span>通常在 24 小时内回复所有有具体问题的邮件与微信消息。</span>
          </div>

          {/* 微信与真实二维码展示 */}
          <div className="rounded-3xl p-6 sm:p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-2xl shadow-xl shadow-emerald-950/5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase">微信扫码直联</span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--brand)] bg-[var(--brand)]/10 px-3 py-1 rounded-full border border-[var(--brand)]/20">
                {siteConfig.wechat}
              </span>
            </div>

            {/* 真实微信二维码 Image */}
            <div className="relative w-full max-w-[280px] mx-auto aspect-square rounded-2xl overflow-hidden border border-[var(--border-glass)] bg-white p-3 flex items-center justify-center shadow-lg">
              <Image
                src={siteConfig.wechatQr}
                alt="王善林 Salin 微信二维码"
                fill
                className="object-contain p-2"
                sizes="280px"
              />
            </div>

            <div className="space-y-3 pt-3 border-t border-[var(--border-glass)]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--text-secondary)] font-medium">微信号复制:</span>
                <CopyButton text={siteConfig.wechat} label="复制微信号" />
              </div>
              <p className="text-[11px] text-center text-[var(--text-muted)] italic">
                * 扫码添加好友请备注“Salin 官网 FDE 沟通”
              </p>
            </div>
          </div>

          {/* 邮箱 */}
          <div className="rounded-3xl p-6 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md">
            <div className="flex items-center gap-2 mb-3 text-[var(--text-muted)]">
              <Mail size={15} />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">电子邮件</span>
            </div>
            <p className="text-base sm:text-lg font-bold mb-4 font-mono text-[var(--text-primary)]">
              {siteConfig.email}
            </p>
            <div className="flex items-center gap-3">
              <CopyButton text={siteConfig.email} label="复制邮箱" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--brand)]/40 hover:text-[var(--brand)] transition-all font-medium"
              >
                直接发信
              </a>
            </div>
          </div>

          {/* 公众号 & 社交阵地 */}
          <div className="rounded-3xl p-6 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Bookmark size={15} />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">微信公众号</span>
            </div>
            <p className="text-base font-extrabold text-[var(--brand)]">
              {siteConfig.gongzhonghao}
            </p>

            <div className="pt-3 border-t border-[var(--border-glass)] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <GitFork size={13} className="text-[var(--brand)]" /> GitHub:
                </span>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="font-mono font-bold hover:underline text-[var(--brand)]">
                  wangsalin
                </a>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <Share2 size={13} className="text-[var(--accent)]" /> X (Twitter):
                </span>
                <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="font-mono font-bold hover:underline text-[var(--brand)]">
                  @EyuSalin
                </a>
              </div>
            </div>
          </div>

          {/* 所在地 */}
          <div className="rounded-3xl p-6 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] font-medium">常驻城市 / FDE 驻场覆盖</p>
              <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                {siteConfig.location} (支持全国出差驻场)
              </p>
            </div>
          </div>
        </div>

        {/* 左侧：双向选择 */}
        <div className="order-2 lg:order-1 space-y-12">
          {/* 适合交流的方向 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2.5 text-[var(--text-primary)]">
              <CheckCircle2 className="text-emerald-500" size={22} />
              <span>适合联系我的情况</span>
            </h2>
            <div className="space-y-4">
              {suitable.map((dir) => (
                <div
                  key={dir.label}
                  className="p-5 sm:p-6 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 hover:shadow-lg transition-all duration-300"
                >
                  <div className="font-bold text-base sm:text-lg mb-1.5 text-[var(--text-primary)]">
                    {dir.label}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal">
                    {dir.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 不适合的情况 */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2.5 text-[var(--text-primary)]">
              <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center text-xs">
                <X size={12} strokeWidth={3} />
              </div>
              <span>不太适合的情况</span>
            </h2>
            <div className="space-y-3.5">
              {unsuitable.map((dir) => (
                <div
                  key={dir.label}
                  className="p-4 sm:p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-muted)]/50 backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="font-bold text-xs sm:text-sm mb-1 text-[var(--text-secondary)]">
                    {dir.label}
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                    {dir.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
