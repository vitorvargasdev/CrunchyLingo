<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { usePlayerStore, useSubtitleStore } from '@/player/stores'
import { startKuromoji } from '@/player/assets/utils/kuromoji'
import { LANGUAGES, LANGUAGE_TYPES } from '@/player/assets/utils/constants'
import SubtitleItem from '@/player/components/subtitles/SubtitleItem.vue'

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
      <subtitle-item :type="LANGUAGE_TYPES.JAPANESE" />
      <subtitle-item :type="LANGUAGE_TYPES.NATIVE" />
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
    flex-direction: column
    align-items: center
    width: 100%
    z-index: 1
    position: absolute
    bottom: 100px
    pointer-events: auto

</style>
