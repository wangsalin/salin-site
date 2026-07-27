import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, GitFork, Clock, CheckCircle2, MessageSquare, Share2, Bookmark } from "lucide-react";
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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* 页面标题 */}
      <div className="max-w-3xl mb-16">
        <SectionHeading
          label="联系合作与 FDE 驻场预约"
          title="先说真实业务断点，再谈技术落地。"
          description="不聊空洞高大上的概念。适合有具体业务痛点、想找具备实体经营经验的技术人一起深入现场落地 AI 产品的朋友。"
        />
      </div>

      {/* 合作流程卡片 */}
      <div className="mb-16">
        <p className="text-xs font-bold uppercase tracking-wider mb-6 text-[var(--text-secondary)]">合作流转标准流程</p>
        <div className="grid md:grid-cols-3 gap-5">
          {processSteps.map((s) => (
            <div key={s.step} className="p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover">
              <div className="text-3xl font-extrabold mb-2 text-[var(--brand)]">{s.step}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
        {/* 左侧：双向选择 */}
        <div className="space-y-10">
          {/* 适合交流的方向 */}
          <div>
            <h2
              className="text-lg font-bold mb-5 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <CheckCircle2 className="text-emerald-500" size={20} /> 适合联系我的情况
            </h2>
            <div className="space-y-3">
              {suitable.map((dir) => (
                <div
                  key={dir.label}
                  className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover"
                >
                  <div className="font-bold text-base mb-1" style={{ color: "var(--text-primary)" }}>
                    {dir.label}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {dir.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 不适合的情况 */}
          <div>
            <h2
              className="text-lg font-bold mb-5 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center text-xs">✕</span> 不太适合的情况
            </h2>
            <div className="space-y-3">
              {unsuitable.map((dir) => (
                <div
                  key={dir.label}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] opacity-70"
                >
                  <div className="font-bold text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
                    {dir.label}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {dir.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：真实的联系信息卡片 (展示微信二维码) */}
        <div className="space-y-5">
          {/* 响应 SLA */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <Clock size={16} className="shrink-0" />
            <span>通常在 24 小时内回复所有有具体问题的邮件与微信消息。</span>
          </div>

          {/* 微信与真实二维码展示 */}
          <div
            className="rounded-3xl p-6 border border-[var(--border)] bg-[var(--surface)] shadow-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <MessageSquare size={18} className="text-emerald-500" />
                <span className="text-xs font-bold tracking-widest uppercase">微信联系与二维码</span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--brand)] bg-[var(--surface-muted)] px-2.5 py-0.5 rounded-full">
                微信号: {siteConfig.wechat}
              </span>
            </div>

            {/* 真实微信二维码 Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-white p-2 flex items-center justify-center shadow-inner">
              <Image
                src={siteConfig.wechatQr}
                alt="王善林 Salin 微信二维码"
                fill
                className="object-contain p-2"
                sizes="320px"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border)]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--text-secondary)]">微信号直接复制:</span>
                <CopyButton text={siteConfig.wechat} label="复制微信号" />
              </div>
              <p className="text-[11px] text-center text-[var(--text-secondary)] italic">
                * 扫码添加好友请备注“Salin 官网 FDE 沟通”
              </p>
            </div>
          </div>

          {/* 邮箱 */}
          <div
            className="rounded-2xl p-5 border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="flex items-center gap-2 mb-2" style={{ color: "var(--text-secondary)" }}>
              <Mail size={16} />
              <span className="text-xs font-bold tracking-widest uppercase">电子邮件</span>
            </div>
            <p className="text-base font-bold mb-3 font-mono" style={{ color: "var(--text-primary)" }}>
              {siteConfig.email}
            </p>
            <div className="flex gap-2">
              <CopyButton text={siteConfig.email} label="复制邮箱" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-muted)] transition-colors font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                直接发信
              </a>
            </div>
          </div>

          {/* 公众号 & 社交阵地 */}
          <div className="rounded-2xl p-5 border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
              <Bookmark size={16} />
              <span className="text-xs font-bold tracking-widest uppercase">微信公众号</span>
            </div>
            <p className="text-sm font-extrabold text-[var(--brand)]">
              {siteConfig.gongzhonghao}
            </p>

            <div className="pt-2 border-t border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <GitFork size={14} /> GitHub:
                </span>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="font-mono font-bold hover:underline text-[var(--brand)]">
                  wangsalin
                </a>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <Share2 size={14} /> X (Twitter):
                </span>
                <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="font-mono font-bold hover:underline text-[var(--brand)]">
                  @EyuSalin
                </a>
              </div>
            </div>
          </div>

          {/* 所在地 */}
          <div
            className="rounded-2xl p-5 border border-[var(--border)] bg-[var(--surface)] flex items-center gap-3"
          >
            <MapPin size={18} className="text-[var(--brand)] shrink-0" />
            <div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>常驻城市 / FDE 驻场覆盖</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {siteConfig.location} (支持全国出差驻场)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
