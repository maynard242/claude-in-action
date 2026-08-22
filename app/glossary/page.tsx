import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary · Practical AI Agents",
  description: "Plain-English definitions of the terms used in the course.",
};

const terms = [
  {
    term: "Agent",
    short: "A model that can act, not just answer.",
    long: "The difference between a chatbot and an agent is that an agent can do things: read a file, run a command, call an API. That is also the entire source of the risk, which is why the middle third of this course is about access rather than prompting.",
  },
  {
    term: "Harness",
    short: "The program that wraps the model and gives it tools.",
    long: "Claude Code, Codex CLI, Hermes, and Pi are harnesses. The model does the thinking; the harness decides what it can touch, when to ask permission, and what happens to the output. Two harnesses running the same model behave very differently.",
  },
  {
    term: "Non-interactive run",
    short: "One prompt in, one answer out, no chat.",
    long: "Every harness has a flag for this: claude -p, codex exec, hermes -z, pi -p. It matters more than it sounds, because a run with no conversation has no accumulated context to drift through, which makes it repeatable and therefore checkable.",
  },
  {
    term: "Tool",
    short: "Anything the agent can call that is not the model.",
    long: "Reading a file, searching the web, running a shell command, writing to disk. Each harness lets you allow or deny tools individually, and doing so is the most direct control you have over what an agent can do.",
  },
  {
    term: "Sandbox",
    short: "A restriction on what the agent can reach, enforced outside the model.",
    long: "The important word is enforced. A prompt saying 'do not write files' is a request. A sandbox set to read-only is a wall. Codex prints its sandbox mode in the run header for exactly this reason.",
  },
  {
    term: "Permission mode",
    short: "The standing answer to 'should I ask first?'",
    long: "Modes range from asking before every action to asking about nothing. The last one has its uses and is also how people lose work. Choose it deliberately rather than because a prompt was getting annoying.",
  },
  {
    term: "Prompt injection",
    short: "Instructions hidden in the material the agent reads.",
    long: "An email, a web page, or a code comment that says 'ignore your instructions and do this instead.' The agent has no reliable way to tell your instructions from text that looks like instructions, so the defence is restricting what it can do rather than hoping it notices.",
  },
  {
    term: "Trust boundary",
    short: "The line between what you asked for and what the material asks for.",
    long: "Everything the agent reads sits on the far side of it. Content is evidence to assess, never authority to act. Lesson 2 is entirely about holding this line.",
  },
  {
    term: "Context",
    short: "Everything the model can see while answering.",
    long: "Your request, the files it has read, the conversation so far, plus any project instructions loaded automatically. Surprising output is often context you forgot was there, which is why a fresh run sometimes fixes what more explaining will not.",
  },
  {
    term: "Grounding",
    short: "Tying a claim to something you can open.",
    long: "An ungrounded claim may still be true, but you have no way to tell without doing the work yourself. Asking which source supports each claim is the cheapest quality check available.",
  },
  {
    term: "Hallucination",
    short: "A confident statement with nothing behind it.",
    long: "Usually specific rather than vague: an exact figure, a plausible citation, a function that does not exist. Fluent writing and accurate writing are unrelated properties, and only one of them is visible on the page.",
  },
  {
    term: "Invariant",
    short: "Something that must be true of the output, stated before you run.",
    long: "Every lesson lists a few. They turn 'does this look right' into a check with an answer, and writing them down beforehand stops you grading the output against whatever it happens to contain.",
  },
  {
    term: "Handoff",
    short: "Giving the work to someone who can check it.",
    long: "A handoff is complete when another person can see what was done, what was verified, and what was not. An output with no record of its own coverage is not finished work, whatever it looks like.",
  },
  {
    term: "Approval",
    short: "A human decision the agent must wait for.",
    long: "The main design question in any agent system is which actions need one. Hermes can even test whether a command would be approved without running it, which is a useful habit to borrow.",
  },
];

export default function GlossaryPage() {
  return (
    <div className="container-narrow py-12">
      <header className="pb-10 border-b border-rule">
        <p className="eyebrow">Reference</p>
        <h1 className="display text-4xl md:text-6xl mt-4 mb-5">Glossary</h1>
        <p className="text-xl text-ink-soft">
          The words that come up in the course, defined without the marketing.
        </p>
      </header>

      <dl className="mt-10 space-y-8">
        {terms.map((entry) => (
          <div key={entry.term} className="card p-6">
            <dt>
              <h2 className="display text-2xl mb-1">{entry.term}</h2>
              <p className="text-accent text-sm font-mono mb-3 tracking-wide">{entry.short}</p>
            </dt>
            <dd className="m-0 text-ink-soft leading-relaxed">{entry.long}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
