<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { useFullscreen } from '@vueuse/core';

import { useWindowSize } from '@vueuse/core';
import { getMenuData } from '@/utils';
import { renderIcon } from '@/utils/icons';

import { darkTheme, NIcon } from 'naive-ui';
import type { GlobalTheme, MenuOption } from 'naive-ui';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@vicons/antd';

import LightModeOutlined from '@/components/LightModeOutlined.vue';
import DarkModeOutlined from '@/components/DarkModeOutlined.vue';

import MultiTab from './MultiTab.vue';
import NestedPage from './NestedPage.vue';

const router = useRouter();

const theme = inject<Ref<GlobalTheme | null>>('theme');

const { isFullscreen, enter, exit } = useFullscreen();

const { width } = useWindowSize();

const collapsed = ref(width.value < 640);

function handleReload() {
  router.push(`/redirect${router.currentRoute.value.path}`);
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

const menuData = getMenuData(router.getRoutes());
function mapMenu(item: RouteRecordRaw): MenuOption {
  return {
    label: item.meta?.title,
    key: item.path,
    icon: renderIcon(item.meta?.icon),
    children: item.children?.map((item2) => mapMenu(item2)),
  };
}
const menuOptions: MenuOption[] = menuData.map((item: RouteRecordRaw) =>
  mapMenu(item)
);
function updateValue(key: string) {
  if (width.value < 640 && key !== router.currentRoute.value.path) {
    collapsed.value = true;
  }
  router.push(key);
}
const openKeys = computed(() =>
  router.currentRoute.value.matched
    .concat()
    .filter((r) => r.path !== router.currentRoute.value.path)
    .map((r) => r.path)
);

const layoutContentRef = ref();
router.afterEach(() => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(layoutContentRef.value.scrollTo(0, 0));
    }, 300);
  });
});
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      class="h-screen top-0 left-0"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="width > 640 ? 64 : 0"
      :width="224"
      inverted
      :position="width > 640 ? 'static' : 'absolute'"
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
        <transition name="fade">
          <div
            v-show="!collapsed && width < 640"
            class="h-full w-full fixed top-0 left-0 bg-[#00000073]"
            @click="collapsed = true"
          />
        </transition>
      </teleport>
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="h-12 flex items-center space-x-4 px-4">
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
          <n-icon size="24" :component="DarkModeOutlined" />
        </n-button>
        <n-button v-else text @click="theme = darkTheme">
          <n-icon size="24" :component="LightModeOutlined" />
        </n-button>
      </n-layout-header>
      <multi-tab class="h-12 pt-2" />
      <n-layout-content
        ref="layoutContentRef"
        class="h-[calc(100vh-96px)]"
        content-style="padding: 24px;"
        :native-scrollbar="width < 640"
      >
        <nested-page />
        <n-back-top />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
