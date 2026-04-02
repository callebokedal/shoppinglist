/**
 * @param {{ variant?: 'default'|'success'|'muted', children: React.ReactNode }} props
 */
export function Badge({ variant = 'default', children }) {
  const variants = {
    default: 'bg-zinc-100 text-zinc-700',
    success: 'bg-emerald-100 text-emerald-800',
    muted: 'bg-zinc-50 text-zinc-400',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
