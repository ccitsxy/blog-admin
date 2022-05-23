<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter, type RouteLocationNormalized } from 'vue-router';

import { useMultiTabStore } from '@/stores/multiTab';

import {
  CloseOutlined,
  ColumnWidthOutlined,
  MoreOutlined,
  MinusOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@vicons/antd';
import { renderIcon } from '@/utils/icons';

const multiTabStore = useMultiTabStore();

const tabList = computed(() => multiTabStore.getTabList);

const router = useRouter();

watch(
  () => router.currentRoute.value.path,
  () => {
    multiTabStore.addTab();
  },
  {
    immediate: true,
  }
);

function closeTab(tab: RouteLocationNormalized) {
  multiTabStore.closeTab(tab);
}
function updateTab(name: string | number) {
  router.push(`${name}`);
}

const tabsMenuOptions = computed(() => {
  const isSingle = tabList.value.length <= 1;
  const currentIndex = tabList.value.findIndex(
    (item) => item.path === router.currentRoute.value.path
  );
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === tabList.value.length - 1;
  return [
    {
      label: `关闭当前`,
      key: '1',
      disabled: isSingle,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭其他',
      key: '2',
      disabled: isSingle,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭左侧',
      key: '3',
      disabled: isSingle || isFirst,
      icon: renderIcon(DoubleLeftOutlined),
    },
    {
      label: '关闭右侧',
      key: '4',
      disabled: isSingle || isLast,
      icon: renderIcon(DoubleRightOutlined),
    },
    {
      label: '关闭全部',
      key: '5',
      disabled: isSingle,
      icon: renderIcon(MinusOutlined),
    },
  ];
});

function selectTabsMenu(key: string | number) {
  switch (key) {
    case '1':
      multiTabStore.closeCurrentTab();
      break;
    case '2':
      multiTabStore.closeOtherTabs();
      break;
    case '3':
      multiTabStore.closeLeftTabs();
      break;
    case '4':
      multiTabStore.closeRightTabs();
      break;
    case '5':
      multiTabStore.closeAllTabs();
      break;
  }
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
      <n-dropdown :options="tabsMenuOptions" @select="selectTabsMenu">
        <n-icon class="mr-4" size="24" :component="MoreOutlined" />
      </n-dropdown>
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
