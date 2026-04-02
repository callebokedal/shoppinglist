import { useTranslation } from '../../hooks/useTranslation'
import { getTopItems } from '../../services/statistics.service'

/**
 * @param {{ records: import('../../types/models').PurchaseRecord[], items: import('../../types/models').Item[], limit?: number }} props
 */
export function TopItemsChart({ records, items, limit = 10 }) {
  const { t } = useTranslation()
  const top = getTopItems(records, items).slice(0, limit)

  if (top.length === 0) return null

  const max = top[0].count

  return (
    <section className="px-4 pb-4">
      <h2 className="text-sm font-medium text-zinc-500 mb-3">{t('stats.topItems')}</h2>
      <ul className="space-y-2">
        {top.map(({ itemId, name, count }) => (
          <li key={itemId} className="flex items-center gap-3">
            <span className="text-sm text-zinc-700 w-32 truncate shrink-0">{name}</span>
            <div className="flex-1 bg-zinc-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 bg-emerald-500 rounded-full transition-all"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-zinc-400 w-10 text-right shrink-0">
              {t('stats.times', { count })}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
