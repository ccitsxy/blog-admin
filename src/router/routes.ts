import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: '主页' },
    component: () => import('../layout/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: '仪表盘', icon: 'DashboardOutlined' },
        redirect: '/dashboard/monitor',
        component: () => import('../layout/RouteView.vue'),
        children: [
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            meta: { title: '监控页' },
            component: () => import('../views/Dashboard/Monitor.vue')
          },
          {
            path: '/dashboard/workspace',
            name: 'analysis',
            meta: { title: '分析页' },
            component: () => import('../views/Dashboard/Analysis.vue')
          }
        ]
      },
      {
        path: '/editor',
        name: 'editor',
        meta: { title: '编辑器', icon: 'EditOutlined' },
        redirect: '/editor/markdown',
        component: () => import('../layout/RouteView.vue'),
        children: [
          {
            path: '/editor/markdown',
            name: 'markdown',
            meta: { title: 'Markdown', icon: 'FileMarkdownOutlined' },
            component: () => import('../views/Editor/Markdown.vue')
          }
        ]
      },
      {
        path: '/table',
        name: 'table',
        meta: { title: '表格', icon: 'TableOutlined' },
        component: () => import('../views/Table/Table.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../layout/UserLayout.vue'),
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
  }
]

export default routes
