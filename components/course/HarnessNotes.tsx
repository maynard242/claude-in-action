import Link from "next/link";
import type { CourseBundle, HarnessNote } from "@/lib/course/types";
import { getHarness, installPath } from "@/lib/course/view";

export function HarnessNotes({
  notes,
  bundle,
}: {
  notes: HarnessNote[];
  bundle: CourseBundle;
}) {
  if (!notes.length) return null;

  return (
    <section className="mt-10" aria-labelledby="harness-notes-heading">
      <p className="label-mono mb-3">The same job elsewhere</p>
      <h2 id="harness-notes-heading" className="display text-3xl mb-4">
        If you use something else
      </h2>
      <div className="grid gap-3">
        {notes.map((note) => {
          const meta = getHarness(bundle, note.harness);
          return (
            <div key={note.harness} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="display text-xl m-0">{meta?.name ?? note.harness}</h3>
                <Link className="link text-sm" href={installPath(note.harness)}>
                  Set up {meta?.name ?? note.harness}
                </Link>
              </div>
              <pre className="overflow-x-auto rounded bg-code-bg p-3 text-[13px] text-code-ink">
                <code>{note.equivalent}</code>
              </pre>
              {note.caution ? (
                <p className="mt-3 mb-0 text-sm text-warm-dim">{note.caution}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
