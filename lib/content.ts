import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

const promptSurfaces = [
  "claude",
  "desktop",
  "cowork",
  "phone",
  "deepresearch",
  "claudecode",
  "scheduled",
  "excel",
] as const;

export type PromptSurface = (typeof promptSurfaces)[number];

export type Prompt = {
  label: string;
  surface: PromptSurface;
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

type ValidationIssue = {
  file: string;
  field: string;
  message: string;
};

type Loaded<T> = {
  file: string;
  item: T;
};

function contentFile(dir: string, file: string) {
  return path.relative(process.cwd(), path.join(dir, file));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function addIssue(
  issues: ValidationIssue[],
  file: string,
  field: string,
  message: string,
) {
  issues.push({ file, field, message });
}

function requireNonEmptyString(
  data: Record<string, unknown>,
  file: string,
  field: string,
  issues: ValidationIssue[],
  displayField = field,
) {
  if (typeof data[field] !== "string" || data[field].trim().length === 0) {
    addIssue(issues, file, displayField, "must be a non-empty string");
    return false;
  }
  return true;
}

function validateOptionalString(
  data: Record<string, unknown>,
  file: string,
  field: string,
  issues: ValidationIssue[],
) {
  if (
    data[field] !== undefined &&
    (typeof data[field] !== "string" || data[field].trim().length === 0)
  ) {
    addIssue(issues, file, field, "must be a non-empty string when provided");
    return false;
  }
  return true;
}

function requirePositiveInteger(
  data: Record<string, unknown>,
  file: string,
  field: string,
  issues: ValidationIssue[],
) {
  if (
    typeof data[field] !== "number" ||
    !Number.isInteger(data[field]) ||
    data[field] <= 0
  ) {
    addIssue(issues, file, field, "must be a positive integer");
    return false;
  }
  return true;
}

function requireNonEmptyStringArray(
  data: Record<string, unknown>,
  file: string,
  field: string,
  issues: ValidationIssue[],
) {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0) {
    addIssue(issues, file, field, "must be a non-empty list");
    return false;
  }

  let valid = true;
  value.forEach((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      addIssue(
        issues,
        file,
        `${field}[${index}]`,
        "must be a non-empty string",
      );
      valid = false;
    }
  });
  return valid;
}

function requirePrompts(
  data: Record<string, unknown>,
  file: string,
  field: string,
  issues: ValidationIssue[],
) {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0) {
    addIssue(issues, file, field, "must be a non-empty list");
    return false;
  }

  let valid = true;
  value.forEach((prompt, index) => {
    const prefix = `${field}[${index}]`;
    if (!isRecord(prompt)) {
      addIssue(issues, file, prefix, "must be an object");
      valid = false;
      return;
    }

    valid =
      requireNonEmptyString(prompt, file, "label", issues, `${prefix}.label`) &&
      valid;
    valid =
      requireNonEmptyString(prompt, file, "text", issues, `${prefix}.text`) &&
      valid;

    if (
      typeof prompt.surface !== "string" ||
      !promptSurfaces.includes(prompt.surface as PromptSurface)
    ) {
      addIssue(
        issues,
        file,
        `${prefix}.surface`,
        `must be one of: ${promptSurfaces.join(", ")}`,
      );
      valid = false;
    }
  });
  return valid;
}

function requireWiringRows(
  data: Record<string, unknown>,
  file: string,
  field: string,
  issues: ValidationIssue[],
) {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0) {
    addIssue(issues, file, field, "must be a non-empty list");
    return false;
  }

  let valid = true;
  value.forEach((row, index) => {
    const prefix = `${field}[${index}]`;
    if (!isRecord(row)) {
      addIssue(issues, file, prefix, "must be an object");
      valid = false;
      return;
    }

    valid =
      requireNonEmptyString(row, file, "label", issues, `${prefix}.label`) &&
      valid;
    valid =
      requireNonEmptyString(row, file, "value", issues, `${prefix}.value`) &&
      valid;
  });
  return valid;
}

function assertUniqueContentFields<T extends { num: number; slug: string }>(
  items: Loaded<T>[],
  label: string,
  issues: ValidationIssue[],
) {
  const nums = new Map<number, string>();
  const slugs = new Map<string, string>();

  items.forEach(({ file, item }) => {
    const numFile = nums.get(item.num);
    if (numFile) {
      addIssue(
        issues,
        file,
        "num",
        `must be unique among ${label}; duplicate of ${numFile}`,
      );
    } else {
      nums.set(item.num, file);
    }

    const slugFile = slugs.get(item.slug);
    if (slugFile) {
      addIssue(
        issues,
        file,
        "slug",
        `must be unique among ${label}; duplicate of ${slugFile}`,
      );
    } else {
      slugs.set(item.slug, file);
    }
  });
}

