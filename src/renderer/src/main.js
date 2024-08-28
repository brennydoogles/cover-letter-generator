// import './assets/main.css'
import '~bootstrap/scss/bootstrap.scss'
import '@renderer/assets/bootstrap-custom.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
