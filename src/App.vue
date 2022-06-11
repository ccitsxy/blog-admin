<script setup lang="ts">
import { useOsTheme, darkTheme, zhCN } from 'naive-ui';
import type { GlobalThemeOverrides, GlobalTheme } from 'naive-ui';
import { computed, ref, watch, provide } from 'vue';
import AppRouter from './layouts/AppRouter.vue';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2080f0FF',
    primaryColorHover: '#4098fcFF',
    primaryColorPressed: '#1060c9FF',
    primaryColorSuppl: '#4098fcFF',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
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
    :theme-overrides="themeOverrides"
    :theme="theme"
    :locale="zhCN"
    inline-theme-disabled
    abstract
  >
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <app-router />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
