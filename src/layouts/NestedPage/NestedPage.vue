<script setup lang="ts">
import { useMultiTabStore } from '@/stores/multiTab'

const cachedTabList = useMultiTabStore().getCachedTabList;

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cachedTabList" :exclude="/[/redirect/]+/" >
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>
