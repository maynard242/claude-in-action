import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadCourse } from "@/lib/course/load";
import { getPart, lessonPath, lessonsInPart, orderedParts } from "@/lib/course/view";

export function generateStaticParams() {
  return orderedParts(loadCourse()).map((part) => ({ part: String(part.num) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}): Promise<Metadata> {
  const { part: raw } = await params;
  const part = getPart(loadCourse(), Number(raw));
  if (!part) return { title: "Part" };
  return { title: `${part.title} · Practical AI Agents`, description: part.summary };
}

export default async function PartPage({ params }: { params: Promise<{ part: string }> }) {
  const { part: raw } = await params;
  const bundle = loadCourse();
  const part = getPart(bundle, Number(raw));
  if (!part) notFound();
  const lessons = lessonsInPart(bundle, part.num);

  return (
    <div className="container-narrow py-12">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link className="link" href="/learn">
          The course
        </Link>
      </nav>
      <header className="pb-10 border-b border-rule">
        <p className="eyebrow">
          Part {part.num} · {part.level}
        </p>
        <h1 className="display text-4xl md:text-6xl mt-4 mb-5">{part.title}</h1>
        <p className="text-xl text-ink-soft">{part.premise}</p>
      </header>
      <p className="mt-8 text-lg text-ink-soft leading-relaxed">{part.summary}</p>

      <ol className="mt-10 space-y-3">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link href={lessonPath(lesson)} className="group card card-link block p-5">
              <p className="label-mono mb-2">Lesson {String(lesson.num).padStart(2, "0")}</p>
              <h2 className="display text-2xl mb-2 group-hover:text-accent transition-colors">
                {lesson.title}
              </h2>
              <p className="m-0 text-sm text-ink-soft">{lesson.job}</p>
            </Link>
          </li>
        ))}
      </ol>
      {lessons.length === 0 ? (
        <p className="mt-8 text-ink-faint">These lessons are still being written.</p>
      ) : null}
    </div>
  );
}
