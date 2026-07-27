import { workingMethod } from "@/data/journey";
import { SectionHeading } from "@/components/ui/section-heading";
import { Lightbulb } from "lucide-react";

export function WorkingMethod() {
  return (
    <section
      className="py-24 md:py-32 border-t border-[var(--border)]"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <SectionHeading
          label="工作方法论"
          title="我的工作方式：从真实问题逆向倒推。"
          description="不搞花哨功能，不为了技术而技术。四步法确保每一个产品都直击要害。"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {workingMethod.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between"
            >
              <div>
                <div
                  className="text-4xl font-extrabold mb-3 tracking-tighter"
                  style={{ color: "var(--brand)" }}
                  aria-hidden="true"
                >
                  {step.step}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.description}
                </p>
              </div>

              {/* 实例注解 */}
              <div className="pt-3 border-t border-[var(--border)] flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="italic">{step.example}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 强调语 */}
        <div
          className="p-6 rounded-2xl border-l-4 border-y border-r border-[var(--border)] flex items-center justify-between gap-4"
          style={{ borderColor: "var(--accent)", background: "var(--background)" }}
        >
          <p
            className="text-lg md:text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            “AI 不是起点，它只是解决现实商业问题的一种高效率工具。”
          </p>
          <span className="text-xs px-3 py-1.5 rounded-full font-bold uppercase shrink-0" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
            SALIN PHILOSOPHY
          </span>
        </div>
      </div>
    </section>
  );
}
