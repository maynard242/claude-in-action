import type { Metadata } from "next";
import { HarnessPicker } from "@/components/course/HarnessPicker";
import { CourseReleaseBanner } from "@/components/course/CourseReleaseBanner";
import { loadCourse } from "@/lib/course/load";
import { listHarnessRouteParams } from "@/lib/course/view-model";
import { validateCourse } from "@/lib/course/validate";

export const metadata: Metadata = {
  title: "Choose a primary harness",
  robots: { index: false, follow: false },
};

export default function StartPage() {
  const bundle = loadCourse();
  validateCourse(bundle);
  const lesson = bundle.lessons.find((candidate) => candidate.slug === "01-bounded-brief");
  if (!lesson) throw new Error("The internal Lesson 1 course record is missing");
  const choices = listHarnessRouteParams(bundle).map(({ harness }) => {
    const variant = lesson.variants.find((candidate) => candidate.harness === harness);
    if (!variant) throw new Error(`Lesson 1 is missing ${harness}`);
    return { harness, status: variant.status, reason: variant.statusReason ?? null };
  });

  return (
    <div className="container-narrow py-12">
      <CourseReleaseBanner courseStatus={bundle.course.releaseStatus} lessonStatus={lesson.releaseStatus} />
      <header className="mt-10">
        <p className="eyebrow">Lesson 1 · internal learner shell</p>
        <h1 className="display text-5xl mt-4 mb-4">Choose how you want to view the course.</h1>
        <p className="text-xl text-ink-soft">Select a local primary harness. The URL stays authoritative and every path shows its current status honestly.</p>
      </header>
      <div className="mt-8">
        <HarnessPicker choices={choices} />
      </div>
    </div>
  );
}
