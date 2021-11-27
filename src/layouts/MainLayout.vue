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
    >
      <div class="layout-sider-logo">
        <img
          alt="logo"
          class="logo"
          width="32"
          height="32"
          src="https://www.naiveui.com/assets/naivelogo.93278402.svg"
        />
        <h1 class="layout-sider-logo-title">Naive UI</h1>
      </div>
      <n-menu
        :icon-size="20"
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
        <n-grid :y-gap="8" :cols="1" item-style="height:32px;">
          <n-grid-item class="layout-header-row">
            <n-icon class="layout-header-button" size="24" @click="triggerClick()">
              <menu-unfold-outlined v-if="collapsed" />
              <menu-fold-outlined v-else />
            </n-icon>
            <n-breadcrumb class="layout-header-breadcrumb">
              <n-breadcrumb-item>1</n-breadcrumb-item>
              <n-breadcrumb-item>1</n-breadcrumb-item>
            </n-breadcrumb>
          </n-grid-item>
          <n-grid-item>
            <n-tabs type="card" closable>
              <n-tab name="幸福">寂寞围绕着电视</n-tab>
              <n-tab name="的">垂死坚持</n-tab>
              <n-tab name="旁边">在两点半消失</n-tab>
            </n-tabs>
          </n-grid-item>
        </n-grid>
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
  height: 96px;
  padding: 0 16px;
  z-index: 10;
}

.layout-header-row{
  display: flex;
  align-items: center;
}

.layout-header-button :hover {
  color: #4098FCFF;
  cursor: pointer;
}

.layout-header-breadcrumb{
  margin-left: 16px;
}

.layout-content {
  padding-top: 96px;
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
  padding-left: 8px;
  grid: auto-flow / 50px 80px;
  place-items: center;
  color: #2080f0ff;
}

.layout-sider-logo-title {
  font-weight: 600;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-variant: tabular-nums;
}

@media (max-width: 768px) {
  .layout-sider {
    position: absolute;
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
