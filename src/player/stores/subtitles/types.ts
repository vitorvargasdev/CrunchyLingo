import type { Tokenize, Tokenizer } from '@/player/assets/utils/kuromoji-types'
import type { LANGUAGES } from '@/player/assets/utils/constants'

export interface Anime {
    series_id: string,
    title: string,
    series_title: string,
    season_title: string,
    episode_number: string,
    subtitles: {
        language: string,
        url: string
        format: 'ass' | 'srt'
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

export type Lang = 'native' | 'japanese'

export interface SubtitleState {
    tokenizer?: Tokenizer,
    language: LANGUAGES,
    subtitles: Record<Lang, SubtitlesList>;
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
        format: 'ass' | 'srt'
    }[]
}