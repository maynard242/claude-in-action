import Link from "next/link";
import type { Lesson } from "@/lib/course/types";
import { lessonPath } from "@/lib/course/view";

export function LessonNav({
  previous,
  next,
}: {
  previous: Lesson | null;
  next: Lesson | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-rule grid gap-3 sm:grid-cols-2" aria-label="Lesson sequence">
      {previous ? (
        <Link href={lessonPath(previous)} className="card card-link block p-4">
          <p className="label-mono mb-1">Previous · {String(previous.num).padStart(2, "0")}</p>
          <p className="m-0 text-ink">{previous.title}</p>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={lessonPath(next)} className="card card-link block p-4 sm:text-right">
          <p className="label-mono mb-1">Next · {String(next.num).padStart(2, "0")}</p>
          <p className="m-0 text-ink">{next.title}</p>
        </Link>
      ) : null}
    </nav>
  );
}
