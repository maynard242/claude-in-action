# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Architecture guide

Reference for agents working in this repo. Read this before editing. The README is for humans.

## What this repo is

A Next.js 16 site rendering *Practical AI Agents*: a course on getting work you can trust out of an AI agent. Eighteen lessons in three parts, beginner to advanced, written to work on four harnesses (Claude Code, Codex CLI, Hermes Agent, Pi).

The pedagogy: each lesson teaches a job, shows one harness worked end to end, then states the equivalent for the other three. The judgement transfers; the flags do not.

Part 1 is written and verified. Parts 2 and 3 are declared in `content/parts.yaml` with no lessons yet.

Deploys to the Vercel project `harnesses-in-action` on push to `main`. The GitHub repo is still named `claude-in-action`; that mismatch is expected.

## File roles

| Path | What it owns |
|---|---|
| `app/page.tsx` | Homepage: hero, the three parts with lesson cards, the four harnesses, the verified-count claim |
| `app/learn/page.tsx` | Course index, all three parts with their lessons |
| `app/learn/[lesson]/page.tsx` | One lesson. Steps, worked example, harness notes, invariants, failure and recovery |
| `app/learn/part/[part]/page.tsx` | One part, listing its lessons |
| `app/install/page.tsx` | Setup index, one card per harness |
| `app/install/[harness]/page.tsx` | Per-harness setup: prerequisites, docs link, install command, verify command with real output, video searches |
| `app/glossary/page.tsx` | Term definitions. Content is a plain array at the top of the file |
| `app/layout.tsx` | Fonts, theme init script, Nav, Footer. Wraps children in the single `<main>`, so pages must not add their own |
| `app/globals.css` | Tokens and utility classes (`.display`, `.label-mono`, `.eyebrow`, `.card`, `.callout`, `.link`) |
| `components/course/WorkedExample.tsx` | Renders the command, expected result, and either real recorded output or a not-yet-run notice |
| `components/course/HarnessNotes.tsx` | The other three harnesses, with cautions |
| `components/course/LessonNav.tsx` | Previous and next across all lessons |
| `lib/course/types.ts` | `Lesson`, `Part`, `HarnessMeta`, `WorkedExample`, `HarnessNote`. `HARNESSES` is the single source of truth for harness ids |
| `lib/course/load.ts` | Reads and validates content at build time. Throws on malformed content |
| `lib/course/view.ts` | Ordering, lookup, path helpers, verified counts |
| `content/parts.yaml` | The three parts |
| `content/harnesses.yaml` | The four harnesses, with verified versions and install detail |
| `content/lessons/*.yaml` | One file per lesson. Canonical source for all lesson copy |
| `content/fixtures/` | Synthetic teaching material the lessons operate on |

## The verified/draft rule

This is the honesty mechanism and the thing most likely to be broken by a careless edit.

A `workedExample` may be `status: verified` only if the command was actually run and its output recorded. That requires `verifiedOn`, `harnessVersion`, and `realOutput`. The loader throws if any are missing, and the page renders a "not yet run" notice for drafts.

Do not mark a lesson verified without running its command. Do not paste plausible-looking output. If you cannot run it, leave it `draft`; the site says so on the page and that is the intended behaviour.

Harness versions verified 2026-08-22: Claude Code 2.1.238, Codex CLI 0.149.0, Hermes Agent 0.20.4, Pi 0.83.0.

## Harness facts worth not getting wrong

| Concept | Claude | Codex | Hermes | Pi |
|---|---|---|---|---|
| Non-interactive | `claude -p` | `codex exec` | `hermes -z` | `pi -p` |
| Look, don't touch | `--permission-mode plan` | `-s read-only` | narrow `-t` toolset | `--no-tools` |
| Restrict tools | `--allowedTools` / `--disallowedTools` | `sandbox_permissions` | `hermes tools disable` | `--tools` / `--exclude-tools` |
| Dry-run an approval | not available | not available | `hermes approvals test` | not available |

Two traps, both found by getting them wrong first:

- Hermes `--safe-mode` is **not** a permission sandbox. It disables customizations for troubleshooting (config, memory, plugins, MCP). Do not present it as the equivalent of Codex `read-only`.
- `claude --disallowedTools` is variadic and will swallow a following prompt. Put the prompt before the flag.

## Adding a lesson

1. Create `content/lessons/NN-slug.yaml` with every field in the `Lesson` type.
2. Pick which harness carries the worked example, then write a `harnessNotes` entry for each of the other three. The loader fails the build if one is missing.
3. Run the command. Record `realOutput` verbatim with version and date, or leave it `draft`.
4. Routes generate from `generateStaticParams`. No code change needed.

## Writing style

Every word goes through the `humanizer` skill. In practice:

- No em or en dashes. Use commas, colons, periods, or parentheses.
- No bold mini-headings in lists.
- Plain verbs. "is" and "has" over "serves as" and "boasts".
- Vary sentence length. Avoid rows of dramatic fragments.
- Banned: delve, robust, holistic, leverage, innovative, best-in-class, transformative, tapestry, "it is important to note".
- Land the closing line. No vague optimism.

## Things to NOT do

- Do not add a `<main>` to a page. `app/layout.tsx` provides it, and a second one creates two landmarks.
- Do not mark a worked example verified without running it.
- Do not hardcode the harness list. Import `HARNESSES` from `lib/course/types.ts`.
- Do not put `content/` in `.vercelignore`; the build needs it.
- Do not render `content/runsheet.md`. It is a leftover presenter script from the previous version of this site, kept for reference only.
- Do not introduce a CMS, MDX, or react-markdown. Frontmatter-style YAML plus plain TSX is deliberate.
- Do not reintroduce the SHA-256 evidence chain. It gated every lesson into an unrunnable state and blocked the build.

## Build and deploy

```bash
npm run dev      # Turbopack, hot reloads content/ edits
npm run build    # Type check plus content validation
npm run lint
```

Static throughout. Every page prerenders; content is read at build time, never at runtime.
