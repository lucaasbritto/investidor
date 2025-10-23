import { createApp } from 'vue'
import { Quasar,Dialog,Notify } from 'quasar'
import router from './router'
import App from './App.vue'
import api from './api'
import './assets/global.scss'
import quasarIconSet from 'quasar/icon-set/material-icons'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/dist/quasar.css'
import 'quasar/src/css/index.sass'

import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.config.globalProperties.$api = api

app.use(Quasar, {
  plugins: {
    Dialog, 
    Notify
  },
  iconSet: quasarIconSet, 
})
app.use(router)
app.mount('#app')