import { defineStore } from 'pinia'
import { parseASS } from '../../assets/utils/subtitleParsing'
import { SubtitleState, Lang, SubtitleLine, CrunchyrollMedia } from './types'

import animes from '@/player/animes'
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
    anime: {
      series_id: '',
      title: '',
      series_title: '',
      season_title: '',
      episode_number: '',
      subtitles: []
    },
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
    setLanguage(lang: LANGUAGES) {
      this.language = lang
    },
    crunchyrollMedia(): CrunchyrollMedia {
      const selfWindow = window as typeof window & { self: { v1config: { media: CrunchyrollMedia } } }
      return selfWindow.self.v1config.media
    },
    getAnime() {
      const { metadata, subtitles } = this.crunchyrollMedia()

      const animeData = {
        series_id: metadata.series_id,
        title: metadata.title,
        series_title: metadata.series_title,
        season_title: metadata.season_title,
        episode_number: metadata.episode_number,
        subtitles
      }

      if (animeData.title !== this.anime.title || animeData.episode_number !== this.anime.episode_number) {
        this.anime = animeData
        this.load()
      }

      setTimeout(() => this.getAnime(), 2000)
    },
    isSupportedAnime(): boolean {
      return animes.some(({ series_id, seasons }) =>
        series_id === this.anime.series_id &&
        seasons.some(({ season_title, episodes }) =>
          season_title === this.anime.season_title &&
          episodes.includes(Number(this.anime.episode_number))
        )
      )
    },
    fetchCurrentSeasonNumber(): number | undefined {
      const anime = animes.find(item => item.series_id === this.anime.series_id)
      const season = anime?.seasons.find(season => season.season_title === this.anime.season_title)

      return season?.season_number
    },
    async load() {
      if (!this.isSupportedAnime()) {
        setTimeout(() => this.crunchyrollSubtitlesHandler('add'), 1000)
        this.showSubtitles = false
        return
      }

      const baseUrl = document.querySelector('#app')?.getAttribute('extension')
      const native = this.anime.subtitles.find((item) => item.language === this.language)?.url
      const seasonNumber = this.fetchCurrentSeasonNumber()
      const japanese = `${baseUrl}subtitles/${this.anime.series_title}/${seasonNumber}/${this.anime.episode_number}.ass` 

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
    fetch(lang: Lang, currentTime: number) {
      const subtitle = this.subtitles[lang].find((line: SubtitleLine) =>
        currentTime >= line.begin &&
        currentTime < line.end
      )?.lines || ''

      if (lang === 'japanese' && this.current.japanese !== subtitle) {
        this.current.token = this.tokenizer?.tokenize(subtitle)
      }

      this.current[lang] = subtitle
    },
    crunchyrollSubtitlesHandler(action: 'add' | 'remove') {
      const subtitles = document.getElementById('velocity-canvas')

      if (subtitles) {
        subtitles.style.display = action === 'add' ? 'block' : 'none'
      }
    }
  }
})
