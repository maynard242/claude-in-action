import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  PRIMARY_HARNESS_STORAGE_KEY,
  clearPrimaryHarnessPreference,
  describePrimaryHarnessView,
  parsePrimaryHarnessPreference,
  writePrimaryHarnessPreference,
} from "../../lib/course/preference.ts";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  const calls = [];
  return {
    calls,
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { calls.push(["set", key, value]); values.set(key, value); },
    removeItem(key) { calls.push(["remove", key]); values.delete(key); },
  };
}

test("uses a versioned primary-harness preference key", () => {
  assert.equal(PRIMARY_HARNESS_STORAGE_KEY, "practical-ai-harness.primary.v1");
});

test("parses only declared primary harnesses", () => {
  assert.equal(parsePrimaryHarnessPreference("claude"), "claude");
  assert.equal(parsePrimaryHarnessPreference("codex"), "codex");
  assert.equal(parsePrimaryHarnessPreference("hermes"), "hermes");
});

test("rejects absent, malformed, and obsolete preference values", () => {
  for (const value of [null, "", "pi", "claude/../../", "available"]) {
    assert.equal(parsePrimaryHarnessPreference(value), null);
  }
});

test("writes only through the explicit set-primary helper", () => {
  const storage = memoryStorage();
  assert.equal(writePrimaryHarnessPreference(storage, "codex"), true);
  assert.deepEqual(storage.calls, [["set", PRIMARY_HARNESS_STORAGE_KEY, "codex"]]);
});

test("clears a saved preference through the explicit reset helper", () => {
  const storage = memoryStorage({ [PRIMARY_HARNESS_STORAGE_KEY]: "hermes" });
  assert.equal(clearPrimaryHarnessPreference(storage), true);
  assert.deepEqual(storage.calls, [["remove", PRIMARY_HARNESS_STORAGE_KEY]]);
});

test("view links do not mutate primary preference", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components/course/HarnessSwitcher.tsx"),
    "utf8",
  );
  assert.doesNotMatch(source, /onClick=.*setPrimaryHarness/);
});

test("storage exceptions remain non-blocking", () => {
  const blocked = {
    getItem() { throw new Error("blocked"); },
    setItem() { throw new Error("blocked"); },
    removeItem() { throw new Error("blocked"); },
  };
  assert.equal(writePrimaryHarnessPreference(blocked, "claude"), false);
  assert.equal(clearPrimaryHarnessPreference(blocked), false);
});

test("describes authoritative direct views against saved preference", () => {
  assert.equal(
    describePrimaryHarnessView("codex", "claude"),
    "You are viewing the codex URL. Your saved primary harness is claude.",
  );
  assert.equal(
    describePrimaryHarnessView("hermes", null),
    "You are viewing the hermes URL. No primary harness is saved.",
  );
});

test("start picker uses preview wording for an internal slice", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components/course/HarnessPicker.tsx"),
    "utf8",
  );
  assert.match(source, /Preview selected path/);
  assert.doesNotMatch(source, /Continue to selected path/);
});
