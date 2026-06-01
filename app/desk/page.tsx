import Link from "next/link";
import { workflows } from "@/lib/content";

export const metadata = {
  title: "The Desk — Claude in Action",
  description:
    "Part two of the tutorial: the same six capabilities, applied to a portfolio manager's day. Six workflows built on Claude's finance plugins — with the citation discipline and human-in-the-loop a buy-side desk demands.",
};

const constraints = [
  {
    head: "Cite, or it didn't happen",
    body: "Every figure traces to a primary source — a filing, a transcript, a consensus print with a date — or it's marked [UNSOURCED]. A hallucinated number is a wrong price target.",
  },
  {
    head: "Live, governed data",
    body: "MCP connectors query the vendor under license, not a scrape. FactSet and Bloomberg terms forbid redistribution; the connector model is what keeps you inside them.",
  },
  {
    head: "MNPI stays out",
    body: "Scoped permissions and audit trails. On anything that smells material or non-public — expert-network calls, entitled data — the agent flags for compliance. It doesn't conclude.",
  },
  {
    head: "No look-ahead",
    body: "Point-in-time data, a survivorship-free universe, and a stated data vintage. Otherwise the backtest reports a Sharpe that never existed.",
  },
  {
    head: "The bright line",
    body: "Agents recommend. Humans approve. Execution lives in a separate, permissioned system. That line is where fiduciary and regulatory liability sits.",
  },
  {
    head: "A backtest isn't a promise",
    body: "Overfitting is the quant's original sin — enough parameters fit any history and predict nothing. Hold out data, charge real costs and capacity, validate out-of-sample. Claude writes whatever you ask, including a curve-fit fantasy.",
  },
];

export default function DeskPage() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative grain overflow-hidden">
        <div className="container-wide pt-24 md:pt-32 pb-16 relative">
          <div className="eyebrow mb-6">
            Part two · For investment professionals · Advanced
          </div>
          <h1 className="display text-[52px] md:text-[104px] mb-8 leading-[1.0]">
            The <em>Desk</em>
            <span className="text-accent">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-ink-soft max-w-3xl leading-snug font-light">
            The same six acts — with money on the line. Six workflows for someone running a
            real book, built on Claude&apos;s finance plugins. Where the numbers have to be
            right, the citation discipline and the human-in-the-loop stop being nice-to-haves
            and become the product.
          </p>
        </div>
      </section>

      {/* ─── The reframe ─── */}
      <section className="container-wide py-16 border-t border-rule">
        <div className="grid md:grid-cols-[260px_1fr] gap-10">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">§01</span> · The reframe
            </div>
            <h2 className="display text-3xl md:text-5xl">
              Not a different tutorial. <em>The same arc.</em>
            </h2>
          </div>
          <div className="self-center max-w-2xl text-lg text-ink-soft leading-relaxed">
            <p className="mb-4">
              Read the filing — <span className="text-ink">reasoning</span>. Pull live
              fundamentals — <span className="text-ink">connected data</span>. Digest the
              300-page 10-K and four years of calls — <span className="text-ink">long
              context</span>. Fan out across the sector overnight —{" "}
              <span className="text-ink">parallel subagents</span>. One agent that reads,
              models, and drafts — <span className="text-ink">composition</span>.
            </p>
            <p className="m-0">
              The finance case isn&apos;t a new set of capabilities. It&apos;s the six you
              already saw, pointed at a book — which is exactly why showing your work matters
              more here than anywhere else.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The five workflows ─── */}
      <section className="container-wide py-16 border-t border-rule">
        <div className="label-mono mb-3">
          <span className="accent">§02</span> · A PM&apos;s day
        </div>
        <h2 className="display text-3xl md:text-5xl mb-10 max-w-3xl">
          Six workflows, dawn to <em>committee</em>.
        </h2>

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
                  <div className="label-mono mb-2 flex flex-wrap items-center gap-x-2">
                    <span>{w.capabilityShort}</span>
                    <span className="opacity-40">·</span>
                    <span className="text-ink-faint normal-case tracking-normal">
                      {w.timeOfDay}
                    </span>
                  </div>
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

        <div className="prompt-box mt-8">
          <div className="text-[10.5px] uppercase tracking-[0.18em] font-mono text-accent mb-2.5">
            How to run these
          </div>
          <p className="m-0 text-[14.5px] leading-relaxed">
            These build on Anthropic&apos;s open finance plugins. Install once, then the
            skills and agents above are available in Cowork and Claude Code:
          </p>
          <p className="m-0 mt-3 font-mono text-[13px] text-accent">
            claude plugin marketplace add anthropics/financial-services
          </p>
        </div>
      </section>

      {/* ─── The realism layer ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-16">
          <div className="grid md:grid-cols-[260px_1fr] gap-10 mb-8">
            <div>
              <div className="label-mono mb-3">
                <span className="accent">§03</span> · The realism layer
              </div>
              <h2 className="display text-3xl md:text-5xl">
                Six rules that <em>make it real</em>.
              </h2>
            </div>
            <p className="text-lg text-ink-soft leading-relaxed self-end max-w-2xl">
              A buy-side audience spots a naive treatment in four seconds. These constraints aren&apos;t
              disclaimers bolted on the end — they&apos;re baked into how the agents are wired.
              Drop one and the workflow stops being credible.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {constraints.map((c, i) => (
              <div key={i} className="callout callout--notice">
                <div className="callout-label flex items-center gap-2">
                  <span className="font-mono">{String(i + 1).padStart(2, "0")} / 06</span>
                </div>
                <h3 className="display text-xl mb-1 mt-1">{c.head}</h3>
                <p className="text-ink-soft leading-relaxed m-0 text-[15px]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer link ─── */}
      <section className="border-t border-rule">
        <div className="container-wide py-12 grid sm:grid-cols-2 gap-3">
          <Link href="/acts/1" className="card card-link block p-5">
            <div className="label-mono mb-1">← Part one</div>
            <div className="display text-xl">The six general uses</div>
          </Link>
          <Link href="/desk/1" className="card card-link block p-5 sm:text-right">
            <div className="label-mono mb-1">Start the desk →</div>
            <div className="display text-xl">The 6 a.m. Brief</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
