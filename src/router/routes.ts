import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: '主页' },
    component: () => import('../components/Layout/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '仪表盘',
          icon: 'DashboardOutlined'
        },
        component: () => import('../views/Dashboard/Dashboard.vue')
      },
      {
        path: '/blog',
        name: 'blog',
        meta: {
          title: '博客管理',
          icon: 'EditOutlined'
        },
        redirect: '/blog/article',
        component: () => import('../components/Layout/LayoutView.vue'),
        children: [
          {
            path: '/blog/article',
            name: 'article',
            meta: {
              title: 'Markdown'
            },
            component: () => import('../views/Blog/Markdown.vue')
          }
        ]
      },
      {
        path: '/interface',
        name: 'interface',
        meta: {
          title: '接口管理'
        },
        component: () => import('../views/Interface/Article.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../components/Layout/UserLayout.vue'),
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
