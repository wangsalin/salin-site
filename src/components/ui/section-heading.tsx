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
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold leading-tight tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
