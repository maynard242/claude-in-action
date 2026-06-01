"use client";

import { useState } from "react";
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

export function PromptBlock({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
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
          onClick={() => {
            navigator.clipboard.writeText(prompt.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}
          className={`absolute top-2.5 right-2.5 text-[10.5px] tracking-[0.12em] uppercase font-mono rounded-md px-2.5 py-1 border transition-colors cursor-pointer ${
            copied
              ? "bg-accent text-accent-on border-accent"
              : "bg-white/5 text-code-ink border-white/15 hover:bg-white/10 hover:border-white/30"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
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
