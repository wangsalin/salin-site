"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] md:hidden flex flex-col bg-[var(--background)]">
      {/* 顶部 */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border)]">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0">
            <Image
              src="/images/salin-brand-logo.png"
              alt="Salin Brand Logo"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <span className="font-extrabold tracking-wider text-sm text-[var(--text-primary)]">
            Salin <span className="text-[10px] font-mono text-[var(--text-secondary)]">FDE & AI</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          aria-label="关闭菜单"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-primary)]"
        >
          <X size={20} />
        </button>
      </div>

      {/* 链接 */}
      <div className="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
        {siteConfig.navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "block text-2xl font-bold transition-colors py-2",
              pathname === link.href
                ? "text-[var(--brand)] font-extrabold"
                : "text-[var(--text-primary)]"
            )}
          >
            {link.label}
          </Link>
        ))}

        <div className="pt-6 border-t border-[var(--border)]">
          <Link
            href="/contact"
            onClick={onClose}
            className="block text-center py-3.5 px-6 rounded-xl font-bold bg-[var(--brand)] text-[var(--brand-foreground)]"
          >
            联系合作与预约
          </Link>
        </div>
      </div>
    </div>
  );
}
