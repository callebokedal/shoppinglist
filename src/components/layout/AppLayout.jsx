import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { UndoToast } from './UndoToast'
import { ActionLogPanel } from '../../features/action-log/ActionLogPanel'
import { useUIStore } from '../../store/ui.store'

export default function AppLayout() {
  const actionLogVisible = useUIStore(s => s.actionLogVisible)

  return (
    <div className="flex flex-col h-dvh bg-zinc-50">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
      <UndoToast />
      {actionLogVisible && <ActionLogPanel />}
    </div>
  )
}
