<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { usePlayerStore, useSubtitleStore } from './stores'
import * as kuromoji from '@/player/assets/utils/kuromoji'
import { furiganaToKuromoji } from '@/player/assets/utils/analysis'
import { LANGUAGES } from '@/player/assets/utils/constants'

const player = usePlayerStore()
const subtitle = useSubtitleStore()

watchEffect(() => {
  subtitle.fetch(
    'native',
    player.playerInfo.currentProgress as number
  )
  subtitle.fetch(
    'japanese',
    player.playerInfo.currentProgress as number
  )
})

onMounted(() => {
  player.load()
  subtitle.setLanguage(LANGUAGES.ENGLISH)
  subtitle.getAnime()
  kuromoji.startKuromoji()
})
</script>

<template>
  <div
    v-if="subtitle.showSubtitles"
    style="position: fixed; z-index: 1; bottom: 95px; width: 100%"
  >
    <div
      v-show="subtitle.getCurrentJapaneseSubtitle"
      class="Player-text-chunk-outer"
      style="margin-bottom: 10px; padding: 12px 0px"
    >
      <div
        class="Player-text-chunk-inner"
        style="margin: 0px; padding: 0px"
      >
        <div style="position: relative">
          <div class="Player-text-chunk-annotext Player-text-chunk-annotext-visible">
            <span
              v-for="(item, index) in subtitle.current.token"
              :key="index"
            >
              <span
              
                onmouseover="this.style.backgroundColor = 'rgba(0, 128, 0, 0.3)'"
                onmouseout="this.style.backgroundColor = 'rgba(0, 128, 0, 0)'"
                v-html="furiganaToKuromoji(item)"
              />
              <span
                v-show="
                  item.surface_form !== ' ' &&
                    item.pos === '記号' &&
                    item.pos_detail_1 === '空白' &&
                    item.word_type === 'UNKNOWN'
                "
              >
                <br>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="subtitle.getCurrentNativeSubtitle"
      class="Player-text-chunk-outer"
      style="margin-bottom: 10px; padding: 12px 0px"
    >
      <div
        class="Player-text-chunk-inner"
        style="margin: 0px; padding: 0px"
      >
        <div
          style="position: relative"
        >
          <div class="Player-text-chunk-annotext Player-text-chunk-annotext-visible">
            <span> {{ subtitle.getCurrentNativeSubtitle }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
div.scroll {
  width: auto;
  height: auto;
  overflow-y: scroll;
}

.Player-text-chunk-outer {
  /*
    With the text-shadow, this background seems optional.
    Itt might be good to have it as an option. We put it in an outer
    wrapper because I think it looks better when it's full-width.
  */
  background: rgba(0, 0, 0, 0.1);
}

.Player-text-chunk-inner {
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black,
    0 0 5px black;
  font-size: 1.6em;
  text-align: center;
  overflow: hidden;
  padding: 0.3em 0.5em;
  margin: 10px auto;
}

.Player-text-chunk-annotext-hidden {
  /*visibility: hidden;*/
  filter: blur(6px);
  transition: filter 0s;
  pointer-events: none;
}

.Player-text-chunk-annotext-visible {
  transition: filter 0.2s;
  font-size: 24px;
  /*visibility: visible;*/
}

.AnnoText {
  overflow: hidden;
  user-select: none;
}

.AnnoText-textchar.AnnoText-selected {
  background: rgba(0, 255, 0, 0.5);
}

.AnnoText-textchar.AnnoText-hover {
  background: rgba(0, 255, 0, 0.25);
}

.AnnoText-highlight {
  background-color: rgba(0, 185, 255, 0.5);
}

.AnnoText-tooltip {
  font-size: 24px;
  line-height: 1.2;
}

.AnnoText-tooltip-search-words-list {
  text-align: left;
}

.AnnoText-tooltip-search-words-item:not(:last-child) {
  margin-bottom: 0.6em;
}

.AnnoText-tooltip-search-word {
  margin-bottom: 0.1em;
}

.AnnoText-tooltip-dict-hit {
  margin-top: 10px;
}

.Annotext-tooltip-dict-name {
  color: #aaa;
  font-size: 10px;
}

.Annotext-tooltip-dict-hit-text {
  font-size: 14px;
}

.AnnoText-tooltip-external-links {
  float: right;
  font-size: 0.5em;
}

.AnnoText-tooltip-external-links a,
.AnnoText-tooltip-external-links:link,
.AnnoText-tooltip-external-links:visited {
  color: #222;
}

.AnnoText-tooltip-external-links a:hover,
.AnnoText-tooltip-external-links:focus,
.AnnoText-tooltip-external-links:active {
  color: #666;
}

.AnnoText-edit-controls {
  font-size: 12px;
  margin-top: 10px;
}
</style>
