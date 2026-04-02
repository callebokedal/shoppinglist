import { useTranslation } from '../hooks/useTranslation'
import { PageHeader } from '../components/layout/PageHeader'
import { ItemList } from '../features/items/ItemList'

export default function ItemsPage() {
  const { t } = useTranslation()
  return (
    <div>
      <PageHeader title={t('items.title')} />
      <ItemList />
    </div>
  )
}
