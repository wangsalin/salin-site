import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <div className="mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--surface)] border border-[var(--border)] text-[var(--brand)] shadow-xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
            {label}
          </span>
        </div>
      )}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.025em]"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-3.5 text-base sm:text-lg leading-relaxed font-normal"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
