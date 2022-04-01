<script setup lang="ts">
import { reactive, watchEffect, computed, ref, unref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout';
import type { RouteContextProps } from '@ant-design-vue/pro-layout';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // default openKeys
  selectedKeys: [], // default selectedKeys
});

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
  }
});

window.ondragstart = function (event) {
  event.preventDefault();
  event.stopPropagation();
};

function reloadPage() {
  void router.push({
    path: '/redirect' + unref(route).fullPath,
  });
}
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
      <router-link to="/">
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
        <reload-outlined class="layout-breadcrumb-icon" @click="reloadPage()" />
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

    <tabs-view />

    <div class="layout-content">
      <nested-view />
    </div>
  </pro-layout>
</template>

<style scoped>
@import './MainLayout.css';
</style>
