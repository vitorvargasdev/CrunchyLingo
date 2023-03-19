import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/player/assets/utils/browserLanguage'
import locales from '@/player/assets/locales'

alert(getLanguage())

const i18n = createI18n({
  locale: getLanguage(),
  fallbackLocale: 'en',
  messages: locales,
  legacy: false
})

export default i18n
