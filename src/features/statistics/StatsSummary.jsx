import { useTranslation } from '../../hooks/useTranslation'
import { countUniqueItemsBought } from '../../services/statistics.service'

/**
 * @param {{ records: import('../../types/models').PurchaseRecord[] }} props
 */
export function StatsSummary({ records }) {
  const { t } = useTranslation()
  const unique = countUniqueItemsBought(records)

  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      <div className="bg-white rounded-xl p-4 border border-zinc-100">
        <p className="text-2xl font-bold text-zinc-900">{records.length}</p>
        <p className="text-xs text-zinc-500 mt-1">{t('stats.totalPurchases')}</p>
      </div>
      <div className="bg-white rounded-xl p-4 border border-zinc-100">
        <p className="text-2xl font-bold text-zinc-900">{unique}</p>
        <p className="text-xs text-zinc-500 mt-1">{t('stats.uniqueItems')}</p>
      </div>
    </div>
  )
}
