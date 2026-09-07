import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const expectedStages = [
  'core-concepts',
  'us-residential',
  'safety-tools',
  'motors-transformers',
  'three-phase-industrial',
  'low-voltage-electronics',
];

test('quiz data has 6 stages with 20 complete questions each', async () => {
  const raw = await readFile(new URL('../src/data/quizzes.json', import.meta.url), 'utf8');
  const quizzes = JSON.parse(raw);

  assert.deepEqual(
    quizzes.map((quiz) => quiz.id),
    expectedStages,
  );

  for (const quiz of quizzes) {
    assert.equal(quiz.questions.length, 20, `${quiz.id} should have 20 questions`);
    assert.match(quiz.title, /\S/);
    assert.match(quiz.description, /\S/);

    for (const [index, question] of quiz.questions.entries()) {
      assert.match(question.prompt, /\S/, `${quiz.id} q${index + 1} has prompt`);
      assert.ok(
        question.options.length >= 2,
        `${quiz.id} q${index + 1} should have at least 2 options`,
      );
      assert.ok(
        question.answerIndex >= 0 && question.answerIndex < question.options.length,
        `${quiz.id} q${index + 1} answerIndex should point at an option`,
      );
      assert.match(question.explanation, /\S/, `${quiz.id} q${index + 1} has explanation`);
      assert.match(question.related, /^\/docs\//, `${quiz.id} q${index + 1} has docs link`);
    }
  }
});
