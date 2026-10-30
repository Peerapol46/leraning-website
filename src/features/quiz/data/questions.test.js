import test from 'node:test'
import assert from 'node:assert/strict'
import { QUESTION_BANKS, CHOICE_LABELS } from './questions.js'

test('Thai choice labels and balanced answer positions across all four quizzes', () => {
  assert.deepEqual(CHOICE_LABELS, ['ก', 'ข', 'ค', 'ง'])
  const total = [0, 0, 0, 0]
  for (const quizzes of Object.values(QUESTION_BANKS)) {
    for (const questions of Object.values(quizzes)) {
      assert.equal(questions.length, 10)
      const counts = [0, 0, 0, 0]
      for (const question of questions) {
        assert.equal(question.choices.length, 4)
        assert.equal(new Set(question.choices).size, 4)
        assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4)
        assert.ok(question.q && question.why && question.choices[question.answer])
        counts[question.answer]++
        total[question.answer]++
      }
      assert.ok(counts.every((count) => count === 2 || count === 3))
    }
  }
  assert.deepEqual(total, [10, 10, 10, 10])
})
