import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

interface MultiTabState {
  tabList: RouteLocationNormalized[];
  cachedTavList: Set<string>;
}

export const useCounterStore = defineStore({
  id: 'multi-tab',
  state: (): MultiTabState => ({
    tabList: [],
    cachedTavList: new Set(),
  }),
  getters: {},
  actions: {},
});
