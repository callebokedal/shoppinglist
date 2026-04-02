import { useDataStore } from '../store/data.store'
import { useTranslation } from '../hooks/useTranslation'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/common/EmptyState'
import { StatsSummary } from '../features/statistics/StatsSummary'
import { TopItemsChart } from '../features/statistics/TopItemsChart'
import { FrequencyChart } from '../features/statistics/FrequencyChart'

export default function StatisticsPage() {
  const { t } = useTranslation()
  const records = useDataStore(s => s.purchaseRecords)
  const items = useDataStore(s => s.items)

  return (
    <div>
      <PageHeader title={t('stats.title')} />
      {records.length === 0 ? (
        <EmptyState title={t('stats.empty')} hint={t('stats.emptyHint')} />
      ) : (
        <>
          <StatsSummary records={records} />
          <TopItemsChart records={records} items={items} />
          <FrequencyChart records={records} />
        </>
      )}
    </div>
  )
}
