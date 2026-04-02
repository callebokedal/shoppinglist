import { DEFAULT_STORE_ID } from '../types/models'

/**
 * Sort shopping list entries by the active store's item order.
 * Items not in the store's order appear at the bottom (preserving insertion order among them).
 *
 * @param {import('../types/models').ShoppingListEntry[]} entries
 * @param {string|null} activeStoreId
 * @param {import('../types/models').Store[]} stores
 * @returns {import('../types/models').ShoppingListEntry[]}
 */
export function sortEntries(entries, activeStoreId, stores) {
  const storeId = activeStoreId ?? DEFAULT_STORE_ID
  const store = stores.find(s => s.id === storeId)
  const order = store?.itemOrder ?? []

  return [...entries].sort((a, b) => {
    const ai = order.indexOf(a.itemId)
    const bi = order.indexOf(b.itemId)
    const aIdx = ai === -1 ? Infinity : ai
    const bIdx = bi === -1 ? Infinity : bi
    if (aIdx !== bIdx) return aIdx - bIdx
    // Preserve insertion order for items with equal positions
    return a.addedAt - b.addedAt
  })
}
