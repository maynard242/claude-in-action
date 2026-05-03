import Link from "next/link";
import { acts } from "@/lib/content";

export default function Home() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative grain overflow-hidden">
        <div className="container-wide pt-28 md:pt-36 pb-20 relative">
          <div className="eyebrow mb-6">
            A live demo · 75 minutes · No prior AI experience needed
          </div>
          <h1 className="display text-[56px] md:text-[112px] mb-8 max-w-[14ch]">
            Claude<span className="text-accent">.</span>
            <br />
            <em>In Action</em>.
          </h1>
          <p className="text-xl md:text-2xl text-ink-soft max-w-3xl leading-snug font-light">
            Six use cases. Each one a more sophisticated AI capability than the last —
            ending with you building your own agent. Same Claude. Same hour. Six different
            ways of working.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/acts/1"
              className="inline-flex items-center gap-2 bg-accent text-accent-on px-6 py-3 rounded-md font-semibold hover:bg-accent-dim transition-colors"
            >
              Start the tour
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/cheatsheet"
              className="inline-flex items-center bg-surface border border-border text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Open the cheatsheet
            </Link>
            <Link
              href="/notes"
              className="inline-flex items-center bg-surface border border-border text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Detailed notes
            </Link>
          </div>
        </div>
      </section>

      {/* ─── The arc ─── */}
      <section className="container-wide py-20 border-t border-rule">
        <div className="grid md:grid-cols-[260px_1fr] gap-10 mb-10">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">§01</span> · The arc
            </div>
            <h2 className="display text-3xl md:text-5xl">
              One story, <em>six acts</em>.
            </h2>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed self-end max-w-2xl">
            The audience walks in thinking Claude is a chatbot. They walk out knowing it&apos;s
            a colleague they can shape themselves. Each act stacks one more capability on
            the previous.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {acts.map((a) => (
            <Link
              key={a.num}
              href={`/acts/${a.slug}`}
              className="group card card-link block p-6"
            >
              <div className="flex items-start gap-5">
                <div className="font-mono text-[42px] text-accent leading-none w-14 shrink-0 tabular-nums tracking-tight">
                  {String(a.num).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="label-mono mb-2">{a.capabilityShort}</div>
                  <h3 className="display text-2xl md:text-[28px] mb-2 group-hover:text-accent transition-colors leading-tight">
                    {a.title}
                  </h3>
                  <p className="text-ink-soft text-[15px] leading-relaxed m-0">
                    {a.oneLiner}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Deep research thread ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-20 grid md:grid-cols-[260px_1fr] gap-10">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">§02</span> · Background thread
            </div>
            <h2 className="display text-3xl md:text-5xl">
              A research analyst <em>on staff</em>.
              <br />
              Forever.
              <br />
              Twenty dollars a month.
            </h2>
          </div>
          <div className="self-center max-w-2xl">
            <p className="text-lg text-ink-soft leading-relaxed mb-5">
              At minute 1, a deep-research task is kicked off in a separate tab and closed.
              It runs in the background while every other demo happens. At minute 64, we
              open it. Twenty-something pages, sixty-plus sources, a full briefing — produced
              without anyone watching it work.
            </p>
            <p className="text-lg text-ink-soft leading-relaxed m-0">
              That&apos;s the headline. AI isn&apos;t a tool you visit when you have a
              question. It&apos;s something you <em className="text-accent not-italic font-medium">kick off</em> in the morning and check on later. The bottleneck stopped
              being the model. The bottleneck is now whether you remember to ask.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What's on this site ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-20">
          <div className="label-mono mb-3">
            <span className="accent">§03</span> · On this site
          </div>
          <h2 className="display text-3xl md:text-5xl mb-12 max-w-3xl">
            Four ways to <em>actually</em> use this.
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/acts/1" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Per-act pages</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                Every prompt the presenter ran, copyable. What to watch for. Why it
                matters. What to try yourself.
              </p>
              <span className="text-accent font-semibold">Start with Act 01 →</span>
            </Link>
            <Link href="/cheatsheet" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Cheatsheet</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                The eight common audience questions, with prepared answers. Plain-English
                glossary of the six capabilities.
              </p>
              <span className="text-accent font-semibold">Open the cheatsheet →</span>
            </Link>
            <Link href="/notes" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Detailed notes</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                The longer-form companion. Why each capability matters. Common pitfalls.
                How to think about Claude past the demo.
              </p>
              <span className="text-accent font-semibold">Read the notes →</span>
            </Link>
            <Link href="/next" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">What&apos;s next</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                Your 30/60/90-day plan. Five starter agents to build first. Communities
                and resources actually worth your time.
              </p>
              <span className="text-accent font-semibold">Plan the next 90 days →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
