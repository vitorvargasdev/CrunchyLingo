import { States } from '@/player/assets/utils/constants'

export interface PlayerInfo {
    state: States
    currentProgress: number
    timeJump: boolean
}

export type PlayerStateProp =
    'controls' |
    'currentTime' |
    'defaultMuted' |
    'defaultPlaybackRate' |
    'duration' |
    'ended' |
    'loop' |
    'muted' |
    'paused' |
    'playbackRate' |
    'volume';

export interface State {
    player: HTMLVideoElement | undefined,
    lastFrameProgress: number | undefined,
    playerInfo: PlayerInfo
}
