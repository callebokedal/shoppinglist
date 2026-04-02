/**
 * @param {{ title: string, right?: React.ReactNode }} props
 */
export function PageHeader({ title, right }) {
  return (
    <header className="flex items-center justify-between px-4 h-14 border-b border-zinc-200 bg-white shrink-0">
      <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  )
}
