import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from '../utils/id'
import { DEFAULT_STORE_ID, DEFAULT_LIST_ID } from '../types/models'

const MAX_LOG_SIZE = 50
const MAX_UNDOABLE = 10

function createInitialState() {
  return {
    categories: [],
    items: [],
    stores: [
      {
        id: DEFAULT_STORE_ID,
        name: 'Default',
        itemOrder: [],
        categoryIds: [],
        createdAt: Date.now(),
      },
    ],
    lists: [
      {
        id: DEFAULT_LIST_ID,
        name: 'Min lista',
        storeId: null,
        createdAt: Date.now(),
      },
    ],
    shoppingList: [],
    purchaseRecords: [],
    actionLog: [],
  }
}

function makeLogEntry({ type, description, params, snapshot, undoable = true }) {
  return {
    id: generateId(),
    type,
    description,
    params: params ?? {},
    timestamp: Date.now(),
    undoable,
    snapshot,
  }
}

export const useDataStore = create(
  persist(
    (set, get) => ({
      ...createInitialState(),

      // ─── Categories ──────────────────────────────────────────────────────

      addCategory: (name) => {
        const trimmed = name.trim()
        if (!trimmed) return null
        const category = { id: generateId(), name: trimmed }
        set(s => ({ categories: [...s.categories, category] }))
        return category.id
      },

      updateCategory: (id, patch) => {
        set(s => ({
          categories: s.categories.map(c => c.id === id ? { ...c, ...patch } : c),
        }))
      },

      deleteCategory: (id) => {
        set(s => ({
          categories: s.categories.filter(c => c.id !== id),
          // Remove from all stores' categoryIds
          stores: s.stores.map(st => ({
            ...st,
            categoryIds: (st.categoryIds ?? []).filter(cid => cid !== id),
          })),
          // Clear from items that use this category
          items: s.items.map(i => i.categoryId === id ? { ...i, categoryId: null } : i),
        }))
      },

      // ─── Items ───────────────────────────────────────────────────────────

      addItem: (name, unit = 'st', categoryId = null) => {
        const state = get()
        const existing = state.items.find(i => i.name.toLowerCase() === name.toLowerCase())
        if (existing) return existing.id

        const item = { id: generateId(), name, unit, categoryId, lastBought: null, createdAt: Date.now() }
        const snapshot = { items: state.items }
        set(s => ({
          items: [...s.items, item],
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'ADD_ITEM', description: 'action.addItem', params: { itemName: name }, snapshot }),
          ],
        }))
        return item.id
      },

      updateItem: (id, patch) => {
        const state = get()
        const item = state.items.find(i => i.id === id)
        if (!item) return
        const snapshot = { items: state.items }
        set(s => ({
          items: s.items.map(i => i.id === id ? { ...i, ...patch } : i),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'UPDATE_ITEM', description: 'action.updateItem', params: { itemName: patch.name ?? item.name }, snapshot }),
          ],
        }))
      },

      deleteItem: (id) => {
        const state = get()
        const item = state.items.find(i => i.id === id)
        if (!item) return
        const snapshot = { items: state.items, stores: state.stores, shoppingList: state.shoppingList, purchaseRecords: state.purchaseRecords }
        set(s => ({
          items: s.items.filter(i => i.id !== id),
          stores: s.stores.map(store => ({
            ...store,
            itemOrder: store.itemOrder.filter(oid => oid !== id),
          })),
          shoppingList: s.shoppingList.filter(e => e.itemId !== id),
          purchaseRecords: s.purchaseRecords.filter(r => r.itemId !== id),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'DELETE_ITEM', description: 'action.deleteItem', params: { itemName: item.name }, snapshot }),
          ],
        }))
      },

      // ─── Stores ───────────────────────────────────────────────────────────

      addStore: (name, categoryIds = []) => {
        const state = get()
        const store = { id: generateId(), name, itemOrder: [], categoryIds, createdAt: Date.now() }
        const snapshot = { stores: state.stores }
        set(s => ({
          stores: [...s.stores, store],
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'ADD_STORE', description: 'action.addStore', params: { storeName: name }, snapshot }),
          ],
        }))
        return store.id
      },

      updateStore: (id, patch) => {
        const state = get()
        const store = state.stores.find(s => s.id === id)
        if (!store) return
        const snapshot = { stores: state.stores }
        set(s => ({
          stores: s.stores.map(st => st.id === id ? { ...st, ...patch } : st),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'UPDATE_STORE', description: 'action.updateStore', params: { storeName: patch.name ?? store.name }, snapshot }),
          ],
        }))
      },

      deleteStore: (id) => {
        if (id === DEFAULT_STORE_ID) return
        const state = get()
        const store = state.stores.find(s => s.id === id)
        if (!store) return
        const snapshot = { stores: state.stores }
        set(s => ({
          stores: s.stores.filter(st => st.id !== id),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'DELETE_STORE', description: 'action.deleteStore', params: { storeName: store.name }, snapshot }),
          ],
        }))
      },

      /**
       * Update the item order for a store (called after drag-and-drop).
       * @param {string} storeId
       * @param {string[]} newItemOrder - ordered array of itemIds
       */
      reorderStoreItems: (storeId, newItemOrder) => {
        const state = get()
        const store = state.stores.find(s => s.id === storeId)
        if (!store) return
        const snapshot = { stores: state.stores }
        set(s => ({
          stores: s.stores.map(st => st.id === storeId ? { ...st, itemOrder: newItemOrder } : st),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'REORDER', description: 'action.reorder', params: { storeName: store.name }, snapshot }),
          ],
        }))
      },

      // ─── Lists ────────────────────────────────────────────────────────────

      addList: (name) => {
        const list = { id: generateId(), name: name.trim(), storeId: null, createdAt: Date.now() }
        set(s => ({ lists: [...s.lists, list] }))
        return list.id
      },

      updateList: (id, patch) => {
        set(s => ({ lists: s.lists.map(l => l.id === id ? { ...l, ...patch } : l) }))
      },

      deleteList: (id) => {
        if (id === DEFAULT_LIST_ID) return
        set(s => ({
          lists: s.lists.filter(l => l.id !== id),
          shoppingList: s.shoppingList.filter(e => e.listId !== id),
        }))
      },

      // ─── Shopping List ─────────────────────────────────────────────────────

      /**
       * Add an item to a shopping list. Creates the item if it doesn't exist.
       * @param {string} itemId
       * @param {number} [quantity]
       * @param {string} [listId]
       */
      addToList: (itemId, quantity = 1, listId = DEFAULT_LIST_ID) => {
        const state = get()
        // Don't add if already in this list (just update qty)
        const existing = state.shoppingList.find(e => e.listId === listId && e.itemId === itemId && !e.completed)
        if (existing) {
          get().updateListQuantity(existing.id, existing.quantity + quantity)
          return
        }
        const item = state.items.find(i => i.id === itemId)
        const entry = { id: generateId(), listId, itemId, quantity, completed: false, addedAt: Date.now() }
        const snapshot = { shoppingList: state.shoppingList }
        set(s => ({
          shoppingList: [...s.shoppingList, entry],
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'ADD_TO_LIST', description: 'action.addedToList', params: { itemName: item?.name ?? itemId }, snapshot }),
          ],
        }))
      },

      removeFromList: (entryId) => {
        const state = get()
        const entry = state.shoppingList.find(e => e.id === entryId)
        if (!entry) return
        const item = state.items.find(i => i.id === entry.itemId)
        const snapshot = { shoppingList: state.shoppingList }
        set(s => ({
          shoppingList: s.shoppingList.filter(e => e.id !== entryId),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'REMOVE_FROM_LIST', description: 'action.removedFromList', params: { itemName: item?.name ?? entry.itemId }, snapshot }),
          ],
        }))
      },

      toggleComplete: (entryId) => {
        const state = get()
        const entry = state.shoppingList.find(e => e.id === entryId)
        if (!entry) return
        const item = state.items.find(i => i.id === entry.itemId)
        const completing = !entry.completed
        const snapshot = { shoppingList: state.shoppingList, items: state.items, purchaseRecords: state.purchaseRecords }

        const now = new Date().toISOString()
        set(s => ({
          shoppingList: s.shoppingList.map(e =>
            e.id === entryId ? { ...e, completed: !e.completed } : e
          ),
          items: completing
            ? s.items.map(i => i.id === entry.itemId ? { ...i, lastBought: now } : i)
            : s.items,
          purchaseRecords: completing
            ? [...s.purchaseRecords, { id: generateId(), itemId: entry.itemId, quantity: entry.quantity, date: now }]
            : s.purchaseRecords,
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({
              type: 'TOGGLE_COMPLETE',
              description: 'action.toggleComplete',
              params: {
                itemName: item?.name ?? entry.itemId,
                state: completing ? 'action.completedState' : 'action.uncompletedState',
              },
              snapshot,
            }),
          ],
        }))
      },

      updateListQuantity: (entryId, quantity) => {
        if (quantity < 1) return
        set(s => ({
          shoppingList: s.shoppingList.map(e =>
            e.id === entryId ? { ...e, quantity } : e
          ),
        }))
      },

      clearCompleted: (listId = DEFAULT_LIST_ID) => {
        const state = get()
        const snapshot = { shoppingList: state.shoppingList }
        set(s => ({
          shoppingList: s.shoppingList.filter(e => e.listId !== listId || !e.completed),
          actionLog: [
            ...s.actionLog.slice(-(MAX_LOG_SIZE - 1)),
            makeLogEntry({ type: 'CLEAR_COMPLETED', description: 'action.clearCompleted', params: {}, snapshot }),
          ],
        }))
      },

      // ─── Undo ─────────────────────────────────────────────────────────────

      undo: () => {
        const { actionLog } = get()
        const undoable = actionLog.filter(e => e.undoable)
        if (undoable.length === 0) return

        // Only allow undoing the most recent MAX_UNDOABLE actions
        const eligible = undoable.slice(-MAX_UNDOABLE)
        const last = eligible[eligible.length - 1]

        set(s => ({
          ...last.snapshot,
          actionLog: s.actionLog.map(e =>
            e.id === last.id ? { ...e, undoable: false } : e
          ),
        }))
      },
    }),
    {
      name: 'shopping-data',
      version: 3,
      migrate: (persisted, version) => {
        // Ensure default store always exists
        if (!persisted.stores?.find(s => s.id === DEFAULT_STORE_ID)) {
          persisted.stores = [
            { id: DEFAULT_STORE_ID, name: 'Default', itemOrder: [], categoryIds: [], createdAt: Date.now() },
            ...(persisted.stores ?? []),
          ]
        }
        // v1 → v2: add categoryIds to stores, categoryId to items, add categories array
        if (version < 2) {
          persisted.categories = persisted.categories ?? []
          persisted.stores = (persisted.stores ?? []).map(st => ({
            ...st,
            categoryIds: st.categoryIds ?? [],
          }))
          persisted.items = (persisted.items ?? []).map(i => ({
            ...i,
            categoryId: i.categoryId ?? null,
          }))
        }
        // v2 → v3: add lists array, add listId to all existing entries
        if (version < 3) {
          persisted.lists = persisted.lists ?? [
            { id: DEFAULT_LIST_ID, name: 'Min lista', storeId: null, createdAt: Date.now() },
          ]
          persisted.shoppingList = (persisted.shoppingList ?? []).map(e => ({
            ...e,
            listId: e.listId ?? DEFAULT_LIST_ID,
          }))
        }
        return persisted
      },
    }
  )
)
