export type SubtitleFormat = 'ass' | 'srt'

export interface Anime {
    series_id: string,
    title: string,
    series_title: string,
    season_title: string,
    episode_number: string,
    subtitles: {
        language: string,
        url: string
        format: SubtitleFormat
    }[]
}

export interface AnimeState {
    metadata: Anime
}

export type CrunchyrollMedia = {
    metadata: {
        series_id: string,
        title: string,
        series_title: string,
        season_title: string,
        episode_number: string
    },
    subtitles: {
        language: string,
        url: string,
        format: SubtitleFormat
    }[]
}
