import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentDisclosure } from "@/components/course/AssessmentDisclosure";
import { CourseReleaseBanner } from "@/components/course/CourseReleaseBanner";
import { HarnessStatus } from "@/components/course/HarnessStatus";
import { HarnessSwitcher } from "@/components/course/HarnessSwitcher";
import { SharedScenario } from "@/components/course/SharedScenario";
import { SourceDisclosure } from "@/components/course/SourceDisclosure";
import { VariantDisclosure } from "@/components/course/VariantDisclosure";
import { MaterialViewer } from "@/components/course/MaterialViewer";
import { loadCourse, loadScenarioArtifactText } from "@/lib/course/load";
import {
  isHarness,
  learnDashboardPath,
  listLessonRouteParams,
  resolveLessonView,
} from "@/lib/course/view-model";
import { validateCourse } from "@/lib/course/validate";

export const dynamicParams = false;

export function generateStaticParams() {
  const bundle = loadCourse();
  validateCourse(bundle);
  return listLessonRouteParams(bundle);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harness: string; lesson: string }>;
}): Promise<Metadata> {
  const { harness, lesson } = await params;
  return {
    title: isHarness(harness) ? `${lesson} — ${harness} path` : "Learner lesson",
    robots: { index: false, follow: false },
  };
}

export default async function LearnerLessonPage({
  params,
}: {
  params: Promise<{ harness: string; lesson: string }>;
}) {
  const { harness, lesson } = await params;
  if (!isHarness(harness)) notFound();
  const bundle = loadCourse();
  validateCourse(bundle);
  const view = resolveLessonView(bundle, harness, lesson);
  if (!view) notFound();
  const materials = view.scenario.portability.artifacts.map((artifact) => ({
    id: artifact.id,
    content: loadScenarioArtifactText(bundle.root, view.scenario, artifact.id),
  }));

  return (
    <article className="container-narrow py-12">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link className="link" href="/start">Start</Link>
        <span aria-hidden> / </span>
        <Link className="link capitalize" href={learnDashboardPath(harness)}>{harness}</Link>
      </nav>
      <CourseReleaseBanner courseStatus={view.course.releaseStatus} lessonStatus={view.lesson.releaseStatus} />
      <header className="mt-10">
        <p className="eyebrow">Lesson {String(view.lesson.num).padStart(2, "0")} · selected path</p>
        <h1 className="display text-5xl mt-4 mb-4">{view.lesson.title}</h1>
        <p className="text-xl text-ink-soft">{view.lesson.summary}</p>
      </header>
      <div className="mt-8">
        <HarnessSwitcher current={harness} lessonSlug={view.lesson.slug} />
      </div>
      <div className="mt-5">
        <HarnessStatus harness={harness} status={view.status} reason={view.statusReason} />
      </div>
      <SharedScenario lesson={view.lesson} scenario={view.scenario} />
      <section className="mt-8 card p-5" aria-label="Cumulative artifact chain">
        <p className="label-mono mb-2">Artifact chain</p>
        <p className="m-0 text-sm text-ink-soft">The lessons build on one another: bounded brief → cited notes → useful artifact → data flow → change record → verification and handoff. You can inspect any lesson, but later lessons use the records created earlier.</p>
      </section>
      <section className="mt-6 card p-5" aria-labelledby="self-paced-heading">
        <p className="label-mono mb-2">Self-paced lesson</p>
        <h2 id="self-paced-heading" className="display text-2xl">What you will make</h2>
        <p className="text-ink-soft">{view.lesson.sharedOutcome}</p>
        <p className="m-0 text-sm text-ink-soft">
          {view.lesson.num === 1
            ? "Lesson 1 starts from the supplied local material below."
            : "Lessons 2 through 6 may use your prior artifact or the supplied local checkpoint material below."}
          {" "}You may pause after any step and return through this stable lesson URL.
        </p>
      </section>
      {materials.map((material) => <MaterialViewer key={material.id} title={material.id.replaceAll("-", " ")} content={material.content} />)}
      <AssessmentDisclosure lesson={view.lesson} />
      <SourceDisclosure sources={view.sources} statusReason={view.statusReason} />
      <VariantDisclosure variant={view.variant} />
    </article>
  );
}
