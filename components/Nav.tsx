import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-rule">
      <div className="container-wide flex flex-wrap items-center gap-x-6 gap-y-1 py-3 text-sm">
        <Link
          href="/"
          className="flex items-center gap-2 text-ink hover:text-accent transition-colors"
        >
          <span
            className="inline-block w-2 h-2 rounded-full bg-accent"
            aria-hidden
          />
          <span className="font-mono text-[13px] tracking-wider uppercase">
            Claude / In Action
          </span>
        </Link>
        <div className="flex-1" />
        <Link href="/" className="text-ink-soft hover:text-accent transition-colors">
          Home
        </Link>
        <Link
          href="/acts/1"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          Acts
        </Link>
        <Link
          href="/cheatsheet"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          Cheatsheet
        </Link>
        <Link
          href="/notes"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          Notes
        </Link>
        <Link
          href="/glossary"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          Glossary
        </Link>
        <Link
          href="/desk"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          The Desk
        </Link>
        <Link
          href="/next"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          What&apos;s next
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
