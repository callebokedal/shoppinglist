import { useEffect, useRef } from 'react'

/**
 * @param {{ open: boolean, onClose: () => void, title?: string, children: React.ReactNode }} props
 */
export function Modal({ open, onClose, title, children }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
        {title && (
          <div className="px-5 pt-5 pb-3 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
