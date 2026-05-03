export const metadata = {
  title: "Detailed Notes — Claude in Action",
  description:
    "The longer-form companion to the live demo. Why each capability matters. Common pitfalls. How to think about Claude past the demo.",
};

const sections = [
  {
    num: "01",
    title: "The shift the demo is trying to land",
    body: (
      <>
        <p>
          Most people&apos;s mental model of AI is still &ldquo;a smarter Google.&rdquo;
          You ask. It answers. You take the answer somewhere else and use it. That model
          worked for ChatGPT in 2023. It doesn&apos;t describe what&apos;s available in
          2026.
        </p>
        <p>
          The demo&apos;s arc maps a different mental model. Claude reads context (Act 1).
          Claude calls tools (Act 2). Claude holds many things in mind (Act 3). Claude
          reaches into your real stack (Act 4). Claude runs in the background, in parallel,
          on its own schedule (Act 5). Claude is something you <em>build with</em>, not
          just use (Act 6). Each act is a different relationship with the model.
        </p>
        <p>
          If the audience walks out remembering one thing, it should be this:{" "}
          <strong className="text-ink">
            AI is a colleague you can shape, not a search box you can query.
          </strong>{" "}
          Everything else follows from that.
        </p>
      </>
    ),
  },
  {
    num: "02",
    title: "Why the deep-research thread is the biggest move in the demo",
    body: (
      <>
        <p>
          At minute 1, the presenter kicks off a deep-research task in a separate tab and
          closes it. It runs for the entire hour. At minute 64, they open it.
          Twenty-something pages. Sixty-plus sources. A full briefing on something that
          matters.
        </p>
        <p>
          That move does more for the audience than any single demo. Every other act shows
          Claude doing work <em>while the presenter watches</em>. The deep-research thread
          proves Claude doing work <em>while the presenter doesn&apos;t</em>. And it proves
          it at scale — pages, sources, structure — not just a single response.
        </p>
        <p>
          The lesson: stop sitting at your computer waiting for Claude to answer. Kick
          things off. Do other work. Check back later. The bottleneck stopped being the
          model. The bottleneck is now whether you remember to ask.
        </p>
      </>
    ),
  },
  {
    num: "03",
    title: "On the slide-critique demo (and why it lands harder than you'd think)",
    body: (
      <>
        <p>
          Dragging an image into the chat seems unremarkable in 2026. It&apos;s not. The
          demo works because the audience has all sat through bad slides. They&apos;ve all
          wished, at some point, that someone honest had told them what was wrong with
          their deck before the meeting started. Claude becomes that honest reader,
          instantly, without ego.
        </p>
        <p>
          The general lesson: multimodal isn&apos;t a separate capability. It&apos;s
          reasoning over context, with images as the context. Anywhere you currently say
          &ldquo;I wish I could show this to someone smart and ask what they think&rdquo; —
          screenshots of UIs, photos of whiteboards, charts you don&apos;t fully understand
          — Claude can be that someone.
        </p>
      </>
    ),
  },
  {
    num: "04",
    title: "What MCP actually changes",
    body: (
      <>
        <p>
          MCP — Model Context Protocol — is the boring name for the most important shift
          in the past two years. Before MCP, Claude was a chat window. After MCP, Claude
          is a layer that can sit on top of your work.
        </p>
        <p>
          The shift is permission-based, which matters for two reasons. First, security:
          Claude only sees what you connect it to, and you can revoke access at any time.
          Second, scope: you don&apos;t have to give Claude access to your entire stack.
          Start with one tool. Maybe Drive. Then add a second when you&apos;re comfortable.
        </p>
        <p>
          The interesting move with MCP isn&apos;t querying a single tool — it&apos;s
          asking Claude to <em>cross-reference</em> across multiple tools. Calendar shows
          hours. Slack shows attention. Drive shows output. The interesting answer lives
          in the gaps between them, and Claude is the only thing in your stack that sits
          across all three.
        </p>
      </>
    ),
  },
  {
    num: "05",
    title: "Parallel sub-agents — why this is the real ceiling shift",
    body: (
      <>
        <p>
          For most of the past 18 months, the question has been &ldquo;how good is the
          model?&rdquo; Going forward, the more interesting question is &ldquo;how many of
          them can you run at once?&rdquo;
        </p>
        <p>
          Parallel sub-agents change the math. If one Claude can produce a competitor
          profile in five minutes, five Claudes in parallel produce five profiles in five
          minutes. The cost stays roughly linear with the number of agents. The wall clock
          does not. For a busy operator, this is the difference between &ldquo;I&apos;ll
          get to that next quarter&rdquo; and &ldquo;I&apos;ll have it before lunch.&rdquo;
        </p>
        <p>
          The mental shift the demo is trying to provoke: stop describing one task. Start
          describing <em>jobs</em>. A job is something a team would do — divided into
          pieces, worked in parallel, synthesized at the end. Claude can do all three, if
          you ask for it.
        </p>
      </>
    ),
  },
  {
    num: "06",
    title: "Why agent-building is the skill, not prompt-writing",
    body: (
      <>
        <p>
          The popular advice — &ldquo;learn to prompt&rdquo; — is real but incomplete.
          Prompting is the equivalent of writing a single email well. Useful. The much
          more important skill is realizing when an email pattern repeats, and turning it
          into a template, a saved instruction, a named agent.
        </p>
        <p>
          Most people skip this. They keep ad-hoc prompting forever, and never get the
          compounding gains. The people who get the most out of Claude aren&apos;t the
          ones who write the cleverest prompts. They&apos;re the ones who notice their
          prompts repeat — and turn the recurring ones into agents.
        </p>
        <p>
          The skill, if there is one, is <em>workflow articulation</em>: being clear
          enough about your own work that you can describe one of its repeating shapes in
          three sentences. That&apos;s the skill that compounds. The model will keep
          getting better. Your articulation has to keep up.
        </p>
      </>
    ),
  },
];

