import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import i18n from '@/player/plugins/i18n'
import FloatingVue from 'floating-vue'
import '@/player/assets/sass/main.sass'
import 'floating-vue/dist/style.css'

FloatingVue.options.container = '#app'

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(FloatingVue)
  .mount('#app')
