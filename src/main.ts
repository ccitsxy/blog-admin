import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import icons from './components/SiderMenu/icons'

const app = createApp(App)

app.use(store, key).use(router).use(icons).mount('#app')
