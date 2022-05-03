<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#2080f0FF",
    primaryColorHover: "#4098fcFF",
    primaryColorPressed: "#1060c9FF",
    primaryColorSuppl: "#4098fcFF",
  },
};
</script>

<template>
  <n-config-provider inline-theme-disabled :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>
