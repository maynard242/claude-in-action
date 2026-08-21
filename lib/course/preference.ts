import type { Harness } from "./types";

export const PRIMARY_HARNESS_STORAGE_KEY = "practical-ai-harness.primary.v1";

type PreferenceStorage = {
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function parsePrimaryHarnessPreference(value: string | null): Harness | null {
  return value === "claude" || value === "codex" || value === "hermes" ? value : null;
}

export function describePrimaryHarnessView(
  viewed: Harness,
  saved: Harness | null,
): string {
  if (saved === null) return `You are viewing the ${viewed} URL. No primary harness is saved.`;
  if (saved === viewed) return `You are viewing the ${viewed} URL. It is your saved primary harness.`;
  return `You are viewing the ${viewed} URL. Your saved primary harness is ${saved}.`;
}

export function writePrimaryHarnessPreference(
  storage: PreferenceStorage,
  harness: Harness,
): boolean {
  try {
    storage.setItem(PRIMARY_HARNESS_STORAGE_KEY, harness);
    return true;
  } catch {
    return false;
  }
}

export function clearPrimaryHarnessPreference(storage: PreferenceStorage): boolean {
  try {
    storage.removeItem(PRIMARY_HARNESS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
