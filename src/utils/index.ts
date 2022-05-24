// https://github.com/vueComponent/pro-components/tree/next/packages/pro-layout/src/utils
import type { RouteRecord, RouteRecordRaw } from 'vue-router';

function clearMenuItem(
  menusData: RouteRecord[] | RouteRecordRaw[]
): RouteRecordRaw[] {
  return menusData
    .map((item: RouteRecord | RouteRecordRaw) => {
      const finalItem = { ...item };
      if (!finalItem.name || finalItem.meta?.hideInMenu) {
        return null;
      }

      if (finalItem && finalItem?.children) {
        if (
          !finalItem.meta?.hideChildInMenu &&
          finalItem.children.some(
            (child: RouteRecord | RouteRecordRaw) =>
              child && child.name && !child.meta?.hideInMenu
          )
        ) {
          return {
            ...item,
            children: clearMenuItem(finalItem.children),
          };
        }
        delete finalItem.children;
      }
      return finalItem;
    })
    .filter((item) => item) as RouteRecordRaw[];
}

function formatRelativePath(
  routes: RouteRecordRaw[],
  parent?: RouteRecordRaw
): RouteRecordRaw[] {
  // 计算路由绝对路径
  return routes.map((route) => {
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    // @ref https://router.vuejs.org/guide/essentials/nested-routes.html#nested-routes
    const hasRelativePath = route.path.startsWith('/');
    if (!hasRelativePath) {
      if (parent) {
        route.path = `${parent.path || ''}/${route.path}`;
      } else {
        route.path = `/${route.path}`;
      }
    }

    // reformat path
    route.path = route.path.replace('//', '/');
    // format children routes
    if (route.children && route.children.length > 0) {
      route.children = formatRelativePath(route.children, route);
    }
    return route;
  });
}

export function getMenuData(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const childrenRoute = clearMenuItem(routes).find(
    (route) => route.path === '/'
  );
  return formatRelativePath(
    childrenRoute?.children || ([] as RouteRecordRaw[])
  );
}
