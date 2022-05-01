<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#1890FF",
  },
};
</script>

<template>
  <n-config-provider inline-theme-disabled :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>
