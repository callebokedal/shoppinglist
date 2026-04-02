import { Modal } from './Modal'
import { Button } from './Button'
import { useTranslation } from '../../hooks/useTranslation'

/**
 * @param {{ open: boolean, title: string, message?: string, onConfirm: () => void, onCancel: () => void, confirmVariant?: 'primary'|'danger' }} props
 */
export function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmVariant = 'danger' }) {
  const { t } = useTranslation()
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      {message && <p className="text-sm text-zinc-600 mb-4">{message}</p>}
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button variant={confirmVariant} onClick={onConfirm}>{t('common.confirm')}</Button>
      </div>
    </Modal>
  )
}
