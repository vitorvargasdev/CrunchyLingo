<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/player/stores'
import { LANGUAGES } from '@/player/assets/utils/constants'
import VSelect from '@/player/components/vSelect/vSelect.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const settingsStore = useSettingsStore()
const selected = ref(settingsStore.general.language)

const options = ref([
  {
    label: t('languages.en'),
    code: LANGUAGES.ENGLISH
  },
  {
    label: t('languages.ptBR'),
    code: LANGUAGES.PORTUGUESE
  }
])

</script>

<template>
  <div class="-container">
    <form @submit.prevent>
      <label
        for="native-language"
        v-text="t('settings.general.chooseNativeLanguage')"
      />
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
