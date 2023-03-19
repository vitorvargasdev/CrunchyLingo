<script setup lang="ts">
const props = defineProps({
  data: {
    type: String,
    default: () => ''
  }
})
</script>

<template>
  <div>
    {{ props.data }}
  </div>
</template>
