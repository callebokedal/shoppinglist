import { useDataStore } from '../../store/data.store'
import { useUIStore } from '../../store/ui.store'
import { useTranslation } from '../../hooks/useTranslation'
import { DEFAULT_STORE_ID } from '../../types/models'

export function StoreSelector() {
  const { t } = useTranslation()
  const activeListId = useUIStore(s => s.activeListId)
  const updateList = useDataStore(s => s.updateList)
  const activeList = useDataStore(s => s.lists.find(l => l.id === activeListId))
  const stores = useDataStore(s => s.stores).filter(st => st.id !== DEFAULT_STORE_ID)

  const storeId = activeList?.storeId ?? null

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-zinc-100">
      <span className="text-sm text-zinc-500 shrink-0">{t('list.selectStore')}:</span>
      <select
        value={storeId ?? ''}
        onChange={e => updateList(activeListId, { storeId: e.target.value || null })}
        className="flex-1 text-sm text-zinc-900 bg-transparent border-none outline-none cursor-pointer"
      >
        <option value="">{t('list.noStore')}</option>
        {stores.map(store => (
          <option key={store.id} value={store.id}>{store.name}</option>
        ))}
      </select>
    </div>
  )
}
