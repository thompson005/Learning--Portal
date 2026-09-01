/** Shared stagger timing for diagram sub-element reveals — one formula, not one per diagram type. */
export function staggerDelay(i: number, stepMs = 70, cap = 8) {
  return Math.min(i, cap) * stepMs
}
