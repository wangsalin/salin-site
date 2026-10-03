"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Check, Copy, ArrowRight, MessageSquare, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [copiedWechat, setCopiedWechat] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function copyWechat() {
    navigator.clipboard.writeText(siteConfig.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] md:hidden flex flex-col bg-[var(--background)]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* 顶部 Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-xl">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0 shadow-xs">
            <Image
              src="/images/salin-brand-logo.png"
              alt="Salin Brand Logo"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wide text-sm text-[var(--text-primary)] leading-none flex items-center gap-1.5">
              狗哥 <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-tight leading-tight mt-0.5">
              Wang Salin · 商业与 AI
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="关闭菜单"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors shadow-xs"
        >
          <X size={18} />
        </button>
      </div>

      {/* 菜单列表与触控卡片 */}
      <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        {/* 快捷方式链接 */}
        <div className="space-y-2">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isExternal = link.href.startsWith("http");
            return (
              <Link
                key={link.href}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-5 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 border",
                  isActive
                    ? "bg-[var(--brand)] text-[var(--brand-foreground)] border-transparent shadow-[0_6px_20px_rgba(16,185,129,0.3)]"
                    : "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] hover:bg-[var(--surface-muted)] shadow-xs"
                )}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <Sparkles size={16} />
                ) : (
                  <ArrowRight size={15} className="opacity-40" />
                )}
              </Link>
            );
          })}
        </div>

        {/* 快速联系卡片 */}
        <div className="p-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl shadow-[var(--shadow-subtle)] space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
              <MessageSquare size={14} className="text-[var(--brand)]" /> 快速微信沟通
            </span>
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              在线响应
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--background)]/80 border border-[var(--border)]">
            <div className="space-y-0.5">
              <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                微信号：{siteConfig.wechat}
              </div>
              <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                公众号：{siteConfig.gongzhonghao}
              </div>
            </div>
            <button
              onClick={copyWechat}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--brand)] text-[var(--brand-foreground)] flex items-center gap-1 shrink-0 active:scale-95 transition-transform cursor-pointer shadow-xs border border-white/20"
            >
              {copiedWechat ? (
                <>
                  <Check size={13} /> 已复制
                </>
              ) : (
                <>
                  <Copy size={13} /> 复制
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex-1 py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs hover:bg-[var(--surface-muted)] transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              <Mail size={14} /> 发送邮件
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--brand)] text-[var(--brand-foreground)] text-xs font-bold text-center flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition-all border border-white/20"
            >
              预约 FDE 诊断 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