const pitfalls = [
  {
    title: "Treating Claude like Google",
    body: "Asking short, fact-shaped questions and being unimpressed. The interesting work happens with longer prompts that include context, judgment criteria, and a target output format.",
  },
  {
    title: "Not connecting tools",
    body: "Living entirely in the basic chat at claude.ai means missing 80% of what Claude can do. Cowork mode and the Desktop app are where the leverage lives.",
  },
  {
    title: "Not building agents",
    body: "Continuing to write fresh prompts every time. After two weeks, you'll notice you're pasting the same scaffolding. That's the signal to build an agent.",
  },
  {
    title: "Watching it work",
    body: "Sitting and waiting for Claude to finish. Async is the unlock — kick off and walk away. Especially for deep research.",
  },
  {
    title: "Skipping the verification",
    body: "Trusting everything Claude says, especially numbers and citations. For high-stakes outputs, click the source links. Same as you would with a junior analyst.",
  },
];

export default function NotesPage() {
  return (
    <article className="container-narrow pt-12 pb-24">
      <header className="mb-12 pb-10 border-b border-rule">
        <div className="label-mono mb-4">
          <span className="accent">§</span> Long-form companion
        </div>
        <h1 className="display text-5xl md:text-7xl mb-4 leading-[1.02]">
          Detailed <em>notes</em>.
        </h1>
        <p className="text-xl text-ink-soft leading-snug">
          What the live demo doesn&apos;t have time to cover. Why each capability matters
          past the wow. Common pitfalls. How to think about Claude as a working colleague,
          not a chatbot.
        </p>
      </header>

      <div className="space-y-16">
        {sections.map((s) => (
          <section key={s.num} className="grid md:grid-cols-[80px_1fr] gap-x-6 gap-y-3">
            <div className="label-mono text-accent pt-2">§{s.num}</div>
            <div>
              <h2 className="display text-3xl md:text-4xl mb-5 leading-tight">
                {s.title}
              </h2>
              <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
                {s.body}
              </div>
            </div>
          </section>
        ))}

        {/* Pitfalls */}
        <section className="grid md:grid-cols-[80px_1fr] gap-x-6 gap-y-3">
          <div className="label-mono text-accent pt-2">§07</div>
          <div>
            <h2 className="display text-3xl md:text-4xl mb-5 leading-tight">
              Common pitfalls in the first 30 days
            </h2>
            <ul className="space-y-4 text-lg text-ink-soft list-none pl-0">
              {pitfalls.map((p) => (
                <li key={p.title} className="flex gap-3 items-start">
                  <span className="text-accent shrink-0 leading-relaxed font-mono">
                    →
                  </span>
                  <div>
                    <strong className="text-ink">{p.title}.</strong> {p.body}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* When AI is the wrong answer */}
        <section className="grid md:grid-cols-[80px_1fr] gap-x-6 gap-y-3">
          <div className="label-mono text-accent pt-2">§08</div>
          <div>
            <h2 className="display text-3xl md:text-4xl mb-5 leading-tight">
              When the answer is <em>not</em> Claude
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-4">
              Worth saying out loud: not every task is an AI task. Some signals it&apos;s
              not:
            </p>
            <ul className="space-y-2 text-lg text-ink-soft list-disc pl-6">
              <li>The work requires a relationship the model doesn&apos;t have.</li>
              <li>The decision is reversible only at high cost.</li>
              <li>The data is regulated and you don&apos;t have a clean approval path.</li>
              <li>The judgment depends on private context you can&apos;t share.</li>
              <li>The task is fast for you and slow to specify.</li>
            </ul>
            <p className="text-lg text-ink-soft leading-relaxed mt-5">
              For everything else — first drafts, research, synthesis, analysis, recurring
              workflows, briefings, the work nobody has time for — Claude is at least
              worth five minutes of your time to try.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
