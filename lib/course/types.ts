export const HARNESSES = ["claude", "codex", "hermes", "pi"] as const;
export type Harness = (typeof HARNESSES)[number];

export const PARTS = [1, 2, 3] as const;
export type PartNum = (typeof PARTS)[number];

/** A variant is verified only when the command was run on a real machine and
 *  its output recorded. Everything else is a draft, and says so. */
export type VariantStatus = "verified" | "draft";

export type HarnessMeta = {
  id: Harness;
  name: string;
  vendor: string;
  /** Non-interactive invocation, e.g. `claude -p`. */
  oneShot: string;
  installCommand: string;
  docsUrl: string;
  /** Search term for finding install walkthroughs. */
  videoSearch: string;
  verifyCommand: string;
  /** Real recorded output of verifyCommand, or null when unverified. */
  verifyOutput: string | null;
  verifiedVersion: string | null;
  blurb: string;
  prerequisites: string;
  videos: VideoLink[];
};

export type VideoLink = {
  title: string;
  url: string;
};

/** One row of the cross-harness equivalence table. */
export type EquivalenceRow = {
  concept: string;
  claude: string;
  codex: string;
  hermes: string;
  pi: string;
  note?: string;
};

export type Part = {
  num: PartNum;
  slug: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  premise: string;
  summary: string;
};

export type Step = {
  title: string;
  body: string;
};

export type Invariant = {
  id: string;
  description: string;
};

/** The worked example: one harness shown end to end. */
export type WorkedExample = {
  harness: Harness;
  why: string;
  command: string;
  expected: string;
  status: VariantStatus;
  verifiedOn?: string;
  harnessVersion?: string;
  realOutput?: string;
};

/** How the same job is expressed on a harness that isn't the worked example. */
export type HarnessNote = {
  harness: Harness;
  equivalent: string;
  caution?: string;
};

export type Lesson = {
  num: number;
  part: PartNum;
  slug: string;
  title: string;
  /** The job, in the reader's words. */
  job: string;
  summary: string;
  /** Why this lesson exists where it does in the sequence. */
  why: string;
  steps: Step[];
  outcome: string;
  boundary: string;
  invariants: Invariant[];
  workedExample: WorkedExample;
  harnessNotes: HarnessNote[];
  equivalence?: EquivalenceRow[];
  failureMode: string;
  recovery: string;
  humanReview: string[];
  /** Optional closing insight. */
  takeaway?: string;
};

export type CourseBundle = {
  root: string;
  title: string;
  parts: Part[];
  lessons: Lesson[];
  harnesses: HarnessMeta[];
};
