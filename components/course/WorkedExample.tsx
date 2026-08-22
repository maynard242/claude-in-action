import type { HarnessMeta, WorkedExample as Example } from "@/lib/course/types";

export function WorkedExample({
  example,
  harness,
}: {
  example: Example;
  harness: HarnessMeta | undefined;
}) {
  const verified = example.status === "verified";

  return (
    <section className="mt-10" aria-labelledby="worked-example-heading">
      <p className="label-mono mb-3">Worked example</p>
      <h2 id="worked-example-heading" className="display text-3xl mb-4">
        Shown in {harness?.name ?? example.harness}
      </h2>
      <p className="text-ink-soft">{example.why}</p>

      <div className="mt-5">
        <p className="label-mono mb-2">Run this</p>
        <pre className="overflow-x-auto rounded-md bg-code-bg p-4 text-sm text-code-ink">
          <code>{example.command}</code>
        </pre>
      </div>

      <div className="mt-5 card p-5">
        <p className="label-mono mb-2">What you should get</p>
        <p className="m-0 text-sm text-ink-soft">{example.expected}</p>
      </div>

      {verified && example.realOutput ? (
        <div className="mt-5">
          <p className="label-mono mb-2">
            Actual output, {harness?.name ?? example.harness} {example.harnessVersion}, {example.verifiedOn}
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-code-bg p-4 text-[13px] text-code-ink">
            <code>{example.realOutput}</code>
          </pre>
          <p className="mt-2 text-xs text-ink-faint">
            Recorded from a real run. Your output will differ in wording.
          </p>
        </div>
      ) : (
        <div className="callout callout--notice mt-5">
          <p className="callout-label">Not yet run</p>
          <p className="m-0">
            This command is written but has not been recorded on a real machine, so treat it as a
            draft rather than a tested procedure.
          </p>
        </div>
      )}
    </section>
  );
}
