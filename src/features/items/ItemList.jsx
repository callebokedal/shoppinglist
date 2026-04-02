import { useState, useMemo } from 'react'
import { useDataStore } from '../../store/data.store'
import { useTranslation } from '../../hooks/useTranslation'
import { EmptyState } from '../../components/common/EmptyState'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import { Input } from '../../components/common/Input'
import { ItemForm } from './ItemForm'
import { ItemRow } from './ItemRow'

export function ItemList() {
  const { t } = useTranslation()
  const items = useDataStore(s => s.items)
  const addItem = useDataStore(s => s.addItem)
  const [addOpen, setAddOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return items
    const q = search.toLowerCase()
    return items.filter(i => i.name.toLowerCase().includes(q))
  }, [items, search])

  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <div className="px-4 py-3 flex gap-2">
        <Input
          placeholder={t('items.namePlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setAddOpen(true)}>{t('items.add')}</Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          title={t('items.empty')}
          hint={search ? undefined : t('items.emptyHint')}
        />
      ) : (
        <ul>
          {sorted.map(item => (
            <ItemRow key={item.id} item={item} />
          ))}
        </ul>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t('items.add')}>
        <ItemForm
          onSubmit={({ name, unit }) => { addItem(name, unit); setAddOpen(false) }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>
    </>
  )
}
