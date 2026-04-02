import { useState } from 'react'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'
import { Button } from '../../components/common/Button'
import { ConfirmDialog } from '../../components/common/ConfirmDialog'

export function CategoryManager() {
  const { t } = useTranslation()
  const categories = useDataStore(s => s.categories)
  const addCategory = useDataStore(s => s.addCategory)
  const deleteCategory = useDataStore(s => s.deleteCategory)

  const [newName, setNewName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleAdd(e) {
    e.preventDefault()
    if (!newName.trim()) return
    addCategory(newName.trim())
    setNewName('')
  }

  return (
    <div className="space-y-3">
      {categories.length === 0 && (
        <p className="text-sm text-zinc-400">{t('categories.emptyHint')}</p>
      )}

      {categories.length > 0 && (
        <ul className="space-y-1">
          {categories.map(cat => (
            <li key={cat.id} className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-3 py-2">
              <span className="flex-1 text-sm text-zinc-900">{cat.name}</span>
              <button
                onClick={() => setDeleteTarget(cat)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder={t('categories.namePlaceholder')}
          className="flex-1 h-9 rounded-lg border border-zinc-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
        />
        <Button type="submit" size="sm" disabled={!newName.trim()}>{t('categories.add')}</Button>
      </form>

      <ConfirmDialog
        open={!!deleteTarget}
        title={t('categories.deleteConfirm', { name: deleteTarget?.name ?? '' })}
        message={t('categories.deleteWarning')}
        onConfirm={() => { deleteCategory(deleteTarget.id); setDeleteTarget(null) }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
