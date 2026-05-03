import { PromptBlock } from "@/components/PromptBlock";

export const metadata = {
  title: "What's Next — Claude in Action",
  description:
    "Your 30/60/90-day plan. Five starter agents to build first. Communities and resources worth your time.",
};

const weeks = [
  {
    label: "Week 01",
    title: "Just use claude.ai.",
    body: "Pick one annoying task you did this week. A confusing email, a meeting you haven't prepped, a vendor you don't know. Open claude.ai. Try it. Spend 10 minutes.",
    goal: "Get past the &ldquo;is this useful?&rdquo; question. It is. Move on.",
    actsRef: "Acts 1 and 2",
  },
  {
    label: "Week 02",
    title: "Get Claude on your computer.",
    body: "Download the Claude Desktop app. Point it at a folder of your real notes, meeting transcripts, or a messy report. Run the Act 3 prompt — find the patterns, the contradictions, the question you're missing.",
    goal: "See what happens when Claude can read your stuff instead of you having to paste it in.",
    actsRef: "Act 3",
  },
  {
    label: "Week 03",
    title: "Connect one tool.",
    body: "Try Cowork mode. Connect one tool — Drive is a good first one. Run a cross-cutting question. Then connect a second tool and ask Claude to cross-reference.",
    goal: "Feel what it's like for Claude to sit on top of your work instead of next to it.",
    actsRef: "Act 4",
  },
  {
    label: "Week 04",
    title: "Set up async.",
    body: "One scheduled task. A Friday week-in-review. A Monday morning brief. Anything that runs without you. Plus kick off one deep-research task in the morning and check on it after lunch.",
    goal: "Stop watching Claude work. Start kicking things off and walking away.",
    actsRef: "Act 5",
  },
  {
    label: "Week 05+",
    title: "Build your first agent.",
    body: "Pick one workflow you do every single week. Describe it to Claude in plain English using the templates below. Don't overthink it. Tweak it after you've used it twice.",
    goal: "Stop being a Claude user. Start being a Claude designer. That's where the compounding starts.",
    actsRef: "Act 6 — the big one",
    big: true,
  },
];

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

const resources = [
  {
    name: "Anthropic blog",
    url: "https://www.anthropic.com/news",
    short: "anthropic.com/news",
    body: "Where Claude updates ship. Read the model release notes, not the hype takes.",
  },
  {
    name: "Ethan Mollick — One Useful Thing",
    url: "https://www.oneusefulthing.org",
    short: "oneusefulthing.org",
    body: "Wharton professor. Calibrated, hands-on, doesn't hype. The single best external voice on what AI can actually do for working professionals.",
  },
  {
    name: "Simon Willison",
    url: "https://simonwillison.net",
    short: "simonwillison.net",
    body: "For the technically-curious. Detailed, careful, often the first to surface what new models can and can't do.",
  },
  {
    name: "Latent Space",
    url: "https://www.latent.space",
    short: "latent.space",
    body: "Podcast and newsletter. Best-in-class interviews with people actually building with AI in production. Not the LinkedIn crowd.",
  },
];

export default function NextPage() {
  return (
    <article className="container-narrow pt-12 pb-24">
      <header className="mb-12 pb-10 border-b border-rule">
        <div className="label-mono mb-4">
          <span className="accent">§</span> Your 30 / 60 / 90-day plan
        </div>
        <h1 className="display text-5xl md:text-7xl mb-4 leading-[1.02]">
          What&apos;s <em>next</em>.
        </h1>
        <p className="text-xl text-ink-soft leading-snug">
          The demo ends. The work begins. Here&apos;s how to actually move from
          &ldquo;that was cool&rdquo; to &ldquo;Claude is part of how I work.&rdquo;
        </p>
      </header>

      {/* Weekly plan */}
      <section className="mb-20">
        <div className="label-mono mb-3">
          <span className="accent">§01</span> · The plan
        </div>
        <h2 className="display text-3xl md:text-5xl mb-8">Five weeks. One step at a time.</h2>

        <div className="space-y-3">
          {weeks.map((w) => (
            <div
              key={w.label}
              className={`card p-6 grid md:grid-cols-[120px_1fr] gap-x-6 gap-y-2 ${
                w.big ? "border-accent" : ""
              }`}
            >
              <div className="label-mono text-accent pt-1">{w.label}</div>
              <div>
                <h3 className="display text-2xl md:text-3xl mb-2">{w.title}</h3>
                <p className="text-ink-soft leading-relaxed mb-3">{w.body}</p>
                <p className="text-sm m-0">
                  <span className="label-mono mr-2">Goal</span>
                  <span
                    className="text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: w.goal }}
                  />
                  <span className="opacity-40 mx-2">·</span>
                  <span className="text-accent font-mono text-xs uppercase tracking-wider">
                    {w.actsRef}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Starter agents */}
      <section className="mb-20">
        <div className="label-mono mb-3">
          <span className="accent">§02</span> · Starter agents
        </div>
        <h2 className="display text-3xl md:text-5xl mb-3">
          Five agents to <em>build first</em>.
        </h2>
        <p className="text-ink-soft text-lg mb-10 max-w-3xl">
          Pick one. Just one. Don&apos;t try to build all five in your first week —
          you&apos;ll stall. Start with the one that matches a workflow you actually do
          every week.
        </p>

        <div className="space-y-12">
          {starterAgents.map((s, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[80px_1fr] gap-x-6 gap-y-3 border-b border-rule pb-12 last:border-b-0"
            >
              <div className="label-mono text-accent pt-2">
                Ag · {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="display text-2xl md:text-3xl mb-3">{s.name}</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <div className="label-mono mb-1">When to build it</div>
                    <p className="text-ink-soft m-0">{s.when}</p>
                  </div>
                  <div>
                    <div className="label-mono mb-1">What it does</div>
                    <p className="text-ink-soft m-0">{s.what}</p>
                  </div>
                </div>
                <PromptBlock
                  prompt={{
                    surface: "cowork",
                    label: "Build prompt",
                    text: s.prompt,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-20">
        <div className="label-mono mb-3">
          <span className="accent">§03</span> · Worth your time
        </div>
        <h2 className="display text-3xl md:text-5xl mb-3">
          The signal-to-noise on AI content is bad.
        </h2>
        <p className="text-ink-soft text-lg mb-10 max-w-3xl">
          These few earn the attention.
        </p>

        <div className="space-y-3">
          {resources.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="card card-link block p-6 grid md:grid-cols-[1fr_auto] gap-x-6 gap-y-2 items-baseline"
            >
              <div>
                <h3 className="display text-2xl mb-2">{r.name}</h3>
                <p className="text-ink-soft m-0 leading-relaxed">{r.body}</p>
              </div>
              <span className="font-mono text-sm text-accent shrink-0 self-start">
                {r.short} ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="card p-8 md:p-12 border-accent">
        <div className="label-mono mb-3">
          <span className="accent">§04</span> · The only rule
        </div>
        <h2 className="display text-3xl md:text-5xl mb-4 leading-tight">
          The biggest risk isn&apos;t moving too fast.
          <br />
          <em>It&apos;s not moving at all.</em>
        </h2>
        <p className="text-lg text-ink-soft m-0 leading-relaxed">
          Pick one thing from this page — one prompt, one agent, one Friday standing order
          — and try it before the week is out. The compounding only starts after
          you&apos;ve done <em className="text-accent not-italic font-medium">something</em>.
        </p>
      </section>
    </article>
  );
}
