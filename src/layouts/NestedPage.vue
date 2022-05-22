<script setup lang="ts">
import { useMultiTabStore } from '@/stores/multiTab';

const multiTabStore = useMultiTabStore();
const cachedList = multiTabStore.getCachedTabList;
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cachedList">
      <suspense>
        <template #default>
          <component :is="Component" :key="route.path" />
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </keep-alive>
  </router-view>
</template>
