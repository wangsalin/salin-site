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
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
      <SectionHeading
        label="实践记录"
        title="写下来的思考，比说出来的更清晰。"
        description="这里记录真实的判断过程、踩坑经验和方法论，不是营销文章，也不是成功学。"
        className="mb-16"
      />

      {/* 分类 */}
      <div className="flex flex-wrap gap-2 mb-12">
        {noteCategories.map((cat) => (
          <span
            key={cat.value}
            className="text-sm px-3 py-1.5 rounded-full border border-[var(--border)] flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {cat.label}
            {cat.value !== "all" && categoryCounts[cat.value] !== undefined && (
              <span
                className="text-xs w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "var(--surface-muted)" }}
              >
                {categoryCounts[cat.value]}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* 文章列表 */}
      {notes.length === 0 ? (
        <div
          className="py-20 text-center rounded-2xl border border-[var(--border)]"
          style={{ background: "var(--surface)" }}
        >
          <p className="text-lg font-medium mb-2" style={{ color: "var(--text-primary)" }}>
            暂无文章
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            内容正在整理中，敬请期待。
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {notes.map((note, i) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group block py-8 border-b border-[var(--border)] -mx-4 px-4 rounded-xl hover:bg-[var(--surface-muted)] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <span
                  className="text-sm font-mono shrink-0 mt-1 hidden md:block"
                  style={{ color: "var(--border)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded border border-[var(--border)]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {note.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <Clock size={11} />
                      {note.readingTime}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {note.publishedAt}
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold mb-2 group-hover:text-[var(--brand)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {note.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {note.description}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1 hidden md:block" style={{ color: "var(--brand)" }}>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
