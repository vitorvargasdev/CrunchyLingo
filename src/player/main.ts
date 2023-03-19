import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import '@/player/assets/sass/main.sass'

createApp(App)
  .use(createPinia())
  .mount('#app')
