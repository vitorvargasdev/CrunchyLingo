import { defineStore } from 'pinia'
import { SettingsState } from './types'
import { useSubtitleStore } from '@/player/stores/subtitles/subtitle'
import { LANGUAGES } from '@/player/assets/utils/constants'

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    general: {
      language: LANGUAGES.ENGLISH
    }
  }),
  actions: {
    load() {
      const settings = localStorage.getItem('settings') as string

      if (!settings) localStorage.setItem('settings', JSON.stringify(this.$state))

      this.$patch(JSON.parse(settings as string) as SettingsState)
    },
    save() {
      localStorage.setItem('settings', JSON.stringify(this.$state))
    },
    setLanguage(language: LANGUAGES) {
      this.$state.general.language = language
      this.save()

      const subtitleStore = useSubtitleStore()
      subtitleStore.load()
    }
  }
})
