import { createRouter, createWebHistory } from 'vue-router';

import { App } from 'vue';

import { CloseOutlined, DashboardOutlined } from '@ant-design/icons-vue';

// manually import menu icons
const components = [DashboardOutlined, CloseOutlined];

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
      meta: { title: '主页', icon: DashboardOutlined.name },
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { title: 'Dashboard', icon: DashboardOutlined.name },
          component: () => import('@/layouts/LayoutView.vue'),
          redirect: '/dashboard/monitor',
          children: [
            {
              path: 'workspace',
              name: 'workspace',
              meta: { title: 'Workspace', icon: DashboardOutlined.name },
              component: () => import('@/views/HomeView.vue'),
            },
            {
              path: 'monitor',
              name: 'monitor',
              meta: { title: 'Monitor', icon: CloseOutlined.name },
              component: () => import('@/views/AboutView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/redirect',
      name: 'redirectIndex',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/redirect/:path(.*)',
          name: 'redirectChild',
          component: () => import('@/components/redirect/index.vue'),
          meta: { title: '加载中...' },
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/ErrorView.vue')
    }
  ],
});

export default router;
