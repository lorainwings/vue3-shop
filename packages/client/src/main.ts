import 'normalize.css'
import 'vant/lib/index.css'
import './assets/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import global from './global'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(global)
app.mount('#app')
