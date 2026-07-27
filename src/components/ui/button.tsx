import { cn } from "@/lib/cn";
import Link from "next/link";

type ButtonVariant = "primary" | "accent" | "ghost" | "outline";
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
    "bg-[var(--brand)] text-[var(--brand-foreground)] hover:-translate-y-0.5 hover:opacity-90",
  accent:
    "bg-[var(--accent)] text-[var(--accent-foreground)] hover:-translate-y-0.5 hover:opacity-90",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] hover:-translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
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
