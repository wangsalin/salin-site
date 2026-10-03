import Link from "next/link";
import { GitFork, MapPin, Share2, Sparkles, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border-glass)] bg-[var(--surface-glass-heavy)] backdrop-blur-2xl mt-auto overflow-hidden">
      {/* Decorative ambient glow */}
      <div 
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-[calc(96px+env(safe-area-inset-bottom,0px))] md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16">
          {/* 左侧品牌与定位 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--brand)] to-[var(--accent)] flex items-center justify-center text-white font-mono font-black text-sm shadow-md shadow-emerald-500/20">
                S
              </div>
              <span className="font-extrabold tracking-tight text-lg text-[var(--text-primary)]">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] max-w-sm font-normal">
              连续创业者与 AI 商业实践者。把十多年积累的商业、内容和产品经验，变成真正能落地的 AI 工具与解决方案。
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-glass)] text-xs text-[var(--text-secondary)] shadow-xs">
              <MapPin size={13} className="text-[var(--brand)]" />
              <span>{siteConfig.location}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[11px] font-medium text-[var(--brand)]">支持全国 FDE 驻场交付</span>
            </div>
          </div>

          {/* 右侧导航列 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* 栏目1: 全站导航 */}
            <div>
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase mb-4 text-[var(--text-muted)] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[var(--brand)]" />
                全站导航
              </div>
              <ul className="space-y-2.5">
                {siteConfig.navLinks.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors duration-200 font-medium inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {link.label}
                        </span>
                        {isExternal && <ArrowUpRight size={11} className="opacity-60" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 栏目2: 旗下站点 & 资源 */}
            <div>
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase mb-4 text-[var(--text-muted)] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                旗下站点
              </div>
              <div className="space-y-2.5 text-xs">
                <a
                  href="https://zl.eyu.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[var(--text-primary)] hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>狗哥资源库</span>
                  <span className="text-[10px] font-mono font-bold text-[var(--brand)] bg-[var(--brand)]/10 px-1.5 py-0.5 rounded-full border border-[var(--brand)]/20">
                    精选
                  </span>
                </a>
                <div>
                  <a
                    href="https://zl.eyu.ink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1"
                  >
                    <span>zl.eyu.ink</span>
                    <ArrowUpRight size={11} className="opacity-60" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://ziliaoku.fun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1"
                  >
                    <span>ziliaoku.fun</span>
                    <ArrowUpRight size={11} className="opacity-60" />
                  </a>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] pt-1">
                  2,400+ 夸克与网盘精选资源
                </p>
              </div>
            </div>

            {/* 栏目3: 联系 & 阵地 */}
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase mb-4 text-[var(--text-muted)] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[var(--brand)]" />
                联系 & 阵地
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="font-mono text-[var(--text-primary)] font-semibold flex items-center gap-1.5">
                  <span className="text-[var(--text-muted)]">微信:</span>
                  <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border-glass)]">
                    {siteConfig.wechat}
                  </span>
                </div>
                <div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="text-[var(--text-secondary)]">
                  公众号: <span className="font-medium text-[var(--text-primary)]">{siteConfig.gongzhonghao}</span>
                </div>
                <div className="pt-1 flex flex-wrap gap-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all text-xs font-mono"
                  >
                    <GitFork size={12} className="text-[var(--brand)]" />
                    <span>wangsalin</span>
                  </a>
                  <a
                    href={siteConfig.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all text-xs font-mono"
                  >
                    <Share2 size={12} className="text-[var(--accent)]" />
                    <span>@EyuSalin</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权与状态 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-[var(--border-glass)]">
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
            © {year} {siteConfig.name}. 保留所有权利。Built with modern craftsmanship.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-glass)] text-xs shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[var(--text-muted)]">状态：</span>
            <span className="text-[var(--brand)] font-bold">{siteConfig.nowStatus}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
