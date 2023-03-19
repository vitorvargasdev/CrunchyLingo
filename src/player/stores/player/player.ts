import { defineStore } from 'pinia'
import { States } from '@/player/assets/utils/constants'
import { State, PLAYER_STATE_PROPS } from './types'

export const usePlayerStore = defineStore('player', {
  state: (): State => ({
    player: undefined,
    lastFrameProgress: undefined,
    playerInfo: {
      state: States.PAUSED,
      currentProgress: 0,
      timeJump: false
    }
  }),
  actions: {
    load() {
      this.player = document.getElementById('player0') as HTMLVideoElement
      setInterval(() => this.getPlayerStates(), 500)
    },
    getPlayerState(stateName: PLAYER_STATE_PROPS): boolean | number | string {
      return this.player![stateName]
    },
    getPlayerStates() {
      const LIMIT_DELTA_TIME = 3
      const [paused, currentProgress]: [boolean, number] = [
        this.getPlayerState(PLAYER_STATE_PROPS.PAUSED) as boolean,
        this.getPlayerState(PLAYER_STATE_PROPS.CURRENT_TIME) as number
      ]

      this.lastFrameProgress = this.lastFrameProgress || currentProgress

      const timeJump: boolean = Math.abs(currentProgress - this.lastFrameProgress) > LIMIT_DELTA_TIME
      const state: States = paused ? States.PAUSED : States.PLAYING

      this.lastFrameProgress = currentProgress
      this.playerInfo = { state, currentProgress, timeJump }
    },
    setCurrentTime(time: number) {
      return this.player![PLAYER_STATE_PROPS.CURRENT_TIME] = time
    }
  }
})
