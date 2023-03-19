import { defineStore } from 'pinia'
import { AnimeState, CrunchyrollMedia } from './types'
import { useSubtitleStore } from '@/player/stores'

import animes from '@/player/animes'
import { LANGUAGES } from '@/player/assets/utils/constants'

export const useAnimeStore = defineStore('anime', {
  state: (): AnimeState => ({
    metadata: {
      series_id: '',
      title: '',
      series_title: '',
      season_title: '',
      episode_number: '',
      subtitles: []
    }
  }),
  actions: {
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

      if (animeData.title !== this.metadata.title || animeData.episode_number !== this.metadata.episode_number) {
        const subtitleStore = useSubtitleStore()
        this.metadata = animeData
        subtitleStore.load()
      }

      setTimeout(() => this.getAnime(), 2000)
    },
    isSupportedAnime(): boolean {
      return animes.some(({ series_id, seasons }) =>
        series_id === this.metadata.series_id &&
              seasons.some(({ season_title, episodes }) =>
                season_title === this.metadata.season_title &&
                  episodes.includes(Number(this.metadata.episode_number))
              )
      )
    },
    fetchCurrentSeasonNumber(): number | undefined {
      const anime = animes.find(item => item.series_id === this.metadata.series_id)
      const season = anime?.seasons.find(season => season.season_title === this.metadata.season_title)

      return season?.season_number
    },
    fetchSubtitles(language: LANGUAGES) {
      const extension = document.querySelector('#app')?.getAttribute('extension')
      const season = this.fetchCurrentSeasonNumber()
      
      const native = this.metadata.subtitles.find((item) => item.language === language)?.url
      const japanese = `${extension}subtitles/${this.metadata.series_title}/${season}/${this.metadata.episode_number}.ass`

      return { native, japanese }
    }
  }
})
