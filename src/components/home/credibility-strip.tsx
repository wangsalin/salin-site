import { credibilityStats } from "@/data/journey";

export function CredibilityStrip() {
  return (
    <section
      className="border-y border-[var(--border)] py-12"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {credibilityStats.map((stat) => (
            <div key={stat.label} className="relative group">
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="text-4xl md:text-5xl font-extrabold tracking-tight"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-base font-bold"
                  style={{ color: "var(--brand)" }}
                >
                  {stat.unit}
                </span>
              </div>
              <p className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                {stat.label}
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
