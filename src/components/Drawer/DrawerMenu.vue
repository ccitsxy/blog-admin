<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const DrawerMenuItem = defineAsyncComponent(() => import('components/Drawer/DrawerMenuItem.vue'))

defineProps({
  menu: {
    type: Array as PropType<RouteRecordRaw[]>
  }
})
</script>

<template>
  <q-list>
    <drawer-menu-item v-for="item in menu" :key="item.path" :item="item" :init-level="0" />
    <q-separator color="white"/>
  </q-list>
</template>
