import { useSettingsStore } from '../store/settings.store'
import { translations, interpolate } from '../utils/translations'

/**
 * Returns a translation function `t(key, params?)` for the active language.
 * Falls back to English if a key is missing in the active language.
 */
export function useTranslation() {
  const language = useSettingsStore(s => s.language)

  /**
   * @param {string} key
   * @param {Record<string, string|number>} [params]
   * @returns {string}
   */
  function t(key, params) {
    const str = translations[language]?.[key] ?? translations.en?.[key] ?? key
    return interpolate(str, params)
  }

  return { t, language }
}
