"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = "复制", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "已复制" : `复制 ${label}`}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-2xs",
        copied
          ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
          : "border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 hover:bg-[var(--surface-elevated)]",
        className
      )}
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      <span>{copied ? "已复制" : label}</span>
    </button>
  );
}
