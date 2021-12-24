import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { key, store } from './store';

import {
  create,
  NBackTop,
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NConfigProvider,
  NForm,
  NFormItemRow,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NLoadingBarProvider,
  NMenu,
  NSpace,
  NSpin,
} from 'naive-ui';

const naive = create({
  components: [
    NBackTop,
    NButton,
    NConfigProvider,
    NForm,
    NFormItemRow,
    NIcon,
    NInput,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutSider,
    NLoadingBarProvider,
    NMenu,
    NSpace,
    NGrid,
    NGridItem,
    NBreadcrumb,
    NBreadcrumbItem,
    NSpin,
  ],
});

const app = createApp(App);

app.use(store, key).use(router).use(naive).mount('#app');
