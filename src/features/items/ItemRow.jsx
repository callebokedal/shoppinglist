import { useState } from 'react'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'
import { formatDate } from '../../utils/date'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import { ConfirmDialog } from '../../components/common/ConfirmDialog'
import { ItemForm } from './ItemForm'

/**
 * @param {{ item: import('../../types/models').Item }} props
 */
export function ItemRow({ item }) {
  const { t } = useTranslation()
  const updateItem = useDataStore(s => s.updateItem)
  const deleteItem = useDataStore(s => s.deleteItem)
  const category = useDataStore(s => s.categories.find(c => c.id === item.categoryId))
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <li className="flex items-center gap-3 px-4 py-3 bg-white border-b border-zinc-100">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
            {category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 shrink-0">
                {category.name}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400">
            {item.unit} · {t('items.lastBought')}: {item.lastBought ? formatDate(item.lastBought) : t('items.never')}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>{t('common.edit')}</Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDeleteOpen(true)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          {t('common.delete')}
        </Button>
      </li>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={t('items.edit')}>
        <ItemForm
          initialName={item.name}
          initialUnit={item.unit}
          initialCategoryId={item.categoryId}
          onSubmit={({ name, unit, categoryId }) => { updateItem(item.id, { name, unit, categoryId }); setEditOpen(false) }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={deleteOpen}
        title={t('items.deleteConfirm', { name: item.name })}
        message={t('items.deleteWarning')}
        onConfirm={() => { deleteItem(item.id); setDeleteOpen(false) }}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  )
}
