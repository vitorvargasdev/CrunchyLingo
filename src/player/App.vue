<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { usePlayerStore, useSubtitleStore } from '@/player/stores'
import { startKuromoji } from '@/player/assets/utils/kuromoji'
import { LANGUAGES, LANGUAGE_TYPES } from '@/player/assets/utils/constants'
import SubtitleItem from '@/player/components/subtitles/SubtitleItem.vue'
import SettingsIcon from '@/player/assets/icons/settings.svg?raw'
import ArrowLeftIcon from '@/player/assets/icons/arrow-left.svg?raw'
import ArrowRightIcon from '@/player/assets/icons/arrow-right.svg?raw'
import ReloadIcon from '@/player/assets/icons/reload.svg?raw'

const player = usePlayerStore()
const subtitle = useSubtitleStore()

watchEffect(() => {
  subtitle.fetch(
    LANGUAGE_TYPES.NATIVE,
    player.playerInfo.currentProgress as number
  )
  subtitle.fetch(
    LANGUAGE_TYPES.JAPANESE,
    player.playerInfo.currentProgress as number
  )
})

onMounted(() => {
  startKuromoji()
  player.load()
  subtitle.setLanguage(LANGUAGES.ENGLISH)
  subtitle.getAnime()
})
</script>

<template>
  <div
    v-if="subtitle.showSubtitles"
    class="container"
  >
    <div class="content">
      <div class="side-options">
        <div
          class="icon"
          v-html="ArrowRightIcon"
        />
        <div
          class="icon"
          v-html="ReloadIcon"
        />
        <div
          class="icon"
          v-html="ArrowLeftIcon"
        />
      </div>
      <div>
        <subtitle-item :type="LANGUAGE_TYPES.JAPANESE" />
        <subtitle-item :type="LANGUAGE_TYPES.NATIVE" />
      </div>
      <div class="side-options">
        <div
          class="icon"
          v-html="SettingsIcon"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

  .container
    display: flex
    width: 100%
    height: 100vh
    padding: 0px
    margin: 0px
    background: none
    pointer-events: none
    position: absolute
    top: 0
    left: 0

  .content
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    width: 100%
    min-height: 200px
    z-index: 1
    position: absolute
    bottom: 75px
    pointer-events: none

  .side-options
    display: flex
    flex-direction: column
    padding: 0px 22px 0px 22px
    gap: 8px
    cursor: pointer
    pointer-events: auto

  .icon
      width: 40px
      height: 40px
      border-radius: 8px
      background: rgba(165, 167, 171, 0.8)
      display: flex
      align-items: center
      justify-content: center
</style>
