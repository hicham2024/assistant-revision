import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeModule,
  normalizeRevisionType,
  REVISION_PROFILES
} from "../netlify/functions/generate-module.mjs";

const sourceText = "La photosynthèse transforme l'énergie lumineuse en énergie chimique. Les plantes utilisent l'eau et le dioxyde de carbone pour produire du glucose et du dioxygène.";

const rawModule = {
  revision_type: "complete",
  detected_level: "Collège",
  subject: "Sciences",
  source_stats: {
    word_count: 999,
    estimated_pages: 99,
    is_long_course: true
  },
  summary: {
    title: "La photosynthèse",
    main_takeaway: "Les plantes utilisent la lumière pour produire leur matière.",
    key_concepts: Array.from({ length: 10 }, (_, index) => ({ term: `concept ${index}`, definition: `définition ${index}` })),
    bullet_points: Array.from({ length: 10 }, (_, index) => `point ${index}`),
    course_sections: Array.from({ length: 10 }, (_, index) => ({ title: `section ${index}`, summary: `résumé ${index}`, key_points: [] }))
  },
  basic_exercises: Array.from({ length: 8 }, (_, index) => ({
    id: index + 10,
    type: "mcq",
    question: `question ${index}`,
    options: ["a", "b"],
    correct_answer: "a",
    explanation: "explication"
  })),
  advanced_assignment: Array.from({ length: 4 }, (_, index) => ({
    id: index + 10,
    title: `devoir ${index}`,
    instructions: "instructions",
    solution_guide: "guide"
  }))
};

test("unknown revision types fall back to complete", () => {
  assert.equal(normalizeRevisionType("unknown"), "complete");
});

test("short summaries never contain exercises, assignments or sections", () => {
  const module = normalizeModule(rawModule, sourceText, "short");
  assert.equal(module.revision_type, "short");
  assert.equal(module.basic_exercises.length, 0);
  assert.equal(module.advanced_assignment.length, 0);
  assert.equal(module.summary.course_sections.length, 0);
  assert.ok(module.summary.bullet_points.length <= REVISION_PROFILES.short.bullets);
});

test("memo sheets keep concepts and facts but no exercises", () => {
  const module = normalizeModule(rawModule, sourceText, "memo");
  assert.equal(module.revision_type, "memo");
  assert.equal(module.basic_exercises.length, 0);
  assert.equal(module.advanced_assignment.length, 0);
  assert.ok(module.summary.key_concepts.length <= REVISION_PROFILES.memo.concepts);
  assert.ok(module.summary.bullet_points.length <= REVISION_PROFILES.memo.bullets);
});

test("quick quizzes retain questions and remove assignments", () => {
  const module = normalizeModule(rawModule, sourceText, "quiz");
  assert.equal(module.revision_type, "quiz");
  assert.equal(module.advanced_assignment.length, 0);
  assert.equal(module.summary.bullet_points.length, 0);
  assert.ok(module.basic_exercises.length > 0);
  assert.ok(module.basic_exercises.length <= REVISION_PROFILES.quiz.exercises);
});

test("complete modules are bounded and source statistics are trusted locally", () => {
  const module = normalizeModule(rawModule, sourceText, "complete");
  assert.ok(module.basic_exercises.length <= REVISION_PROFILES.complete.exercises);
  assert.ok(module.advanced_assignment.length <= REVISION_PROFILES.complete.assignments);
  assert.notEqual(module.source_stats.word_count, 999);
  assert.equal(module.source_stats.estimated_pages, 1);
});

