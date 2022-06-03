import { createRouter, createWebHistory } from 'vue-router';
import {
  EditOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@vicons/antd';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: { name: 'HomeView' },
      children: [
        {
          path: 'home',
          name: 'HomeView',
          meta: {
            title: '主页',
            icon: EditOutlined,
            affix: true,
          },
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/manager',
          meta: { title: '管理', icon: SettingOutlined },
          component: () => import('@/layouts/NestedPage.vue'),
          redirect: { name: 'ArticleManager' },
          children: [
            {
              path: 'article',
              name: 'ArticleManager',
              meta: {
                title: '文章管理',
              },
              component: () => import('@/views/manager/ArticleManager.vue'),
            },
            {
              path: 'category',
              name: 'CategoryManager',
              meta: {
                title: '分类管理',
              },
              component: () => import('@/views/manager/CategoryManager.vue'),
            },
            {
              path: 'tag',
              name: 'TagManager',
              meta: {
                title: '标签管理',
              },
              component: () => import('@/views/manager/TagManager.vue'),
            },
          ],
        },
        {
          path: 'about',
          name: 'AboutView',
          meta: {
            title: '关于',
            icon: QuestionCircleOutlined,
          },
          component: () => import('@/views/AboutView.vue'),
        },
      ],
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: ':path(.*)',
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
