import Link from "next/link";
import { loadCourse } from "@/lib/course/load";
import { installPath, orderedParts, partPath } from "@/lib/course/view";

export function Footer() {
  const bundle = loadCourse();
  const parts = orderedParts(bundle);

  return (
    <footer className="mt-32 border-t border-rule">
      <div className="container-wide py-12 text-sm text-ink-faint flex flex-wrap gap-x-12 gap-y-8 items-start">
        <div className="flex-1 min-w-[240px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-accent" aria-hidden />
            <span className="font-mono text-[12px] tracking-wider uppercase text-ink">
              Practical / AI Agents
            </span>
          </div>
          <p className="leading-relaxed">
            Eighteen lessons on getting work you can trust out of an AI agent. Written for whichever
            one you already run.
          </p>
        </div>
        <div>
          <p className="label-mono mb-3">The course</p>
          <ul className="space-y-1.5">
            {parts.map((part) => (
              <li key={part.num}>
                <Link href={partPath(part)} className="text-ink-soft hover:text-accent transition-colors">
                  Part {part.num}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/learn" className="text-ink-soft hover:text-accent transition-colors">
                All lessons
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">
            <Link href="/install" className="hover:text-accent transition-colors">
              Setup
            </Link>
          </p>
          <ul className="space-y-1.5">
            {bundle.harnesses.map((harness) => (
              <li key={harness.id}>
                <Link
                  href={installPath(harness.id)}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  {harness.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">Reference</p>
          <ul className="space-y-1.5">
            <li>
              <Link href="/glossary" className="text-ink-soft hover:text-accent transition-colors">
                Glossary
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-wide pb-10 text-xs text-ink-faint flex flex-wrap items-center gap-3">
        <span className="font-mono uppercase tracking-wider">© Leslie Teo</span>
        <span className="opacity-40">·</span>
        <span>Built with Claude</span>
      </div>
    </footer>
  );
}
