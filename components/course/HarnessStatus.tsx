import type { Harness, VariantStatus } from "@/lib/course/types";

const statusClass: Record<VariantStatus, string> = {
  available: "text-accent",
  draft: "text-warm",
  unavailable: "text-ink-faint",
};

export function HarnessStatus({
  harness,
  status,
  reason,
}: {
  harness: Harness;
  status: VariantStatus;
  reason: string | null;
}) {
  return (
    <section className="card p-4" aria-labelledby="harness-status-heading">
      <p id="harness-status-heading" className="label-mono mb-2">Selected path</p>
      <p className={`m-0 font-semibold capitalize ${statusClass[status]}`}>
        {harness} · {status}
      </p>
      <p className="mt-2 mb-0 text-sm text-ink-soft">
        {reason ?? "No additional status detail is recorded for this path."}
      </p>
    </section>
  );
}
