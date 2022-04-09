<script setup lang="ts">
import { watch } from 'vue';
import { useRouter, RouteLocationNormalized } from 'vue-router';

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
    class="layout-tabs"
  >
    <a-tab-pane
      v-for="tab in tabList"
      :key="tab.path"
      style="height: 0"
      :closable="false"
    >
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <span class="layout-tabs-tab" @click="$router.push(tab.path)">
            {{ tab.meta.title }}
            <close-outlined
              v-if="tabList.length > 1"
              class="layout-tabs-tab-icon"
              @click.stop.prevent="closeTab(tab)"
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

<style scoped>
.layout-tabs :deep(.ant-tabs-tab) {
  padding: 0 !important;
}

.layout-tabs .ant-dropdown-trigger {
  transition: none !important;
}

.layout-tabs {
  background-color: #fff;
  padding-top: 6px;
}

.layout-tabs-tab {
  line-height: 38px;
  width: 100%;
  color: inherit;
  padding: 8px 16px;
}

.layout-tabs-tab-icon {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  margin-left: 8px;
  margin-right: 0 !important;
}
</style>
