import { acts, workflows } from "../lib/content.ts";
import { loadCourse } from "../lib/course/load.ts";
import { validateCourse } from "../lib/course/validate.ts";

const course = loadCourse();
validateCourse(course);

console.log(
  `Content validation passed: ${acts.length} acts, ${workflows.length} workflows; ${course.lessons.length} course lesson(s).`,
);
