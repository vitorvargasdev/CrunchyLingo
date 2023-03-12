<script setup lang="ts">
import { PropType } from 'vue'
import { furiganaToKuromoji } from '@/player/assets/utils/analysis'
import type { Tokenize } from '@/player/assets/utils/kuromoji-types'

const props = defineProps({
  data: {
    type: Object as PropType<Tokenize[]>,
    default: () => [] as Tokenize[]
  }
})
</script>

<template>
  <div>
    <span
      v-for="(item, index) in props.data"
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
</template>
