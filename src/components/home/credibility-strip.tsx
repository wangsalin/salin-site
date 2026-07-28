import { credibilityStats } from "@/data/journey";

export function CredibilityStrip() {
  return (
    <section
      className="border-y border-[var(--border)] py-12 md:py-14 bg-[var(--brand)] text-[var(--brand-foreground)] shadow-inner"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2 mb-6 opacity-85">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--accent)] text-[var(--accent-foreground)]">
            SECTION 01
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            CREDIBILITY & IMPACT · 真实可信经历与数据
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {credibilityStats.map((stat) => (
            <div key={stat.label} className="relative space-y-1">
              <div className="flex items-baseline gap-1">
                <span
                  className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-[var(--accent)]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stat.number}
                </span>
                <span className="text-base font-extrabold text-[var(--brand-foreground)]">
                  {stat.unit}
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--brand-foreground)]">
                {stat.label}
              </p>
              <p className="text-xs opacity-75">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

