import { focusAreas } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";

export function FocusSection() {
  return (
    <section
      className="py-24 md:py-32 border-t border-[var(--border)]"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <SectionHeading
          label="业务聚焦"
          title="现在，我重点做三件事。"
          description="将积累的商业逻辑与 AI 技术结合，只聚焦于能产生直接商业价值的三个核心方向。"
          className="mb-16"
        />

        <div className="space-y-0">
          {focusAreas.map((area) => (
            <div
              key={area.index}
              className="grid md:grid-cols-[80px_1fr_1.1fr] gap-6 md:gap-12 py-10 border-b border-[var(--border)] last:border-b-0 items-start"
            >
              {/* 大号序号 */}
              <div
                className="text-5xl font-extrabold leading-none tracking-tighter"
                style={{ color: "var(--border)" }}
                aria-hidden="true"
              >
                {area.index}
              </div>

              {/* 标题 + 描述 */}
              <div>
                <h3
                  className="text-2xl font-bold mb-3 tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {area.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--background)] font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 具体实践清单 */}
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">核心落地落地细项</p>
                {area.detailList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
