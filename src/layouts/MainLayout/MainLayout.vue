<script setup lang="ts">
import { reactive, watchEffect, computed, ref } from 'vue';
import {
  useRouter,
  RouterLink,
  RouteLocationNormalizedLoaded,
} from 'vue-router';
import {
  getMenuData,
  clearMenuItem,
} from '@ant-design-vue/pro-layout';
import ProLayout from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.css';
import type { RouteContextProps } from '@ant-design-vue/pro-layout';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  CloseOutlined,
  MoreOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import LayoutView from '@/layouts/LayoutView.vue';

const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // default openKeys
  selectedKeys: [], // default selectedKeys
});

const tabs = ref<RouteLocationNormalizedLoaded[]>([]);

const proConfig = ref({
  layout: 'side',
  fixedHeader: false,
  fixSiderbar: false,
  splitMenus: false,
  menuHeaderRender: undefined,
  footerRender: undefined,
  headerRender: undefined,
});

const breadcrumb = computed(() =>
  router.currentRoute.value.matched
    .slice(1)
    .concat()
    .map((item) => {
      return {
        path: item.path,
        breadcrumbName: item.meta.title || '',
      };
    })
);

watchEffect(() => {
  if (router.currentRoute) {
    // console.log("router", router.currentRoute.value);

    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched
      .filter((r) => r.name !== 'index')
      .map((r) => r.path);

    state.openKeys = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path);

    if (
      tabs.value.some(
        (p: { path: string }) => p.path === router.currentRoute.value.path
      ) ||
      router.currentRoute.value.path.startsWith('/redirect')
    )
      return;

    tabs.value.push(router.currentRoute.value);
  }
});

const reloadPage = () => {
  void router.push({
    path: '/redirect' + router.currentRoute.value.fullPath,
  });
};
</script>

<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :menu-data="menuData"
    v-bind="proConfig"
    :collapsedButtonRender="false"
  >
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img
          src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg"
          alt="logo"
        />
        <h1>Preview Pro</h1>
      </router-link>
    </template>

    <template #headerContentRender>
      <div class="layout-breadcrumb">
        <menu-unfold-outlined
          v-if="state.collapsed"
          @click="state.collapsed = !state.collapsed"
          class="layout-breadcrumb-icon"
        />
        <menu-fold-outlined
          v-else
          @click="state.collapsed = !state.collapsed"
          class="layout-breadcrumb-icon"
        />
        <reload-outlined @click="reloadPage" class="layout-breadcrumb-icon" />
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            <router-link :to="item.path">{{ item.breadcrumbName }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </template>

    <template #rightContentRender>
      <a-dropdown>
        <user-outlined class="layout-right-icon" />
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">关闭当前</a-menu-item>
            <a-menu-item key="2">关闭其他</a-menu-item>
            <a-menu-item key="3">关闭到左侧</a-menu-item>
            <a-menu-item key="4">关闭到右侧</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>

    <a-tabs
      :activeKey="$route.path"
      type="editable-card"
      hideAdd
      class="layout-tabs"
    >
      <a-tab-pane
        v-for="tab in tabs"
        style="height: 0"
        :key="tab.path"
        :closable="false"
      >
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <router-link class="layout-tabs-tab" :to="tab.path">
              {{ tab.meta.title }}
              <close-outlined class="layout-tabs-tab-icon" />
            </router-link>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">关闭</a-menu-item>
                <a-menu-item key="2">关闭其他</a-menu-item>
                <a-menu-item key="3">关闭到左侧</a-menu-item>
                <a-menu-item key="4">关闭到右侧</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>

      <template #leftExtra>
        <span style="margin-left: 16px" />
      </template>

      <template #rightExtra>
        <a-dropdown>
          <more-outlined style="margin-right: 16px; font-size: 1rem" />
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">关闭当前</a-menu-item>
              <a-menu-item key="2">关闭其他</a-menu-item>
              <a-menu-item key="3">关闭到左侧</a-menu-item>
              <a-menu-item key="4">关闭到右侧</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>

    <div class="layout-content">
      <layout-view />
    </div>
  </pro-layout>
</template>

<style scoped>
@import url(MainLayout.css);
</style>
