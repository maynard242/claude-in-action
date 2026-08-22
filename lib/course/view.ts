import type { CourseBundle, Harness, HarnessMeta, Lesson, Part, PartNum } from "./types";

export function lessonsInPart(bundle: CourseBundle, part: PartNum): Lesson[] {
  return bundle.lessons.filter((l) => l.part === part).sort((a, b) => a.num - b.num);
}

export function orderedLessons(bundle: CourseBundle): Lesson[] {
  return [...bundle.lessons].sort((a, b) => a.num - b.num);
}

export function orderedParts(bundle: CourseBundle): Part[] {
  return [...bundle.parts].sort((a, b) => a.num - b.num);
}

export function getPart(bundle: CourseBundle, num: number): Part | undefined {
  return bundle.parts.find((p) => p.num === num);
}

export function getLesson(bundle: CourseBundle, slug: string): Lesson | undefined {
  return bundle.lessons.find((l) => l.slug === slug);
}

export function getHarness(bundle: CourseBundle, id: string): HarnessMeta | undefined {
  return bundle.harnesses.find((h) => h.id === id);
}

export function harnessName(bundle: CourseBundle, id: Harness): string {
  return getHarness(bundle, id)?.name ?? id;
}

export function lessonPath(lesson: Lesson): string {
  return `/learn/${lesson.slug}`;
}

export function partPath(part: Part): string {
  return `/learn/part/${part.num}`;
}

export function installPath(harness: Harness): string {
  return `/install/${harness}`;
}

/** Previous and next lesson across the whole 18, so the sequence is walkable. */
export function neighbours(bundle: CourseBundle, lesson: Lesson) {
  const all = orderedLessons(bundle);
  const index = all.findIndex((l) => l.slug === lesson.slug);
  return {
    previous: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}

export function verifiedCount(bundle: CourseBundle): { verified: number; total: number } {
  const all = bundle.lessons;
  return {
    verified: all.filter((l) => l.workedExample.status === "verified").length,
    total: all.length,
  };
}
