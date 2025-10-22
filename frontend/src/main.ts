import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router'
import App from './App.vue'
import api from './api'
import './assets/global.scss'
import quasarIconSet from 'quasar/icon-set/material-icons'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/dist/quasar.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet, 
})
app.use(router)
app.mount('#app')