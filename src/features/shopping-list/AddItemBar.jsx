import { useState, useRef, useEffect } from 'react'
import { useDataStore } from '../../store/data.store'
import { useUIStore } from '../../store/ui.store'
import { useAutoComplete } from '../../hooks/useAutoComplete'
import { useTranslation } from '../../hooks/useTranslation'

export function AddItemBar() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const addToList = useDataStore(s => s.addToList)
  const addItem = useDataStore(s => s.addItem)
  const activeListId = useUIStore(s => s.activeListId)

  const { suggestions, hasExactMatch } = useAutoComplete(query)

  useEffect(() => {
    setOpen(query.trim().length > 0)
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleSelectItem(itemId) {
    addToList(itemId, quantity, activeListId)
    setQuery('')
    setQuantity(1)
    setOpen(false)
    inputRef.current?.focus()
  }

  function handleAddNew() {
    const name = query.trim()
    if (!name) return
    const id = addItem(name)
    addToList(id, quantity, activeListId)
    setQuery('')
    setQuantity(1)
    setOpen(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (suggestions.length > 0 && !hasExactMatch) {
        // If there's exactly one suggestion and no exact match, select it
        if (suggestions.length === 1) {
          handleSelectItem(suggestions[0].id)
        } else {
          handleAddNew()
        }
      } else if (hasExactMatch) {
        const exact = suggestions.find(s => s.name.toLowerCase() === query.trim().toLowerCase())
        if (exact) handleSelectItem(exact.id)
      } else {
        handleAddNew()
      }
    }
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={containerRef} className="relative px-4 py-3 bg-white border-b border-zinc-100">
      <div className="flex gap-2">
        {/* Quantity stepper */}
        <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden shrink-0">
          <button
            type="button"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-8 h-10 text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200 text-lg leading-none"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium text-zinc-900">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(q => q + 1)}
            className="w-8 h-10 text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200 text-lg leading-none"
          >
            +
          </button>
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setOpen(true)}
          placeholder={t('list.addPlaceholder')}
          className="flex-1 h-10 rounded-lg border border-zinc-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
        />
      </div>

      {/* Autocomplete dropdown */}
      {open && (
        <ul className="absolute left-4 right-4 top-full mt-1 z-30 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full text-left px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100"
                onClick={() => handleSelectItem(item.id)}
              >
                {item.name}
                <span className="text-zinc-400 ml-1 text-xs">{item.unit}</span>
              </button>
            </li>
          ))}
          {!hasExactMatch && query.trim() && (
            <li>
              <button
                type="button"
                className="w-full text-left px-4 py-3 text-sm text-emerald-700 font-medium hover:bg-emerald-50 active:bg-emerald-100 border-t border-zinc-100"
                onClick={handleAddNew}
              >
                {t('list.newItem', { name: query.trim() })}
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
