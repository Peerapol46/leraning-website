import test from 'node:test'
import assert from 'node:assert/strict'
import { QUESTION_BANKS, CHOICE_LABELS } from './questions.js'

test('Thai choice labels and valid question structure across quizzes', () => {
  assert.deepEqual(CHOICE_LABELS, ['ก', 'ข', 'ค', 'ง'])
  for (const questions of Object.values(QUESTION_BANKS)) {
    assert.equal(questions.length, 10)
    for (const question of questions) {
      assert.equal(question.choices.length, 4)
      assert.equal(new Set(question.choices).size, 4)
      assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4)
      assert.ok(question.q && question.why && question.choices[question.answer])
    }
  }
})
