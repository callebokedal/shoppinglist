import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDataStore } from '../../store/data.store'

/**
 * @param {{ entry: import('../../types/models').ShoppingListEntry }} props
 */
export function ShoppingListItem({ entry }) {
  const toggleComplete = useDataStore(s => s.toggleComplete)
  const removeFromList = useDataStore(s => s.removeFromList)
  const updateListQuantity = useDataStore(s => s.updateListQuantity)
  const item = useDataStore(s => s.items.find(i => i.id === entry.itemId))

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-4 py-3 bg-white border-b border-zinc-100 ${entry.completed ? 'opacity-60' : ''}`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleComplete(entry.id)}
        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          entry.completed
            ? 'bg-emerald-600 border-emerald-600 text-white'
            : 'border-zinc-300 hover:border-emerald-400'
        }`}
        aria-label={entry.completed ? 'Mark undone' : 'Mark done'}
      >
        {entry.completed && (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Name */}
      <span className={`flex-1 text-sm font-medium text-zinc-900 ${entry.completed ? 'line-through text-zinc-400' : ''}`}>
        {item?.name ?? entry.itemId}
        {item?.unit && item.unit !== 'st' && (
          <span className="text-zinc-400 font-normal ml-1 text-xs">{item.unit}</span>
        )}
      </span>

      {/* Quantity stepper */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => entry.quantity > 1 ? updateListQuantity(entry.id, entry.quantity - 1) : removeFromList(entry.id)}
          className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-600 text-base leading-none flex items-center justify-center hover:bg-zinc-200 active:bg-zinc-300"
        >
          {entry.quantity > 1 ? '−' : '×'}
        </button>
        <span className="w-5 text-center text-sm font-medium text-zinc-700">{entry.quantity}</span>
        <button
          onClick={() => updateListQuantity(entry.id, entry.quantity + 1)}
          className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-600 text-base leading-none flex items-center justify-center hover:bg-zinc-200 active:bg-zinc-300"
        >
          +
        </button>
      </div>

      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="shrink-0 w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-zinc-500 cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 4a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zM7 8a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zm-6 4a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zm-6 4a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
    </li>
  )
}
