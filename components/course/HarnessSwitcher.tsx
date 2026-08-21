"use client";

import Link from "next/link";
import { useState } from "react";
import type { Harness } from "@/lib/course/types";
import { learnDashboardPath, learnLessonPath } from "@/lib/course/view-model";
import { describePrimaryHarnessView } from "@/lib/course/preference";
import { usePrimaryHarnessPreference } from "./PrimaryHarnessPreference";

const HARNESSES: Harness[] = ["claude", "codex", "hermes"];

export function HarnessSwitcher({
  current,
  lessonSlug,
}: {
  current: Harness;
  lessonSlug?: string;
}) {
  const { preference, setPrimaryHarness, clearPrimaryHarness } = usePrimaryHarnessPreference();
  const [confirmForget, setConfirmForget] = useState(false);
  const [notice, setNotice] = useState("");

  function setCurrentAsPrimary() {
    if (setPrimaryHarness(current)) {
      setConfirmForget(false);
      setNotice(`${current} is now your saved primary harness.`);
    } else {
      setNotice("Primary preference could not be saved. You can still view this path directly.");
    }
  }

  function forgetPreference() {
    if (!confirmForget) {
      setConfirmForget(true);
      setNotice("Press Forget saved preference again to confirm.");
      return;
    }
    if (clearPrimaryHarness()) {
      setConfirmForget(false);
      setNotice("Saved primary harness forgotten. Direct links still work.");
    } else {
      setNotice("Saved preference could not be cleared. Direct links still work.");
    }
  }

  return (
    <section className="space-y-4" aria-label="Primary harness controls">
      <p className="m-0 text-sm text-ink-soft" aria-live="polite">
        {describePrimaryHarnessView(current, preference)}
      </p>
      <nav className="flex flex-wrap gap-2" aria-label="View another harness">
        {HARNESSES.map((harness) => {
          const href = lessonSlug
            ? learnLessonPath(harness, lessonSlug)
            : learnDashboardPath(harness);
          return (
            <Link
              key={harness}
              href={href}
              aria-current={harness === current ? "page" : undefined}
              className={`rounded-md border px-3 py-2 text-sm capitalize transition-colors ${
                harness === current
                  ? "border-accent bg-accent text-accent-on"
                  : "border-border text-ink-soft hover:border-accent hover:text-accent"
              }`}
            >
              View {harness}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          onClick={setCurrentAsPrimary}
          className="rounded-md border border-accent px-3 py-2 text-accent hover:bg-accent hover:text-accent-on"
        >
          Set {current} as my primary
        </button>
        <button
          type="button"
          onClick={forgetPreference}
          className="rounded-md border border-border px-3 py-2 text-ink-soft hover:border-warm hover:text-warm"
        >
          {confirmForget ? "Confirm forget saved preference" : "Forget saved preference"}
        </button>
      </div>
      <p className="m-0 text-sm text-ink-soft" aria-live="polite">{notice}</p>
    </section>
  );
}
