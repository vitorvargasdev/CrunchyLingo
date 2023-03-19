<script setup lang="ts">
import { defineProps, defineEmits, ref, PropType } from 'vue'
import { Option } from './type'
import multiselect from 'vue-multiselect'

const props = defineProps({
  options: {
    type: Object as PropType<Option[]>,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

const selected = ref(props.options.find((option) => option.code === props.modelValue))

const changed = (selected: Option) => {
  emits('update:modelValue', selected.code)
}
</script>

<template>
  <multiselect
    v-model="selected"
    label="label"
    track-by="code"
    :options="options"
    :allow-empty="false"
    @select="changed"
  />
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
