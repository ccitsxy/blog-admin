import { RouteRecordRaw } from 'vue-router'

const mainLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('pages/PageIndex.vue'),
    redirect: '/dashboard/analysis',
    meta: {
      icon: 'dashboard',
      title: '仪表盘'
    },
    children: [
      {
        path: '/dashboard/analysis',
        component: () => import('pages/Dashboard/Analysis.vue'),
        meta: {
          icon: 'home',
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
      icon: 'edit',
      title: '编辑器'
    },
    children: [
      {
        path: '/editor/markdown',
        component: () => import('pages/Editor/MarkdownEditor.vue'),
        meta: {
          icon: 'mdi-language-markdown',
          title: 'Markdown编辑器'
        }
      },
      {
        path: '/editor/html',
        component: () => import('pages/Editor/HTMLEditor.vue'),
        meta: {
          icon: 'mdi-code-tags',
          title: 'HTML编辑器'
        }
      }
    ]
  }
]

export default mainLayoutRoutes
