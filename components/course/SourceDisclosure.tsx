import type { SourceRef } from "@/lib/course/types";

export function SourceDisclosure({
  sources,
  statusReason,
}: {
  sources: SourceRef[];
  statusReason: string | null;
}) {
  return (
    <section className="mt-8 card p-5" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="label-mono mb-3">Source status</h2>
      {sources.length === 0 ? (
        <p className="m-0 text-sm text-ink-soft">
          No current operational sources are approved for this path. {statusReason ?? ""}
        </p>
      ) : (
        <ul className="space-y-2 text-sm text-ink-soft">
          {sources.map((source) => <li key={source.id}>{source.title} · {source.kind}</li>)}
        </ul>
      )}
    </section>
  );
}
