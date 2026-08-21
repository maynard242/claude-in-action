import type {
  CourseBundle,
  Harness,
  HarnessVariant,
  Lesson,
  Scenario,
  SourceRef,
} from "./types";

const PRIMARY_HARNESSES = ["claude", "codex", "hermes"] as const;
export const INTERNAL_LESSON_SLUG = "01-bounded-brief";

type HarnessRoute = { harness: Harness };
type LessonRoute = { harness: Harness; lesson: string };

export type ResolvedLessonView = {
  course: Pick<CourseBundle["course"], "title" | "releaseStatus">;
  lesson: Lesson;
  scenario: Scenario;
  variant: HarnessVariant;
  sources: SourceRef[];
  status: HarnessVariant["status"];
  statusReason: string | null;
};

export function isHarness(value: string): value is Harness {
  return (PRIMARY_HARNESSES as readonly string[]).includes(value);
}

export function learnDashboardPath(harness: Harness): string {
  return `/learn/${harness}`;
}

export function learnLessonPath(harness: Harness, slug: string): string {
  return `${learnDashboardPath(harness)}/${slug}`;
}

export function listHarnessRouteParams(bundle: CourseBundle): HarnessRoute[] {
  return PRIMARY_HARNESSES
    .filter((harness) => bundle.course.primaryHarnesses.includes(harness))
    .map((harness) => ({ harness }));
}

export function listLessonRouteParams(bundle: CourseBundle): LessonRoute[] {
  return listHarnessRouteParams(bundle).flatMap(({ harness }) =>
    [...bundle.lessons]
      .sort((left, right) => left.num - right.num)
      .filter((lesson) => lesson.slug === INTERNAL_LESSON_SLUG)
      .filter((lesson) => lesson.variants.some((variant) => variant.harness === harness))
      .map((lesson) => ({ harness, lesson: lesson.slug })),
  );
}

function sourcesForVariant(bundle: CourseBundle, variant: HarnessVariant): SourceRef[] {
  const sourceById = new Map<string, SourceRef>();
  for (const registry of bundle.sources) {
    for (const source of registry.sources) sourceById.set(source.id, source);
  }
  return variant.sourceRefs.flatMap((sourceId) => {
    const source = sourceById.get(sourceId);
    return source ? [source] : [];
  });
}

export function resolveLessonView(
  bundle: CourseBundle,
  harness: string,
  slug: string,
): ResolvedLessonView | null {
  if (!isHarness(harness) || !bundle.course.primaryHarnesses.includes(harness)) return null;
  if (slug !== INTERNAL_LESSON_SLUG) return null;
  const lesson = bundle.lessons.find((candidate) => candidate.slug === slug);
  if (!lesson) return null;
  const scenario = bundle.scenarios.find((candidate) => candidate.id === lesson.scenario);
  if (!scenario) return null;
  const variant = lesson.variants.find((candidate) => candidate.harness === harness);
  if (!variant) return null;

  return {
    course: {
      title: bundle.course.title,
      releaseStatus: bundle.course.releaseStatus,
    },
    lesson,
    scenario,
    variant,
    sources: sourcesForVariant(bundle, variant),
    status: variant.status,
    statusReason: variant.statusReason ?? null,
  };
}
