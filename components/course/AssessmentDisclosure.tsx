import type { Lesson } from "@/lib/course/types";

export function AssessmentDisclosure({ lesson }: { lesson: Lesson }) {
  return (
    <section className="mt-10" aria-labelledby="assessment-heading">
      <p className="label-mono mb-3">Shared assessment</p>
      <h2 id="assessment-heading" className="display text-3xl mb-5">What a trustworthy handoff needs.</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h3 className="label-mono mb-3">Artifact invariants</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            {lesson.assessment.artifactInvariants.map((invariant) => <li key={invariant.id}>{invariant.description}</li>)}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="label-mono mb-3">Human review still required</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            {lesson.assessment.humanReview.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <div className="callout callout--matter mt-5">
        <p className="callout-label">Observable failure</p>
        <p className="m-0">{lesson.sharedFailureScenario.observableSymptom}</p>
      </div>
      <div className="callout callout--aha mt-4">
        <p className="callout-label">Recovery outcome</p>
        <p className="m-0">{lesson.sharedRecoveryOutcome.description}</p>
      </div>
    </section>
  );
}
