<script setup lang="ts">
import { useMultiTabStore } from '@/stores/multiTab';
import { computed } from 'vue';

const multiTabStore = useMultiTabStore();
const cachedTabList = computed(() => multiTabStore.getCachedTabList);
</script>
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-left" mode="out-in" appear>
      <keep-alive :include="cachedTabList">
        <component :is="Component" :key="route?.meta?.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>
