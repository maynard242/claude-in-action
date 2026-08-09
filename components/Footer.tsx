import Link from "next/link";
import { acts, workflows } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="container-wide py-12 text-sm text-ink-faint flex flex-wrap gap-x-12 gap-y-8 items-start">
        <div className="flex-1 min-w-[240px]">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-block w-2 h-2 rounded-full bg-accent"
              aria-hidden
            />
            <span className="font-mono text-[12px] tracking-wider uppercase text-ink">
              Claude / In Action
            </span>
          </div>
          <p className="leading-relaxed">
            A two-part tutorial for working professionals. Part one: six general use cases.
            Part two (The Desk): six for an investment portfolio manager. From novice to
            advanced.
          </p>
        </div>
        <div>
          <p className="label-mono mb-3">The arc</p>
          <ul className="space-y-1.5">
            {acts.map((act) => (
              <li key={act.slug}>
                <Link
                  href={`/acts/${act.slug}`}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  Act {String(act.num).padStart(2, "0")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">
            <Link href="/desk" className="hover:text-accent transition-colors">
              The Desk
            </Link>
          </p>
          <ul className="space-y-1.5">
            {workflows.map((workflow) => (
              <li key={workflow.slug}>
                <Link
                  href={`/desk/${workflow.slug}`}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  Desk {String(workflow.num).padStart(2, "0")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">Reference</p>
          <ul className="space-y-1.5">
            <li>
              <Link
                href="/cheatsheet"
                className="text-ink-soft hover:text-accent transition-colors"
              >
                Cheatsheet
              </Link>
            </li>
            <li>
              <Link
                href="/notes"
                className="text-ink-soft hover:text-accent transition-colors"
              >
                Detailed notes
              </Link>
            </li>
            <li>
              <Link
                href="/glossary"
                className="text-ink-soft hover:text-accent transition-colors"
              >
                Glossary
              </Link>
            </li>
            <li>
              <Link
                href="/next"
                className="text-ink-soft hover:text-accent transition-colors"
              >
                What&apos;s next
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">External</p>
          <ul className="space-y-1.5">
            <li>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft hover:text-accent transition-colors"
              >
                claude.ai
              </a>
            </li>
            <li>
              <a
                href="https://claude.ai/download"
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft hover:text-accent transition-colors"
              >
                Claude Desktop
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-wide pb-10 text-xs text-ink-faint flex flex-wrap items-center gap-3">
        <span className="font-mono uppercase tracking-wider">
          © Leslie Teo
        </span>
        <span className="opacity-40">·</span>
        <span>Built and designed by Claude</span>
        <span className="opacity-40">·</span>
        <span>Companion site to the tutorial</span>
      </div>
    </footer>
  );
}
