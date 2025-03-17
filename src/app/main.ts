import '@/shared/styles/main.css'

import { createApp } from 'vue'
import App from '@/app/App.vue'
import { createPinia } from 'pinia'
import { router } from './router'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
