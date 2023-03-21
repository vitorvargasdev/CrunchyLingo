<script setup lang="ts">
import { PropType } from 'vue'
import { furiganaToKuromoji } from '@/player/assets/utils/analysis'
import type { Tokenize } from '@/player/assets/utils/kuromoji-types'
import Dictionary from '@/player/components/dictionary/Dictionary.vue'

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
      <VDropdown
        placement="top"
        :distance="20"
        class="subtitle"
      >
        <span
          onmouseover="this.style.backgroundColor = 'rgba(0, 128, 0, 0.3)'"
          onmouseout="this.style.backgroundColor = 'rgba(0, 128, 0, 0)'"
          v-html="furiganaToKuromoji(item)"
        />

        <template #popper>
          <dictionary :word="item.surface_form" />
        </template>
      </VDropdown>
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

<style scoped lang="sass">

.subtitle
  display: inline

</style>