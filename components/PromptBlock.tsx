"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Prompt } from "@/lib/content";

const surfaceLabels: Record<Prompt["surface"], string> = {
  claude: "Claude.ai",
  desktop: "Claude Desktop · file access",
  cowork: "Cowork · connected mode",
  phone: "Works the same on phone",
  deepresearch: "Toggle deep research first",
  claudecode: "Claude Code · finance plugin",
  scheduled: "Scheduled agent · runs itself",
  excel: "Claude in Excel · M365",
};

type CopyStatus = "idle" | "copied" | "failed";

export function PromptBlock({ prompt }: { prompt: Prompt }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | null>(null);
  const feedbackId = useId();
  const feedback =
    copyStatus === "copied"
      ? "Prompt copied to clipboard."
      : copyStatus === "failed"
        ? "Copy failed. Select the prompt text and copy it manually."
        : "";

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function copyPrompt() {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(prompt.text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    resetTimer.current = window.setTimeout(() => {
      setCopyStatus("idle");
      resetTimer.current = null;
    }, 1800);
  }

  return (
    <div className="my-5">
      {prompt.label && (
        <div className="text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-2 font-mono flex items-center gap-2">
          <span className="text-accent">{prompt.label}</span>
        </div>
      )}
      <div className="prompt-box">
        <button
          type="button"
          onClick={copyPrompt}
          aria-describedby={feedback ? feedbackId : undefined}
          className={`absolute top-2.5 right-2.5 text-[10.5px] tracking-[0.12em] uppercase font-mono rounded-md px-2.5 py-1 border transition-colors cursor-pointer ${
            copyStatus === "copied"
              ? "bg-accent text-accent-on border-accent"
              : copyStatus === "failed"
                ? "bg-red-500/15 text-red-200 border-red-400/50"
              : "bg-white/5 text-code-ink border-white/15 hover:bg-white/10 hover:border-white/30"
          }`}
        >
          {copyStatus === "copied"
            ? "Copied"
            : copyStatus === "failed"
              ? "Failed"
              : "Copy"}
        </button>
        <span id={feedbackId} className="sr-only" aria-live="polite">
          {feedback}
        </span>
        <div className="text-[10.5px] uppercase tracking-[0.18em] font-mono text-accent mb-2.5 pr-16">
          {surfaceLabels[prompt.surface]}
        </div>
        <p className="m-0 whitespace-pre-wrap text-[14.5px] leading-[1.6]">
          {prompt.text}
        </p>
      </div>
    </div>
  );
}
