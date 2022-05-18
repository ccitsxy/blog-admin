<script setup lang="ts">
import { watch } from 'vue';
import { useRouter, type RouteLocationNormalized } from 'vue-router';

import { useMultiTabStore } from '@/stores/multiTab';

import { CloseOutlined, MoreOutlined } from '@ant-design/icons-vue';

const tabList = useMultiTabStore().tabList;

const router = useRouter();

watch(
  () => router.currentRoute.value.path,
  () => {
    useMultiTabStore().addTab();
  },
  {
    immediate: true,
  }
);

function closeTab(tab: RouteLocationNormalized) {
  useMultiTabStore().closeTab(tab);
}
</script>

<template>
  <a-tabs
    :active-key="$route.path"
    type="editable-card"
    hide-add
    class="layout-tabs !pt-2"
  >
    <a-tab-pane
      v-for="tab in tabList"
      :key="tab.path"
      class="h-0"
      :closable="false"
    >
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <span
            class="leading-9 w-full text-inherit px-4 py-2"
            @click="$router.push(tab.path)"
          >
            {{ tab.meta.title }}
            <close-outlined
              v-if="tabList.length > 1"
              class="text-xs ml-2 !mr-0"
              @click.stop="closeTab(tab)"
            />
          </span>
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
      <span class="ml-4" />
    </template>

    <template #rightExtra>
      <a-dropdown>
        <more-outlined class="mr-4 text-base" />
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

<style scoped>
.layout-tabs :deep(.ant-tabs-tab) {
  padding: 0 !important;
}

.layout-tabs .ant-dropdown-trigger {
  transition: none !important;
}
</style>
