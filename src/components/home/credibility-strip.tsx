import { credibilityStats } from "@/data/journey";

export function CredibilityStrip() {
  return (
    <section
      className="border-y border-[var(--border)] py-12 sm:py-16 bg-[var(--surface)] backdrop-blur-2xl relative overflow-hidden shadow-xs"
    >
      {/* 柔光弥散背景 */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/8 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-lime-500/8 blur-[90px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20">
            SECTION 01
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            CREDIBILITY & IMPACT · 真实可信经历与数据
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {credibilityStats.map((stat) => (
            <div
              key={stat.label}
              className="relative p-5 sm:p-6 rounded-2xl bg-[var(--surface-muted)]/60 backdrop-blur-xl border border-[var(--border)] shadow-[var(--shadow-subtle)] space-y-1.5 transition-all duration-300 hover:border-[var(--brand)]/40 hover:-translate-y-0.5"
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-[var(--brand)] drop-shadow-xs"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stat.number}
                </span>
                <span className="text-base font-bold text-[var(--text-primary)]">
                  {stat.unit}
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {stat.label}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

