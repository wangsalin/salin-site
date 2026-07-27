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
              FDE 前向部署工程师与全栈 AI 开发者。深耕餐饮连锁、美业 SaaS 与企业 AI 驻场落地，把真实业务流重做一遍。
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: "var(--text-secondary)" }}>
              <MapPin size={13} className="text-[var(--brand)]" />
              {siteConfig.location} (支持全国 FDE 出差驻场)
            </div>
          </div>

          {/* 右侧导航 */}
          <div className="flex flex-wrap gap-10">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--text-secondary)" }}>
                全站导航
              </div>
              <div className="flex flex-col gap-2">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs transition-colors hover:text-[var(--brand)] font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                ))}
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
