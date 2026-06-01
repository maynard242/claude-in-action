<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture guide

Detailed reference for AI agents working in this repo. Read this before editing. The README is for humans; this is for you.

## What this repo is

A Next.js 16 site that renders the audience-facing companion to a 75-minute live demo (*Claude in Action: Six Use Cases in 75 Minutes*). The demo's six-act arc is the spine of everything. Each act demonstrates one more sophisticated AI capability than the previous: reasoning over context → tool use → long-context → MCP → async/parallel → composable agents.

The repo also contains the **presenter run sheet** (`content/runsheet.md`) — the full script with timings, on-screen cues, and stagecraft. This file is canonical source material; it is not rendered on the site.

## File roles

| Path | What it is | Owns what |
|---|---|---|
| `app/page.tsx` | Homepage | Hero, six-act overview cards, deep-research thread callout, four-card site nav |
| `app/acts/[act]/page.tsx` | Dynamic act page | Renders one act page per file in `content/acts/`. Reads `acts` from `lib/content.ts`. Calls `generateStaticParams` to prerender 1–6 |
| `app/desk/page.tsx` | The Desk index | Investment-PM persona deep-dive: hero, the reframe, six workflow cards, the realism layer (six constraints). Reads `workflows` from `lib/content.ts` |
| `app/desk/[workflow]/page.tsx` | Dynamic workflow page | Renders one workflow per file in `content/workflows/`. `generateStaticParams` prerenders 1–6. Adds a "how it's wired" block (real plugin/skill/connector names) + a "constraint" callout |
| `app/cheatsheet/page.tsx` | Audience Q&A + concept glossary | Q&A list (9 questions) + auto-generated concept glossary from `acts` |
| `app/notes/page.tsx` | Long-form companion | Section essays, common pitfalls, "when not Claude" |
| `app/next/page.tsx` | 30/60/90-day plan | Weekly plan, five starter agents, resource list, closing CTA |
| `app/glossary/page.tsx` | Term definitions | 12 plain-English AI term definitions |
| `app/layout.tsx` | Root layout | Fonts (Geist Sans/Mono, Instrument Serif), theme init script (dark/light), `<Nav>` and `<Footer>` |
| `app/globals.css` | Global styles | Tailwind directives + design tokens + utility classes (`.display`, `.label-mono`, `.eyebrow`, `.card`, `.callout`, `.prompt-box`, `.container-wide`, `.container-narrow`, `.grain`, `.accent`) |
| `components/Nav.tsx` | Top nav | Site nav with theme toggle |
| `components/Footer.tsx` | Footer | Footer links |
| `components/PromptBlock.tsx` | Copyable prompt | Renders one `Prompt` with surface label and copy button |
| `components/Callout.tsx` | Highlighted box | Variants: `concept`, `notice`, `matter`, `try`, `aha` |
| `components/ThemeToggle.tsx` | Light/dark toggle | Reads/writes `localStorage` `theme` |
| `lib/content.ts` | Content loader | Reads `content/acts/*.md` and `content/workflows/*.md`, parses YAML frontmatter via `gray-matter`, exports `acts: Act[]`, `workflows: Workflow[]`, and `deepResearchPrompt: Prompt`. Also exports the `Act`, `Workflow`, `WiringRow`, and `Prompt` types |
| `content/acts/01.md … 06.md` | **Canonical act source** | All audience-facing copy for each act lives in YAML frontmatter |
| `content/workflows/01.md … 06.md` | **Canonical workflow source** | The Desk's six investment-PM workflows. Same frontmatter pattern as acts; parsed into `Workflow[]` |
| `content/runsheet.md` | **Canonical presenter source** | Full script. Not rendered on site — lives in repo for the presenter |
| `next.config.ts` | Next config | Sets Turbopack root |
| `eslint.config.mjs` | Lint config | Next + ESLint flat config |
| `postcss.config.mjs` | PostCSS config | Tailwind v4 |
| `tsconfig.json` | TS config | Path alias `@/*` → repo root |

## Content architecture

