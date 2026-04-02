/**
 * Parse an import text block into structured rows.
 * Each non-empty line is: name[, unit[, category]]
 *
 * @param {string} text
 * @param {import('../types/models').Category[]} categories
 * @returns {{ name: string, unit: string, categoryId: string|null, categoryIgnored: boolean }[]}
 */
export function parseImportText(text, categories) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const parts = line.split(',').map(p => p.trim())
      const name = parts[0]
      const unit = parts[1] || 'st'
      const categoryName = parts[2] || ''

      let categoryId = null
      let categoryIgnored = false

      if (categoryName) {
        const match = categories.find(
          c => c.name.toLowerCase() === categoryName.toLowerCase()
        )
        if (match) {
          categoryId = match.id
        } else {
          categoryIgnored = true
        }
      }

      return { name, unit, categoryId, categoryIgnored }
    })
    .filter(row => row.name.length > 0)
}
