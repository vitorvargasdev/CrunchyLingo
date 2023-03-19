import { LANGUAGES } from '@/player/assets/utils/constants'

export interface SettingsState {
    general: General,
}

export type General = {
    language: LANGUAGES   
}
