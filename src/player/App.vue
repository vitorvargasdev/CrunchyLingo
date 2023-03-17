<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { usePlayerStore, useAnimeStore, useSubtitleStore } from '@/player/stores'
import { startKuromoji } from '@/player/assets/utils/kuromoji'
import { LANGUAGES, LANGUAGE_TYPES, SUBTITLE_ACTIONS } from '@/player/assets/utils/constants'
import SubtitleItem from '@/player/components/subtitles/SubtitleItem.vue'
import {
  SettingsIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ReloadIcon,
  AcademicIcon
} from '@/player/assets/icons'

import SettingsModal from '@/player/components/settings/SettingsModal.vue'

const player = usePlayerStore()
const anime = useAnimeStore()
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

const showModal = ref(false)

onMounted(() => {
  startKuromoji()
  anime.getAnime()
  player.load()
  subtitle.setLanguage(LANGUAGES.ENGLISH)
})
</script>

<template>
  <div
    v-if="subtitle.showSubtitles"
    class="root-container"
  >
    <div class="root-content">
      <div class="side-option">
        <div
          class="side-option-icon"
          @click.stop="subtitle.setSubtitle(SUBTITLE_ACTIONS.NEXT)"
          v-html="ArrowRightIcon"
        />
        <div
          class="side-option-icon"
          @click.stop="subtitle.setSubtitle(SUBTITLE_ACTIONS.RELOAD)"
          v-html="ReloadIcon"
        />
        <div
          class="side-option-icon"
          @click.stop="subtitle.setSubtitle(SUBTITLE_ACTIONS.PREVIOUS)"
          v-html="ArrowLeftIcon"
        />
      </div>
      <div>
        <subtitle-item :type="LANGUAGE_TYPES.JAPANESE" />
        <subtitle-item :type="LANGUAGE_TYPES.NATIVE" />
      </div>
      <div class="side-option">
        <div
          class="side-option-icon"
          v-html="AcademicIcon"
        />
        <div
          class="side-option-icon"
          @click.stop="showModal = true"
          v-html="SettingsIcon"
        />
      </div>
      <SettingsModal v-model="showModal" />
    </div>
  </div>
</template>
