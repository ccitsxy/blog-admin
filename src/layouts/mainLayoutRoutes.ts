import { RouteRecordRaw } from 'vue-router'

const mainLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/Index.vue'),
    meta: {
      icon: 'home',
      title: '主页'
    }
  },
  {
    path: '/editor',
    component: () => import('pages/Editor/Index.vue'),
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
      }
    ]
  }
]

export default mainLayoutRoutes
