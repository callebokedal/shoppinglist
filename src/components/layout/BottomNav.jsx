import { NavLink } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const navItems = [
  { to: '/statistics', label: 'nav.statistics', icon: '📊' },
  { to: '/settings', label: 'nav.settings', icon: '⚙️' },
  { to: '/stores', label: 'nav.stores', icon: '🏪' },
  { to: '/items', label: 'nav.items', icon: '📦' },
  { to: '/', label: 'nav.list', icon: '🛒', end: true },
]

export function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="shrink-0 border-t border-zinc-200 bg-white pb-safe">
      <ul className="flex">
        {navItems.map(({ to, label, icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-zinc-500 hover:text-zinc-900'
                }`
              }
            >
              <span className="text-xl leading-none">{icon}</span>
              <span>{t(label)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
