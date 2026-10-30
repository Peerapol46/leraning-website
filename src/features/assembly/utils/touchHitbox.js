// Enlarge thin parts without covering the neighboring loose-part centers.
export function touchHitboxSize([width, height, depth]) {
  return [Math.max(width + 0.12, 0.72), Math.max(height, 0.25), Math.max(depth + 0.12, 0.72)]
}
