import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router, { icons } from './router';

import ProLayout from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ProLayout);
app.use(icons);

app.mount('#app');
