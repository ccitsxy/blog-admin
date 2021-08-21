import { RouteRecordRaw } from 'vue-router'

const mainLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('pages/PageIndex.vue'),
    redirect: '/dashboard/analysis',
    meta: {
      icon: 'mdi-view-dashboard-outline',
      title: '仪表盘'
    },
    children: [
      {
        path: '/dashboard/analysis',
        component: () => import('pages/Dashboard/Analysis.vue'),
        meta: {
          icon: 'mdi-home-outline',
          title: '分析页'
        }
      }
    ]
  },
  {
    path: '/editor',
    component: () => import('pages/PageIndex.vue'),
    redirect: '/editor/markdown',
    meta: {
      icon: 'mdi-pencil-outline',
      title: '编辑器'
    },
    children: [
      {
        path: '/editor/markdown',
        component: () => import('pages/Editor/MarkdownEditor.vue'),
        meta: {
          icon: 'mdi-language-markdown-outline',
          title: 'Markdown'
        }
      }
    ]
  }
]

export default mainLayoutRoutes
