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
          (item) => item.path === router.currentRoute.value.path
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
        router.push(this.tabList[0].path);
      } else if (tabIndex === this.tabList.length) {
        router.push(this.tabList[tabIndex - 1].path);
      } else {
        router.push(this.tabList[tabIndex].path);
      }
    },
    closeCurrentTab() {
      const index = this.tabList.findIndex(
        (item) => item.path == router.currentRoute.value.path
      );
      this.tabList.splice(index, 1);
    },
    closeOtherTabs() {
      // 关闭其他
      this.tabList = this.tabList.filter(
        (item) => item.path === router.currentRoute.value.path
      );
    },
    closeLeftTabs() {
      // 关闭左侧
      const index = this.tabList.findIndex(
        (item) => item.path == router.currentRoute.value.path
      );
      this.tabList.splice(0, index);
    },
    closeRightTabs() {
      // 关闭右侧
      const index = this.tabList.findIndex(
        (item) => item.path === router.currentRoute.value.path
      );
      this.tabList.splice(index + 1);
    },
    closeAllTabs() {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
      if (this.tabList.length === 0) {
        router.push('/');
      } else {
        router.push(this.tabList[this.tabList.length - 1].path);
      }
    },
  },
});
