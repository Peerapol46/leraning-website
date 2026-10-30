import test from 'node:test'
import assert from 'node:assert/strict'
import { sendToGoogleSheets } from './googleSheets.js'

const payload = { action: 'saveQuizRecord', requestId: 'test-record-001' }
test('opaque POST does not claim confirmed success', async () => {
  let posts = 0
  const result = await sendToGoogleSheets(payload, { url: 'https://example.test/exec', receipt: async () => false, fetcher: async () => { posts++; return { type: 'opaque' } } })
  assert.equal(posts, 1)
  assert.equal(result.confirmed, false)
})
test('retry checks existing receipt and avoids another POST', async () => {
  const result = await sendToGoogleSheets(payload, { url: 'https://example.test/exec', receipt: async () => true, fetcher: async () => assert.fail('duplicate POST') })
  assert.equal(result.confirmed, true)
})
test('confirmation requires a receipt after POST', async () => {
  let receipts = 0
  const result = await sendToGoogleSheets(payload, { url: 'https://example.test/exec', receipt: async () => ++receipts === 2, fetcher: async (_url, options) => {
    assert.equal(JSON.parse(options.body).requestId, payload.requestId)
    assert.equal(options.credentials, 'omit')
  } })
  assert.equal(result.confirmed, true)
})
test('network failures and missing configuration are reported', async () => {
  await assert.rejects(sendToGoogleSheets(payload, { url: '' }))
  await assert.rejects(sendToGoogleSheets(payload, { url: 'https://example.test/exec', receipt: async () => false, fetcher: async () => { throw Error('offline') } }))
})
