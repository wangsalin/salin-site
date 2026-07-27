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
        "inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all duration-150",
        "border border-[var(--border)] hover:bg-[var(--surface-muted)]",
        copied && "border-[var(--accent)] text-[var(--accent-foreground)] bg-[var(--accent)]",
        className
      )}
      style={{
        color: copied ? "var(--accent-foreground)" : "var(--text-secondary)",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "已复制" : label}
    </button>
  );
}
