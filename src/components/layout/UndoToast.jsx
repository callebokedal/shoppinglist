import { useEffect, useState } from 'react'
import { useUndo } from '../../hooks/useUndo'
import { useTranslation } from '../../hooks/useTranslation'

const TOAST_DURATION = 4000

export function UndoToast() {
  const { undo, canUndo, lastUndoable } = useUndo()
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    if (!lastUndoable) return
    setVisible(true)
    if (timeoutId) clearTimeout(timeoutId)
    const id = setTimeout(() => setVisible(false), TOAST_DURATION)
    setTimeoutId(id)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUndoable?.id])

  if (!visible || !canUndo) return null

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-zinc-900 text-white text-sm rounded-full px-4 py-2.5 shadow-lg">
      <span className="truncate max-w-[180px]">
        {lastUndoable ? t(lastUndoable.description, lastUndoable.params) : t('undo.canUndo')}
      </span>
      <button
        onClick={() => { undo(); setVisible(false) }}
        className="font-semibold text-emerald-400 hover:text-emerald-300 shrink-0"
      >
        {t('undo.button')}
      </button>
    </div>
  )
}
