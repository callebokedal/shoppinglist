import { useDataStore } from '../../store/data.store'
import { useUIStore } from '../../store/ui.store'
import { useTranslation } from '../../hooks/useTranslation'
import { Button } from '../../components/common/Button'

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function ActionLogPanel() {
  const { t } = useTranslation()
  const closeActionLog = useUIStore(s => s.closeActionLog)
  const actionLog = useDataStore(s => s.actionLog).slice().reverse()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-t-2xl shadow-xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-100 shrink-0">
          <h2 className="text-base font-semibold text-zinc-900">{t('log.title')}</h2>
          <Button variant="ghost" size="sm" onClick={closeActionLog}>{t('log.close')}</Button>
        </div>
        <ul className="overflow-y-auto flex-1 divide-y divide-zinc-100">
          {actionLog.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-zinc-400">{t('log.empty')}</li>
          )}
          {actionLog.map(entry => (
            <li key={entry.id} className="flex items-start gap-3 px-5 py-3">
              <span className="text-xs text-zinc-400 shrink-0 mt-0.5 w-10">{formatTime(entry.timestamp)}</span>
              <span className="text-sm text-zinc-700 flex-1">
                {t(entry.description, entry.params)}
              </span>
              {!entry.undoable && entry.type !== 'UNDO' && (
                <span className="text-xs text-zinc-300 shrink-0">↩</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
