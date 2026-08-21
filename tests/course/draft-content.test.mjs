import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { loadCourse } from "../../lib/course/load.ts";
import { PRIMARY_HARNESSES } from "../../lib/course/types.ts";

const bundle = loadCourse(path.join(process.cwd(), "content"));

function registry(provider) {
  return bundle.sources.find((entry) => entry.provider === provider);
}

test("records fresh official operational sources for draft Codex and Hermes paths", () => {
  const codex = registry("codex").sources.find((source) => source.id === "codex-agent-approvals-security-2026-08-21");
  const hermes = registry("hermes").sources.find((source) => source.id === "hermes-docs-home-2026-08-21");

  assert.deepEqual(
    [codex.canonicalUrl, codex.kind, codex.retrievedAt, codex.operationalExpiresAt],
    ["https://developers.openai.com/codex/agent-approvals-security", "current-operational-doc", "2026-08-21", "2026-09-20"],
  );
  assert.deepEqual(
    [hermes.canonicalUrl, hermes.kind, hermes.retrievedAt, hermes.operationalExpiresAt],
    ["https://hermes-agent.nousresearch.com/docs/", "current-operational-doc", "2026-08-21", "2026-09-20"],
  );
});

test("Codex and Hermes Lesson 1 remain non-runnable drafts with explicit gates", () => {
  const lesson = bundle.lessons.find((entry) => entry.slug === "01-bounded-brief");
  for (const harness of ["codex", "hermes"]) {
    const variant = lesson.variants.find((entry) => entry.harness === harness);
    assert.equal(variant.status, "draft");
    assert.match(variant.statusReason, /no runnable|no executed evidence/i);
    assert.equal(variant.availabilityEvidence, undefined);
    assert.equal(variant.expectedArtifact, undefined);
  }
});

test("loads six cumulative course lessons with all core draft variants", () => {
  assert.equal(bundle.lessons.length, 6);
  assert.deepEqual(bundle.lessons.map((lesson) => lesson.num), [1, 2, 3, 4, 5, 6]);
  for (const lesson of bundle.lessons) {
    assert.deepEqual(lesson.variants.map((variant) => variant.harness), ["claude", "codex", "hermes"]);
    assert.ok(lesson.variants.every((variant) => variant.status === "draft"));
  }
});

test("renders dynamic lesson numbering and self-paced learner copy", () => {
  const lessonSource = fs.readFileSync(path.join(process.cwd(), "app/learn/[harness]/[lesson]/page.tsx"), "utf8");
  const chooserSource = fs.readFileSync(path.join(process.cwd(), "app/preview/choose-your-harness/page.tsx"), "utf8");
  assert.match(lessonSource, /String\(view\.lesson\.num\)\.padStart/);
  assert.match(lessonSource, /What you will make/);
  assert.match(lessonSource, /You may pause after any step/);
  assert.match(chooserSource, /Available<\/strong> means/);
  assert.match(chooserSource, /not a course-tested Pi procedure/);
});

test("loads optional Pi comparison content outside core harnesses and variants", () => {
  assert.equal(PRIMARY_HARNESSES.includes("pi"), false);
  assert.equal(bundle.lessons.some((lesson) => lesson.variants.some((variant) => variant.harness === "pi")), false);
  assert.equal(bundle.comparisons.length, 1);
  const pi = bundle.comparisons[0];
  assert.deepEqual(
    [pi.id, pi.status, pi.role, pi.notPrimaryHarness, pi.notLessonVariant, pi.sources[0].canonicalUrl],
    ["optional-pi-local-customization", "draft", "comparison-only", true, true, "https://pi.dev/docs/latest"],
  );
  assert.match(pi.summary, /optional comparison for readers/i);
  assert.match(pi.summary, /extensions, skills, prompt templates, themes, and packages/i);
});
