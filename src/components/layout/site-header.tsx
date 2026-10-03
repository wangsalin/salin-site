"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--surface-glass-heavy)] backdrop-blur-2xl shadow-[var(--shadow-subtle)]"
            : "bg-[var(--surface-glass-subtle)] backdrop-blur-md border-b border-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          {/* 左上角: 苹果风精工 Brand Header Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group hover:opacity-95 transition-opacity"
          >
            <div className="relative w-9 h-9 rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-900/80 shadow-xs group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all shrink-0">
              <Image
                src="/images/salin-brand-logo.png"
                alt="Salin Brand Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wide text-sm text-[var(--text-primary)] leading-none flex items-center gap-1.5">
                狗哥
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand)]" />
                </span>
              </span>
              <span className="text-[10.5px] font-mono text-[var(--text-muted)] tracking-tight leading-tight mt-1">
                Wang Salin · 商业与 AI 实践
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--surface)] p-1 rounded-full border border-[var(--border)] shadow-xs backdrop-blur-xl">
            {siteConfig.navLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-[var(--surface-solid)] text-[var(--brand)] font-bold shadow-xs border border-[var(--border)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mx-1 h-3.5 w-px bg-[var(--border)]" />
            <Link
              href="/contact"
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:-translate-y-0.2 active:translate-y-0 transition-all border border-white/20"
            >
              联系合作
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="打开菜单"
              aria-expanded={mobileOpen}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer shadow-xs"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
