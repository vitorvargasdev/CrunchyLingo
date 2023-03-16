<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <button :class="{ 'menu-item': true, active }">
    <div v-html="icon" /> {{ props.text }}
  </button>
</template>
