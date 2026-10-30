import test from 'node:test'
import assert from 'node:assert/strict'
import { isChassisMesh } from './officePcModel.js'
import { BoxGeometry, Box3, Vector3 } from 'three'
import { modelBounds } from '../utils/modelBounds.js'
import { touchHitboxSize } from '../utils/touchHitbox.js'

test('RAM hitbox covers both offset modules and the space between them', () => {
  const first = new BoxGeometry(0.733, 0.167, 0.025)
  const second = first.clone().translate(0, 0, -0.11)
  const bounds = modelBounds([{ geometry: first }, { geometry: second }])
  assert.ok(Math.abs(bounds.center[2] + 0.055) < 0.001)
  for (const size of [bounds.size.map((n) => n + 0.06), touchHitboxSize(bounds.size)]) {
    const box = new Box3().setFromCenterAndSize(new Vector3(...bounds.center), new Vector3(...size))
    for (const geometry of [first, second]) assert.ok(box.containsBox(geometry.boundingBox))
    assert.ok(box.containsPoint(new Vector3(0, 0, -0.055)))
  }
  first.dispose(); second.dispose()
})

test('open chassis excludes the removed side cover and its floating screws', () => {
  assert.equal(isChassisMesh('cover_LP_pc_mat_0'), false)
  assert.equal(isChassisMesh('boltiki_LP_pc_mat_0'), false)
  for (const name of ['skeleton', 'upperwall', 'frontwall', 'frontpanel', 'backpanel', 'backwall', 'grid', 'misc', 'logo', 'detalka']) {
    assert.equal(isChassisMesh(name + '_LP_pc_mat_0'), true)
  }
  for (const name of ['gpu', 'cooler', 'powersupply', 'motherboard', 'ram']) {
    assert.equal(isChassisMesh(name + '_LP_pc_mat_0'), false)
  }
})
