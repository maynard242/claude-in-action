# Claude in Action

Companion site for the live demo *"Claude in Action: Six Use Cases in 75 Minutes"* — an audience-facing tour of what Claude can actually do, built to walk a working professional from "smarter Google" to "I just built my own agent" in one hour.

The deployed site is at **claudeinaction.vercel.app** (or wherever your Vercel project is pointed). This repository contains everything: the audience-facing Next.js site **and** the presenter run sheet that drives the live demo.

## What's in this repo

```
ai_tutorial_site/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage — the six-act overview
│   ├── acts/[act]/         # One page per act (dynamic route, generated for 1–6)
│   ├── cheatsheet/         # Audience Q&A + concept glossary
│   ├── notes/              # Long-form companion to the demo
│   ├── next/               # 30/60/90-day plan + starter agents
│   └── glossary/           # Plain-English AI term definitions
├── components/             # Shared React components (Nav, Footer, PromptBlock, …)
├── lib/
│   └── content.ts          # Loads acts from content/acts/*.md, exports typed data
├── content/                # ★ Canonical source for the six acts and the run sheet ★
│   ├── acts/01.md … 06.md  # One markdown file per act (YAML frontmatter)
│   └── runsheet.md         # Presenter-only script: timings, what to say, stagecraft
├── public/                 # Static assets
├── AGENTS.md               # Detailed architecture guide for AI agents (read this first)
└── CLAUDE.md               # Imports AGENTS.md
```

## How to update content

### To edit one of the six acts (audience-facing)

Edit the matching file in `content/acts/`. Each act lives in its own markdown file with YAML frontmatter:

```yaml
---
num: 1
slug: "1"
title: "The Email You've Been Avoiding"
oneLiner: >-
  Claude reads a confusing thread and tells you what's actually being asked …
prompts:
  - label: "Untangle a confusing email thread"
    surface: claude
    text: >-
      This thread has been sitting in my inbox for three days …
…
---
```

Save the file. The site re-reads on the next build (or on the next dev server reload). No code changes needed.

**Field reference** — see `AGENTS.md` for the full schema, or look at any existing act file as a template.

### To update the presenter run sheet

Edit `content/runsheet.md` directly. This is the master script with timings, on-screen cues, what-to-say blocks, and stagecraft notes. It is **not rendered on the site** — it lives in the repo as a single source of truth for whoever delivers the demo. Open it on GitHub to read it formatted, or in any markdown editor.

### To edit the cheatsheet, notes, next, or glossary pages

These live as React components in `app/cheatsheet/page.tsx`, `app/notes/page.tsx`, etc. The structured content (Q&A list, weekly plan, glossary terms) is at the top of each file as a plain TypeScript array. Edit the array, save, redeploy. They have not been migrated to markdown because they only have a single source of truth and the JSX layout is intentionally bespoke per page.

If you find yourself editing these often, ask Claude to migrate them to `content/` using the same pattern as `acts/`.

## Local development

```bash
npm install
npm run dev    # Open http://localhost:3000
```

Editing a `content/acts/*.md` file in dev mode hot-reloads the page.

## Deployment

The site auto-deploys to Vercel on push to the `main` branch. To deploy manually:

```bash
npm run build      # Verifies build locally first
vercel deploy      # Or: vercel --prod
```

The `content/` directory is bundled into the build at compile time — no runtime filesystem reads in production.

## Stack

- **Next.js 16** (App Router, Turbopack) — note: this is *not* the Next.js you remember; APIs and conventions have changed. See `AGENTS.md` if you're an AI agent editing code here.
- **React 19**
- **Tailwind CSS 4** (PostCSS pipeline)
- **gray-matter** — parses YAML frontmatter in `content/acts/*.md`
- **TypeScript** — strict mode

## License

Content © Leslie Teo. Code released under permissive terms — copy, fork, run your own demo.