```
content/acts/0N.md  ──┐
                       ├─→ lib/content.ts (loadActs)  ──→  app/page.tsx
content/acts/0N.md  ──┤        │                       ──→  app/acts/[act]/page.tsx
…                       │        │                       ──→  app/cheatsheet/page.tsx (concept glossary section)
                       └─→ exports `acts: Act[]`
```

`lib/content.ts` runs once at module load. In production, this happens at **build time** (during `next build` static generation) — there is no runtime filesystem read. Editing a `.md` file requires a rebuild (or in dev mode, a hot reload).

The cheatsheet, notes, next, and glossary pages have not been migrated to `content/`. They have a single source of truth (their `.tsx` file) and the JSX layout is intentionally bespoke per page. If they start drifting or you find yourself editing the prose often, migrate them using the same frontmatter pattern.

## The `Act` schema

Defined in `lib/content.ts`. Every field below must be present in `content/acts/0N.md` frontmatter unless marked optional.

```ts
type Act = {
  num: number;              // 1–6, used for sorting and display
  slug: string;             // URL slug, currently same as num as a string ("1")
  title: string;            // "The Email You've Been Avoiding"
  reaction: string;         // Audience reaction quote (currently unused on site, kept for parity with runsheet)
  capability: string;       // Full capability name, e.g. "Reasoning over context (incl. multimodal)"
  capabilityShort: string;  // Short name for cards/nav, e.g. "Reasoning over context"
  oneLiner: string;         // Single-sentence pitch — shown on homepage cards and act page hero
  timeRange: string;        // "3:00 – 11:00" — display only
  point: string;            // The "what's the underlying capability" paragraph
  whatYouSee: string[];     // Ordered list of demo steps
  prompts: Prompt[];        // Each prompt the presenter runs in this act
  watchFor: string;         // "Notice this" callout
  whyItMatters: string;     // "Here's why" callout
  tryThis: string;          // "Audience: try this yourself" callout
  ahaMoment: string;        // The capstone insight
  tryThisPrompt?: string;   // Optional follow-up prompt for the audience
};

type Prompt = {
  label: string;
  surface: "claude" | "desktop" | "cowork" | "phone" | "deepresearch";
  text: string;
};
```

The `surface` enum drives the surface label badge on `<PromptBlock>`. New surfaces require adding to the type union in `lib/content.ts` AND updating any switch/map in `components/PromptBlock.tsx`.

## YAML conventions in `content/acts/*.md`

- Use `>-` (folded, strip trailing newline) for prose fields. Newlines fold into spaces, so you can wrap at 80 columns for readability.
- Use plain quoted strings for one-line fields with apostrophes: `title: "The Email You've Been Avoiding"`.
- Use a normal YAML list (`- "item"`) for `whatYouSee` and `prompts`.
- The body of each `.md` file (everything after the second `---`) is **not parsed** — use it for a friendly GitHub header. The loader only reads `data` from `gray-matter`, not `content`.

## Common tasks

### Add a seventh act

1. Create `content/acts/07.md` matching the existing schema. Set `num: 7`, `slug: "7"`.
2. That's it. The loader sorts by `num`, the homepage renders all acts, and `/acts/7` works automatically because `generateStaticParams` iterates over `acts`.

### Add a Desk workflow

The Desk (`/desk`) is the investment-PM persona section. Same pattern as acts, different schema (`Workflow`, defined in `lib/content.ts`).

1. Create `content/workflows/0N.md` with all `Workflow` fields in frontmatter: `num`, `slug`, `title`, `capability`, `capabilityShort`, `actLink` (which act it extends, e.g. `"Act 5 · Parallel execution"`), `oneLiner`, `timeOfDay`, `job`, `whatYouSee[]`, `prompts[]`, `wiring[]` (list of `{ label, value }` — the "how it's wired" block, uses **real** plugin/skill/connector names from `anthropics/financial-services`), `constraint` (the hard rule it teaches), `ahaMoment`.
2. The loader sorts by `num`; the index and `/desk/N` render automatically via `generateStaticParams`.
3. Keep the realism discipline: every workflow names its hard constraint (citations, licensing, MNPI, look-ahead, or the recommend-not-execute bright line). A finance workflow without one reads as naive.

