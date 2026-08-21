import Link from "next/link";
import type { Harness, Lesson, VariantStatus } from "@/lib/course/types";
import { learnLessonPath } from "@/lib/course/view-model";

export function LessonProgress({
  harness,
  lesson,
  status,
  reason,
}: {
  harness: Harness;
  lesson: Lesson;
  status: VariantStatus;
  reason: string | null;
}) {
  return (
    <ol className="mt-6 space-y-3" aria-label="Selected harness lessons">
      <li>
        <Link href={learnLessonPath(harness, lesson.slug)} className="card card-link block p-5">
          <p className="label-mono mb-2">01 · internal slice</p>
          <h2 className="display text-2xl mb-2">{lesson.title}</h2>
          <p className="m-0 text-sm text-ink-soft">{status}: {reason ?? "No status detail recorded."}</p>
        </Link>
      </li>
    </ol>
  );
}
