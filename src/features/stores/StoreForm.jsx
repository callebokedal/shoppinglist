import { useState } from 'react'
import { Input } from '../../components/common/Input'
import { Button } from '../../components/common/Button'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'

/**
 * @param {{ initialName?: string, initialCategoryIds?: string[], onSubmit: (data: {name: string, categoryIds: string[]}) => void, onCancel: () => void }} props
 */
export function StoreForm({ initialName = '', initialCategoryIds = [], onSubmit, onCancel }) {
  const { t } = useTranslation()
  const categories = useDataStore(s => s.categories)
  const [name, setName] = useState(initialName)
  const [selectedIds, setSelectedIds] = useState(new Set(initialCategoryIds))

  function toggleCategory(id) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit({ name: trimmed, categoryIds: [...selectedIds] })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label={t('stores.namePlaceholder')}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={t('stores.namePlaceholder')}
        autoFocus
      />

      {categories.length > 0 && (
        <div>
          <p className="text-sm font-medium text-zinc-700 mb-2">{t('categories.storeCategoriesLabel')}</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const active = selectedIds.has(cat.id)
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    active
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-zinc-300 text-zinc-700 hover:border-emerald-400'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit" disabled={!name.trim()}>{t('common.save')}</Button>
      </div>
    </form>
  )
}
