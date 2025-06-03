import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar,Dialog } from 'quasar'
import router from './router'
import { createPinia } from 'pinia'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

import 'quasar/src/css/index.sass'

const pinia = createPinia()
const myApp = createApp(App)

myApp.use(pinia)
myApp.use(Quasar, {
    plugins: {Dialog}, // import Quasar plugins and add here
  })
myApp.use(router)
myApp.mount('#app')
