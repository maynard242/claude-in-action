import Link from "next/link";
import { notFound } from "next/navigation";
import { workflows } from "@/lib/content";
import { PromptBlock } from "@/components/PromptBlock";
import { Callout } from "@/components/Callout";

export function generateStaticParams() {
  return workflows.map((w) => ({ workflow: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ workflow: string }>;
}) {
  const { workflow } = await params;
  const w = workflows.find((x) => x.slug === workflow);
  if (!w) return {};
  return {
    title: `${w.title} — The Desk · Claude in Action`,
    description: w.oneLiner,
  };
}

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ workflow: string }>;
}) {
  const { workflow } = await params;
  const w = workflows.find((x) => x.slug === workflow);
  if (!w) notFound();

  const idx = workflows.findIndex((x) => x.slug === workflow);
  const prev = idx > 0 ? workflows[idx - 1] : null;
  const next = idx < workflows.length - 1 ? workflows[idx + 1] : null;

  const num = String(w.num).padStart(2, "0");

  return (
    <article className="container-narrow pt-12 pb-24">
      {/* Breadcrumb */}
      <div className="mb-10 text-sm text-ink-faint flex flex-wrap items-center gap-2 font-mono">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span className="opacity-40">/</span>
        <Link href="/desk" className="hover:text-accent transition-colors">
          The Desk
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-ink">{num}</span>
      </div>

      {/* Hero */}
      <header className="mb-12 pb-12 border-b border-rule">
        <div className="label-mono mb-4 flex flex-wrap items-center gap-x-2">
          <span className="accent">Desk {num}</span>
          <span className="opacity-40">·</span>
          <span>{w.timeOfDay}</span>
          <span className="opacity-40">·</span>
          <span className="text-ink-faint">Extends {w.actLink}</span>
        </div>
        <h1 className="display text-4xl md:text-7xl mb-6 leading-[1.02]">{w.title}</h1>
        <p className="text-xl md:text-2xl text-ink-soft leading-snug max-w-3xl">
          {w.oneLiner}
        </p>
      </header>

      {/* Capability / the job */}
      <Callout variant="concept" title="What it shows">
        <p className="display text-2xl md:text-3xl mb-3 leading-tight">{w.capability}</p>
        <p className="text-ink-soft m-0 leading-relaxed">{w.job}</p>
      </Callout>

      {/* How it's wired */}
      <div className="card p-6 mt-6">
        <div className="label-mono mb-4">How it&apos;s wired</div>
        <dl className="space-y-3">
          {w.wiring.map((row, i) => (
            <div key={i} className="grid sm:grid-cols-[150px_1fr] gap-x-6 gap-y-0.5">
              <dt className="label-mono text-ink-faint pt-0.5">{row.label}</dt>
              <dd className="font-mono text-[13px] text-ink m-0 leading-relaxed break-words">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* What you see */}
      <section className="mt-12">
        <div className="label-mono mb-3">What happens on screen</div>
        <h2 className="display text-3xl mb-6">The shape of the workflow.</h2>
        <ol className="space-y-4 list-none pl-0">
          {w.whatYouSee.map((step, i) => (
            <li key={i} className="flex gap-5 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full border border-accent text-accent text-sm font-mono flex items-center justify-center mt-0.5 tabular-nums">
                {i + 1}
              </span>
              <span className="text-ink-soft text-lg leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Prompts */}
      <section className="mt-14">
        <div className="label-mono mb-3">The prompts</div>
        <h2 className="display text-3xl mb-3">Copy. Adapt. Run.</h2>
        <p className="text-ink-soft mb-6">
          Replace bracketed bits with your own names, tickers, and levels.
        </p>
        {w.prompts.map((p, i) => (
          <PromptBlock key={i} prompt={p} />
        ))}
      </section>

      {/* The constraint */}
      <section className="mt-12">
        <Callout variant="notice" title="The constraint that makes it real">
          <p className="m-0">{w.constraint}</p>
        </Callout>
      </section>

      {/* Aha */}
      <section className="mt-6">
        <Callout variant="aha">
          <p className="display text-xl md:text-2xl m-0 leading-snug">{w.ahaMoment}</p>
        </Callout>
      </section>

      {/* Prev/Next */}
      <nav className="mt-16 pt-8 border-t border-rule grid sm:grid-cols-2 gap-3">
        {prev ? (
          <Link href={`/desk/${prev.slug}`} className="card card-link block p-5">
            <div className="label-mono mb-1">
              ← Previous · {String(prev.num).padStart(2, "0")}
            </div>
            <div className="display text-xl">{prev.title}</div>
          </Link>
        ) : (
          <Link href="/desk" className="card card-link block p-5">
            <div className="label-mono mb-1">← The Desk</div>
            <div className="display text-xl">All five workflows</div>
          </Link>
        )}
        {next ? (
          <Link
            href={`/desk/${next.slug}`}
            className="card card-link block p-5 sm:text-right"
          >
            <div className="label-mono mb-1">
              Next · {String(next.num).padStart(2, "0")} →
            </div>
            <div className="display text-xl">{next.title}</div>
          </Link>
        ) : (
          <Link href="/next" className="card card-link block p-5 sm:text-right">
            <div className="label-mono mb-1">What&apos;s next →</div>
            <div className="display text-xl">Your 30/60/90-day plan</div>
          </Link>
        )}
      </nav>
    </article>
  );
}
