import Link from "next/link";
import { loadCourse } from "@/lib/course/load";
import { installPath, lessonsInPart, orderedParts, partPath, verifiedCount } from "@/lib/course/view";

export default function Home() {
  const bundle = loadCourse();
  const parts = orderedParts(bundle);
  const { verified, total } = verifiedCount(bundle);

  return (
    <div>
      <section className="relative grain overflow-hidden">
        <div className="container-wide pt-28 md:pt-36 pb-20 relative">
          <div className="eyebrow mb-6">Eighteen lessons · Four agents · Beginner to advanced</div>
          <h1 className="display text-[56px] md:text-[112px] mb-8 max-w-[16ch]">
            Practical AI<span className="text-accent">.</span>
            <br />
            <em>Agents</em>.
          </h1>
          <p className="text-xl md:text-2xl text-ink-soft max-w-3xl leading-snug font-light">
            A course on getting work you can trust out of an AI agent. It teaches the judgement
            rather than the tool, so it works whether you run Claude Code, Codex, Hermes, or Pi.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-accent text-accent-on px-6 py-3 rounded-md font-semibold hover:bg-accent-dim transition-colors"
            >
              Start the course
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/install"
              className="inline-flex items-center gap-2 bg-surface border border-border text-ink px-6 py-3 rounded-md font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Set up an agent
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 border-t border-rule">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 mb-12">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">The idea</span>
            </div>
            <h2 className="display text-3xl md:text-5xl">
              An agent you cannot check is an agent you <em>cannot use</em>.
            </h2>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed self-end max-w-2xl">
            Most advice about agents is about getting more out of them. This course is mostly about
            the opposite: stating a job so it cannot be misread, keeping the agent inside a boundary
            you chose, and knowing which claims you have actually verified. The interesting part of
            the work is the checking.
          </p>
        </div>

        <div className="space-y-12">
          {parts.map((part) => {
            const lessons = lessonsInPart(bundle, part.num);
            return (
              <div key={part.num} className="grid md:grid-cols-[280px_1fr] gap-10">
                <div>
                  <div className="label-mono mb-3">
                    <span className="accent">Part {part.num}</span> · {part.level}
                  </div>
                  <h3 className="display text-2xl md:text-3xl mb-3">
                    <Link href={partPath(part)} className="hover:text-accent transition-colors">
                      {part.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-soft m-0">{part.premise}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 self-start">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/learn/${lesson.slug}`}
                      className="group card card-link block p-4"
                    >
                      <span className="label-mono">{String(lesson.num).padStart(2, "0")}</span>
                      <span className="block text-ink group-hover:text-accent transition-colors mt-1">
                        {lesson.title}
                      </span>
                    </Link>
                  ))}
                  {lessons.length === 0 ? (
                    <p className="text-sm text-ink-faint m-0">Being written.</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="container-wide py-20">
          <div className="label-mono mb-3">
            <span className="accent">Four agents</span> · one course
          </div>
          <h2 className="display text-3xl md:text-5xl mb-6 max-w-3xl">
            Every lesson works on <em>whichever one</em> you run.
          </h2>
          <p className="text-lg text-ink-soft max-w-2xl mb-10">
            Each lesson shows one agent worked end to end, then states the equivalent for the other
            three. The flags differ. The judgement does not.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {bundle.harnesses.map((harness) => (
              <Link
                key={harness.id}
                href={installPath(harness.id)}
                className="group card card-link block p-6"
              >
                <div className="label-mono mb-2">{harness.vendor}</div>
                <h3 className="display text-2xl mb-2 group-hover:text-accent transition-colors">
                  {harness.name}
                </h3>
                <p className="text-ink-soft text-[15px] leading-relaxed mb-3">{harness.blurb}</p>
                <code className="text-[13px] text-accent font-mono">{harness.oneShot}</code>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="container-wide py-20 grid md:grid-cols-[280px_1fr] gap-10">
          <div>
            <div className="label-mono mb-3">
              <span className="accent">On testing</span>
            </div>
            <h2 className="display text-3xl md:text-5xl">
              Run, then <em>recorded</em>.
            </h2>
          </div>
          <div className="self-center max-w-2xl">
            <p className="text-lg text-ink-soft leading-relaxed mb-5">
              {verified} of the {total} worked examples were run on a real machine and their output
              pasted in unedited, with the version number and date. The rest are marked as drafts on
              the page itself.
            </p>
            <p className="text-lg text-ink-soft leading-relaxed m-0">
              A tutorial that has not run its own commands is a guess with formatting. This one tells
              you which is which.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="container-wide py-20">
          <div className="label-mono mb-3">
            <span className="accent">Reference</span>
          </div>
          <h2 className="display text-3xl md:text-5xl mb-12 max-w-3xl">
            When you <em>need it</em>.
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/glossary" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Glossary</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                The words that come up, in plain English. No buzzwords.
              </p>
              <span className="text-accent font-semibold">Open the glossary →</span>
            </Link>
            <Link href="/install" className="card card-link block p-6">
              <h3 className="display text-2xl mb-2">Setup</h3>
              <p className="text-ink-soft mb-3 leading-relaxed">
                Install any of the four, and a command that proves it works before you start.
              </p>
              <span className="text-accent font-semibold">Set up an agent →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
