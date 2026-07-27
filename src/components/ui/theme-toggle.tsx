"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "light"
  );

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  if (isServer) {
    return (
      <div className="w-9 h-9 rounded-full" style={{ background: "var(--surface-muted)" }} />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
      className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-muted)]"
      style={{ color: "var(--text-secondary)" }}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
