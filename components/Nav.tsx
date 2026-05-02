import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(250,247,242,0.92)] border-b border-rule">
      <div className="container-wide flex flex-wrap items-center gap-x-6 gap-y-1 py-3 text-sm">
        <Link
          href="/"
          className="font-serif text-base font-semibold text-ink hover:text-accent transition-colors"
        >
          Claude in Action
        </Link>
        <div className="flex-1" />
        <Link href="/" className="text-ink-soft hover:text-accent">
          Home
        </Link>
        <Link href="/acts/1" className="text-ink-soft hover:text-accent">
          Acts
        </Link>
        <Link href="/cheatsheet" className="text-ink-soft hover:text-accent">
          Cheatsheet
        </Link>
        <Link href="/notes" className="text-ink-soft hover:text-accent">
          Notes
        </Link>
        <Link href="/glossary" className="text-ink-soft hover:text-accent">
          Glossary
        </Link>
        <Link href="/next" className="text-ink-soft hover:text-accent">
          What&apos;s next
        </Link>
      </div>
    </nav>
  );
}
