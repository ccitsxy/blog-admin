import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

import {
  // create naive ui
  create,
  // component
  NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NMenu, NIcon, NAnchor, NAnchorLink, NButton
} from 'naive-ui'

const naive = create({
  components: [NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NMenu, NIcon, NAnchor, NAnchorLink, NButton]
})

const app = createApp(App)

app.use(store, key).use(router).use(naive).mount('#app')
