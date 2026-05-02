import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="container-wide py-12 text-sm text-ink-faint flex flex-wrap gap-x-12 gap-y-6 items-start">
        <div className="flex-1 min-w-[200px]">
          <p className="font-serif text-ink text-base mb-1">Claude in Action.</p>
          <p>A 75-minute live demo for working professionals. Six use cases. Each one a more sophisticated AI capability than the last.</p>
        </div>
        <div>
          <p className="text-ink font-semibold mb-2">The arc</p>
          <ul className="space-y-1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n}>
                <Link href={`/acts/${n}`} className="hover:text-accent">
                  Act {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-ink font-semibold mb-2">Reference</p>
          <ul className="space-y-1">
            <li><Link href="/cheatsheet" className="hover:text-accent">Cheatsheet</Link></li>
            <li><Link href="/notes" className="hover:text-accent">Detailed notes</Link></li>
            <li><Link href="/glossary" className="hover:text-accent">Glossary</Link></li>
            <li><Link href="/next" className="hover:text-accent">What&apos;s next</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink font-semibold mb-2">External</p>
          <ul className="space-y-1">
            <li><a href="https://claude.ai" className="hover:text-accent" target="_blank" rel="noreferrer">claude.ai</a></li>
            <li><a href="https://claude.ai/download" className="hover:text-accent" target="_blank" rel="noreferrer">Claude Desktop</a></li>
          </ul>
        </div>
      </div>
      <div className="container-wide pb-10 text-xs text-ink-faint">
        Designed by Les Teo · Companion site to the live workshop
      </div>
    </footer>
  );
}
