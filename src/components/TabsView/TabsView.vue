<script setup lang="ts">
import { CloseOutlined, MoreOutlined } from '@ant-design/icons-vue';
import { ref, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';

const tabs = ref<RouteLocationNormalizedLoaded[]>([]);

const router = useRouter();

watchEffect(() => {
  if (router.currentRoute) {
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
</script>

<template>
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
</template>

<style scoped></style>
