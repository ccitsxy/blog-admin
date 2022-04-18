<script setup lang="ts">
import { watchEffect, computed, ref, unref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';

import { useWindowSize, useFullscreen } from '@vueuse/core';

import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout';
import {
  UserOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';
import { ProLayout } from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.css';

import MultiTab from '@/layouts/MultiTab/MultiTab.vue';
import NestedPage from '@/layouts/NestedPage/NestedPage.vue';

const route = useRoute();
const router = useRouter();

const { width } = useWindowSize();

const { enter, exit, isFullscreen } = useFullscreen();

const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const collapsed = ref(false);
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

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
    selectedKeys.value = matched
      .filter((r) => r.name !== 'index')
      .map((r) => r.path);

    openKeys.value = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path);
  }
  if (width.value > 768 && collapsed.value) {
    openKeys.value = [];
  }
});

function reloadPage() {
  void router.push({
    path: '/redirect' + unref(route).fullPath,
  });
}
</script>

<template>
  <pro-layout
    v-model:collapsed="collapsed"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :menu-data="menuData"
    :fixed-header="false"
    :fix-siderbar="false"
    :split-menus="false"
    layout="side"
  >
    <template #menuHeaderRender>
      <router-link to="/">
        <img src="@/assets/logo.svg" alt="logo" width="32" height="32" />
        <h1 v-show="!collapsed">Preview Pro</h1>
      </router-link>
    </template>

    <template #menuItemRender="{ item, icon }">
      <a-menu-item :key="item.path" :icon="icon">
        <div @click="$router.push(item.path)">
          <span class="ant-pro-menu-item">
            <span class="ant-pro-menu-item-title">{{ item.meta.title }}</span>
          </span>
        </div>
      </a-menu-item>
    </template>

    <template #headerContentRender>
      <div class="layout-breadcrumb">
        <reload-outlined class="layout-breadcrumb-icon" @click="reloadPage()" />
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            <a @click="$router.push(item.path)">{{ item.breadcrumbName }}</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </template>

    <template #rightContentRender>
      <fullscreen-exit-outlined
        v-if="isFullscreen"
        class="layout-right-icon"
        style="margin-right: 8px;"
        @click="exit"
      />
      <fullscreen-outlined
        v-else
        class="layout-right-icon"
        style="margin-right: 8px;"
        @click="enter"
      />
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