function throwIfInvalid(issues: ValidationIssue[]) {
  if (issues.length === 0) return;

  const details = issues
    .map((issue) => `- ${issue.file}:${issue.field} ${issue.message}`)
    .join("\n");
  throw new Error(`Content validation failed:\n${details}`);
}

function readFrontmatter(raw: string, file: string, issues: ValidationIssue[]) {
  const normalized = raw.replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    addIssue(
      issues,
      file,
      "<frontmatter>",
      "must be wrapped in opening and closing --- delimiters",
    );
    return null;
  }

  try {
    return loadYaml(match[1]) ?? {};
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    addIssue(issues, file, "<frontmatter>", `YAML parse failed: ${message}`);
    return null;
  }
}

function validateAct(data: unknown, file: string, issues: ValidationIssue[]) {
  if (!isRecord(data)) {
    addIssue(issues, file, "<frontmatter>", "must be an object");
    return null;
  }

  let valid = true;
  valid = requirePositiveInteger(data, file, "num", issues) && valid;
  [
    "slug",
    "title",
    "reaction",
    "capability",
    "capabilityShort",
    "oneLiner",
    "timeRange",
    "point",
    "watchFor",
    "whyItMatters",
    "tryThis",
    "ahaMoment",
  ].forEach((field) => {
    valid = requireNonEmptyString(data, file, field, issues) && valid;
  });
  valid = validateOptionalString(data, file, "tryThisPrompt", issues) && valid;
  valid = requireNonEmptyStringArray(data, file, "whatYouSee", issues) && valid;
  valid = requirePrompts(data, file, "prompts", issues) && valid;

  return valid ? (data as Act) : null;
}

function loadActs(): Act[] {
  const files = fs
    .readdirSync(ACTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const issues: ValidationIssue[] = [];
  const loadedActs: Loaded<Act>[] = [];

  files.forEach((file) => {
    const raw = fs.readFileSync(path.join(ACTS_DIR, file), "utf8");
    const contentPath = contentFile(ACTS_DIR, file);
    const data = readFrontmatter(raw, contentPath, issues);
    if (data === null) return;
    const act = validateAct(data, contentPath, issues);
    if (act) loadedActs.push({ file: contentPath, item: act });
  });

  assertUniqueContentFields(loadedActs, "acts", issues);
  throwIfInvalid(issues);

  return loadedActs.map(({ item }) => item).sort((a, b) => a.num - b.num);
}

export const acts: Act[] = loadActs();

export const deepResearchPrompt: Prompt = {
  label: "Kick off at the start, reveal at the end",
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

function validateWorkflow(
  data: unknown,
  file: string,
  issues: ValidationIssue[],
) {
  if (!isRecord(data)) {
    addIssue(issues, file, "<frontmatter>", "must be an object");
    return null;
  }

  let valid = true;
  valid = requirePositiveInteger(data, file, "num", issues) && valid;
  [
    "slug",
    "title",
    "capability",
    "capabilityShort",
    "actLink",
    "oneLiner",
    "timeOfDay",
    "job",
    "constraint",
    "ahaMoment",
  ].forEach((field) => {
    valid = requireNonEmptyString(data, file, field, issues) && valid;
  });
  valid = validateOptionalString(data, file, "tryThisPrompt", issues) && valid;
  valid = requireNonEmptyStringArray(data, file, "whatYouSee", issues) && valid;
  valid = requirePrompts(data, file, "prompts", issues) && valid;
  valid = requireWiringRows(data, file, "wiring", issues) && valid;

  return valid ? (data as Workflow) : null;
}

function loadWorkflows(): Workflow[] {
  const files = fs
    .readdirSync(WORKFLOWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const issues: ValidationIssue[] = [];
  const loadedWorkflows: Loaded<Workflow>[] = [];

  files.forEach((file) => {
    const raw = fs.readFileSync(path.join(WORKFLOWS_DIR, file), "utf8");
    const contentPath = contentFile(WORKFLOWS_DIR, file);
    const data = readFrontmatter(raw, contentPath, issues);
    if (data === null) return;
    const workflow = validateWorkflow(data, contentPath, issues);
    if (workflow) loadedWorkflows.push({ file: contentPath, item: workflow });
  });

  assertUniqueContentFields(loadedWorkflows, "workflows", issues);
  throwIfInvalid(issues);

  return loadedWorkflows
    .map(({ item }) => item)
    .sort((a, b) => a.num - b.num);
}

export const workflows: Workflow[] = loadWorkflows();
