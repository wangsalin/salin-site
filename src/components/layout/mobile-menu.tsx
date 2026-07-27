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
    <div className="fixed inset-0 z-[var(--z-modal)] md:hidden flex flex-col bg-[var(--background)]/95 backdrop-blur-xl animate-in fade-in duration-200">
      {/* 顶部 Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--border)] bg-[var(--surface)]/80">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0">
            <Image
              src="/images/salin-brand-logo.png"
              alt="Salin Brand Logo"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-sm text-[var(--text-primary)] leading-none flex items-center gap-1">
              Salin <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-[var(--text-secondary)] tracking-tight leading-tight mt-0.5">
              FDE & AI LANDING
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="关闭菜单"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          <X size={20} />
        </button>
      </div>

      {/* 菜单列表与触控卡片 */}
      <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        {/* 快捷方式链接 */}
        <div className="space-y-1.5">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-2xl text-lg font-bold transition-all",
                  isActive
                    ? "bg-[var(--brand)] text-[var(--brand-foreground)] shadow-md"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
                )}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <Sparkles size={18} />
                ) : (
                  <ArrowRight size={16} className="opacity-40" />
                )}
              </Link>
            );
          })}
        </div>

        {/* 快速联系卡片 */}
        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
              <MessageSquare size={14} className="text-[var(--brand)]" /> 快速微信沟通
            </span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              在线响应
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]">
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
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--brand)] text-[var(--brand-foreground)] flex items-center gap-1 shrink-0 active:scale-95 transition-transform cursor-pointer"
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
              className="flex-1 py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-bold text-center flex items-center justify-center gap-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              <Mail size={14} /> 发送邮件
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--brand)] text-[var(--brand-foreground)] text-xs font-bold text-center flex items-center justify-center gap-1"
            >
              预约 FDE 诊断 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

