import type { Tokenize, Tokenizer } from '@/player/assets/utils/kuromoji-types'
import type { LANGUAGES, LANGUAGE_TYPES } from '@/player/assets/utils/constants'

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

export type SubtitleLine = {
    begin: number
    end: number
    lines: string
}

export type SubtitlesList = {
    begin: number
    end: number
    lines: string
}[]

export interface SubtitleState {
    tokenizer?: Tokenizer,
    language: LANGUAGES,
    subtitles: Record<LANGUAGE_TYPES, SubtitlesList>;
    current: {
        japanese?: string
        native?: string,
        token?: Tokenize[]
    },
    anime: Anime,
    showSubtitles: boolean
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
