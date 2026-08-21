import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseReleaseBanner } from "@/components/course/CourseReleaseBanner";
import { HarnessSwitcher } from "@/components/course/HarnessSwitcher";
import { LessonProgress } from "@/components/course/LessonProgress";
import { loadCourse } from "@/lib/course/load";
import {
  isHarness,
  listHarnessRouteParams,
  resolveLessonView,
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
  const view = resolveLessonView(bundle, harness, "01-bounded-brief");
  if (!view) notFound();

  return (
    <div className="container-narrow py-12">
      <CourseReleaseBanner courseStatus={view.course.releaseStatus} lessonStatus={view.lesson.releaseStatus} />
      <header className="mt-10">
        <p className="eyebrow">Selected learner path</p>
        <h1 className="display text-5xl mt-4 mb-4 capitalize">{harness}</h1>
        <p className="text-xl text-ink-soft">One internal-slice lesson is available to read. Its current path status is shown below.</p>
      </header>
      <div className="mt-6">
        <HarnessSwitcher current={harness} />
      </div>
      <LessonProgress harness={harness} lesson={view.lesson} status={view.status} reason={view.statusReason} />
    </div>
  );
}
