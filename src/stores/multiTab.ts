import { defineStore } from 'pinia';

import type { RouteLocationNormalized } from 'vue-router';
import router from '@/router';

interface MultiTabState {
  tabList: RouteLocationNormalized[];
  excludedTabList: Set<string>;
}

export const useMultiTabStore = defineStore({
  id: 'multi-tab',
  state: (): MultiTabState => ({
    tabList: [],
    excludedTabList: new Set(),
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
    getExcludedTabList(): string[] {
      return Array.from(this.excludedTabList);
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
      this.excludedTabList.delete(tab.name as string);
    },
    closeTab(tab: RouteLocationNormalized) {
      const tabIndex = this.tabList.indexOf(tab);
      this.tabList.splice(tabIndex, 1);
      this.excludedTabList.add(tab.name as string);
      if (tabIndex === 0) {
        router.push(this.tabList[0].path);
      } else if (tabIndex === this.tabList.length) {
        router.push(this.tabList[tabIndex - 1].path);
      } else {
        router.push(this.tabList[tabIndex].path);
      }
    },
    closeOtherTabs(tab: RouteLocationNormalized) {
      this.tabList
        .filter((item) => item.path !== tab.path)
        .forEach((element) => this.excludedTabList.add(element.name as string));
      this.tabList = this.tabList.filter((item) => item.path === tab.path);
    },
    closeLeftTabs(tab: RouteLocationNormalized) {
      const index = this.tabList.findIndex((item) => item.path == tab.path);
      const closedTab = this.tabList.splice(0, index);
      closedTab.forEach((element) =>
        this.excludedTabList.add(element.name as string)
      );
    },
    closeRightTabs(tab: RouteLocationNormalized) {
      const index = this.tabList.findIndex((item) => item.path === tab.path);
      const closedTab = this.tabList.splice(index + 1);
      closedTab.forEach((element) =>
        this.excludedTabList.add(element.name as string)
      );
    },
    closeAllTabs() {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
      this.excludedTabList.clear;
      if (this.tabList.length === 0) {
        router.push('/');
      } else {
        router.push(this.tabList[this.tabList.length - 1].path);
      }
    },
  },
});
