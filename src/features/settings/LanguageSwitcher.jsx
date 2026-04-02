import { useSettingsStore } from '../../store/settings.store'
import { useTranslation } from '../../hooks/useTranslation'

const LANGUAGES = [
  { code: 'sv', labelKey: 'settings.languageSv' },
  { code: 'en', labelKey: 'settings.languageEn' },
]

export function LanguageSwitcher() {
  const { t } = useTranslation()
  const language = useSettingsStore(s => s.language)
  const setLanguage = useSettingsStore(s => s.setLanguage)

  return (
    <div className="flex gap-2">
      {LANGUAGES.map(({ code, labelKey }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            language === code
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  )
}
