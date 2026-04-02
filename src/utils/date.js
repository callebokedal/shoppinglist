/**
 * Format an ISO 8601 date string for display.
 * @param {string|null} isoDate
 * @param {string} [locale='sv-SE']
 * @returns {string}
 */
export function formatDate(isoDate, locale = 'sv-SE') {
  if (!isoDate) return '—'
  const date = new Date(isoDate)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Get the start of the ISO week for a given date (Monday).
 * @param {Date} date
 * @returns {Date}
 */
export function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1 - day)
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Return a YYYY-WW string (ISO week label) for a date.
 * @param {Date} date
 * @returns {string}
 */
export function isoWeekLabel(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`
}
