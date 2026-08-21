import type { CourseBundle, Harness, HarnessVariant, Lesson } from "./types";

export const PRIMARY_HARNESSES = ["claude", "codex", "hermes"] as const;

export function orderedLessons(bundle: CourseBundle): Lesson[] {
  return [...bundle.lessons].sort((left, right) => left.num - right.num);
}

export function getLesson(bundle: CourseBundle, slug: string): Lesson | undefined {
  return bundle.lessons.find((lesson) => lesson.slug === slug);
}

export function getVariant(
  lesson: Lesson,
  harness: Harness,
): HarnessVariant | undefined {
  return lesson.variants.find((variant) => variant.harness === harness);
}
