import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { getAllNotes, noteCategories } from "@/lib/content";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "实践记录",
  description: "Salin 的实践思考与经验记录，涵盖 AI 与商业、餐饮经营、产品创业和内容创意。",
  alternates: { canonical: `${siteConfig.url}/notes` },
};

export default function NotesPage() {
  const notes = getAllNotes();

  const categoryCounts = noteCategories.slice(1).reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat.value] = notes.filter((n) => n.category === cat.value).length;
      return acc;
    },
    {}
  );

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
      {/* Ambient background glows */}
      <div 
        className="pointer-events-none absolute -top-40 right-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <SectionHeading
        label="实践记录"
        title="写下来的思考，比说出来的更清晰。"
        description="这里记录真实的判断过程、踩坑经验和方法论，不是营销文章，也不是成功学。"
        className="mb-14"
      />

      {/* 分类胶囊 */}
      <div className="flex flex-wrap gap-2.5 mb-14">
        {noteCategories.map((cat, idx) => (
          <span
            key={cat.value}
            className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-all duration-200 flex items-center gap-2 cursor-default ${
              idx === 0
                ? "border-[var(--brand)]/40 bg-[var(--brand)]/10 text-[var(--brand)] font-bold shadow-xs"
                : "border-[var(--border-glass)] bg-[var(--surface-glass)] text-[var(--text-secondary)] backdrop-blur-md hover:border-[var(--brand)]/30 hover:text-[var(--text-primary)]"
            }`}
          >
            <span>{cat.label}</span>
            {cat.value !== "all" && categoryCounts[cat.value] !== undefined && (
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border-glass)]">
                {categoryCounts[cat.value]}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* 文章列表 */}
      {notes.length === 0 ? (
        <div className="py-20 text-center rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl">
          <p className="text-lg font-bold mb-2 text-[var(--text-primary)]">
            暂无文章
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            内容正在整理中，敬请期待。
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note, i) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group relative block p-6 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <span
                  className="text-lg font-mono font-black shrink-0 hidden md:block text-[var(--brand)]/30 group-hover:text-[var(--brand)] transition-colors"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/10 text-[var(--brand)]">
                      {note.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                      <Clock size={12} />
                      {note.readingTime}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {note.publishedAt}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                    {note.title}
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal line-clamp-2">
                    {note.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] group-hover:text-[var(--brand)] group-hover:border-[var(--brand)]/30 group-hover:translate-x-1 flex items-center justify-center shrink-0 transition-all duration-300 hidden md:flex">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
