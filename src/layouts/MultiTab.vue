<script setup lang="ts">
import { watch } from 'vue';
import { useRouter, type RouteLocationNormalized } from 'vue-router';

import { useMultiTabStore } from '@/stores/multiTab';

import { CloseOutlined } from '@vicons/antd';

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
function updateTab(name: string | number) {
  router.push(`${name}`);
}
</script>

<template>
  <n-tabs :value="$route.path" type="card" @update-value="updateTab">
    <template #prefix>
      <div />
    </template>
    <n-tab v-for="tab in tabList" :key="tab.path" :name="tab.path">
      <div>{{ tab.meta.title }}</div>
      <n-icon
        v-if="tabList.length > 1"
        class="icon-close ml-3"
        size="14"
        :component="CloseOutlined"
        @click.stop="closeTab(tab)"
      />
    </n-tab>
    <template #suffix>
      <div />
    </template>
  </n-tabs>
</template>

<style scoped>
.icon-close {
  color: var(--n-close-color);
}

.icon-close :hover {
  color: var(--n-close-color-hover);
}

.icon-close :active {
  color: var(--n-close-color-pressed);
}
</style>
