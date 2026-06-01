import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Prompt = {
  label: string;
  surface:
    | "claude"
    | "desktop"
    | "cowork"
    | "phone"
    | "deepresearch"
    | "claudecode"
    | "scheduled"
    | "excel";
  text: string;
};

export type Act = {
  num: number;
  slug: string;
  title: string;
  reaction: string;
  capability: string;
  capabilityShort: string;
  oneLiner: string;
  timeRange: string;
  point: string;
  whatYouSee: string[];
  prompts: Prompt[];
  watchFor: string;
  whyItMatters: string;
  tryThis: string;
  ahaMoment: string;
  tryThisPrompt?: string;
};

const ACTS_DIR = path.join(process.cwd(), "content", "acts");

function loadActs(): Act[] {
  const files = fs
    .readdirSync(ACTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const acts = files.map((file) => {
    const raw = fs.readFileSync(path.join(ACTS_DIR, file), "utf8");
    const { data } = matter(raw);
    return data as Act;
  });

  return acts.sort((a, b) => a.num - b.num);
}

export const acts: Act[] = loadActs();

export const deepResearchPrompt: Prompt = {
  label: "Kick off at minute 1, reveal at minute 64",
  surface: "deepresearch",
  text: "Research how Fortune 500 CEOs are actually deploying agentic AI in 2026 — not what they're announcing, what they're doing. Pull from news, earnings calls, and primary reporting in the last 90 days. I want a 20–25 page briefing: an executive summary up top, three to five strategic implications, named companies doing it well and badly with cited evidence, and the two non-obvious risks most boards are still missing. Take your time. Cite everything.",
};

/* ─────────────────────────────────────────────────────────────────
   The Desk — investment-PM persona deep-dive.
   Same six-act capability arc, applied where there's money on the line.
   Source: content/workflows/0N.md (YAML frontmatter, same pattern as acts).
   ───────────────────────────────────────────────────────────────── */

export type WiringRow = { label: string; value: string };

export type Workflow = {
  num: number;
  slug: string;
  title: string;
  capability: string; // the advanced tool it stars, e.g. "Scheduled execution"
  capabilityShort: string; // short name for cards/nav
  actLink: string; // which act it extends, e.g. "Act 5 · Parallel execution"
  oneLiner: string;
  timeOfDay: string; // a PM-desk time cue, parallels Act.timeRange
  job: string; // the "what's the underlying job" paragraph
  whatYouSee: string[];
  prompts: Prompt[];
  wiring: WiringRow[]; // the "how it's wired" callout — real plugin/skill/connector names
  constraint: string; // the hard constraint this workflow teaches
  ahaMoment: string;
  tryThisPrompt?: string;
};

const WORKFLOWS_DIR = path.join(process.cwd(), "content", "workflows");

function loadWorkflows(): Workflow[] {
  const files = fs
    .readdirSync(WORKFLOWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const workflows = files.map((file) => {
    const raw = fs.readFileSync(path.join(WORKFLOWS_DIR, file), "utf8");
    const { data } = matter(raw);
    return data as Workflow;
  });

  return workflows.sort((a, b) => a.num - b.num);
}

export const workflows: Workflow[] = loadWorkflows();
