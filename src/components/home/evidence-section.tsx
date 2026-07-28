"use client";

import Image from "next/image";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import { evidenceItems } from "@/data/evidence";

export function EvidenceSection() {
  return (
    <section className="py-12 sm:py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden bg-[var(--surface-muted)]/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 标题 */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--brand)] text-[var(--brand-foreground)]">
              SECTION 04
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)] flex items-center gap-1">
              <Sparkles size={12} />
              REAL PRACTICE PROOF · 真实实践证据
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            这些不是标签，是我真实做过的事情。
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            从 6 年本地生活内容与社群爆款，到服务 2000+ 餐饮商家，再到亲自投钱下场做开店经营。十多年的坑与实操，是我产品与 AI 落地不会落空的底层底气。
          </p>
        </div>

        {/* 4 项真实实践证据网格 */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {evidenceItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5 sm:p-7 space-y-4 glass-card-hover flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
                    {item.yearRange}
                  </span>
                  {item.metrics && (
                    <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {item.metrics}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 图像或占位预览框 (TODO: USER_CONTENT 随时替换真实图片) */}
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-muted)] group flex items-center justify-center mt-2">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/90 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded border border-slate-700">
                    <ImageIcon size={12} className="text-[var(--accent)]" />
                    <span>实拍数据凭证与案例记录</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
