// cspell:ignore Pinia
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate';
import Router from './router/router'
import App from './App.vue'

import './assets/css/tailwind.css'
const pinia = createPinia()
pinia.use(piniaPersistedState);
const app = createApp(App)
app.use(pinia)
app.use(Router)
app.mount('#app')