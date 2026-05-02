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

  return (
    <article className="container-narrow pt-12 pb-24">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-ink-faint flex flex-wrap items-center gap-2">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>›</span>
        <span>Act {a.num}</span>
      </div>

      {/* Hero */}
      <div className="mb-10 pb-10 border-b border-rule">
        <div className="eyebrow mb-3">
          Act {a.num} of 6 · {a.timeRange}
        </div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4">
          {a.title}
        </h1>
        <p className="text-xl text-ink-soft leading-snug">{a.oneLiner}</p>
      </div>

      {/* Capability */}
      <Callout variant="concept">
        <p className="font-serif text-2xl font-semibold mb-2">{a.capability}</p>
        <p className="m-0">{a.point}</p>
      </Callout>

      {/* What you see */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-4">
          What happens on screen
        </h2>
        <ol className="space-y-3 list-none pl-0">
          {a.whatYouSee.map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-ink-soft text-lg leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Prompts */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-4">
          The prompts
        </h2>
        <p className="text-ink-soft mb-2">
          Copy. Adapt. Replace bracketed bits with your own context.
        </p>
        {a.prompts.map((p, i) => (
          <PromptBlock key={i} prompt={p} />
        ))}
      </section>

      {/* Watch / matter / try */}
      <section className="mt-10 space-y-4">
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
          <p className="font-serif text-xl m-0">{a.ahaMoment}</p>
        </Callout>
      </section>

      {/* Prev/Next */}
      <nav className="mt-16 pt-8 border-t border-rule flex flex-wrap justify-between gap-4">
        {prev ? (
          <Link
            href={`/acts/${prev.slug}`}
            className="block bg-paper border border-rule rounded-lg p-4 hover:border-accent transition-colors flex-1 min-w-[240px]"
          >
            <div className="text-xs uppercase tracking-wider text-ink-faint mb-1">
              ← Previous · Act {prev.num}
            </div>
            <div className="font-serif text-lg font-semibold">{prev.title}</div>
          </Link>
        ) : (
          <Link
            href="/"
            className="block bg-paper border border-rule rounded-lg p-4 hover:border-accent transition-colors flex-1 min-w-[240px]"
          >
            <div className="text-xs uppercase tracking-wider text-ink-faint mb-1">
              ← Home
            </div>
            <div className="font-serif text-lg font-semibold">The arc</div>
          </Link>
        )}
        {next ? (
          <Link
            href={`/acts/${next.slug}`}
            className="block bg-paper border border-rule rounded-lg p-4 hover:border-accent transition-colors flex-1 min-w-[240px] text-right"
          >
            <div className="text-xs uppercase tracking-wider text-ink-faint mb-1">
              Next · Act {next.num} →
            </div>
            <div className="font-serif text-lg font-semibold">{next.title}</div>
          </Link>
        ) : (
          <Link
            href="/next"
            className="block bg-paper border border-rule rounded-lg p-4 hover:border-accent transition-colors flex-1 min-w-[240px] text-right"
          >
            <div className="text-xs uppercase tracking-wider text-ink-faint mb-1">
              What&apos;s next →
            </div>
            <div className="font-serif text-lg font-semibold">Your 30/60/90-day plan</div>
          </Link>
        )}
      </nav>
    </article>
  );
}
