// import './assets/main.css'
import '~bootstrap/scss/bootstrap.scss'
import '@renderer/assets/bootstrap-custom.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'floating-vue/dist/style.css'

const app = createApp(App)
app.use(FloatingVue)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
