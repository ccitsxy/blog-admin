import { RouteRecordRaw } from 'vue-router'

import { renderIcon } from '@/utils/renderIcon'
import { DashboardOutlined, EditOutlined, ApiOutlined } from '@vicons/antd'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: '主页' },
    component: () => import('../Layout/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '仪表盘',
          icon: renderIcon(DashboardOutlined)
        },
        component: () => import('../views/Dashboard/Dashboard.vue')
      },
      {
        path: '/blog',
        name: 'blog',
        meta: {
          title: '博客管理',
          icon: renderIcon(EditOutlined)
        },
        redirect: '/blog/article',
        component: () => import('../Layout/LayoutView.vue'),
        children: [
          {
            path: '/blog/article',
            name: 'article',
            meta: {
              title: '文章管理'
            },
            component: () => import('../views/Blog/Markdown.vue')
          }
        ]
      },
      {
        path: '/interface',
        name: 'interface',
        meta: {
          title: '接口管理',
          icon: renderIcon(ApiOutlined)
        },
        component: () => import('../views/Interface/Article.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../Layout/UserLayout.vue'),
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        component: () => import('../views/User/Login.vue')
      },
      {
        path: '/user/register',
        component: () => import('../views/User/Register.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error404.vue')
  }
]

export default routes
