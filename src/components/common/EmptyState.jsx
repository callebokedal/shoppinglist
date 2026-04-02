/**
 * @param {{ title: string, hint?: string, action?: React.ReactNode }} props
 */
export function EmptyState({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <div className="text-4xl">🛒</div>
      <p className="text-base font-medium text-zinc-700">{title}</p>
      {hint && <p className="text-sm text-zinc-400">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
