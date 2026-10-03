"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="返回顶部"
      className={cn(
        "fixed bottom-[calc(70px+env(safe-area-inset-bottom,0px))] sm:bottom-24 right-3.5 sm:right-7 z-40 p-3 sm:p-3.5 rounded-full bg-[var(--surface)] text-[var(--brand)] backdrop-blur-2xl border border-[var(--border)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[var(--brand)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 active:translate-y-0 cursor-pointer",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      )}
    >
      <ArrowUp size={18} className="sm:w-5 sm:h-5" />
    </button>
  );
}
