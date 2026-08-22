import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import { HARNESSES, type CourseBundle, type HarnessMeta, type Lesson, type Part } from "./types";

export const COURSE_TITLE = "Practical AI Agents";

function readYaml<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^﻿/, "");
  const value = loadYaml(raw);
  if (value === undefined || value === null) throw new Error(`Expected YAML in ${filePath}`);
  return value as T;
}

function yamlFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter((f) => f.endsWith(".yaml")).sort();
}

export function courseRoot(cwd = process.cwd()): string {
  return path.join(cwd, "content");
}

export function loadCourse(root = courseRoot()): CourseBundle {
  const parts = readYaml<Part[]>(path.join(root, "parts.yaml"));
  const harnesses = readYaml<HarnessMeta[]>(path.join(root, "harnesses.yaml"));
  const lessons = yamlFiles(path.join(root, "lessons")).map((file) =>
    readYaml<Lesson>(path.join(root, "lessons", file)),
  );

  validate({ root, title: COURSE_TITLE, parts, lessons, harnesses });
  return { root, title: COURSE_TITLE, parts, lessons, harnesses };
}

/** Fails the build on malformed content rather than shipping a broken page. */
function validate(bundle: CourseBundle) {
  const issues: string[] = [];
  const push = (m: string) => issues.push(m);

  const harnessIds = new Set(bundle.harnesses.map((h) => h.id));
  for (const id of HARNESSES) {
    if (!harnessIds.has(id)) push(`harnesses.yaml is missing ${id}`);
  }
  for (const harness of bundle.harnesses) {
    if (harness.verifyOutput !== null && !harness.verifiedVersion) {
      push(`harness ${harness.id} records output without a verified version`);
    }
  }

  const partNums = new Set(bundle.parts.map((p) => p.num));
  for (const num of [1, 2, 3]) if (!partNums.has(num as 1 | 2 | 3)) push(`parts.yaml is missing part ${num}`);

  const slugs = new Set<string>();
  const nums = new Set<number>();
  for (const lesson of bundle.lessons) {
    const at = `lesson ${lesson.slug || "<unknown>"}`;
    if (!lesson.slug || !lesson.title || !lesson.job) push(`${at} needs slug, title, and job`);
    if (slugs.has(lesson.slug)) push(`${at} has a duplicate slug`);
    if (nums.has(lesson.num)) push(`${at} has a duplicate num`);
    slugs.add(lesson.slug);
    nums.add(lesson.num);
    if (!partNums.has(lesson.part)) push(`${at} points at unknown part ${lesson.part}`);
    if (!lesson.steps?.length) push(`${at} has no steps`);
    if (!lesson.invariants?.length) push(`${at} has no invariants`);
    if (!lesson.humanReview?.length) push(`${at} has no human review items`);

    const example = lesson.workedExample;
    if (!example) {
      push(`${at} has no worked example`);
    } else {
      if (!harnessIds.has(example.harness)) push(`${at} worked example names unknown harness`);
      if (!example.command || !example.expected) push(`${at} worked example needs a command and expected result`);
      if (example.status === "verified" && (!example.realOutput || !example.harnessVersion || !example.verifiedOn)) {
        push(`${at} is marked verified but lacks real output, version, or date`);
      }
      // Every harness other than the worked example needs its equivalent stated.
      const covered = new Set(lesson.harnessNotes?.map((n) => n.harness) ?? []);
      for (const id of HARNESSES) {
        if (id !== example.harness && !covered.has(id)) push(`${at} does not say how ${id} does this`);
      }
    }
  }

  if (issues.length) throw new Error(`Course content invalid:\n${issues.map((i) => `- ${i}`).join("\n")}`);
}
