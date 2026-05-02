import { acts } from "@/lib/content";

export const metadata = {
  title: "Cheatsheet — Claude in Action",
  description:
    "The eight common audience questions, with prepared answers. Plain-English glossary of the six capabilities.",
};

const qa = [
  {
    q: "Is my data safe?",
    a: "On Anthropic's paid plans (Pro, Team, Enterprise), your conversations are not used to train the model. Enterprise adds extra security controls. MCP connections are permission-based — Claude only sees what you explicitly connect, and you can revoke access anytime. Sensible rule: start with non-sensitive tasks while you build trust, and loop in IT before connecting business-critical systems.",
  },
  {
    q: "Will this replace people on my team?",
    a: "No. It replaces the tasks people shouldn't be spending time on — the briefing nobody had time to write, the report that needed reformatting, the 20 minutes everyone spends scrolling Slack on Monday. Claude handles the necessary-but-not-valuable work. People do the work that requires judgment, relationships, and context you can't put in a prompt. Companies using AI well aren't cutting headcount. They're freeing people up.",
  },
  {
    q: "How much does it cost?",
    a: "Claude.ai has a free tier. Pro is $20/month — about the cost of one lunch. Team is $25/month per person with more features. Enterprise pricing varies. If Claude saves you even 2 hours a month, it's paid for itself many times over.",
  },
  {
    q: "Does it make things up?",
    a: "Sometimes, yes. All large language models can hallucinate — generate confident-sounding information that's wrong. Claude is generally good about flagging uncertainty and better than most at saying 'I'm not sure.' Same rule as a smart new hire: trust, but verify. For high-stakes decisions, check the key facts. For first drafts, brainstorming, and synthesis, it's remarkably reliable.",
  },
  {
    q: "Can it access our internal systems?",
    a: "Through MCP connections, yes — with your permission. Claude can connect to Slack, Drive, Notion, Obsidian, calendar, and a growing list of tools. Enterprise integrations go deeper. But it only sees what you connect it to. Think of it like giving a new employee their access badges on day one: you decide which doors they open.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "Both are good. For the use cases in this demo, both can do solid work. Where Claude tends to be distinctly stronger: long document analysis, nuanced writing, following complex instructions, and — especially in Cowork mode — multi-step tasks without constant hand-holding. Best advice: try both. Use whichever you find more useful. The tool matters less than the habit.",
  },
  {
    q: "I'm not technical. Can I really use this?",
    a: "If you can write an email, you can use Claude. No code, no setup, no technical knowledge required. The skill is describing what you want clearly — the same skill you use when you hand work off to a colleague. The people who get the most out of Claude aren't engineers. They're people who are good at describing problems and outcomes.",
  },
  {
    q: "Is building an agent (Act 6) really that easy?",
    a: "Yes — for personal-productivity workflows. The agent you build is a saved prompt with a name and a set of permissioned tools. You describe what you want it to do; Claude turns that into something you can invoke by name. The hard part isn't building the agent. It's having a clear enough sense of your own workflow to describe it. Most people skip this step. The compounding gains live on the other side.",
  },
  {
    q: "Where do I start if I'm overwhelmed?",
    a: "Pick one task you did this week that you didn't enjoy. Open Claude.ai. Describe the task. See what happens. Don't try to use AI for everything. Use it for one annoying thing, this week. That's the on-ramp.",
  },
];

export default function CheatsheetPage() {
  return (
    <article className="container-narrow pt-12 pb-24">
      <div className="mb-10 pb-8 border-b-2 border-ink">
        <div className="eyebrow mb-3">Speaker reference · Audience Q&amp;A · Concept glossary</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4">
          Cheatsheet.
        </h1>
        <p className="text-xl text-ink-soft">
          Page 1: the questions audiences ask, with prepared answers. Page 2: a plain-English
          glossary of the six AI concepts the demo walks through.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="font-serif text-3xl tracking-tight mb-2">
          §1 Audience Q&amp;A — Prepared Answers
        </h2>
        <p className="text-ink-faint text-sm mb-6">
          These come up almost every time.
        </p>
        <div className="space-y-4">
          {qa.map((item, i) => (
            <div
              key={i}
              className="bg-paper border-l-4 border-rule rounded-r-lg p-4"
            >
              <p className="font-bold text-ink mb-1">
                <span className="text-accent">Q.</span> {item.q}
              </p>
              <p className="text-ink-soft m-0">
                <span className="text-ink-faint font-bold">A.</span> {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl tracking-tight mb-2">
          §2 Plain-English Concept Glossary
        </h2>
        <p className="text-ink-faint text-sm mb-6">
          Each act in the demo demonstrates one of these. Concepts get more sophisticated as they go.
        </p>
        <div className="space-y-4">
          {acts.map((a) => (
            <div
              key={a.num}
              className="bg-concept-bg border-l-4 border-concept-rule rounded-r-lg p-5"
            >
              <span className="inline-block bg-concept-rule text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2">
                Concept {a.num} · Act {a.num}
              </span>
              <h3 className="font-serif text-xl font-semibold mb-1">{a.capability}</h3>
              <p className="text-ink-soft mb-2">{a.point}</p>
              <p className="text-sm text-ink-soft pt-2 mt-2 border-t border-dashed border-black/10">
                <span className="text-ink-faint text-[10px] uppercase tracking-wider font-bold mr-1">
                  Example.
                </span>
                {a.oneLiner}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
