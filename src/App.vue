<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import RouteView from './layout/RouteView.vue'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <route-view />
  </a-config-provider>
</template>

<style>
#app {
  height: 100%;
}
</style>
