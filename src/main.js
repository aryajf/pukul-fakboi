import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onRegistered(r) {
        r && setInterval(() => {
            r.update()
        }, 60 * 60 * 1000 /* 1 hour: timeout in milliseconds */)
    },
    onNeedRefresh() {
        // show a prompt to user
    },
    onOfflineReady() {
        // show a ready to work offline to user
    },
})
updateSW()

// Progressbar Loading
import VueProgressBar from "@aacassandra/vue3-progressbar"
const options = {
    color: "#2ecc71",
    failedColor: "#AA0022",
    thickness: "5px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
}

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Primevue
import PrimeVue from 'primevue/config'

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

// Vue Countdown
import VueCountdown from '@chenfengyuan/vue-countdown'

import Mixins from '@/mixins'
createApp(App).use(store).use(router).use(PrimeVue).use(VueProgressBar, options).mixin(Mixins).component(VueCountdown.name, VueCountdown).mount('#app')