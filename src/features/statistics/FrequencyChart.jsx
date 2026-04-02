import { useTranslation } from '../../hooks/useTranslation'
import { getWeeklyFrequency } from '../../services/statistics.service'

/**
 * @param {{ records: import('../../types/models').PurchaseRecord[] }} props
 */
export function FrequencyChart({ records }) {
  const { t } = useTranslation()
  const weeks = getWeeklyFrequency(records)
  const max = Math.max(...weeks.map(w => w.count), 1)

  return (
    <section className="px-4 pb-6">
      <h2 className="text-sm font-medium text-zinc-500 mb-3">{t('stats.frequency')}</h2>
      <div className="flex items-end gap-1 h-20">
        {weeks.map(({ week, count }) => (
          <div
            key={week}
            className="flex-1 flex flex-col items-center justify-end gap-0.5"
            title={`${week}: ${count}`}
          >
            <div
              className="w-full bg-emerald-400 rounded-t transition-all"
              style={{ height: `${Math.max((count / max) * 100, count > 0 ? 8 : 0)}%` }}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-400 mt-1 text-center">← 12 {t('stats.frequency').includes('vecka') ? 'veckor' : 'weeks'}</p>
    </section>
  )
}
