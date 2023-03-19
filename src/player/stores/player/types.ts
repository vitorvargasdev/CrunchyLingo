import { States } from '@/player/assets/utils/constants'

export interface PlayerInfo {
    state: States
    currentProgress: number
    timeJump: boolean
}

export enum PLAYER_STATE_PROPS {
    CONTROLS = 'controls',
    CURRENT_TIME = 'currentTime',
    DEFAULT_MUTED = 'defaultMuted',
    DEFAULT_PLAYBACK_RATE = 'defaultPlaybackRate',
    DURATION = 'duration',
    ENDED = 'ended',
    LOOP = 'loop',
    MUTED = 'muted',
    PAUSED = 'paused',
    PLAYBACK_RATE = 'playbackRate',
    VOLUME = 'volume'
}

export interface State {
    player: HTMLVideoElement | undefined,
    lastFrameProgress: number | undefined,
    playerInfo: PlayerInfo
}
