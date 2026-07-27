import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* 大号 404 */}
        <div
          className="text-[120px] md:text-[160px] font-bold leading-none tracking-tighter mb-4"
          style={{ color: "var(--border)" }}
          aria-hidden="true"
        >
          404
        </div>

        <h1
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          这个页面不存在。
        </h1>
        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          可能是链接有误，也可能是页面已经移动。你可以回到首页，或者看看有没有感兴趣的项目。
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home size={16} />
            回到首页
          </Button>
          <Button href="/projects" variant="outline" size="md">
            查看项目
          </Button>
        </div>
      </div>
    </div>
  );
}
