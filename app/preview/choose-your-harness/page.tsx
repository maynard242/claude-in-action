import type { Metadata } from "next";
import { loadCourse } from "@/lib/course/load";
import { validateCourse } from "@/lib/course/validate";

export const metadata: Metadata = {
  title: "Choose your harness",
  robots: { index: false, follow: false },
};

export default function ChooseHarness() {
  const bundle = loadCourse();
  validateCourse(bundle);
  const pi = bundle.comparisons.find((comparison) => comparison.id === "optional-pi-local-customization");

  return (
    <main className="container-narrow py-12">
      <p className="eyebrow">Optional comparison</p>
      <h1 className="display text-5xl">Choose the path you want to inspect</h1>
      <p className="text-xl text-ink-soft">
        Claude, Codex, and Hermes are the three core paths. They use the same teaching scenario, but their evidence may differ. Read each lesson status before treating a path as a procedure you can run.
      </p>
      <p className="mt-4 text-ink-soft">
        <strong>Available</strong> means the course has a reviewed procedure and evidence for the stated fixture. <strong>Draft</strong> means the course describes a proposed boundary or source material but does not provide a runnable procedure or exercised evidence. <strong>Unavailable</strong> means the course does not offer that path for the lesson.
      </p>
      <div className="mt-8 grid gap-3">
        {bundle.course.primaryHarnesses.map((harness) => (
          <section className="card p-5" key={harness}>
            <h2 className="display text-2xl capitalize">{harness}</h2>
            <p className="text-ink-soft">A core path. Current status is shown for each lesson.</p>
          </section>
        ))}
      </div>
      {pi ? (
        <section className="mt-8 card p-5">
          <p className="label-mono">Optional advanced comparison</p>
          <h2 className="display text-3xl">Pi</h2>
          <p className="text-ink-soft">{pi.summary}</p>
          <p className="text-sm text-ink-soft">Pi is not a primary harness or a Lesson 1 variant. This comparison describes documentation only. It is not a course-tested Pi procedure.</p>
        </section>
      ) : null}
    </main>
  );
}
