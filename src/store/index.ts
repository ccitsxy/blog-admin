import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { RouteLocationNormalized } from "vue-router";

// 为 store state 声明类型
export interface State {
  tabList: RouteLocationNormalized[];
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tabList: [],
  },
  mutations: {
    addTab(state: State, payload: RouteLocationNormalized) {
      if (state.tabList.some(p => p.path === payload.path)) return;
      state.tabList.push(payload);
    },
  },
});

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key);
}
