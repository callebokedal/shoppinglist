import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set) => ({
      language: 'sv',

      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'shopping-settings' }
  )
)
