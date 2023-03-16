import { defineStore } from 'pinia'
import { usePlayerStore, useAnimeStore } from '@/player/stores'
import { parseASS } from '@/player/assets/utils/subtitleParsing'
import { SubtitleState, SubtitleLine } from './types'
import { LANGUAGE_TYPES, SUBTITLE_ACTIONS } from '@/player/assets/utils/constants'

import * as kuromoji from '@/player/assets/utils/kuromoji'
import { LANGUAGES } from '@/player/assets/utils/constants'

export const useSubtitleStore = defineStore('subtitle', {
  state: (): SubtitleState => ({
    tokenizer: undefined,
    language: LANGUAGES.ENGLISH,
    subtitles: {
      japanese: [],
      native: []
    },
    current: {},
    showSubtitles: false
  }),
  getters: {
    getCurrentNativeSubtitle(): string | undefined {
      return this.current.native
    },
    getCurrentJapaneseSubtitle(): string | undefined {
      return this.current.japanese
    }
  },
  actions: {
    setLanguage(language: LANGUAGES) {
      this.language = language
    },
    async load() {
      const anime = useAnimeStore()
      if (!anime.isSupportedAnime()) {
        setTimeout(() => this.crunchyrollSubtitlesHandler('add'), 1000)
        this.showSubtitles = false
        return
      }

      const { native, japanese } = anime.fetchSubtitles(this.language)

      if (!this.tokenizer) {
        this.tokenizer = await kuromoji.startKuromoji()
      }

      if (native) {
        const subtitle = await (await fetch(native)).text()
        this.subtitles.native = parseASS(subtitle)
      }

      if (japanese) {
        const subtitle = await (await fetch(japanese)).text()
        this.subtitles.japanese = parseASS(subtitle)
      }

      this.showSubtitles = true
      setTimeout(() => this.crunchyrollSubtitlesHandler('remove'), 1000)
    },
    fetch(type: LANGUAGE_TYPES, currentTime: number) {
      const subtitle = this.subtitles[type].find((line: SubtitleLine) =>
        currentTime >= line.begin &&
        currentTime < line.end
      )?.lines || ''

      if (type === LANGUAGE_TYPES.JAPANESE && this.current.japanese !== subtitle) {
        this.current.token = this.tokenizer?.tokenize(subtitle)
      }

      this.current[type] = subtitle
    },
    crunchyrollSubtitlesHandler(action: 'add' | 'remove') {
      const subtitles = document.getElementById('velocity-canvas')

      if (subtitles) {
        subtitles.style.display = action === 'add' ? 'block' : 'none'
      }
    },
    setSubtitle(action: SUBTITLE_ACTIONS) {
      const player = usePlayerStore()
      const currentTime = player.playerInfo.currentProgress
      let currentIndex = this.subtitles.japanese.findIndex((line: SubtitleLine) => currentTime >= line.begin && currentTime < line.end || currentTime < line.end)

      action === SUBTITLE_ACTIONS.PREVIOUS && currentIndex--
      action === SUBTITLE_ACTIONS.NEXT && currentIndex++

      const subtitle = this.subtitles.japanese[currentIndex]

      if (subtitle) player.setCurrentTime(subtitle.begin)
    }
  }
})
