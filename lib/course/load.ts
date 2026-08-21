import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import type { Comparison, Course, CourseBundle, Lesson, Scenario, SourceRegistry } from "./types";

function readYaml<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const value = loadYaml(raw);
  if (value === undefined || value === null) {
    throw new Error(`Expected YAML object in ${filePath}`);
  }
  return value as T;
}

function yamlFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .sort();
}

export function courseRootFromCwd(cwd = process.cwd()): string {
  return path.join(cwd, "content");
}

export function loadScenarioArtifactText(
  root: string,
  scenario: Scenario,
  artifactId: string,
): string | null {
  const artifact = scenario.portability.artifacts.find((candidate) => candidate.id === artifactId);
  if (!artifact) return null;
  const fullPath = path.resolve(root, artifact.learnerVisiblePath);
  if (!fullPath.startsWith(`${path.resolve(root)}${path.sep}`)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

export function loadCourse(root = courseRootFromCwd()): CourseBundle {
  const course = readYaml<Course>(path.join(root, "course.yaml"));
  const sources = yamlFiles(path.join(root, "sources")).map((file) =>
    readYaml<SourceRegistry>(path.join(root, "sources", file)),
  );
  const lessons = yamlFiles(path.join(root, "lessons")).map((file) =>
    readYaml<Lesson>(path.join(root, "lessons", file)),
  );

  const scenariosDirectory = path.join(root, "scenarios");
  const scenarios = fs.existsSync(scenariosDirectory)
    ? fs
        .readdirSync(scenariosDirectory)
        .sort()
        .flatMap((name) => {
          const scenarioPath = path.join(scenariosDirectory, name, "scenario.yaml");
          return fs.existsSync(scenarioPath) ? [readYaml<Scenario>(scenarioPath)] : [];
        })
    : [];

  const comparisons = yamlFiles(path.join(root, "comparison")).map((file) =>
    readYaml<Comparison>(path.join(root, "comparison", file)),
  );

  return { root, course, sources, scenarios, lessons, comparisons };
}
