<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'
import { useSubtitleStore } from '@/player/stores'
import { LANGUAGE_TYPES } from '@/player/assets/utils/constants'
import JapaneseItem from './JapaneseItem.vue'
import NativeItem from './NativeItem.vue'

const props = defineProps({
  type: {
    type: String as PropType<LANGUAGE_TYPES>,
    required: true
  }
})

const isJapanese = computed((): boolean => props.type === LANGUAGE_TYPES.JAPANESE)

const subtitle = useSubtitleStore()
</script>

<template>
  <div class="subtitle">
    <japanese-item
      v-if="isJapanese"
      :data="subtitle.current.token"
    />

    <native-item
      v-else
      :data="subtitle.getCurrentNativeSubtitle"
    />
  </div>
</template>

<style scoped lang="sass">

  .subtitle
    color: #fff
    font-size: 24px
    text-align: center
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0 0 5px black
    margin: 10px auto
    pointer-events: auto
    min-height: 50px

</style>
