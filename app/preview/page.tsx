import type { Metadata } from "next";
import Link from "next/link";
import { loadCourse } from "@/lib/course/load";
import { validateCourse } from "@/lib/course/validate";

export const metadata: Metadata = {
  title: "Practical AI Agents",
  description: "A hands-on course for turning messy inputs into useful, checkable work.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  const bundle = loadCourse();
  validateCourse(bundle);

  return (
    <main className="container-wide py-16">
      <p className="eyebrow">A practical course in working with AI agents</p>
      <h1 className="display text-6xl mt-5">Practical AI Agents</h1>
      <p className="mt-6 max-w-3xl text-xl text-ink-soft">
        Learn one complete workflow: turn a messy request into a bounded brief, trace claims to sources,
        make a useful artifact, record access, handle changes, verify the result, and hand the work to a
        person who can check it.
      </p>
      <p className="mt-4 max-w-3xl text-ink-soft">
        The preview uses local synthetic lesson material. It does not connect an account or carry out external actions.
      </p>
      <div className="mt-8 flex gap-3">
        <Link className="rounded-md bg-accent px-5 py-3 font-semibold text-accent-on" href="/start">Preview the course</Link>
        <Link className="rounded-md border border-border px-5 py-3" href="/preview/choose-your-harness">How path status works</Link>
      </div>
      <section className="mt-16">
        <h2 className="display text-4xl">The six jobs</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {bundle.lessons.map((lesson) => (
            <li key={lesson.slug} className="card p-5">
              <span className="label-mono">{String(lesson.num).padStart(2, "0")}</span>
              <h3 className="display text-2xl mt-2">{lesson.title}</h3>
              <p className="text-ink-soft">{lesson.summary}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
