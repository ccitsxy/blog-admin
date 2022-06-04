import { defineStore } from 'pinia';

import type { RouteLocationNormalized } from 'vue-router';
import router from '@/router';

interface MultiTabState {
  tabList: RouteLocationNormalized[];
}

export const useMultiTabStore = defineStore({
  id: 'multi-tab',
  state: (): MultiTabState => ({
    tabList: [],
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
  },
  actions: {
    addTab(tab: RouteLocationNormalized) {
      if (
        this.tabList.some((item) => item.path === tab.path) ||
        tab.path.startsWith('/redirect')
      )
        return;
      this.tabList.push(tab);
    },
    closeTab(tab: RouteLocationNormalized) {
      const tabIndex = this.tabList.indexOf(tab);
      this.tabList.splice(tabIndex, 1);
      if (tabIndex === 0) {
        router.push(this.tabList[0].path);
      } else if (tabIndex === this.tabList.length) {
        router.push(this.tabList[tabIndex - 1].path);
      } else {
        router.push(this.tabList[tabIndex].path);
      }
    },
    closeOtherTabs(tab: RouteLocationNormalized) {
      this.tabList = this.tabList.filter((item) => item.path === tab.path);
    },
    closeLeftTabs(tab: RouteLocationNormalized) {
      const index = this.tabList.findIndex((item) => item.path == tab.path);
      this.tabList.splice(0, index);
    },
    closeRightTabs(tab: RouteLocationNormalized) {
      const index = this.tabList.findIndex((item) => item.path === tab.path);
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
