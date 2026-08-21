"use client";

import { useSyncExternalStore } from "react";
import type { Harness } from "@/lib/course/types";
import {
  clearPrimaryHarnessPreference,
  PRIMARY_HARNESS_STORAGE_KEY,
  parsePrimaryHarnessPreference,
  writePrimaryHarnessPreference,
} from "@/lib/course/preference";

const listeners = new Set<() => void>();

function readPreference(): Harness | null {
  try {
    return parsePrimaryHarnessPreference(window.localStorage.getItem(PRIMARY_HARNESS_STORAGE_KEY));
  } catch {
    return null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === PRIMARY_HARNESS_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getServerSnapshot(): Harness | null {
  return null;
}

export function usePrimaryHarnessPreference() {
  const preference = useSyncExternalStore(subscribe, readPreference, getServerSnapshot);

  function setPrimaryHarness(harness: Harness): boolean {
    try {
      const written = writePrimaryHarnessPreference(window.localStorage, harness);
      if (written) listeners.forEach((listener) => listener());
      return written;
    } catch {
      return false;
    }
  }

  function clearPrimaryHarness(): boolean {
    try {
      const cleared = clearPrimaryHarnessPreference(window.localStorage);
      if (cleared) listeners.forEach((listener) => listener());
      return cleared;
    } catch {
      return false;
    }
  }

  return { preference, setPrimaryHarness, clearPrimaryHarness };
}
