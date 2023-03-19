<script setup lang="ts">
import { defineProps, defineEmits, Ref, ref, computed } from 'vue'
import SideButtonItem from './SideButtonItem.vue'
import type { Option } from './types'
import { XSquare, Home, OpenaiIcon, CodeIcon } from '@/player/assets/icons'
import General from './General.vue'
import ChatGPT from './ChatGPT.vue'
import Developer from './Developer.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const options: Ref<Option[]> = ref([
  {
    name: 'General',
    icon: Home,
    active: true,
    key: General
  },
  {
    name: 'ChatGPT',
    icon: OpenaiIcon,
    active: false,
    key: ChatGPT
  },
  {
    name: 'Developer',
    icon: CodeIcon,
    active: false,
    key: Developer
  }
])

const activeTab = computed(() => {
  return options.value.find((option) => option.active) as Option
})

const setActive = (selected: Option) => {
  options.value.forEach((option) => {
    option.active = option.name === selected.name
  })
}

const close = () => {
  emits('update:modelValue', false)
}
</script>

<template>
  <div
    v-if="props.modelValue"
    class="modal-overlay"
  >
    <div class="modal">
      <div class="modal-header">
        <div class="title">
          <div v-html="activeTab.icon" />
          <div v-text="activeTab.name" />
        </div>
        <div
          class="close-button"
          @click.stop="close()"
          v-html="XSquare"
        />
      </div>

      <div class="modal-body">
        <div class="modal-body-sidebar">
          <side-button-item
            v-for="option in options"
            :key="option.name"
            :text="option.name"
            :icon="option.icon"
            :active="option.active"
            @click.stop="setActive(option)"
          />
        </div>
        <div class="modal-body-content">
          <component :is="activeTab.key" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

.modal
  display: flex
  flex-direction: column
  background-color: #fff
  border-radius: 5px
  pointer-events: auto
  border: 1px solid rgba(0, 0, 0, 0.5)
  border-radius: 8px
  width: 90%
  height: 90%
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)
  &-header
    display: flex
    justify-content: space-between
    border-bottom: 1px solid rgba(0, 0, 0, 0.5)
    padding: 10px
  &-body
    flex-grow: 1
    display: flex
    flex-direction: row
    &-sidebar
      flex-grow: 0
      flex-shrink: 0
      flex-basis: 170px
      border-right: 1px solid rgba(0, 0, 0, 0.5)
      flex-direction: column
    &-content
      padding: 10px
      flex-grow: 1
      flex-shrink: 1
      flex-basis: 0

  .title
    padding-left: 10px
    font-size: 18px
    font-weight: 600
    color: #000
    display: flex
    align-items: center
    gap: 5px

  .close-button
    cursor: pointer
</style>
