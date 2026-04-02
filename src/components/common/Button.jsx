/**
 * @param {{ variant?: 'primary'|'secondary'|'ghost'|'danger', size?: 'sm'|'md', className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-500',
    ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
