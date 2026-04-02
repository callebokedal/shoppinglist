import { useMemo } from 'react'
import { useDataStore } from '../store/data.store'

/**
 * Returns items whose name starts with (or contains) the query string.
 * @param {string} query
 * @returns {{ suggestions: import('../types/models').Item[], hasExactMatch: boolean }}
 */
export function useAutoComplete(query) {
  const items = useDataStore(s => s.items)

  const result = useMemo(() => {
    if (!query.trim()) return { suggestions: [], hasExactMatch: false }

    const q = query.trim().toLowerCase()
    const suggestions = items
      .filter(item => item.name.toLowerCase().includes(q))
      .sort((a, b) => {
        // Prefer prefix matches over contains matches
        const aStarts = a.name.toLowerCase().startsWith(q)
        const bStarts = b.name.toLowerCase().startsWith(q)
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1
        return a.name.localeCompare(b.name)
      })

    const hasExactMatch = items.some(item => item.name.toLowerCase() === q)

    return { suggestions, hasExactMatch }
  }, [items, query])

  return result
}
