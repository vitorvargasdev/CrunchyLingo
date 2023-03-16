<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import SideButtonItem from './SideButtonItem.vue'
import XSquere from '@/player/assets/icons/x-square.svg?raw'
import Home from '@/player/assets/icons/home.svg?raw'
import OpenaiIcon from '@/player/assets/icons/openai-sm.svg?raw'
import CodeIcon from '@/player/assets/icons/code.svg?raw'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

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
          <div v-html="Home" />
          <div>General</div>
        </div>
        <div
          class="close-button"
          @click.stop="close()"
          v-html="XSquere"
        />
      </div>

      <div class="modal-body">
        <div class="modal-body-sidebar">
          <side-button-item
            text="General"
            :icon="Home"
            active
          />
          <side-button-item
            text="ChatGPT"
            :icon="OpenaiIcon"
          />
          <side-button-item
            text="Developer"
            :icon="CodeIcon"
          />
        </div>
        <div class="modal-body-content">
          //
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
      padding: 10px
      flex-grow: 0
      flex-shrink: 0
      flex-basis: 150px
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
