<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

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
    multiTabStore.addTab(router.currentRoute.value);
  },
  {
    immediate: true,
  }
);

function updateTab(name: string | number) {
  router.push(`${name}`);
}
function closeTab(name: string | number) {
  const tab = tabList.value.find((element) => element.path === name);
  multiTabStore.closeTab(tab as RouteLocationNormalized);
}

const tabsMenuOptions = computed(() => {
  const isSingle = tabList.value.length <= 1;
  const isAffix = router.currentRoute.value.meta.affix;
  const currentIndex = tabList.value.findIndex(
    (item) => item.path === router.currentRoute.value.path
  );
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === tabList.value.length - 1;
  return [
    {
      label: `关闭当前`,
      key: '1',
      disabled: isSingle || isAffix,
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
      multiTabStore.closeTab(router.currentRoute.value);
      break;
    case '2':
      multiTabStore.closeOtherTabs(router.currentRoute.value);
      break;
    case '3':
      multiTabStore.closeLeftTabs(router.currentRoute.value);
      break;
    case '4':
      multiTabStore.closeRightTabs(router.currentRoute.value);
      break;
    case '5':
      multiTabStore.closeAllTabs();
      break;
  }
}
</script>

<template>
  <n-tabs
    :value="$route.path"
    type="card"
    @update-value="updateTab"
    @close="closeTab"
  >
    <template #prefix>
      <div />
    </template>
    <n-tab
      v-for="tab in tabList"
      :key="tab.path"
      :name="tab.path"
      :closable="tabList.length > 1 && !tab.meta.affix"
    >
      <div>{{ tab.meta.title }}</div>
    </n-tab>
    <template #suffix>
      <n-dropdown :options="tabsMenuOptions" @select="selectTabsMenu">
        <n-icon class="mr-4" size="24" :component="MoreOutlined" />
      </n-dropdown>
    </template>
  </n-tabs>
</template>
