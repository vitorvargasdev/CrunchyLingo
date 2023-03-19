<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/player/stores'
import { LANGUAGES } from '@/player/assets/utils/constants'
import VSelect from '@/player/components/vSelect/vSelect.vue'

const settingsStore = useSettingsStore()
const selected = ref(settingsStore.general.language)

const options = ref([
  {
    label: 'English',
    code: LANGUAGES.ENGLISH
  },
  {
    label: 'Português (Brasil)',
    code: LANGUAGES.PORTUGUESE
  }
])

</script>

<template>
  <div class="-container">
    <form @submit.prevent>
      <label for="native-language">Choose your native language</label>
      <v-select
        v-model="selected"
        :options="options"
        @update:model-value="settingsStore.setLanguage"
      />
    </form>
  </div>
</template>

<style scoped lang="sass">
</style>
