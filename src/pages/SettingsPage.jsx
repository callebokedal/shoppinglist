import { PageHeader } from '../components/layout/PageHeader'
import { LanguageSwitcher } from '../features/settings/LanguageSwitcher'
import { CategoryManager } from '../features/categories/CategoryManager'
import { useTranslation } from '../hooks/useTranslation'
import { useUIStore } from '../store/ui.store'
import { Button } from '../components/common/Button'

export default function SettingsPage() {
  const { t } = useTranslation()
  const toggleActionLog = useUIStore(s => s.toggleActionLog)

  return (
    <div>
      <PageHeader title={t('settings.title')} />
      <div className="px-4 py-4 space-y-6">
        <section>
          <h2 className="text-sm font-medium text-zinc-500 mb-2">{t('settings.language')}</h2>
          <LanguageSwitcher />
        </section>
        <section>
          <h2 className="text-sm font-medium text-zinc-500 mb-2">{t('categories.title')}</h2>
          <CategoryManager />
        </section>
        <section>
          <h2 className="text-sm font-medium text-zinc-500 mb-2">{t('log.title')}</h2>
          <Button variant="secondary" onClick={toggleActionLog}>{t('log.title')}</Button>
        </section>
      </div>
    </div>
  )
}
