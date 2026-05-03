import Link from "next/link";
import { notFound } from "next/navigation";
import { acts } from "@/lib/content";
import { PromptBlock } from "@/components/PromptBlock";
import { Callout } from "@/components/Callout";

export function generateStaticParams() {
  return acts.map((a) => ({ act: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ act: string }>;
}) {
  const { act } = await params;
  const a = acts.find((x) => x.slug === act);
  if (!a) return {};
  return {
    title: `Act ${a.num}: ${a.title} — Claude in Action`,
    description: a.oneLiner,
  };
}

export default async function ActPage({
  params,
}: {
  params: Promise<{ act: string }>;
}) {
  const { act } = await params;
  const a = acts.find((x) => x.slug === act);
  if (!a) notFound();

  const idx = acts.findIndex((x) => x.slug === act);
  const prev = idx > 0 ? acts[idx - 1] : null;
  const next = idx < acts.length - 1 ? acts[idx + 1] : null;

  const num = String(a.num).padStart(2, "0");

  return (
    <article className="container-narrow pt-12 pb-24">
      {/* Breadcrumb */}
      <div className="mb-10 text-sm text-ink-faint flex flex-wrap items-center gap-2 font-mono">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span className="opacity-40">/</span>
        <span>Acts</span>
        <span className="opacity-40">/</span>
        <span className="text-ink">Act {num}</span>
      </div>

      {/* Hero */}
      <header className="mb-12 pb-12 border-b border-rule">
        <div className="label-mono mb-4">
          <span className="accent">Act {num}</span> · {a.timeRange}
        </div>
        <h1 className="display text-4xl md:text-7xl mb-6 leading-[1.02]">
          {a.title}
        </h1>
        <p className="text-xl md:text-2xl text-ink-soft leading-snug max-w-3xl">
          {a.oneLiner}
        </p>
      </header>

      {/* Capability */}
      <Callout variant="concept">
        <p className="display text-2xl md:text-3xl mb-3 leading-tight">
          {a.capability}
        </p>
        <p className="text-ink-soft m-0 leading-relaxed">{a.point}</p>
      </Callout>

      {/* What you see */}
      <section className="mt-12">
        <div className="label-mono mb-3">What happens on screen</div>
        <h2 className="display text-3xl mb-6">The shape of the demo.</h2>
        <ol className="space-y-4 list-none pl-0">
          {a.whatYouSee.map((step, i) => (
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
          Replace bracketed bits with your own context.
        </p>
        {a.prompts.map((p, i) => (
          <PromptBlock key={i} prompt={p} />
        ))}
      </section>

      {/* Watch / matter / try */}
      <section className="mt-12 space-y-4">
        <Callout variant="notice">
          <p className="m-0">{a.watchFor}</p>
        </Callout>
        <Callout variant="matter">
          <p className="m-0">{a.whyItMatters}</p>
        </Callout>
        <Callout variant="try">
          <p className="m-0">{a.tryThis}</p>
          {a.tryThisPrompt && (
            <div className="prompt-box mt-3 text-sm">
              <p className="m-0">{a.tryThisPrompt}</p>
            </div>
          )}
        </Callout>
      </section>

      {/* Aha */}
      <section className="mt-10">
        <Callout variant="aha">
          <p className="display text-xl md:text-2xl m-0 leading-snug">
            {a.ahaMoment}
          </p>
        </Callout>
      </section>

      {/* Prev/Next */}
      <nav className="mt-16 pt-8 border-t border-rule grid sm:grid-cols-2 gap-3">
        {prev ? (
          <Link
            href={`/acts/${prev.slug}`}
            className="card card-link block p-5"
          >
            <div className="label-mono mb-1">
              ← Previous · Act {String(prev.num).padStart(2, "0")}
            </div>
            <div className="display text-xl">{prev.title}</div>
          </Link>
        ) : (
          <Link href="/" className="card card-link block p-5">
            <div className="label-mono mb-1">← Home</div>
            <div className="display text-xl">The arc</div>
          </Link>
        )}
        {next ? (
          <Link
            href={`/acts/${next.slug}`}
            className="card card-link block p-5 sm:text-right"
          >
            <div className="label-mono mb-1">
              Next · Act {String(next.num).padStart(2, "0")} →
            </div>
            <div className="display text-xl">{next.title}</div>
          </Link>
        ) : (
          <Link
            href="/next"
            className="card card-link block p-5 sm:text-right"
          >
            <div className="label-mono mb-1">What&apos;s next →</div>
            <div className="display text-xl">Your 30/60/90-day plan</div>
          </Link>
        )}
      </nav>
    </article>
  );
}
