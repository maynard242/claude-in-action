import Link from "next/link";
import { acts, workflows } from "@/lib/content";

export default function Home() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative grain overflow-hidden">
        <div className="container-wide pt-28 md:pt-36 pb-20 relative">
          <div className="eyebrow mb-6">
            One tutorial, two parts · From novice to advanced
          </div>
          <h1 className="display text-[56px] md:text-[112px] mb-8 max-w-[14ch]">
            Claude<span className="text-accent">.</span>
            <br />
            <em>In Action</em>.
          </h1>
          <p className="text-xl md:text-2xl text-ink-soft max-w-3xl leading-snug font-light">
            Twelve use cases, in two parts. Six general ones anyone can use, then six built
            for an investment desk. Each is a more sophisticated AI capability than the last —
            from your first prompt to building your own agent.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/acts/1"
              className="inline-flex items-center gap-2 bg-accent text-accent-on px-6 py-3 rounded-md font-semibold hover:bg-accent-dim transition-colors"
            >
              Part 1 · The six uses
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/desk"
              className="inline-flex items-center gap-2 bg-surface border border-border text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Part 2 · The investment desk
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/cheatsheet"
              className="inline-flex items-center bg-surface border border-border text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Cheatsheet
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Part one — the six general uses ─── */}
      <section className="container-wide py-20 border-t border-rule">
        <div className="grid md:grid-cols-[260px_1fr] gap-10 mb-10">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">§01</span> · Part one — general
            </div>
            <h2 className="display text-3xl md:text-5xl">
              Six uses. <em>Anyone&apos;s</em> work.
            </h2>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed self-end max-w-2xl">
            Start here, as a novice. You arrive thinking Claude is a chatbot; you leave
            knowing it&apos;s a colleague you can shape. Each use stacks one more capability
            on the last — reasoning, tools, long context, connected data, parallel agents,
            and finally an agent you build yourself.
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

      {/* ─── Part two — the six investment use cases (The Desk) ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-20">
          <div className="grid md:grid-cols-[260px_1fr] gap-10 mb-10">
            <div>
              <div className="label-mono mb-3">
                <span className="accent">§02</span> · Part two — investment desk
              </div>
              <h2 className="display text-3xl md:text-5xl">
                The same six capabilities. <em>Money on the line.</em>
              </h2>
            </div>
            <p className="text-lg text-ink-soft leading-relaxed self-end max-w-2xl">
              Now go advanced. Part one&apos;s arc — reasoning, tools, long context,
              connected data, parallel agents, composition — pointed at a real book. Six
              workflows for a portfolio manager, built on Claude&apos;s finance plugins, with
              the citation discipline and the human-in-the-loop a buy-side desk demands.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {workflows.map((w) => (
              <Link
                key={w.num}
                href={`/desk/${w.slug}`}
                className="group card card-link block p-6"
              >
                <div className="flex items-start gap-5">
                  <div className="font-mono text-[42px] text-accent leading-none w-14 shrink-0 tabular-nums tracking-tight">
                    {String(w.num).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="label-mono mb-2">{w.capabilityShort}</div>
                    <h3 className="display text-2xl md:text-[28px] mb-2 group-hover:text-accent transition-colors leading-tight">
                      {w.title}
                    </h3>
                    <p className="text-ink-soft text-[15px] leading-relaxed m-0">
                      {w.oneLiner}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/desk"
            className="inline-flex items-center gap-2 mt-8 text-accent font-semibold hover:gap-3 transition-all"
          >
            Open The Desk — the reframe, the wiring, the realism layer
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ─── Deep research thread ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-20 grid md:grid-cols-[260px_1fr] gap-10">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">§03</span> · Background thread
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
              Kick off a deep-research task at the start and close the tab. It runs in the
              background while everything else happens. Open it at the end: twenty-something
              pages, sixty-plus sources, a full briefing — produced without anyone watching
              it work.
            </p>
            <p className="text-lg text-ink-soft leading-relaxed m-0">
              That&apos;s the headline. AI isn&apos;t a tool you visit when you have a
              question. It&apos;s something you <em className="text-accent not-italic font-medium">kick off</em> in the morning and check on later. The bottleneck stopped
              being the model. The bottleneck is now whether you remember to ask.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Reference ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-20">
          <div className="label-mono mb-3">
            <span className="accent">§04</span> · On this site
          </div>
          <h2 className="display text-3xl md:text-5xl mb-12 max-w-3xl">
            Reference, when you <em>need it</em>.
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/cheatsheet" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Cheatsheet</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                The nine common questions, with prepared answers. Plain-English glossary of
                the six capabilities.
              </p>
              <span className="text-accent font-semibold">Open the cheatsheet →</span>
            </Link>
            <Link href="/notes" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Detailed notes</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                The longer-form companion. Why each capability matters. Common pitfalls. How
                to think about Claude as a colleague, not a chatbot.
              </p>
              <span className="text-accent font-semibold">Read the notes →</span>
            </Link>
            <Link href="/glossary" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Glossary</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                Twelve AI terms in plain English. Two-line definitions, one-paragraph
                explanations. No buzzwords.
              </p>
              <span className="text-accent font-semibold">Open the glossary →</span>
            </Link>
            <Link href="/next" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">What&apos;s next</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                Your 30/60/90-day plan. Five starter agents to build first. Communities and
                resources actually worth your time.
              </p>
              <span className="text-accent font-semibold">Plan the next 90 days →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
