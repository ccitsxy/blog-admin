import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { RouteLocationNormalized } from "vue-router";

declare module "@vue/runtime-core" {
  // 声明自己的 store state
  interface State {
    tabList: RouteLocationNormalized[];
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
