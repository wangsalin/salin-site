import { cn } from "@/lib/cn";
import Link from "next/link";

type ButtonVariant = "primary" | "accent" | "ghost" | "outline" | "glass";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand)] text-[var(--brand-foreground)] shadow-[0_4px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.38)] hover:-translate-y-0.5 active:translate-y-0 font-semibold border border-white/20",
  accent:
    "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_4px_16px_rgba(132,204,22,0.25)] hover:shadow-[0_8px_24px_rgba(132,204,22,0.4)] hover:-translate-y-0.5 active:translate-y-0 font-bold border border-black/10 dark:border-white/20",
  glass:
    "bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)] text-[var(--text-primary)] shadow-[var(--shadow-subtle)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 active:translate-y-0 font-medium",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-muted)] hover:backdrop-blur-md active:scale-98 font-medium",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 active:translate-y-0 shadow-xs font-medium",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs sm:text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
