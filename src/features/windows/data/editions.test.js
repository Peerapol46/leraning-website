import assert from 'node:assert/strict'
import test from 'node:test'
import { EDITION_OPTIONS, TARGET_EDITIONS, WINDOWS_EDITIONS, isCorrectEdition, editionMismatchMessage, SIMULATED_PC } from './editions.js'
import { partitionTypeLabel } from '../utils/partitionPresentation.js'
import { isInstallTarget, isValidPartitionSize } from '../utils/partitionValidation.js'

test('installation rejects deleted, missing, system, other-disk and unselected targets', () => {
  const target = { id: 'windows-partition', type: 'Primary', drive: 0 }
  assert.equal(isInstallTarget(target, target.id), true)
  for (const partition of [undefined, { ...target, type: 'Unallocated' }, { ...target, type: 'System' }, { ...target, drive: 1 }, { ...target, id: 'another-primary' }]) {
    assert.equal(isInstallTarget(partition, target.id), false)
  }
})

test('Extend uses adjacent free space as its limit, even when larger than the Primary', () => {
  const dialog = { type: 'extend', partition: { total: 1024 }, freeSpace: { total: 31242 } }
  assert.equal(isValidPartitionSize(dialog, 31242), true)
  assert.equal(isValidPartitionSize(dialog, 2000), true)
  for (const size of [31243, 0, -1, 1.5, NaN, Infinity]) assert.equal(isValidPartitionSize(dialog, size), false)
  assert.equal(isValidPartitionSize({ ...dialog, freeSpace: null }, 1), false)
})

test('New partition cannot exceed its source free space', () => {
  const dialog = { type: 'new', partition: { total: 32766 } }
  assert.equal(isValidPartitionSize(dialog, 32766), true)
  assert.equal(isValidPartitionSize(dialog, 32767), false)
  assert.equal(isValidPartitionSize(null, 1), false)
})

test('all four target editions are offered, including Enterprise', () => {
  assert.deepEqual(TARGET_EDITIONS, ['Windows 10 Home', 'Windows 10 Pro', 'Windows 10 Enterprise', 'Windows 10 Education'])
  assert.equal(EDITION_OPTIONS.length, 4)
  assert.ok(EDITION_OPTIONS.every((edition) => edition.audience && edition.description))
})

test('installation accepts only the edition matching the selected task', () => {
  for (const target of TARGET_EDITIONS) {
    for (const selected of WINDOWS_EDITIONS) {
      assert.equal(isCorrectEdition(selected, target), selected === target)
    }
    assert.equal(isCorrectEdition('', target), false)
  }
  assert.equal(isCorrectEdition('invalid', 'invalid'), false)
})

test('Setup contains unique distractors, which cannot become practice targets', () => {
  assert.ok(WINDOWS_EDITIONS.length > TARGET_EDITIONS.length)
  assert.equal(new Set(WINDOWS_EDITIONS).size, WINDOWS_EDITIONS.length)
  for (const edition of WINDOWS_EDITIONS.filter((name) => !TARGET_EDITIONS.includes(name))) {
    assert.equal(isCorrectEdition(edition, edition), false)
  }
})

test('wrong or empty selections produce Thai feedback with the target edition', () => {
  for (const selected of ['', 'Windows 10 Pro N']) {
    const message = editionMismatchMessage(selected, 'Windows 10 Pro')
    assert.match(message, /\p{Script=Thai}/u)
    assert.ok(message.includes('Windows 10 Pro'))
    assert.ok(!message.includes('Please select'))
  }
})

test('Unallocated Type is blank while System and Primary remain visible', () => {
  const initial = { type: 'Unallocated', name: 'Drive 0 Unallocated Space' }
  assert.equal(partitionTypeLabel(initial), '')
  assert.equal(initial.type, 'Unallocated')
  assert.equal(partitionTypeLabel({ type: 'System' }), 'System')
  assert.equal(partitionTypeLabel({ type: 'Primary' }), 'Primary')
  assert.equal(partitionTypeLabel({ ...initial, name: 'Remaining Unallocated Space' }), '')
})

test('simulated system memory matches the lesson BIOS', () => {
  assert.equal(SIMULATED_PC.ram, '16.0 GB')
  assert.match(SIMULATED_PC.systemType, /64-bit/)
})
