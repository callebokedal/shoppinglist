import { useTranslation } from '../hooks/useTranslation'
import { PageHeader } from '../components/layout/PageHeader'
import { StoreList } from '../features/stores/StoreList'

export default function StoresPage() {
  const { t } = useTranslation()
  return (
    <div>
      <PageHeader title={t('stores.title')} />
      <StoreList />
    </div>
  )
}
