import { useDataStore } from '../store/data.store'
import { useUIStore } from '../store/ui.store'
import { useTranslation } from '../hooks/useTranslation'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/common/Button'
import { EmptyState } from '../components/common/EmptyState'
import { ListSwitcher } from '../features/shopping-list/ListSwitcher'
import { StoreSelector } from '../features/shopping-list/StoreSelector'
import { AddItemBar } from '../features/shopping-list/AddItemBar'
import { ShoppingListSortable } from '../features/shopping-list/ShoppingListSortable'
import { ImportItemsModal } from '../features/shopping-list/ImportItemsModal'
import { useState } from 'react'

export default function ShoppingListPage() {
  const { t } = useTranslation()
  const [importOpen, setImportOpen] = useState(false)
  const activeListId = useUIStore(s => s.activeListId)
  const shoppingList = useDataStore(s => s.shoppingList)
  const clearCompleted = useDataStore(s => s.clearCompleted)
  const stores = useDataStore(s => s.stores)
  const categories = useDataStore(s => s.categories)
  const activeList = useDataStore(s => s.lists.find(l => l.id === activeListId))

  const listEntries = shoppingList.filter(e => e.listId === activeListId)
  const hasCompleted = listEntries.some(e => e.completed)

  // Category filter indicator
  const activeStore = stores.find(s => s.id === activeList?.storeId)
  const activeCategories = categories.filter(c => (activeStore?.categoryIds ?? []).includes(c.id))
  const isFiltering = activeCategories.length > 0

  return (
    <div>
      <PageHeader
        title={t('list.title')}
        right={
          <div className="flex items-center gap-1">
            {hasCompleted && (
              <Button variant="ghost" size="sm" onClick={() => clearCompleted(activeListId)}>
                {t('list.clearCompleted')}
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setImportOpen(true)}>
              {t('import.button')}
            </Button>
          </div>
        }
      />
      <ImportItemsModal open={importOpen} onClose={() => setImportOpen(false)} />
      <ListSwitcher />
      <StoreSelector />
      {isFiltering && (
        <div className="px-4 py-1.5 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-700">
          {t('categories.storeFilter', { names: activeCategories.map(c => c.name).join(', ') })}
        </div>
      )}
      <AddItemBar />
      {listEntries.length === 0 ? (
        <EmptyState title={t('list.empty')} hint={t('list.emptyHint')} />
      ) : (
        <ShoppingListSortable />
      )}
    </div>
  )
}
