import type { ReactNode } from "react";

type Variant = "concept" | "notice" | "matter" | "try" | "aha";

const labels: Record<Variant, string> = {
  concept: "Capability",
  notice: "Watch for",
  matter: "Why it matters",
  try: "Try this yourself",
  aha: "Aha moment",
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
  return (
    <div className={`callout callout--${variant}`}>
      <div className="callout-label">{title ?? labels[variant]}</div>
      <div className="text-ink leading-relaxed">{children}</div>
    </div>
  );
}
