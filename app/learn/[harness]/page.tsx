import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseReleaseBanner } from "@/components/course/CourseReleaseBanner";
import { HarnessSwitcher } from "@/components/course/HarnessSwitcher";
import Link from "next/link";
import { loadCourse } from "@/lib/course/load";
import {
  isHarness,
  learnLessonPath,
  listHarnessRouteParams,
} from "@/lib/course/view-model";
import { validateCourse } from "@/lib/course/validate";

export const dynamicParams = false;

export function generateStaticParams() {
  const bundle = loadCourse();
  validateCourse(bundle);
  return listHarnessRouteParams(bundle);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harness: string }>;
}): Promise<Metadata> {
  const { harness } = await params;
  return {
    title: isHarness(harness) ? `${harness} learner path` : "Learner path",
    robots: { index: false, follow: false },
  };
}

export default async function LearnDashboardPage({
  params,
}: {
  params: Promise<{ harness: string }>;
}) {
  const { harness } = await params;
  if (!isHarness(harness)) notFound();
  const bundle = loadCourse();
  validateCourse(bundle);
  const lessons = [...bundle.lessons].sort((left, right) => left.num - right.num);
  if (lessons.some((lesson) => !lesson.variants.find((variant) => variant.harness === harness))) notFound();

  return (
    <div className="container-narrow py-12">
      <CourseReleaseBanner courseStatus={bundle.course.releaseStatus} />
      <header className="mt-10">
        <p className="eyebrow">Selected learner path</p>
        <h1 className="display text-5xl mt-4 mb-4 capitalize">{harness}</h1>
        <p className="text-xl text-ink-soft">Six connected jobs. You can open any lesson, but later lessons build on records from the lessons before them. Each card shows this path’s current status.</p>
      </header>
      <div className="mt-6"><HarnessSwitcher current={harness} /></div>
      <ol className="mt-8 space-y-3">
        {lessons.map((lesson) => {
          const variant = lesson.variants.find((item) => item.harness === harness)!;
          return <li key={lesson.slug}><Link href={learnLessonPath(harness, lesson.slug)} className="card card-link block p-5"><p className="label-mono mb-2">{String(lesson.num).padStart(2, "0")} · {variant.status}</p><h2 className="display text-2xl mb-2">{lesson.title}</h2><p className="m-0 text-sm text-ink-soft">{lesson.summary}</p></Link></li>;
        })}
      </ol>
    </div>
  );
}
