import { useState, useMemo } from 'react'
import { useDataStore } from '../../store/data.store'
import { useUIStore } from '../../store/ui.store'
import { useTranslation } from '../../hooks/useTranslation'
import { parseImportText } from '../../utils/importParse'
import { Modal } from '../../components/common/Modal'
import { Button } from '../../components/common/Button'

/**
 * @param {{ open: boolean, onClose: () => void }} props
 */
export function ImportItemsModal({ open, onClose }) {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const categories = useDataStore(s => s.categories)
  const addItem = useDataStore(s => s.addItem)
  const updateItem = useDataStore(s => s.updateItem)
  const addToList = useDataStore(s => s.addToList)
  const activeListId = useUIStore(s => s.activeListId)

  const parsed = useMemo(() => parseImportText(text, categories), [text, categories])

  function handleImport() {
    for (const row of parsed) {
      const id = addItem(row.name, row.unit, row.categoryId)
      // If item already existed, update its categoryId if we got one
      if (row.categoryId) {
        updateItem(id, { categoryId: row.categoryId })
      }
      addToList(id, 1, activeListId)
    }
    setText('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={t('import.title')}>
      <div className="space-y-3">
        <p className="text-xs text-zinc-500 whitespace-pre-line">{t('import.hint')}</p>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={t('import.placeholder')}
          rows={7}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none font-mono"
        />

        {parsed.length > 0 && (
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 overflow-hidden">
            <p className="px-3 py-1.5 text-xs font-medium text-zinc-500 border-b border-zinc-100">
              {t('import.preview', { count: parsed.length })}
            </p>
            <ul className="divide-y divide-zinc-100 max-h-40 overflow-y-auto">
              {parsed.map((row, i) => (
                <li key={i} className="flex items-center gap-2 px-3 py-2 text-sm">
                  <span className="flex-1 font-medium text-zinc-900">{row.name}</span>
                  <span className="text-zinc-400 text-xs">{row.unit}</span>
                  {row.categoryId && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800">
                      {categories.find(c => c.id === row.categoryId)?.name}
                    </span>
                  )}
                  {row.categoryIgnored && (
                    <span className="text-xs text-amber-500 italic">
                      {t('import.ignoredCategory')}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button onClick={handleImport} disabled={parsed.length === 0}>
            {t('import.doImport')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
