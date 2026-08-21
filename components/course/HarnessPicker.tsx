"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Harness, VariantStatus } from "@/lib/course/types";
import { learnDashboardPath } from "@/lib/course/view-model";
import { usePrimaryHarnessPreference } from "./PrimaryHarnessPreference";

type HarnessChoice = {
  harness: Harness;
  status: VariantStatus;
  reason: string | null;
};

export function HarnessPicker({ choices }: { choices: HarnessChoice[] }) {
  const router = useRouter();
  const { preference, setPrimaryHarness } = usePrimaryHarnessPreference();
  const [explicitSelection, setExplicitSelection] = useState<Harness | null>(null);
  const selected = explicitSelection ?? preference;
  const [storageNotice, setStorageNotice] = useState("");

  function continueWithSelection() {
    if (!selected) return;
    if (!setPrimaryHarness(selected)) {
      setStorageNotice("Preference could not be saved. This path still works for this visit.");
    }
    router.push(learnDashboardPath(selected));
  }

  return (
    <section className="card p-6" aria-labelledby="choose-harness-heading">
      <h2 id="choose-harness-heading" className="display text-3xl mb-3">Choose a primary harness.</h2>
      <p className="text-ink-soft mt-0">
        This only stores a local viewing preference. It does not verify access, promote a path, or run a provider.
      </p>
      <fieldset className="mt-6 space-y-3">
        <legend className="label-mono">Primary harness</legend>
        {choices.map((choice) => (
          <label key={choice.harness} className="card block cursor-pointer p-4 hover:border-accent">
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="primary-harness"
                value={choice.harness}
                checked={selected === choice.harness}
                onChange={() => setExplicitSelection(choice.harness)}
                className="mt-1 accent-accent"
              />
              <span>
                <span className="block font-semibold capitalize text-ink">{choice.harness}</span>
                <span className="mt-1 block text-sm text-ink-soft">
                  {choice.status}: {choice.reason ?? "No status detail recorded."}
                </span>
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={continueWithSelection}
        disabled={!selected}
        className="mt-6 rounded-md bg-accent px-5 py-3 font-semibold text-accent-on disabled:cursor-not-allowed disabled:opacity-50"
      >
        Preview selected path
      </button>
      <p className="mt-3 text-sm text-ink-soft" aria-live="polite">{storageNotice}</p>
      <p className="mt-4 text-sm text-ink-soft">
        Direct links also work without saved preference: {choices.map((choice, index) => (
          <span key={choice.harness}>
            {index ? " · " : ""}
            <Link className="link capitalize" href={learnDashboardPath(choice.harness)}>{choice.harness}</Link>
          </span>
        ))}
      </p>
    </section>
  );
}
