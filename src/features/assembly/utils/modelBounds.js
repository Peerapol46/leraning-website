import { Box3, Vector3 } from 'three'

export function modelBounds(meshes) {
  const box = new Box3()
  for (const { geometry } of meshes) {
    geometry.computeBoundingBox()
    box.union(geometry.boundingBox)
  }
  if (box.isEmpty()) return null
  return { center: box.getCenter(new Vector3()).toArray(), size: box.getSize(new Vector3()).toArray() }
}
