<script setup lang="ts">
import {
  useOsTheme,
  darkTheme,
  zhCN,
  type GlobalThemeOverrides,
  type GlobalTheme,
} from 'naive-ui';
import { computed, ref, watch, provide } from 'vue';
import AppRouter from './layouts/AppRouter.vue';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2080f0FF',
    primaryColorHover: '#4098fcFF',
    primaryColorPressed: '#1060c9FF',
    primaryColorSuppl: '#4098fcFF',
  },
};
const osTheme = computed(() =>
  useOsTheme().value === 'dark' ? darkTheme : null
);
const theme = ref<GlobalTheme | null>(null);

watch(
  () => osTheme.value,
  (newVal) => {
    theme.value = newVal;
  },
  { immediate: true }
);
provide('theme', theme);
</script>

<template>
  <n-config-provider
    inline-theme-disabled
    preflight-style-disabled
    :theme-overrides="themeOverrides"
    :theme="theme"
    :locale="zhCN"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <app-router />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
