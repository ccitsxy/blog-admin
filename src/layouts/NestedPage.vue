<script setup lang="ts">
import { computed } from 'vue';
import { useMultiTabStore } from '@/stores/multiTab';

const excludedTabList = computed(() => useMultiTabStore().getExcludedTabList);
</script>

<template>
  <div>
    <!-- add div to avoid none single root element -->
    <router-view v-slot="{ Component, route }">
      <transition name="slide-left" mode="out-in" appear>
        <keep-alive v-if="route.meta.keepAlive" :exclude="excludedTabList">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </transition>
    </router-view>
  </div>
</template>
