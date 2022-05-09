import { createRouter, createWebHistory } from 'vue-router';
import { EditOutlined, SettingOutlined } from '@vicons/antd';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: '主页' },
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '主页', icon: EditOutlined },
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/manager',
          name: 'manager',
          meta: { title: '管理', icon: SettingOutlined },
          component: () => import('@/layouts/NestedPage.vue'),
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
            {
              path: '/manager/category',
              name: 'category',
              meta: {
                title: '分类管理',
              },
              component: () => import('@/views/AboutView.vue'),
            },
            {
              path: '/manager/tag',
              name: 'tag',
              meta: {
                title: '标签管理',
              },
              component: () => import('@/views/AboutView.vue'),
            },
          ],
        },
        {
          path: '/test',
          name: 'test',
          meta: { title: '测试', icon: EditOutlined },
          component: () => import('@/layouts/NestedPage.vue'),
          redirect: '/test/1',
          children: [
            {
              path: '/test/1',
              name: 'test1',
              meta: {
                title: '测试1',
              },
              component: () => import('@/views/AboutView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/redirect/:path(.*)',
          name: 'redirect',
          component: () => import('@/views/RedirectView.vue'),
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

export default router;
