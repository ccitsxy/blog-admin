<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import routes from '../router/routes';
import { MenuOption, useLoadingBar } from 'naive-ui';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd';

const LayoutView = defineAsyncComponent(
  () => import('@/layouts/LayoutView.vue')
);

const collapsed = ref<boolean>(false);

function triggerClick () {
  collapsed.value = !collapsed.value;
}

const menuOptions = routes[0].children?.map((item) => mapMenu(item));

function mapMenu (item: RouteRecordRaw): MenuOption {
  return {
    label: item.meta?.title,
    key: item.path,
    icon: item.meta?.icon,
    children: item.children?.map((item2) => mapMenu(item2))
  };
}

const router = useRouter();
const updateValue = (key: string) => {
  void router.push(key);
};
const openKeys = ref<string[]>([]);
watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat();
    if (!collapsed.value) {
      // 防止侧边菜单收起时切换路由导致侧边菜单弹出
      openKeys.value = matched
        .filter((r) => r.path !== router.currentRoute.value.path)
        .map((r) => r.path);
    }
  }
});

const loadingBar = useLoadingBar();
router.beforeEach(() => {
  loadingBar.start();
});
router.afterEach(() => {
  loadingBar.finish();
});

const width = ref(0);

function onResize () {
  width.value = window.innerWidth;
}

onResize();
if (width.value <= 768) {
  collapsed.value = !collapsed.value;
}
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
});
onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

</script>

<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider
      :collapsed="collapsed"
      :collapsed-width="width > 768 ? 64 : 0"
      :native-scrollbar="false"
      :width="208"
      class="layout-sider"
      collapse-mode="width"
    >j
      <div class="layout-sider-logo">
        <svg
          height="32"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M399.36 362.23c29.49-34.69 47.1-78.34 47.1-125.79C446.46 123.49 346.86 32 224 32S1.54 123.49 1.54 236.44S101.14 440.87 224 440.87a239.28 239.28 0 0 0 79.44-13.44a7.18 7.18 0 0 1 8.12 2.56c18.58 25.09 47.61 42.74 79.89 49.92a4.42 4.42 0 0 0 5.22-3.43a4.37 4.37 0 0 0-.85-3.62a87 87 0 0 1 3.69-110.69zM329.52 212.4l-57.3 43.49L293 324.75a6.5 6.5 0 0 1-9.94 7.22L224 290.92L164.94 332a6.51 6.51 0 0 1-9.95-7.22l20.79-68.86l-57.3-43.49a6.5 6.5 0 0 1 3.8-11.68l71.88-1.51l23.66-67.92a6.5 6.5 0 0 1 12.28 0l23.66 67.92l71.88 1.51a6.5 6.5 0 0 1 3.88 11.68z"
            fill="currentColor"
          ></path>
        </svg>
        <h1>Blog</h1>
      </div>
      <n-menu
        :collapsed-icon-size="20"
        :collapsed-width="width > 768 ? 64 : 0"
        :indent="48"
        :options="menuOptions"
        :root-indent="22"
        :value="$route.path"
        @update-value="updateValue"
      />
    </n-layout-sider>
    <n-layout :native-scrollbar="false">
      <n-layout-header class="layout-header" position="absolute">
        <n-icon class="layout-header-button" size="24" @click="triggerClick()">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
        </n-icon>
      </n-layout-header>
      <n-layout-content
        :native-scrollbar="false"
        class="layout-content"
        content-style="padding: 24px;"
      >
        <transition name="fade">
          <div
            v-show="!collapsed"
            class="layout-sider-mask"
            @click="triggerClick()"
          />
        </transition>
        <layout-view />
        <n-back-top :right="100" />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.layout-header {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  z-index: 10;
}

.layout-header-button :hover {
  color: #4098FCFF;
  cursor: pointer;
}

.layout-content {
  padding-top: 64px;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.layout-header,
.layout-sider {
  box-shadow: 0 1px 4px #00152914
}

.layout-sider {
  z-index: 12;
}

.layout-sider-logo {
  height: 64px;
  display: grid;
  grid: auto-flow / 64px 80px;
  place-items: center;
  color: #2080f0ff;
}

@media (max-width: 768px) {
  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }

  .layout-sider-mask {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: #00000073;
  }
}

:deep(.n-menu-item-content__icon) {
  margin-right: 16px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
