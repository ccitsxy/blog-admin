import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

import {
  // create naive ui
  create,
  // component
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NIcon,
  NAnchor,
  NAnchorLink,
  NButton,
  NBackTop
} from 'naive-ui'

const naive = create({
  components: [
    NConfigProvider,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NMenu,
    NIcon,
    NAnchor,
    NAnchorLink,
    NButton,
    NBackTop
  ]
})

const app = createApp(App)

app.use(store, key).use(router).use(naive).mount('#app')
