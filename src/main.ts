import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router, { icons } from './router';

import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ProLayout).use(PageContainer);
app.use(icons);

app.mount('#app');
