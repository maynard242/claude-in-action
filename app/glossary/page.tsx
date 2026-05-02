export const metadata = {
  title: "Glossary — Claude in Action",
  description: "Plain-English definitions of the AI terms used in the demo.",
};

const terms = [
  {
    term: "Reasoning over context",
    short: "What every LLM does as a baseline.",
    long: "The model reads text — and looks at images — it's never seen before, figures out what's actually being asked, and gives an answer that reflects judgment, not retrieval. It's not pattern-matching against a database. It's interpreting.",
  },
  {
    term: "Tool use",
    short: "When the model can call other things, not just generate text.",
    long: "A web search. A calendar lookup. A file write. Code execution. The model decides when to call each tool, what arguments to pass, and how to use the result. Tool use is what turns 'answering questions' into 'doing work.'",
  },
  {
    term: "Long-context reasoning",
    short: "The model holds a lot in mind at once.",
    long: "Modern Claude models can hold the equivalent of hundreds of pages of text in active context. That lets them reason across documents simultaneously — finding contradictions, themes, and patterns that a human reading sequentially would miss.",
  },
  {
    term: "Multimodal",
    short: "The model can see, not just read.",
    long: "Drag in a photo, a screenshot, a chart, a slide. Claude parses layout, labels, content. It can critique a slide deck, explain a confusing graph, or summarize a whiteboard photo. Multimodal isn't a separate product — it's reasoning with images as another input.",
  },
  {
    term: "MCP — Model Context Protocol",
    short: "How Claude talks to your real tools, securely and with permission.",
    long: "Open standard. Permission-based. Claude only sees what you connect. You can revoke at any time. MCP is what makes Cowork mode possible — Claude pulls from your calendar, Slack, Drive, Notion (or whatever you connect) and synthesizes across them.",
  },
  {
    term: "Cowork mode",
    short: "Claude with its hands untied.",
    long: "Anthropic's name for Claude's connected mode. Cowork is where MCP lives, where async execution happens, where live artifacts get built. If you've only used the basic chat at claude.ai, you haven't seen most of what Claude can do.",
  },
  {
    term: "Asynchronous execution",
    short: "Claude works while you don't.",
    long: "You assign a task. You close the tab. You walk into a meeting. Claude keeps working. When you come back, the result is waiting. Deep research is the most visible example — a single research task can run for 30+ minutes producing a 20-page sourced briefing.",
  },
  {
    term: "Parallel sub-agents",
    short: "Many Claudes, one job.",
    long: "Tell Claude to spawn multiple sub-agents, each working on a slice of the problem in parallel, then synthesize across them at the end. Five competitor profiles in the time of one. The architectural shift from chatbot to workforce.",
  },
  {
    term: "Persistent / scheduled execution",
    short: "Claude shows up without being asked.",
    long: "A standing weekly task — every Friday at 4pm, summarize the week. A live dashboard that pulls fresh data every time you open it. The model doesn't just respond to requests; it maintains state and runs on its own time.",
  },
  {
    term: "Agent",
    short: "A reusable, named, tool-equipped Claude.",
    long: "An agent is essentially a saved prompt with a name and a set of permissioned tools. You describe a workflow once; Claude packages it as something you can invoke by name (e.g. 'run meeting prep'). No code. The compounding move: build one, then another, then another.",
  },
  {
    term: "Composable agents",
    short: "Agents that call other agents.",
    long: "Once you have a few agents, you can wire them together. A meeting-prep agent might call a research agent and a notes-search agent under the hood. The architecture of your workflow becomes something you build and edit yourself, in plain English.",
  },
  {
    term: "Hallucination",
    short: "When a model confidently makes things up.",
    long: "All large language models can produce wrong information that sounds right. Claude is better than most at flagging uncertainty, but the rule is the same as with a smart new hire: trust, but verify. For high-stakes decisions, check the key facts. For first drafts and synthesis, it's reliable.",
  },
];

export default function GlossaryPage() {
  return (
    <article className="container-narrow pt-12 pb-24">
      <div className="mb-10 pb-8 border-b border-rule">
        <div className="eyebrow mb-3">Plain-English definitions</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4">
          Glossary.
        </h1>
        <p className="text-xl text-ink-soft">
          Twelve terms. Two-line definitions and one-paragraph explanations. No buzzwords.
        </p>
      </div>

      <div className="space-y-8">
        {terms.map((t) => (
          <div key={t.term} className="border-b border-rule pb-8 last:border-b-0">
            <h2 className="font-serif text-2xl font-semibold mb-1">{t.term}</h2>
            <p className="text-accent text-sm font-semibold mb-3">{t.short}</p>
            <p className="text-ink-soft leading-relaxed m-0">{t.long}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
