import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import i18n from '@/player/plugins/i18n'
import '@/player/assets/sass/main.sass'

createApp(App)
  .use(createPinia())
  .use(i18n)
  .mount('#app')
