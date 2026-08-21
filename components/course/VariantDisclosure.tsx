import type { HarnessVariant } from "@/lib/course/types";

export function VariantDisclosure({ variant }: { variant: HarnessVariant }) {
  const isRunnable = variant.status === "available";

  return (
    <section className="mt-8" aria-labelledby="variant-disclosure-heading">
      <p className="label-mono mb-3">Selected path disclosure</p>
      <h2 id="variant-disclosure-heading" className="display text-3xl mb-4">What this path can honestly show.</h2>
      {!isRunnable ? (
        <div className="callout callout--notice">
          <p className="callout-label">Not runnable</p>
          <p className="m-0">No provider procedure, command, prompt, data flow, failure mode, or recovery procedure is supplied because this path is not runnable.</p>
        </div>
      ) : (
        <div className="card p-5 text-sm text-ink-soft">
          <p className="m-0">Runnable-path disclosures are rendered only from validated course data.</p>
        </div>
      )}
      {variant.prerequisites.length ? (
        <div className="mt-5 card p-5">
          <h3 className="label-mono mb-3">Prerequisites</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            {variant.prerequisites.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
