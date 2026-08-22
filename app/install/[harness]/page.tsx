import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadCourse } from "@/lib/course/load";
import { getHarness } from "@/lib/course/view";
import { HARNESSES } from "@/lib/course/types";

export function generateStaticParams() {
  return HARNESSES.map((harness) => ({ harness }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harness: string }>;
}): Promise<Metadata> {
  const { harness: id } = await params;
  const harness = getHarness(loadCourse(), id);
  if (!harness) return { title: "Setup" };
  return {
    title: `Set up ${harness.name} · Practical AI Agents`,
    description: `How to install ${harness.name} and confirm it runs.`,
  };
}

export default async function InstallPage({ params }: { params: Promise<{ harness: string }> }) {
  const { harness: id } = await params;
  const bundle = loadCourse();
  const harness = getHarness(bundle, id);
  if (!harness) notFound();

  return (
    <article className="container-narrow py-12">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link className="link" href="/install">
          Setup
        </Link>
      </nav>

      <header className="pb-10 border-b border-rule">
        <p className="eyebrow">{harness.vendor}</p>
        <h1 className="display text-4xl md:text-6xl mt-4 mb-5">Set up {harness.name}</h1>
        <p className="text-xl text-ink-soft">{harness.blurb}</p>
      </header>

      <section className="mt-8 card p-5">
        <p className="label-mono mb-2">Before you start</p>
        <p className="m-0 text-sm text-ink-soft">{harness.prerequisites}</p>
      </section>

      <section className="mt-10">
        <p className="label-mono mb-3">Step one</p>
        <h2 className="display text-3xl mb-4">Read the official instructions</h2>
        <p className="text-ink-soft">
          Install steps change often enough that a copy here would go stale. The vendor page is the
          one to follow.
        </p>
        <a
          href={harness.docsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-accent font-semibold hover:gap-3 transition-all"
        >
          {harness.name} documentation
          <span aria-hidden>→</span>
        </a>
      </section>

      <section className="mt-10">
        <p className="label-mono mb-3">Step two</p>
        <h2 className="display text-3xl mb-4">Install it</h2>
        <p className="text-ink-soft mb-4">
          For most setups this is the whole step. If it fails, the documentation above covers the
          platform-specific cases.
        </p>
        <pre className="overflow-x-auto rounded-md bg-code-bg p-4 text-sm text-code-ink">
          <code>{harness.installCommand}</code>
        </pre>
      </section>

      <section className="mt-10">
        <p className="label-mono mb-3">Step three</p>
        <h2 className="display text-3xl mb-4">Prove it works</h2>
        <p className="text-ink-soft mb-4">
          Run this. If you get the expected reply, authentication and the install are both fine and
          you can start the course.
        </p>
        <pre className="overflow-x-auto rounded-md bg-code-bg p-4 text-sm text-code-ink">
          <code>{harness.verifyCommand}</code>
        </pre>
        {harness.verifyOutput ? (
          <div className="mt-4">
            <p className="label-mono mb-2">
              Expected reply
              {harness.verifiedVersion ? ` · confirmed on v${harness.verifiedVersion}` : ""}
            </p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-code-bg p-4 text-sm text-code-ink">
              <code>{harness.verifyOutput}</code>
            </pre>
          </div>
        ) : null}
      </section>

      {harness.videos.length ? (
        <section className="mt-10">
          <p className="label-mono mb-3">If you would rather watch</p>
          <h2 className="display text-3xl mb-4">Video walkthroughs</h2>
          <p className="text-ink-soft mb-4">
            These open a search rather than a single video, because individual videos go out of date
            faster than the tools do. The top few results are usually current.
          </p>
          <ul className="space-y-2">
            {harness.videos.map((video) => (
              <li key={video.url}>
                <a href={video.url} target="_blank" rel="noreferrer" className="link">
                  {video.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="callout callout--matter mt-10">
        <p className="callout-label">Next</p>
        <p className="m-0">
          Once the check above returns what it should, start at{" "}
          <Link className="link" href="/learn/state-the-job">
            Lesson 1
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
