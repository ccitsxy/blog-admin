import { createRouter, createWebHistory } from 'vue-router';

import type { App } from 'vue';

import { useTitle } from '@vueuse/core';

import NProgress from 'nprogress';

import {
  HomeOutlined,
  EditOutlined,
  FundOutlined,
} from '@ant-design/icons-vue';

// manually import menu icons
const components = [HomeOutlined, EditOutlined, FundOutlined];

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
      component: () => import('@/layouts/MainLayout.vue'),
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
          component: () => import('@/layouts/NestedPage.vue'),
          redirect: '/manager/article',
          children: [
            {
              path: '/manager/article',
              name: 'article',
              meta: {
                title: '文章管理',
              },
              component: () =>
                import('@/views/manager/ArticlesManager/ArticlesManager.vue'),
            },
            {
              path: '/manager/category',
              name: 'category',
              meta: {
                title: '分类管理',
              },
              component: () => import('@/views/manager/CategoriesManager.vue'),
            },
            {
              path: '/manager/tag',
              name: 'tag',
              meta: {
                title: '标签管理',
              },
              component: () => import('@/views/manager/TagsManager.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/user',
      component: () => import('@/layouts/UserLayout.vue'),
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/redirect/:path(.*)',
          name: 'redirect',
          component: () => import('@/views/redirect/RedirectView.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      name: 'error',
      component: () => import('@/views/ErrorView.vue'),
    },
  ],
});

NProgress.configure({
  showSpinner: false,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
  useTitle(router.currentRoute.value.meta.title);
});

export default router;
