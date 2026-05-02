import type { ReactNode } from "react";

type Variant = "concept" | "notice" | "matter" | "try" | "aha";

const styles: Record<Variant, { bg: string; rule: string; label: string; labelColor: string }> = {
  concept: {
    bg: "bg-concept-bg",
    rule: "border-concept-rule",
    label: "Capability",
    labelColor: "text-[#8A6B2C]",
  },
  notice: {
    bg: "bg-notice-bg",
    rule: "border-notice-rule",
    label: "Watch for",
    labelColor: "text-[#2D5A6F]",
  },
  matter: {
    bg: "bg-matter-bg",
    rule: "border-matter-rule",
    label: "Why it matters",
    labelColor: "text-[#2E6B4A]",
  },
  try: {
    bg: "bg-try-bg",
    rule: "border-try-rule",
    label: "Try this yourself",
    labelColor: "text-[#5A3D7A]",
  },
  aha: {
    bg: "bg-matter-bg",
    rule: "border-matter-rule",
    label: "Aha moment",
    labelColor: "text-[#2E6B4A]",
  },
};

export function Callout({
  variant,
  title,
  children,
}: {
  variant: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[variant];
  return (
    <div className={`my-5 px-6 py-4 ${s.bg} border-l-4 ${s.rule} rounded-r-lg`}>
      <div className={`text-[11px] uppercase tracking-wider font-bold ${s.labelColor} mb-2`}>
        {title ?? s.label}
      </div>
      <div className="text-ink">{children}</div>
    </div>
  );
}
