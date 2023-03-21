<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import { usePlayerStore } from '@/player/stores'
import Jisho from './Jisho.vue'
import Manabou from './Manabou.vue'
import { ORIGIN } from '@/player/assets/axios/dict/types'

const props = defineProps({
  word: {
    type: String,
    default: ''
  }
})

const playerStore = usePlayerStore()

const dict: Ref<ORIGIN> = ref(ORIGIN.JISHO)

onMounted(() => {
  playerStore.pause()
})
</script>

<template>
  <div class="dictionary">
    <div class="dict-option">
      <button
        :class="{ active: dict === ORIGIN.JISHO }"
        @click.stop="dict = ORIGIN.JISHO"
      >
        Jisho
      </button>
      <button
        :class="{ active: dict === ORIGIN.MANABOU }"
        @click.stop="dict = ORIGIN.MANABOU"
      >
        Manabou
      </button>
    </div>

    <div>
      <Jisho
        v-if="dict === ORIGIN.JISHO"
        :word="props.word"
      />
      <Manabou
        v-else
        :word="props.word"
      />
    </div>
  </div>
</template>
