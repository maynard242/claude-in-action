import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Prompt = {
  label: string;
  surface: "claude" | "desktop" | "cowork" | "phone" | "deepresearch";
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
