import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HarnessNotes } from "@/components/course/HarnessNotes";
import { LessonNav } from "@/components/course/LessonNav";
import { WorkedExample } from "@/components/course/WorkedExample";
import { loadCourse } from "@/lib/course/load";
import { getHarness, getLesson, getPart, neighbours, orderedLessons, partPath } from "@/lib/course/view";

export function generateStaticParams() {
  return orderedLessons(loadCourse()).map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>;
}): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = getLesson(loadCourse(), slug);
  if (!lesson) return { title: "Lesson" };
  return { title: `${lesson.title} · Practical AI Agents`, description: lesson.summary };
}

export default async function LessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const bundle = loadCourse();
  const lesson = getLesson(bundle, slug);
  if (!lesson) notFound();

  const part = getPart(bundle, lesson.part);
  const { previous, next } = neighbours(bundle, lesson);
  const harness = getHarness(bundle, lesson.workedExample.harness);

  return (
    <article className="container-narrow py-12">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link className="link" href="/learn">
          The course
        </Link>
        {part ? (
          <>
            <span aria-hidden> / </span>
            <Link className="link" href={partPath(part)}>
              Part {part.num}
            </Link>
          </>
        ) : null}
      </nav>

      <header className="pb-10 border-b border-rule">
        <p className="eyebrow">
          Lesson {String(lesson.num).padStart(2, "0")}
          {part ? ` · ${part.title}` : ""}
        </p>
        <h1 className="display text-4xl md:text-6xl mt-4 mb-5 leading-[1.05]">{lesson.title}</h1>
        <p className="text-xl text-ink-soft">{lesson.job}</p>
      </header>

      <p className="mt-8 text-lg text-ink-soft leading-relaxed">{lesson.summary}</p>

      <section className="mt-8 card p-5">
        <p className="label-mono mb-2">Why here</p>
        <p className="m-0 text-sm text-ink-soft">{lesson.why}</p>
      </section>

      <section className="mt-10" aria-labelledby="steps-heading">
        <p className="label-mono mb-3">How to do it</p>
        <h2 id="steps-heading" className="display text-3xl mb-5">
          The steps
        </h2>
        <ol className="space-y-4">
          {lesson.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 rounded-full border border-accent text-accent text-sm font-mono flex items-center justify-center mt-0.5 tabular-nums">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="display text-xl mb-1">{step.title}</h3>
                <p className="m-0 text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="callout callout--matter mt-8">
        <p className="callout-label">What you end up with</p>
        <p className="m-0">{lesson.outcome}</p>
      </div>

      <div className="callout callout--notice mt-4">
        <p className="callout-label">Boundary for this lesson</p>
        <p className="m-0">{lesson.boundary}</p>
      </div>

      <WorkedExample example={lesson.workedExample} harness={harness} />

      <HarnessNotes notes={lesson.harnessNotes} bundle={bundle} />

      <section className="mt-10" aria-labelledby="check-heading">
        <p className="label-mono mb-3">Checking your work</p>
        <h2 id="check-heading" className="display text-3xl mb-5">
          What has to be true
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <h3 className="label-mono mb-3">The output must</h3>
            <ul className="space-y-2 text-sm text-ink-soft">
              {lesson.invariants.map((invariant) => (
                <li key={invariant.id}>{invariant.description}</li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="label-mono mb-3">You still have to</h3>
            <ul className="space-y-2 text-sm text-ink-soft">
              {lesson.humanReview.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <p className="label-mono mb-2">How it goes wrong</p>
          <p className="m-0 text-sm text-ink-soft">{lesson.failureMode}</p>
        </div>
        <div className="card p-5">
          <p className="label-mono mb-2">How to recover</p>
          <p className="m-0 text-sm text-ink-soft">{lesson.recovery}</p>
        </div>
      </section>

      {lesson.takeaway ? (
        <div className="callout callout--aha mt-8">
          <p className="callout-label">The point</p>
          <p className="m-0">{lesson.takeaway}</p>
        </div>
      ) : null}

      <LessonNav previous={previous} next={next} />
    </article>
  );
}
