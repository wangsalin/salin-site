import { GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function ContactCta() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--brand)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1fr_280px] gap-12 items-center">
          {/* 左侧主内容 */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-6"
              style={{ color: "var(--brand-foreground)", letterSpacing: "-0.02em" }}
            >
              有真实问题，
              <br />
              我们可以一起拆一拆。
            </h2>
            <p
              className="text-lg leading-relaxed mb-8 max-w-lg opacity-80"
              style={{ color: "var(--brand-foreground)" }}
            >
              不聊空洞的 AI 概念。适合交流 AI 产品、企业应用、餐饮商业、内容创意与项目共创。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                href="/contact"
                size="lg"
                variant="accent"
              >
                联系合作
              </Button>
              {siteConfig.github && (
                <Button
                  href={siteConfig.github}
                  external
                  size="lg"
                  className="!bg-transparent !border !border-[var(--brand-foreground)] !text-[var(--brand-foreground)] opacity-80 hover:opacity-100"
                >
                  <GitFork size={18} />
                  GitHub
                </Button>
              )}
            </div>
          </div>

          {/* 右侧合作方向 */}
          <div>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-60"
              style={{ color: "var(--brand-foreground)" }}
            >
              合作方向
            </p>
            <div className="space-y-2">
              {[
                "AI 产品共创",
                "企业 AI 应用",
                "餐饮品牌与营销",
                "本地商业内容",
                "创业项目交流",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm opacity-75"
                  style={{ color: "var(--brand-foreground)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
