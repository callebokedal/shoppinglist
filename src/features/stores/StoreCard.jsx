import { useState } from 'react'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import { ConfirmDialog } from '../../components/common/ConfirmDialog'
import { StoreForm } from './StoreForm'

/**
 * @param {{ store: import('../../types/models').Store }} props
 */
export function StoreCard({ store }) {
  const { t } = useTranslation()
  const updateStore = useDataStore(s => s.updateStore)
  const deleteStore = useDataStore(s => s.deleteStore)
  const categories = useDataStore(s => s.categories)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const storeCategories = categories.filter(c => (store.categoryIds ?? []).includes(c.id))

  return (
    <>
      <li className="px-4 py-3 bg-white border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900">{store.name}</p>
            {storeCategories.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {storeCategories.map(c => (
                  <span key={c.id} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-zinc-100 text-zinc-600">
                    {c.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400">{t('stores.itemCount', { count: store.itemOrder.length })}</p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>{t('common.edit')}</Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(true)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            {t('common.delete')}
          </Button>
        </div>
      </li>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={t('stores.edit')}>
        <StoreForm
          initialName={store.name}
          initialCategoryIds={store.categoryIds ?? []}
          onSubmit={({ name, categoryIds }) => { updateStore(store.id, { name, categoryIds }); setEditOpen(false) }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={deleteOpen}
        title={t('stores.deleteConfirm', { name: store.name })}
        message={t('stores.deleteWarning')}
        onConfirm={() => { deleteStore(store.id); setDeleteOpen(false) }}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  )
}
