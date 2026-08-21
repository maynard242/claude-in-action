import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { loadCourse } from "../../lib/course/load.ts";
import {
  learnDashboardPath,
  learnLessonPath,
  listHarnessRouteParams,
  listLessonRouteParams,
  resolveLessonView,
} from "../../lib/course/view-model.ts";

const bundle = loadCourse(path.join(process.cwd(), "content"));

test("lists exactly the three primary harness dashboards", () => {
  assert.deepEqual(listHarnessRouteParams(bundle), [
    { harness: "claude" },
    { harness: "codex" },
    { harness: "hermes" },
  ]);
});

test("lists all core harness lesson paths", () => {
  const params = listLessonRouteParams(bundle);
  assert.equal(params.length, 18);
  assert.deepEqual(params.slice(0, 3), [
    { harness: "claude", lesson: "01-bounded-brief" },
    { harness: "claude", lesson: "02-cited-notes" },
    { harness: "claude", lesson: "03-useful-artifact" },
  ]);
});

test("resolves shared Lesson 1 with the selected harness status only", () => {
  const claude = resolveLessonView(bundle, "claude", "01-bounded-brief");
  const codex = resolveLessonView(bundle, "codex", "01-bounded-brief");

  assert.equal(claude?.lesson.slug, "01-bounded-brief");
  assert.equal(claude?.variant.harness, "claude");
  assert.equal(claude?.status, "draft");
  assert.equal(codex?.variant.harness, "codex");
  assert.equal(codex?.status, "draft");
  assert.deepEqual(claude?.sources, []);
});

test("rejects invalid direct-link combinations without provider fallback", () => {
  assert.equal(resolveLessonView(bundle, "not-a-harness", "01-bounded-brief"), null);
  assert.equal(resolveLessonView(bundle, "claude", "missing-lesson"), null);
});

test("builds canonical learner paths", () => {
  assert.equal(learnDashboardPath("hermes"), "/learn/hermes");
  assert.equal(learnLessonPath("codex", "01-bounded-brief"), "/learn/codex/01-bounded-brief");
});