**New prompt surfaces** were added to the `Prompt` union for The Desk: `claudecode`, `scheduled`, `excel`. As always, a new surface needs both the union in `lib/content.ts` AND the `surfaceLabels` map in `components/PromptBlock.tsx`.

### Change a prompt

Edit the relevant `prompts:` entry in `content/acts/0N.md`. Be careful with YAML indentation — prompts are a list of objects; indent fields under each `- label:` by 4 spaces.

### Rename an act

Change `title:` in the frontmatter. The slug stays the same to preserve URLs unless you also change `slug:` — but then any external links break.

### Add a new ancillary page (e.g. `/faq`)

Create `app/faq/page.tsx` with a default-exported React component. Import shared utilities from `lib/content.ts` if relevant. Add a `<Link>` to it from `components/Nav.tsx` if it should be in the top nav.

### Migrate cheatsheet/notes/next/glossary to markdown

Same pattern as acts: create `content/<page>.md` with structured fields in frontmatter, add a loader function in `lib/content.ts`, refactor the `.tsx` to import from `lib/content.ts`. Use the existing `loadActs` as a template. Don't remove the page-specific layout — only move data.

## Styling conventions

- **Design tokens** live in `app/globals.css` as CSS custom properties (`--color-bg`, `--color-ink`, `--color-accent`, etc.). Light/dark themes swap them via the `[data-theme="dark"]` selector.
- **Typography classes**: `.display` (Instrument Serif italic for headings), `.label-mono` (monospace small caps for labels), `.eyebrow` (above-headline meta).
- **Layout containers**: `.container-wide` (homepage), `.container-narrow` (article pages).
- Tailwind utilities are used for everything else. Don't introduce a separate component library.

## Writing style

The site speaks in Les Teo's voice (see `~/.claude/CLAUDE.md` and `WRITING_STYLE.md` if available). When editing copy:

- **Lean, evidence-anchored.** Every sentence earns its place.
- **Plain words over impressive ones.** "Use" not "utilize." "Help" not "facilitate."
- **Closing lines are weapons.** Land hard.
- **Avoid:** "delve," "robust," "holistic," "innovative," "best-in-class," "It is important to note that," throat-clearing intros, vague optimism endings.
- **Use contractions.** Don't, won't, you'll.
- **Vary sentence length.** Short sentences punch.

## Build and deploy

- `npm run dev` — Turbopack dev server, hot reload includes `content/` edits
- `npm run build` — Production build. Runs TypeScript check, generates static pages
- `npm run lint` — ESLint
- Deploys auto-trigger on push to `main` via Vercel

The site is fully static (no runtime API calls, no database). All pages prerender at build time.

## Things to NOT do

- **Don't put `content/` in `.vercelignore`** — the build needs it.
- **Don't put `content/` files in `app/`** — they'd be treated as routes.
- **Don't put `content/` files in `public/`** — they'd be served at `/runsheet.md`, exposing the presenter script.
- **Don't add prose fields without updating the `Act` type** in `lib/content.ts`. The cast `data as Act` will silently accept extra fields but TS won't see them.
- **Don't change `slug` values** without checking external links / search indexing. Prefer adding new acts over renaming.
- **Don't render `runsheet.md` on the site** unless explicitly requested. It's presenter material; rendering it would confuse the audience-facing site.
- **Don't introduce a CMS, MDX, or react-markdown** unless the user asks. The current approach (frontmatter only, plain TSX rendering) is intentional.
- **Don't bypass the loader.** If a page needs act data, import from `lib/content.ts` — don't read `content/acts/*.md` directly from a page component.

## Repo lineage

This repo absorbed the contents of a sibling folder (`~/data/Projects/ai_tutorial/`) that originally held HTML prototypes and the runsheet. That folder has been deleted; everything that mattered lives here now. If you see references to "the old folder," they refer to that deleted source.
