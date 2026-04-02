import { useDataStore } from '../store/data.store'

/**
 * Provides undo capability and availability state.
 */
export function useUndo() {
  const undo = useDataStore(s => s.undo)
  const canUndo = useDataStore(s => s.actionLog.some(e => e.undoable))
  const lastUndoable = useDataStore(s => {
    const undoable = s.actionLog.filter(e => e.undoable)
    return undoable[undoable.length - 1] ?? null
  })

  return { undo, canUndo, lastUndoable }
}
