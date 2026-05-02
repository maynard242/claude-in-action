"use client";

import { useState } from "react";
import type { Prompt } from "@/lib/content";

const surfaceLabels: Record<Prompt["surface"], string> = {
  claude: "Type into Claude.ai",
  desktop: "Type into Claude Desktop (file access)",
  cowork: "Type into Cowork (connected mode)",
  phone: "Works the same from your phone",
  deepresearch: "Toggle deep research first",
};

export function PromptBlock({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-5">
      {prompt.label && (
        <div className="text-xs uppercase tracking-wider text-ink-faint mb-1.5 font-semibold">
          <span className="text-accent mr-2">{prompt.label}</span>
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
          className={`absolute top-3 right-3 text-[11px] tracking-wide rounded-md px-3 py-1 border transition-colors cursor-pointer ${
            copied
              ? "bg-accent text-white border-accent"
              : "bg-white/10 text-code-ink border-white/20 hover:bg-white/20"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <div className="text-[11px] uppercase tracking-wider text-accent font-bold mb-2.5">
          {surfaceLabels[prompt.surface]}
        </div>
        <p className="m-0 whitespace-pre-wrap">{prompt.text}</p>
      </div>
    </div>
  );
}
