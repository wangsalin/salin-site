import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-lg text-center p-8 sm:p-12 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-2xl shadow-2xl">
        {/* 大号 404 */}
        <div
          className="text-[100px] sm:text-[140px] font-black leading-none tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)]/20 to-[var(--text-primary)]/5"
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-black mb-3 text-[var(--text-primary)] tracking-tight">
          这个页面不存在。
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-8 text-[var(--text-secondary)] font-normal">
          可能是链接有误，也可能是页面已经调整。你可以回到首页，或者看看有没有感兴趣的项目。
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href="/" variant="primary" size="lg">
            <Home size={16} />
            <span>回到首页</span>
          </Button>
          <Button href="/projects" variant="glass" size="lg">
            <span>查看项目矩阵</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
