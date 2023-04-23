import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faCopy } from '@fortawesome/free-solid-svg-icons'

import './assets/global.css'

library.add([faArrowRight, faCopy])
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
