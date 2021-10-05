import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

import { DashboardOutlined, EditOutlined } from '@ant-design/icons-vue'

const app = createApp(App)

app.use(store, key).use(router).mount('#app')

app.component(DashboardOutlined.displayName, DashboardOutlined)
app.component(EditOutlined.displayName, EditOutlined)
