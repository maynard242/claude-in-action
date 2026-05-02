import { PromptBlock } from "@/components/PromptBlock";

export const metadata = {
  title: "What's Next — Claude in Action",
  description:
    "Your 30/60/90-day plan. Five starter agents to build first. Communities and resources worth your time.",
};

const starterAgents = [
  {
    name: "Meeting prep",
    when: "You meet new people often.",
    what: "Takes a name + company. Returns: background, recent moves, your past interactions, three real conversation starters.",
    prompt:
      "I want to build a reusable 'meeting prep' agent. Inputs: a person's name and their company. Steps: (1) research the person on the live web, (2) check my Drive for any past notes that mention them, (3) check my calendar and inbox for past interactions, (4) cross-reference and write me a one-pager I can read in 5 minutes, (5) suggest 3 conversation starters tailored to what's currently happening with them. Save as 'meeting prep'.",
  },
  {
    name: "Friday wrap",
    when: "You want to get better at reflection without it being homework.",
    what: "Pulls your week together. Calendar, Slack, Drive. Gives you 5 bullets and a question to sit with.",
    prompt:
      "I want a 'Friday wrap' agent that runs every Friday at 4pm. Look across my calendar, Drive activity, and Slack from the past week. Write me a 5-bullet 'week in review' for self-reflection. End with one question I should sit with over the weekend. Save as 'friday wrap'.",
  },
  {
    name: "Competitor brief",
    when: "You need to keep a small list of companies in view without making it a job.",
    what: "Spawns parallel sub-agents, one per competitor. Returns synthesized brief. Run weekly.",
    prompt:
      "I want a 'competitor brief' agent. Inputs: a list of company names. Steps: spawn one sub-agent per company in parallel, each producing a one-page profile (positioning, last 90 days of moves, vulnerabilities, what to watch). When all are done, synthesize across them: common pattern, outlier, the single thing I should brief my team on first. Save as 'competitor brief'.",
  },
  {
    name: "Inbox triage",
    when: "Your inbox eats your mornings.",
    what: "Reads the last 24 hours of inbound. Tells you what needs you, what doesn't, what's about to fall through.",
    prompt:
      "I want an 'inbox triage' agent. Read my inbox from the last 24 hours. Group emails into: (1) needs my answer in the next 4 hours, (2) needs my answer this week, (3) FYI only — don't reply, (4) action is on someone else but I should follow up if no movement by [date]. For each group, summarize the why in one sentence per email.",
  },
  {
    name: "Document QA",
    when: "You get sent dense PDFs.",
    what: "Read the doc. Tell me the takeaways, what's hidden in the footnotes, what's the strongest claim, what's the weakest.",
    prompt:
      "I want a 'document QA' agent. Inputs: a PDF or doc. Steps: read in full, return — (1) three-line executive summary, (2) the strongest argument the document makes and the evidence behind it, (3) the weakest argument and why I should push back, (4) anything important hidden in footnotes or appendices, (5) the question the document is avoiding. Save as 'document qa'.",
  },
];

