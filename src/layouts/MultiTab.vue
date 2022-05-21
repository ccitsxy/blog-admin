<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter, type RouteLocationNormalized } from 'vue-router';

import { useMultiTabStore } from '@/stores/multiTab';

import { CloseOutlined } from '@vicons/antd';

import Draggable from 'vuedraggable';

const router = useRouter();

const multiTabStore = useMultiTabStore();

const tabList = computed(() => multiTabStore.tabList);

watch(
  () => router.currentRoute.value.path,
  () => {
    multiTabStore.addTab(router.currentRoute.value);
  },
  {
    immediate: true,
  }
);

function closeTab(tab: RouteLocationNormalized) {
  multiTabStore.closeTab(tab);
}
/* function updateTab(name: string | number) {
  router.push(`${name}`);
} */
</script>

<template>
  <n-el>
    <draggable
      :list="tabList"
      animation="300"
      item-key="path"
      class="multi-tabs flex items-center space-x-2 px-4 py-1"
    >
      <template #item="{ element }">
        <div
          :id="element.path"
          class="multi-tabs-tab flex content-center items-center space-x-2 pl-3 pr-3 py-2 cursor-pointer"
          :class="{ 'multi-tabs-tab-active': element.path === $route.path }"
          @click="$router.push(element.path)"
        >
          <span>{{ element.meta.title }}</span>
          <n-icon
            v-if="tabList.length > 1"
            class="icon-close"
            size="14"
            :component="CloseOutlined"
            @click.stop="closeTab(element)"
          />
        </div>
      </template>
    </draggable>
  </n-el>
</template>

<style scoped>
.multi-tabs {
  border-bottom: 1px solid var(--divider-color);
  transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
}
.multi-tabs-tab {
  font-size: var(--font-size);
  background-color: var(--tab-color);
  color: var(--n-text-color);
  transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.multi-tabs-tab-active {
  color: var(--primary-color);
  background-color: var(--base-color);
}

.icon-close {
  color: var(--close-color);
}

.icon-close :hover {
  color: var(--close-color-hover);
}

.icon-close :active {
  color: var(--close-color-pressed);
}
</style>
