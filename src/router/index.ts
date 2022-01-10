import { createRouter, createWebHistory } from 'vue-router';

import { App } from 'vue';

import { useTitle } from '@vueuse/core';

import { HomeOutlined, FundOutlined } from '@ant-design/icons-vue';

// manually import menu icons
const components = [HomeOutlined, FundOutlined];

export function icons(app: App) {
  components.forEach((item) => {
    app.component(item.name, item);
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: '主页', icon: HomeOutlined.name },
      component: () => import('@/layouts/MainLayout/MainLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '主页', icon: HomeOutlined.name },
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/manager',
          name: 'manager',
          meta: { title: '管理', icon: FundOutlined.name },
          component: () => import('@/layouts/LayoutView.vue'),
          redirect: '/manager/article',
          children: [
            {
              path: '/manager/article',
              name: 'article',
              meta: {
                title: '文章管理',
              },
              component: () => import('@/views/AboutView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/redirect',
      name: 'redirectIndex',
      component: () => import('@/layouts/MainLayout/MainLayout.vue'),
      children: [
        {
          path: '/redirect/:path(.*)',
          name: 'redirectChild',
          component: () => import('@/components/redirect/Redirect.vue'),
          meta: { title: '加载中...' },
        },
      ],
    },
    {
      path: '/user',
      component: () => import('@/layouts/UserLayout/UserLayout.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/ErrorView.vue'),
    },
  ],
});

router.afterEach(() => {
  useTitle(router.currentRoute.value.meta.title);
});

export default router;
