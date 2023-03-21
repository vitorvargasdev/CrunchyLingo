<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ORIGIN, ManabouEntry, ManabouReadings } from '@/player/assets/axios/dict/types'
import * as axios from '@/player/assets/axios'
import { JapaneseToFurigana } from '@/player/assets/utils/analysis'

const props = defineProps({
  word: {
    type: String,
    default: ''
  }
})

const data = ref({} as ManabouEntry)

const fetch = async (keyword: string) => {
  data.value = (await axios.dict.fetch(keyword, ORIGIN.MANABOU))
}

const displayJapanese = (japaneseEntry: ManabouReadings) => {
  const { kanji, kana } = japaneseEntry

  if (kanji && kana) {
    return JapaneseToFurigana(kanji, kana)
  }

  return kanji || kana || ''
}

onMounted(() => {
  fetch(props.word)
})

</script>

<template>
  <div>
    <div
      v-for="(entry) of data"
      :key="entry.id"
      class="entry"
    >
      <div
        class="japanese"
        v-html="displayJapanese(entry.readings[0])"
      />

      <div
        v-for="(sense) of entry.senses"
        :key="sense.id"
        class="sense"
      >
        <div class="definition-container">
          <div
            class="part_of_speech"
            v-text="sense.part_of_speech"
          />
          <div v-text="sense.definition" />
        </div>
      </div>
    </div>
  </div>
</template>
