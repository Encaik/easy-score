import { createApp } from 'vue'
import './style.css'
import router from "./router/index"
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
