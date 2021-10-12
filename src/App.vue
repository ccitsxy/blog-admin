<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColor: '#2080F0FF',
    primaryColorHover: '#4098FCFF',
    primaryColorPressed: '#1060C9FF',
    primaryColorSuppl: '#4098FCFF'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view/>
  </n-config-provider>
</template>
