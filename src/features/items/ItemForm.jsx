import { useState } from 'react'
import { Input } from '../../components/common/Input'
import { Button } from '../../components/common/Button'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'

/**
 * @param {{ initialName?: string, initialUnit?: string, initialCategoryId?: string|null, onSubmit: (data: {name:string, unit:string, categoryId:string|null}) => void, onCancel: () => void }} props
 */
export function ItemForm({ initialName = '', initialUnit = 'st', initialCategoryId = null, onSubmit, onCancel }) {
  const { t } = useTranslation()
  const categories = useDataStore(s => s.categories)
  const [name, setName] = useState(initialName)
  const [unit, setUnit] = useState(initialUnit)
  const [categoryId, setCategoryId] = useState(initialCategoryId)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    onSubmit({ name: trimmedName, unit: unit.trim() || 'st', categoryId: categoryId || null })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label={t('items.namePlaceholder')}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={t('items.namePlaceholder')}
        autoFocus
      />
      <Input
        label={t('items.unit')}
        value={unit}
        onChange={e => setUnit(e.target.value)}
        placeholder={t('items.unitPlaceholder')}
      />

      {categories.length > 0 && (
        <div>
          <p className="text-sm font-medium text-zinc-700 mb-2">{t('categories.itemCategoryLabel')}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategoryId(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                categoryId === null
                  ? 'bg-zinc-700 border-zinc-700 text-white'
                  : 'bg-white border-zinc-300 text-zinc-500 hover:border-zinc-400'
              }`}
            >
              {t('categories.noCategory')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  categoryId === cat.id
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-zinc-300 text-zinc-700 hover:border-emerald-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
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
