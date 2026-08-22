import type { Metadata } from "next";
import Link from "next/link";
import { loadCourse } from "@/lib/course/load";
import { installPath, lessonPath, lessonsInPart, orderedParts, partPath, verifiedCount } from "@/lib/course/view";

export const metadata: Metadata = {
  title: "The course · Practical AI Agents",
  description: "Eighteen lessons in three parts on getting reliable work out of AI agents.",
};

export default function CourseIndex() {
  const bundle = loadCourse();
  const parts = orderedParts(bundle);
  const { verified, total } = verifiedCount(bundle);

  return (
    <div className="container-wide py-16">
      <p className="eyebrow">The course</p>
      <h1 className="display text-5xl md:text-7xl mt-5 max-w-[20ch]">
        Eighteen lessons. <em>Three parts.</em>
      </h1>
      <p className="mt-6 max-w-3xl text-xl text-ink-soft leading-snug">
        Beginner to advanced, built around one idea: an agent you cannot check is an agent you
        cannot use. Every lesson works on any of the four harnesses.
      </p>
      <p className="mt-4 text-sm text-ink-faint">
        {verified} of {total} worked examples have been run and recorded on a real machine. The rest
        say so on the page.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        {bundle.harnesses.map((harness) => (
          <Link key={harness.id} href={installPath(harness.id)} className="card card-link px-4 py-3">
            <span className="label-mono">Set up</span>
            <span className="block text-ink">{harness.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 space-y-14">
        {parts.map((part) => {
          const lessons = lessonsInPart(bundle, part.num);
          return (
            <section key={part.num}>
              <div className="grid md:grid-cols-[280px_1fr] gap-8 mb-6">
                <div>
                  <div className="label-mono mb-3">
                    <span className="accent">Part {part.num}</span> · {part.level}
                  </div>
                  <h2 className="display text-3xl md:text-4xl">
                    <Link href={partPath(part)} className="hover:text-accent transition-colors">
                      {part.title}
                    </Link>
                  </h2>
                </div>
                <div className="self-end max-w-2xl">
                  <p className="text-lg text-ink-soft leading-relaxed m-0">{part.premise}</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {lessons.map((lesson) => (
                  <Link key={lesson.slug} href={lessonPath(lesson)} className="group card card-link block p-5">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[32px] text-accent leading-none w-11 shrink-0 tabular-nums">
                        {String(lesson.num).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="display text-xl mb-1 group-hover:text-accent transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="m-0 text-sm text-ink-soft leading-relaxed">{lesson.job}</p>
                      </div>
                    </div>
                  </Link>
                ))}
                {lessons.length === 0 ? (
                  <p className="text-ink-faint text-sm">These lessons are still being written.</p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
