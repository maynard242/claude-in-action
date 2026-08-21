import type { Lesson, Scenario } from "@/lib/course/types";

function humanize(value: string) {
  return value.replaceAll("-", " ");
}

export function SharedScenario({ lesson, scenario }: { lesson: Lesson; scenario: Scenario }) {
  return (
    <section className="mt-10" aria-labelledby="shared-scenario-heading">
      <p className="label-mono mb-3">Shared scenario</p>
      <h2 id="shared-scenario-heading" className="display text-3xl mb-4">{scenario.title}</h2>
      <p className="text-ink-soft">{lesson.learnerGoal}</p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="card p-4">
          <dt className="label-mono">Reliability goal</dt>
          <dd className="mt-2 ml-0 text-sm text-ink-soft">{lesson.reliabilityGoal}</dd>
        </div>
        <div className="card p-4">
          <dt className="label-mono">Privacy goal</dt>
          <dd className="mt-2 ml-0 text-sm text-ink-soft">{lesson.privacyGoal}</dd>
        </div>
      </dl>
      <div className="callout callout--notice mt-5">
        <p className="callout-label">Safety boundary</p>
        <p className="m-0">{lesson.sharedSafetyBoundary}</p>
      </div>
      <div className="mt-5">
        <h3 className="label-mono mb-2">Local lesson materials</h3>
        <ul className="space-y-2 text-sm text-ink-soft">
          {scenario.portability.artifacts.map((artifact) => (
            <li key={artifact.id}>{humanize(artifact.id)} — provided as bounded synthetic lesson material.</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
