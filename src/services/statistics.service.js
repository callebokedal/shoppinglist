import { isoWeekLabel } from '../utils/date'

/**
 * Aggregate purchase records into per-item counts.
 * @param {import('../types/models').PurchaseRecord[]} records
 * @param {import('../types/models').Item[]} items
 * @returns {{ itemId: string, name: string, count: number }[]} sorted by count desc
 */
export function getTopItems(records, items) {
  const counts = {}
  for (const r of records) {
    counts[r.itemId] = (counts[r.itemId] ?? 0) + 1
  }
  return Object.entries(counts)
    .map(([itemId, count]) => ({
      itemId,
      name: items.find(i => i.id === itemId)?.name ?? itemId,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Aggregate purchase records by ISO week.
 * @param {import('../types/models').PurchaseRecord[]} records
 * @param {number} [weeksBack=12]
 * @returns {{ week: string, count: number }[]} ordered oldest → newest
 */
export function getWeeklyFrequency(records, weeksBack = 12) {
  const now = new Date()
  const weeks = {}

  // Pre-fill last N weeks with zero
  for (let i = weeksBack - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i * 7)
    weeks[isoWeekLabel(d)] = 0
  }

  for (const r of records) {
    const label = isoWeekLabel(new Date(r.date))
    if (label in weeks) {
      weeks[label] += 1
    }
  }

  return Object.entries(weeks).map(([week, count]) => ({ week, count }))
}

/**
 * Count total unique items ever bought.
 * @param {import('../types/models').PurchaseRecord[]} records
 * @returns {number}
 */
export function countUniqueItemsBought(records) {
  return new Set(records.map(r => r.itemId)).size
}