export default function NextPage() {
  return (
    <article className="container-narrow pt-12 pb-24">
      <div className="mb-10 pb-8 border-b border-rule">
        <div className="eyebrow mb-3">Your 30 / 60 / 90-day plan</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4">
          What&apos;s next.
        </h1>
        <p className="text-xl text-ink-soft">
          The demo ends. The work begins. Here&apos;s how to actually move from
          &ldquo;that was cool&rdquo; to &ldquo;Claude is part of how I work.&rdquo;
        </p>
      </div>

      {/* The plan */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl tracking-tight mb-6">The plan</h2>

        <div className="space-y-6">
          <div className="bg-paper border border-rule rounded-lg p-6">
            <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">
              Week 1
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Just use claude.ai.</h3>
            <p className="text-ink-soft mb-2">
              Pick one annoying task you did this week. A confusing email, a meeting you
              haven&apos;t prepped, a vendor you don&apos;t know. Open claude.ai. Try it.
              Spend 10 minutes. <em>(That&apos;s Acts 1 and 2 in the demo.)</em>
            </p>
            <p className="text-ink-soft m-0">
              <strong>Goal:</strong> get past the &ldquo;is this useful?&rdquo; question. It
              is. Move on.
            </p>
          </div>

          <div className="bg-paper border border-rule rounded-lg p-6">
            <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">
              Week 2
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Get Claude on your computer.</h3>
            <p className="text-ink-soft mb-2">
              Download the Claude Desktop app. Point it at a folder of your real notes,
              meeting transcripts, or a messy report. Run the Act 3 prompt — find the
              patterns, the contradictions, the question you&apos;re missing.
            </p>
            <p className="text-ink-soft m-0">
              <strong>Goal:</strong> see what happens when Claude can read your stuff
              instead of you having to paste it in.
            </p>
          </div>

          <div className="bg-paper border border-rule rounded-lg p-6">
            <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">
              Week 3
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Connect one tool.</h3>
            <p className="text-ink-soft mb-2">
              Try Cowork mode. Connect <em>one</em> tool — Drive is a good first one. Run a
              cross-cutting question. Then connect a second tool and ask Claude to
              cross-reference.
            </p>
            <p className="text-ink-soft m-0">
              <strong>Goal:</strong> feel what it&apos;s like for Claude to sit on top of
              your work instead of next to it.
            </p>
          </div>

          <div className="bg-paper border border-rule rounded-lg p-6">
            <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">
              Week 4
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Set up async.</h3>
            <p className="text-ink-soft mb-2">
              One scheduled task. A Friday week-in-review. A Monday morning brief. Anything
              that runs without you. <em>Plus</em> kick off one deep-research task in the
              morning and check on it after lunch.
            </p>
            <p className="text-ink-soft m-0">
              <strong>Goal:</strong> stop watching Claude work. Start kicking things off and
              walking away.
            </p>
          </div>

          <div className="bg-paper border border-rule rounded-lg p-6 border-accent border-2">
            <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">
              Week 5+ — the big one
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">Build your first agent.</h3>
            <p className="text-ink-soft mb-2">
              Pick one workflow you do every single week. Describe it to Claude in plain English
              using the templates below. Don&apos;t overthink it. Tweak it after you&apos;ve
              used it twice.
            </p>
            <p className="text-ink-soft m-0">
              <strong>Goal:</strong> stop being a Claude user. Start being a Claude designer.
              That&apos;s where the compounding starts.
            </p>
          </div>
        </div>
      </section>

      {/* Starter agents */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl tracking-tight mb-3">
          Five starter agents to build first
        </h2>
        <p className="text-ink-soft text-lg mb-8">
          Pick one. Just one. Don&apos;t try to build all five in your first week — you&apos;ll
          stall. Start with the one that matches a workflow you actually do every week.
        </p>

        <div className="space-y-10">
          {starterAgents.map((s, i) => (
            <div key={i} className="border-b border-rule pb-10 last:border-b-0">
              <div className="text-xs uppercase tracking-wider text-accent font-bold mb-2">
                Agent {i + 1}
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">{s.name}</h3>
              <p className="text-ink-soft mb-1">
                <strong className="text-ink">When to build it:</strong> {s.when}
              </p>
              <p className="text-ink-soft mb-4">
                <strong className="text-ink">What it does:</strong> {s.what}
              </p>
              <PromptBlock
                prompt={{
                  surface: "cowork",
                  label: "Build prompt",
                  text: s.prompt,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl tracking-tight mb-3">
          Resources worth your time
        </h2>
        <p className="text-ink-soft text-lg mb-6">
          The signal-to-noise on AI content is bad. These are the few things that earn the
          attention.
        </p>

        <div className="space-y-4">
          <a
            href="https://www.anthropic.com/news"
            target="_blank"
            rel="noreferrer"
            className="block bg-paper border border-rule rounded-lg p-5 hover:border-accent transition-colors"
          >
            <h3 className="font-serif text-xl font-semibold mb-1">Anthropic blog</h3>
            <p className="text-ink-soft mb-1">
              Where Claude updates ship. Read the model release notes, not the hype takes.
            </p>
            <p className="text-accent text-sm font-mono">anthropic.com/news</p>
          </a>

          <a
            href="https://www.oneusefulthing.org"
            target="_blank"
            rel="noreferrer"
            className="block bg-paper border border-rule rounded-lg p-5 hover:border-accent transition-colors"
          >
            <h3 className="font-serif text-xl font-semibold mb-1">Ethan Mollick — One Useful Thing</h3>
            <p className="text-ink-soft mb-1">
              Wharton professor. Calibrated, hands-on, doesn&apos;t hype. The single best
              external voice on what AI can actually do for working professionals.
            </p>
            <p className="text-accent text-sm font-mono">oneusefulthing.org</p>
          </a>

          <a
            href="https://simonwillison.net"
            target="_blank"
            rel="noreferrer"
            className="block bg-paper border border-rule rounded-lg p-5 hover:border-accent transition-colors"
          >
            <h3 className="font-serif text-xl font-semibold mb-1">Simon Willison</h3>
            <p className="text-ink-soft mb-1">
              For the technically-curious. Detailed, careful, often the first to surface
              what new models can and can&apos;t do.
            </p>
            <p className="text-accent text-sm font-mono">simonwillison.net</p>
          </a>

          <a
            href="https://www.latent.space"
            target="_blank"
            rel="noreferrer"
            className="block bg-paper border border-rule rounded-lg p-5 hover:border-accent transition-colors"
          >
            <h3 className="font-serif text-xl font-semibold mb-1">Latent Space</h3>
            <p className="text-ink-soft mb-1">
              Podcast and newsletter. Best-in-class interviews with people actually building
              with AI in production. Not the LinkedIn crowd.
            </p>
            <p className="text-accent text-sm font-mono">latent.space</p>
          </a>
        </div>
      </section>

      {/* Closing nudge */}
      <section className="bg-accent text-white p-8 md:p-12 rounded-lg">
        <h2 className="font-serif text-3xl tracking-tight mb-3">
          The biggest risk isn&apos;t moving too fast.
        </h2>
        <p className="text-lg leading-relaxed m-0 opacity-90">
          It&apos;s not moving at all. Pick one thing from this page — one prompt, one agent,
          one Friday standing order — and try it before the week is out. The compounding only
          starts after you&apos;ve done <em>something</em>.
        </p>
      </section>
    </article>
  );
}
