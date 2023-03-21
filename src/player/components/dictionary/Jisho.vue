<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { JishoEntry, JishoReadings, ORIGIN } from '@/player/assets/axios/dict/types'
import * as axios from '@/player/assets/axios'
import { JapaneseToFurigana } from '@/player/assets/utils/analysis'

const props = defineProps({
  word: {
    type: String,
    default: ''
  }
})

const data = ref({} as JishoEntry)

const fetch = async (keyword: string) => {
  data.value = await axios.dict.fetch(keyword, ORIGIN.JISHO)
}

const displayJapanese = (japaneseEntry: JishoReadings) => {
  const { word, reading } = japaneseEntry

  if (word && reading) {
    return JapaneseToFurigana(word, reading)
  }

  return word || reading || ''
}

onMounted(() => {
  fetch(props.word)
})

</script>

<template>
  <div>
    <div
      v-for="(entry) of data"
      :key="entry.slug"
      class="entry"
    >
      <div
        class="japanese"
        v-html="displayJapanese(entry.japanese[0])"
      />
      
      <div class="info">
        <div
          v-if="entry.is_common"
          class="common-word"
        >
          Common word
        </div>

        <div
          v-if="entry.jlpt[0]"
          class="jlpt"
          v-text="entry.jlpt[0]"
        />
      </div>

      <div
        v-for="(sense, index) of entry.senses"
        :key="index"
        class="sense"
      >
        <div class="definition-container">
          <div
            class="part_of_speech"
            v-text="sense.parts_of_speech.join(', ')"
          />
          <div v-text="sense.english_definitions.join('; ')" />
        </div>
      </div>
    </div>
  </div>
</template>
