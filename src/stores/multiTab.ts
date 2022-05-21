import { defineStore } from 'pinia';

import type { RouteLocationNormalized } from 'vue-router';
import router from '@/router';

interface MultiTabState {
  tabList: RouteLocationNormalized[];
  cachedTabList: Set<string>;
}

export const useMultiTabStore = defineStore({
  id: 'multi-tab',
  state: (): MultiTabState => ({
    tabList: [],
    cachedTabList: new Set(),
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
    getCachedTabList(): string[] {
      return Array.from(this.cachedTabList);
    },
  },
  actions: {
    addTab() {
      if (
        this.tabList.some(
          (p: { path: string }) => p.path === router.currentRoute.value.path
        ) ||
        router.currentRoute.value.path.startsWith('/redirect')
      )
        return;
      this.tabList.push(router.currentRoute.value);
      this.cachedTabList.add(router.currentRoute.value.name as string);
    },
    closeTab(tab: RouteLocationNormalized) {
      const tabIndex = this.tabList.indexOf(tab);
      this.tabList.splice(tabIndex, 1);
      this.cachedTabList.delete(tab.name as string);
      if (tabIndex === 0) {
        void router.push(this.tabList[0].path);
      } else if (tabIndex === this.tabList.length) {
        void router.push(this.tabList[tabIndex - 1].path);
      } else {
        void router.push(this.tabList[tabIndex].path);
      }
    },
  },
});
