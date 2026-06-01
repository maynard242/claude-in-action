import Link from "next/link";

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
            A 75-minute live demo for working professionals. Six use cases, each a more
            sophisticated AI capability than the last — plus The Desk, the same arc for an
            investment portfolio manager.
          </p>
        </div>
        <div>
          <p className="label-mono mb-3">The arc</p>
          <ul className="space-y-1.5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n}>
                <Link
                  href={`/acts/${n}`}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  Act {String(n).padStart(2, "0")}
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
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={`desk-${n}`}>
                <Link
                  href={`/desk/${n}`}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  Desk {String(n).padStart(2, "0")}
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
          Designed by Les Teo
        </span>
        <span className="opacity-40">·</span>
        <span>Companion site to the live workshop</span>
      </div>
    </footer>
  );
}
