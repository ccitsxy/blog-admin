<script setup lang="ts">
import { reactive, watchEffect, computed, ref, unref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';

import { useWindowSize } from '@vueuse/core';

import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout';
import type { RouteContextProps } from '@ant-design-vue/pro-layout';
import {
  UserOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';

import MultiTab from '@/layouts/MultiTab/MultiTab.vue';
import NestedPage from '@/layouts/NestedPage/NestedPage.vue';

const route = useRoute();
const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const { width } = useWindowSize();

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
    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched
      .filter((r) => r.name !== 'index')
      .map((r) => r.path);

    state.openKeys = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path);
  }
  if (width.value > 768 && state.collapsed) {
    state.openKeys = []
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

    <template #menuItemRender="{ item, icon }">
      <a-menu-item :key="item.path" :icon="icon">
        <router-link :to="{ path: item.path }">
          <span class="ant-pro-menu-item">
            <span class="ant-pro-menu-item-title">{{ item.meta.title }}</span>
          </span>
        </router-link>
      </a-menu-item>
    </template>

    <template #headerContentRender>
      <div class="layout-breadcrumb">
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

    <multi-tab />

    <div class="layout-content">
      <nested-page />
    </div>
  </pro-layout>
</template>

<style scoped>
@import './MainLayout.css';
</style>
