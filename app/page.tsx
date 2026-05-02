import Link from "next/link";
import { acts } from "@/lib/content";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="container-wide pt-24 pb-16 border-b border-rule">
        <div className="eyebrow mb-4">A live demo · 75 minutes · No prior AI experience needed</div>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] mb-6">
          Claude in Action.
        </h1>
        <p className="text-xl md:text-2xl text-ink-soft max-w-3xl leading-snug">
          Six use cases. Each one a more sophisticated AI capability than the last —
          ending with you building your own agent. Same Claude. Same hour. Six different ways
          of working.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/acts/1"
            className="inline-block bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-[#A33E2C] transition-colors"
          >
            Start the tour →
          </Link>
          <Link
            href="/cheatsheet"
            className="inline-block border border-rule bg-paper text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            Open the cheatsheet
          </Link>
          <Link
            href="/notes"
            className="inline-block border border-rule bg-paper text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            Detailed notes
          </Link>
        </div>
      </section>

      {/* The arc */}
      <section className="container-wide py-20">
        <div className="eyebrow mb-3">The arc</div>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          One story, six acts.
        </h2>
        <p className="text-lg text-ink-soft max-w-3xl mb-10">
          The audience walks in thinking Claude is a chatbot. They walk out knowing it&apos;s a
          colleague they can shape themselves. Each act stacks one more capability on the previous.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {acts.map((a) => (
            <Link
              key={a.num}
              href={`/acts/${a.slug}`}
              className="group block bg-paper border border-rule rounded-lg p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="font-serif text-4xl font-semibold text-accent leading-none w-12 shrink-0">
                  {a.num}
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-ink-faint mb-1">
                    {a.capabilityShort}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-ink-soft text-[15px] leading-relaxed">
                    {a.oneLiner}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The deep research thread */}
      <section className="container-wide py-16 border-t border-rule">
        <div className="eyebrow mb-3">The thread that runs the whole hour</div>
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4 max-w-2xl">
          A research analyst on staff. Forever. Twenty dollars a month.
        </h2>
        <p className="text-lg text-ink-soft max-w-3xl mb-6">
          At minute 1, a deep-research task is kicked off in a separate tab and closed. It runs
          in the background while every other demo happens. At minute 64, we open it. Twenty-something
          pages, sixty-plus sources, a full briefing — produced without anyone watching it work.
        </p>
        <p className="text-lg text-ink-soft max-w-3xl">
          That&apos;s the headline. AI isn&apos;t a tool you visit when you have a question. It&apos;s
          something you <em>kick off</em> in the morning and check on later. The bottleneck stopped
          being the model. The bottleneck is now whether you remember to ask.
        </p>
      </section>

      {/* What this site is */}
      <section className="container-wide py-16 border-t border-rule">
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
          What&apos;s on this site.
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-paper border border-rule rounded-lg p-6">
            <h3 className="font-serif text-xl font-semibold mb-2">Per-act pages</h3>
            <p className="text-ink-soft mb-3">
              Every prompt the presenter ran, copyable. What to watch for. Why it matters. What
              to try yourself.
            </p>
            <Link href="/acts/1" className="text-accent font-semibold hover:underline">
              Start with Act 1 →
            </Link>
          </div>
          <div className="bg-paper border border-rule rounded-lg p-6">
            <h3 className="font-serif text-xl font-semibold mb-2">Cheatsheet</h3>
            <p className="text-ink-soft mb-3">
              The eight common audience questions, with prepared answers. Plain-English glossary
              of the six capabilities.
            </p>
            <Link href="/cheatsheet" className="text-accent font-semibold hover:underline">
              Open the cheatsheet →
            </Link>
          </div>
          <div className="bg-paper border border-rule rounded-lg p-6">
            <h3 className="font-serif text-xl font-semibold mb-2">Detailed notes</h3>
            <p className="text-ink-soft mb-3">
              The longer-form companion. Why each capability matters. Common pitfalls. How to
              think about Claude past the demo.
            </p>
            <Link href="/notes" className="text-accent font-semibold hover:underline">
              Read the notes →
            </Link>
          </div>
          <div className="bg-paper border border-rule rounded-lg p-6">
            <h3 className="font-serif text-xl font-semibold mb-2">What&apos;s next</h3>
            <p className="text-ink-soft mb-3">
              Your 30/60/90-day plan. Five starter agents to build first. Communities and resources
              that are actually worth your time.
            </p>
            <Link href="/next" className="text-accent font-semibold hover:underline">
              Plan the next 90 days →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
