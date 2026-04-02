import { useState } from 'react'
import { useDataStore } from '../../store/data.store'
import { useUIStore } from '../../store/ui.store'
import { useTranslation } from '../../hooks/useTranslation'
import { ConfirmDialog } from '../../components/common/ConfirmDialog'
import { DEFAULT_LIST_ID } from '../../types/models'

export function ListSwitcher() {
  const { t } = useTranslation()
  const lists = useDataStore(s => s.lists)
  const addList = useDataStore(s => s.addList)
  const updateList = useDataStore(s => s.updateList)
  const deleteList = useDataStore(s => s.deleteList)
  const activeListId = useUIStore(s => s.activeListId)
  const setActiveList = useUIStore(s => s.setActiveList)

  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleAdd() {
    const id = addList(t('lists.newListName'))
    setActiveList(id)
    // Start renaming immediately
    setRenamingId(id)
    setRenameValue(t('lists.newListName'))
  }

  function handleRenameSubmit(id) {
    const trimmed = renameValue.trim()
    if (trimmed) updateList(id, { name: trimmed })
    setRenamingId(null)
  }

  function handleTabClick(id) {
    if (id === activeListId && id !== DEFAULT_LIST_ID) {
      // Second tap → offer rename/delete via long press; single tap just switches
    }
    setActiveList(id)
  }

  return (
    <div className="flex items-center gap-0 border-b border-zinc-200 bg-white overflow-x-auto">
      {lists.map(list => {
        const isActive = list.id === activeListId
        const isRenaming = renamingId === list.id

        return (
          <div
            key={list.id}
            className={`flex items-center shrink-0 border-b-2 transition-colors ${
              isActive ? 'border-emerald-600' : 'border-transparent'
            }`}
          >
            {isRenaming ? (
              <input
                autoFocus
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
                onBlur={() => handleRenameSubmit(list.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleRenameSubmit(list.id)
                  if (e.key === 'Escape') setRenamingId(null)
                }}
                className="h-10 px-3 text-sm font-medium text-zinc-900 bg-transparent border-none outline-none w-28"
              />
            ) : (
              <button
                onClick={() => handleTabClick(list.id)}
                onDoubleClick={() => { setRenamingId(list.id); setRenameValue(list.name) }}
                className={`h-10 px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-emerald-700' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {list.name}
              </button>
            )}

            {/* Delete button — shown only on active non-default lists */}
            {isActive && list.id !== DEFAULT_LIST_ID && !isRenaming && (
              <button
                onClick={() => setDeleteTarget(list)}
                className="pr-3 text-zinc-300 hover:text-red-400 text-xs leading-none"
                aria-label="Delete list"
              >
                ✕
              </button>
            )}
          </div>
        )
      })}

      {/* Add new list button */}
      <button
        onClick={handleAdd}
        className="h-10 px-3 text-zinc-400 hover:text-emerald-600 text-xl leading-none shrink-0"
        aria-label={t('lists.addList')}
      >
        +
      </button>

      <ConfirmDialog
        open={!!deleteTarget}
        title={t('lists.deleteConfirm', { name: deleteTarget?.name ?? '' })}
        message={t('lists.deleteWarning')}
        onConfirm={() => {
          deleteList(deleteTarget.id)
          setActiveList(DEFAULT_LIST_ID)
          setDeleteTarget(null)
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
