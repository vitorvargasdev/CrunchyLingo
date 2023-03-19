import type { Tokenize, Tokenizer } from '@/player/assets/utils/kuromoji-types'
import type { LANGUAGE_TYPES } from '@/player/assets/utils/constants'

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
    subtitles: Record<LANGUAGE_TYPES, SubtitlesList>;
    current: {
        japanese?: string
        native?: string,
        token?: Tokenize[]
    },
    showSubtitles: boolean
}
