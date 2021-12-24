import { RouteRecordRaw } from 'vue-router';

import { renderIcon } from '@/utils/renderIcon';
import { EditOutlined, SettingOutlined } from '@vicons/antd';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: '主页' },
    component: () => import('../layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/blog',
        name: 'blog',
        meta: {
          title: '博客管理',
          icon: renderIcon(SettingOutlined),
        },
        redirect: '/blog/article',
        component: () => import('../layouts/LayoutView.vue'),
        children: [
          {
            path: '/blog/article',
            name: 'article',
            meta: {
              title: '文章管理',
            },
            component: () => import('../views/Manager/ArticleManager.vue'),
          },
        ],
      }
    ],
  },
  {
    path: '/user',
    component: () => import('../layouts/UserLayout.vue'),
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        component: () => import('../views/User/UserLogin.vue'),
      },
      {
        path: '/user/register',
        component: () => import('../views/User/UserRegister.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error404.vue'),
  },
];

export default routes;
