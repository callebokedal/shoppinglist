import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useDataStore } from '../../store/data.store'
import { useUIStore } from '../../store/ui.store'
import { sortEntries } from '../../utils/sorting'
import { ShoppingListItem } from './ShoppingListItem'
import { DEFAULT_STORE_ID } from '../../types/models'

function filterByStoreCategories(entries, storeId, stores, items) {
  if (!storeId) return entries
  const store = stores.find(s => s.id === storeId)
  const categoryIds = store?.categoryIds ?? []
  if (categoryIds.length === 0) return entries
  return entries.filter(entry => {
    const item = items.find(i => i.id === entry.itemId)
    if (!item?.categoryId) return true
    return categoryIds.includes(item.categoryId)
  })
}

export function ShoppingListSortable() {
  const shoppingList = useDataStore(s => s.shoppingList)
  const stores = useDataStore(s => s.stores)
  const items = useDataStore(s => s.items)
  const reorderStoreItems = useDataStore(s => s.reorderStoreItems)
  const activeListId = useUIStore(s => s.activeListId)
  const activeList = useDataStore(s => s.lists.find(l => l.id === activeListId))
  const storeId = activeList?.storeId ?? null

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  )

  const forThisList = shoppingList.filter(e => e.listId === activeListId)
  const filtered = filterByStoreCategories(forThisList, storeId, stores, items)
  const sorted = sortEntries(filtered, storeId, stores)

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sorted.findIndex(e => e.id === active.id)
    const newIndex = sorted.findIndex(e => e.id === over.id)
    const reordered = arrayMove(sorted, oldIndex, newIndex)
    reorderStoreItems(storeId ?? DEFAULT_STORE_ID, reordered.map(e => e.itemId))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sorted.map(e => e.id)} strategy={verticalListSortingStrategy}>
        <ul>
          {sorted.map(entry => (
            <ShoppingListItem key={entry.id} entry={entry} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
