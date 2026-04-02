import { create } from 'zustand'
import { DEFAULT_LIST_ID } from '../types/models'

export const useUIStore = create((set) => ({
  activeListId: DEFAULT_LIST_ID,
  actionLogVisible: false,

  setActiveList: (listId) => set({ activeListId: listId }),
  toggleActionLog: () => set(s => ({ actionLogVisible: !s.actionLogVisible })),
  closeActionLog: () => set({ actionLogVisible: false }),
}))
