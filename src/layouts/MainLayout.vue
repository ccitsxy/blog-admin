<script setup lang="ts">
import { computed, provide, ref, watch, watchEffect } from 'vue';
import { useRouter, type RouteRecordRaw } from 'vue-router';

import { useFullscreen } from '@vueuse/core';

import {
  useOsTheme,
  darkTheme,
  NIcon,
  type GlobalTheme,
  type MenuOption,
} from 'naive-ui';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  BulbOutlined,
  BulbFilled,
} from '@vicons/antd';

import { useWindowSize } from '@vueuse/core';
import { getMenuData } from '@/utils';
import { renderIcon } from '@/utils/icons';

import MultiTab from './MultiTab.vue';

const { isFullscreen, enter, exit } = useFullscreen();

const osTheme = computed(() =>
  useOsTheme().value === 'dark' ? darkTheme : null
);
const theme = ref<GlobalTheme | null>(null);
watch(
  () => osTheme.value,
  (newVal) => {
    theme.value = newVal;
  },
  { immediate: true }
);
provide('theme', theme);

const collapsed = ref(false);
const { width } = useWindowSize();

const router = useRouter();
function handleReload() {
  void router.push(`/redirect${router.currentRoute.value.path}`);
}

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

const mapMenu = (item: RouteRecordRaw): MenuOption => {
  return {
    label: item.meta?.title,
    key: item.path,
    icon: renderIcon(item.meta?.icon),
    children: item.children?.map((item2) => mapMenu(item2)),
  };
};

const menuData = getMenuData(router.getRoutes());
const menuOptions: MenuOption[] = menuData.map((item: RouteRecordRaw) =>
  mapMenu(item)
);
function updateValue(key: string) {
  void router.push(key);
}
const openKeys = ref<string[]>([]);
watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat();
    openKeys.value = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path);
  }
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout class="h-screen" has-sider>
      <n-layout-sider
        class="!fixed h-screen top-0 left-0 md:!static"
        :collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="width > 768 ? 64 : 0"
        :width="224"
        inverted
        :native-scrollbar="false"
      >
        <div class="h-12 flex justify-center items-center whitespace-nowrap">
          <img class="h-8 w-8" src="@/assets/logo.svg" alt="logo" />
          <div v-show="!collapsed" class="ml-2 text-lg">博客管理</div>
        </div>
        <n-menu
          :options="menuOptions"
          :collapsed="collapsed"
          :value="$route.path"
          :default-expanded-keys="openKeys"
          :watch-props="['defaultExpandedKeys']"
          :root-indent="22"
          :collapsed-icon-size="20"
          :collapsed-width="64"
          inverted
          @update-value="updateValue"
        />
        <teleport to="#app">
          <div
            class="md:hidden fixed top-0 left-0 h-full w-full opacity-100 bg-[#00000073] transition-opacity"
            :class="{ 'opacity-0 h-0': collapsed && width < 768 }"
            @click="collapsed = true"
          ></div>
        </teleport>
      </n-layout-sider>
      <n-layout>
        <n-layout-header
          class="flex items-center h-12 space-x-4 px-4"
          bordered
          position="absolute"
        >
          <n-button v-if="collapsed" text @click="collapsed = false">
            <n-icon size="24" :component="MenuUnfoldOutlined" />
          </n-button>
          <n-button v-else text @click="collapsed = true">
            <n-icon size="24" :component="MenuFoldOutlined" />
          </n-button>
          <n-button text @click="handleReload">
            <n-icon size="24" :component="ReloadOutlined" />
          </n-button>
          <n-breadcrumb>
            <n-breadcrumb-item
              v-for="item in breadcrumb"
              :key="item.path"
              @click="$router.push(item.path)"
            >
              {{ item.breadcrumbName }}
            </n-breadcrumb-item>
          </n-breadcrumb>
          <div class="flex-1" />
          <n-button v-if="isFullscreen" text @click="exit">
            <n-icon size="24" :component="FullscreenExitOutlined" />
          </n-button>
          <n-button v-else text @click="enter">
            <n-icon size="24" :component="FullscreenOutlined" />
          </n-button>
          <n-button v-if="theme" text @click="theme = null">
            <n-icon size="24" :component="BulbOutlined" />
          </n-button>
          <n-button v-else text @click="theme = darkTheme">
            <n-icon size="24" :component="BulbFilled" />
          </n-button>
        </n-layout-header>
        <multi-tab class="absolute top-12 h-12 pt-2" />
        <n-layout-content
          class="top-24"
          style="height: calc(100vh - 96px)"
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <router-view />
          <n-back-top />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>
