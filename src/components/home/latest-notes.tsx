import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getFeaturedNotes } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function LatestNotes() {
  const notes = getFeaturedNotes().slice(0, 3);

  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] bg-[var(--surface)] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
            SECTION 09
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand)]">
            PRACTICE NOTES · 实践记录与深度复盘
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="实践记录"
            title="写下来的思考，比说出来的更清晰。"
          />
          <Button href="/notes" variant="glass" size="sm">
            全部文章
            <ArrowRight size={14} />
          </Button>
        </div>

        {notes.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            暂无文章，敬请期待。
          </p>
        ) : (
          <div className="space-y-3">
            {notes.map((note, i) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md hover:bg-[var(--surface)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* 序号 */}
                <span
                  className="text-sm font-mono w-6 shrink-0 mt-1 hidden md:block text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* 内容 */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] font-mono"
                    >
                      {note.category}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs text-[var(--text-muted)]"
                    >
                      <Clock size={12} className="text-[var(--brand)]" />
                      {note.readingTime}
                    </span>
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[var(--brand)] transition-colors tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {note.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {note.description}
                  </p>
                </div>

                {/* 箭头 */}
                <div className="shrink-0 mt-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden md:block text-[var(--brand)]">
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
