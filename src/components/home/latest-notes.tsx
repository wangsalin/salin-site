import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Sparkles, ArrowUpRight } from "lucide-react";
import { getFeaturedNotes } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function LatestNotes() {
  const notes = getFeaturedNotes();
  const featuredNote = notes[0];
  const sideNotes = notes.slice(1, 3);

  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="实践记录"
            title="写下来的思考，比说出来的更清晰。"
            description="这里记录真实的商业判断过程、踩坑经验与现场架构复盘，拒绝鸡汤与营销话术。"
          />
          <Button href="/notes" variant="glass" size="md">
            <span>浏览全部文章归档</span>
            <ArrowRight size={15} />
          </Button>
        </div>

        {/* Bento Grid 布局 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 左侧：精选深度长文 Bento Card (Span 7) */}
          {featuredNote && (
            <Link
              href={`/notes/${featuredNote.slug}`}
              className="md:col-span-7 relative rounded-3xl p-7 sm:p-9 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-2xs">
                    FEATURED ESSAY · 精选长文
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)]">
                    {featuredNote.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                    <Clock size={12} className="text-[var(--brand)]" />
                    {featuredNote.readingTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-4 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight leading-snug">
                  {featuredNote.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal line-clamp-4 mb-6">
                  {featuredNote.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--border-glass)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  发布于 {featuredNote.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)] group-hover:translate-x-1 transition-transform">
                  <span>阅读全文</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}

          {/* 右侧：2 篇速览长条 Bento Card (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {sideNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="flex-1 relative rounded-3xl p-6 sm:p-7 border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-[var(--brand)]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)]">
                      {note.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-mono">
                      <Clock size={11} className="text-[var(--brand)]" />
                      {note.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight line-clamp-2">
                    {note.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal line-clamp-2 mb-4">
                    {note.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-glass)] flex items-center justify-between text-xs text-[var(--brand)] font-semibold">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] font-normal">
                    {note.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>阅读</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
