import { createApp } from 'vue'
import './assets/main.scss'
import router from './router'

import App from './App.vue'

// Importējam vēlamās komponentes
import Header from './components/HeaderComponent.vue'
import AudioPlayer from './components/AudioPlayerComponent.vue'
import NavigationComponent from './components/NavigationComponent.vue'
import IconCaretUp from './components/icons/IconCaretUp.vue'

const app = createApp(App)

// Komponenetes kuras mēs pievienojam šeit būs globāli pieejamas
app
    .component('Header', Header)
    .component('AudioPlayer', AudioPlayer)
    .component('NavigationComponent', NavigationComponent)
    .component('IconCaretUp', IconCaretUp);

// Šādi aktivizē rūteri
app.use(router)

app.mount('#app')
