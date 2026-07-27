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
            ? "border-b border-[var(--border)] backdrop-blur-md"
            : "bg-transparent"
        )}
        style={{
          background: scrolled ? "color-mix(in srgb, var(--background) 85%, transparent)" : "transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          {/* 左上角: 互联网科技公司风格 Brand Header Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
          >
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[var(--border)] bg-slate-900 shadow-sm group-hover:scale-105 transition-transform shrink-0">
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[var(--surface-muted)] text-[var(--text-primary)] font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mx-2 h-4 w-px bg-[var(--border)]" />
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full text-sm font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-90 transition-opacity shadow-sm"
            >
              联系合作
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="打开菜单"
              aria-expanded={mobileOpen}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
