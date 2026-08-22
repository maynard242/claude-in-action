import type { Metadata } from "next";
import Link from "next/link";
import { loadCourse } from "@/lib/course/load";
import { installPath } from "@/lib/course/view";

export const metadata: Metadata = {
  title: "Set up an agent · Practical AI Agents",
  description: "Install instructions for Claude Code, Codex CLI, Hermes Agent, and Pi.",
};

export default function InstallIndex() {
  const bundle = loadCourse();

  return (
    <div className="container-wide py-16">
      <p className="eyebrow">Setup</p>
      <h1 className="display text-5xl md:text-7xl mt-5 max-w-[18ch]">
        Pick one and <em>install it</em>.
      </h1>
      <p className="mt-6 max-w-3xl text-xl text-ink-soft leading-snug">
        The course works on any of these four. If you have no preference, start with the one whose
        vendor you already have an account with, because authentication is the step people get stuck
        on.
      </p>
      <p className="mt-4 max-w-3xl text-ink-soft">
        These pages point at the official instructions rather than copying them, since install steps
        change faster than any tutorial can track. Each one ends with a command that proves the thing
        works.
      </p>

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {bundle.harnesses.map((harness) => (
          <Link key={harness.id} href={installPath(harness.id)} className="group card card-link block p-6">
            <div className="label-mono mb-2">{harness.vendor}</div>
            <h2 className="display text-2xl mb-2 group-hover:text-accent transition-colors">
              {harness.name}
            </h2>
            <p className="text-ink-soft text-[15px] leading-relaxed mb-3">{harness.blurb}</p>
            <code className="text-[13px] text-accent font-mono">{harness.oneShot}</code>
          </Link>
        ))}
      </div>
    </div>
  );
}
