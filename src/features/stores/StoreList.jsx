import { useState } from 'react'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'
import { EmptyState } from '../../components/common/EmptyState'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import { StoreForm } from './StoreForm'
import { StoreCard } from './StoreCard'
import { DEFAULT_STORE_ID } from '../../types/models'

export function StoreList() {
  const { t } = useTranslation()
  const stores = useDataStore(s => s.stores).filter(st => st.id !== DEFAULT_STORE_ID)
  const addStore = useDataStore(s => s.addStore)
  const [addOpen, setAddOpen] = useState(false)

  return (
    <>
      <div className="px-4 py-3">
        <Button onClick={() => setAddOpen(true)}>{t('stores.add')}</Button>
      </div>

      {stores.length === 0 ? (
        <EmptyState title={t('stores.empty')} hint={t('stores.emptyHint')} />
      ) : (
        <ul>
          {stores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </ul>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t('stores.add')}>
        <StoreForm
          onSubmit={({ name, categoryIds }) => { addStore(name, categoryIds); setAddOpen(false) }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>
    </>
  )
}
