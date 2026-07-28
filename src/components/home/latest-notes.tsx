import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getFeaturedNotes } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function LatestNotes() {
  const notes = getFeaturedNotes().slice(0, 3);

  return (
    <section className="py-16 sm:py-24 md:py-28 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--brand)] text-[var(--brand-foreground)]">
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
          <Button href="/notes" variant="outline" size="sm">
            全部文章
            <ArrowRight size={14} />
          </Button>
        </div>

        {notes.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            暂无文章，敬请期待。
          </p>
        ) : (
          <div className="space-y-0">
            {notes.map((note, i) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-7 border-b border-[var(--border)] hover:bg-[var(--surface-muted)] -mx-4 px-4 rounded-xl transition-colors"
              >
                {/* 序号 */}
                <span
                  className="text-sm font-mono w-6 shrink-0 mt-1 hidden md:block"
                  style={{ color: "var(--border)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* 内容 */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded border border-[var(--border)]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {note.category}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Clock size={11} />
                      {note.readingTime}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-1.5 group-hover:text-[var(--brand)] transition-colors"
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
                <div className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" style={{ color: "var(--brand)" }}>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
