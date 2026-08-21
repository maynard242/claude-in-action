import type { CourseReleaseStatus, LessonReleaseStatus } from "@/lib/course/types";

const releaseCopy: Record<CourseReleaseStatus | LessonReleaseStatus, string> = {
  foundation: "Foundation status: this is not a completed three-harness course.",
  planned: "Planned status: this lesson is not available as a completed course path.",
  internal_slice: "Internal slice: this lesson is not a completed three-harness course.",
  public_preview: "Preview status: path availability is shown per harness.",
  released_three_harness: "Released three-harness status.",
};

export function CourseReleaseBanner({
  courseStatus,
  lessonStatus,
}: {
  courseStatus: CourseReleaseStatus;
  lessonStatus?: LessonReleaseStatus;
}) {
  return (
    <aside className="card border-l-4 border-l-warm p-4 text-sm text-ink-soft" aria-label="Course release status">
      <p className="label-mono mb-1 text-warm">Course status · {courseStatus.replaceAll("_", " ")}</p>
      <p className="m-0">{releaseCopy[courseStatus]}</p>
      {lessonStatus ? <p className="mt-2 mb-0">{releaseCopy[lessonStatus]}</p> : null}
    </aside>
  );
}
