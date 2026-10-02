import Link from "next/link";
import { GitFork, MapPin, Share2 } from "lucide-react";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border)] mt-auto"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* 左侧 */}
          <div className="max-w-sm">
            <div className="font-extrabold tracking-widest text-base mb-2 text-[var(--brand)]">
              {siteConfig.name}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              连续创业者与 AI 商业实践者。把十多年积累的商业、内容和产品经验，变成真正能落地的 AI 工具与解决方案。
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: "var(--text-secondary)" }}>
              <MapPin size={13} className="text-[var(--brand)]" />
              {siteConfig.location} (支持全国 FDE 出差驻场)
            </div>
          </div>

          {/* 右侧导航 */}
          {/* 右侧导航 */}
          <div className="flex flex-wrap gap-10">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--text-secondary)" }}>
                全站导航
              </div>
              <div className="flex flex-col gap-2">
                {siteConfig.navLinks.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-xs transition-colors hover:text-[var(--brand)] font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--text-secondary)" }}>
                旗下站点 & 资源
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href="https://zl.eyu.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[var(--text-primary)] hover:text-[var(--brand)] transition-colors flex items-center gap-1"
                >
                  狗哥资源库 <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--brand)] px-1.5 py-0.2 rounded">精选</span>
                </a>
                <a
                  href="https://zl.eyu.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors"
                >
                  主站: zl.eyu.ink ↗
                </a>
                <a
                  href="https://ziliaoku.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors"
                >
                  备用: ziliaoku.fun ↗
                </a>
                <span className="text-[11px] text-[var(--text-secondary)] opacity-80 pt-1">
                  2,400+ 夸克与百度网盘资源
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--text-secondary)" }}>
                联系 & 阵地
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <span className="font-mono text-[var(--text-primary)] font-bold">
                  微信: {siteConfig.wechat}
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-[var(--brand)] font-mono"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {siteConfig.email}
                </a>
                <span className="text-[var(--brand)] font-bold">
                  公众号: {siteConfig.gongzhonghao}
                </span>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-[var(--brand)] font-mono"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <GitFork size={12} /> GitHub (wangsalin)
                </a>
                <a
                  href={siteConfig.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-[var(--brand)] font-mono"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Share2 size={12} /> X (@EyuSalin)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-10 pt-6 border-t border-[var(--border)]"
        >
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            © {year} {siteConfig.name}. 保留所有权利。
          </p>
          <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            当前状态：<span className="text-[var(--brand)] font-bold">{siteConfig.nowStatus}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
