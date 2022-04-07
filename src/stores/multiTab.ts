import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

interface MultiTabState {
  tabList: RouteLocationNormalized[];
  cachedTabList: Set<string>;
}

export const useCounterStore = defineStore({
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
  actions: {},
});
