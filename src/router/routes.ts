import { RouteRecordRaw } from "vue-router";

import MainLayout from "../layout/MainLayout.vue";
import RouteView from "../layout/RouteView.vue";
import UserLayout from "../layout/UserLayout.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    meta: { title: "主页" },
    component: MainLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { title: "仪表盘", icon: "DashboardOutlined" },
        redirect: "/dashboard/monitor",
        component: RouteView,
        children: [
          {
            path: "/dashboard/monitor",
            name: "monitor",
            meta: { title: "监控页" },
            component: () => import("../views/Dashboard/Monitor.vue"),
          },
          {
            path: "/dashboard/workspace",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => import("../views/Dashboard/Analysis.vue"),
          },
        ],
      },
    ],
  },
  {
    path:'/user',
    component: UserLayout,
      redirect: '/user/login',
      children:[{
        path: '/user/login',
          component: () => import("../views/Login.vue")
      }]
  }
];

export default routes;
