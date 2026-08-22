# Practical AI Agents

A course on getting work you can trust out of an AI agent. Eighteen lessons in three parts, beginner to advanced, written to work on any of four harnesses: Claude Code, Codex CLI, Hermes Agent, and Pi.

The teaching claim is that the judgement transfers even though the flags do not. Each lesson shows one harness worked end to end, then states the equivalent for the other three.

## Status

Part 1 is written and its six worked examples have all been run on a real machine, with output, version, and date recorded on the page. Parts 2 and 3 are outlined in `content/parts.yaml` and their lessons are not yet written.

## Structure

```
ai_tutorial_site/
├── app/
│   ├── page.tsx              # Homepage
│   ├── learn/                # Course index, part pages, lesson pages
│   ├── install/              # Setup pages, one per harness
│   └── glossary/
├── components/course/        # WorkedExample, HarnessNotes, LessonNav
├── lib/course/
│   ├── types.ts              # Lesson, Part, HarnessMeta, WorkedExample
│   ├── load.ts               # Loads and validates content at build time
│   └── view.ts               # Ordering, lookup, paths
└── content/
    ├── parts.yaml            # The three parts
    ├── harnesses.yaml        # The four harnesses, with verified versions
    ├── lessons/*.yaml        # One file per lesson
    └── fixtures/             # Synthetic teaching material
```

## Verified means verified

A worked example is marked `verified` only when the command was run on a real machine and its output pasted in. That requires `verifiedOn`, `harnessVersion`, and `realOutput`, and the build fails without them. Everything else is `draft` and renders a notice saying so.

Harness versions confirmed on 2026-08-22: Claude Code 2.1.238, Codex CLI 0.149.0, Hermes Agent 0.20.4, Pi 0.83.0.

## Adding a lesson

Create `content/lessons/NN-slug.yaml` with the fields in the `Lesson` type. The loader validates on build and will tell you what is missing, including whether every harness other than the worked example has its equivalent stated. Routes generate automatically.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Type check plus content validation
npm run lint
```

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, js-yaml, TypeScript strict.

## License

Content © Leslie Teo. Code released under permissive terms.
