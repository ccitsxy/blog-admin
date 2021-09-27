<script setup lang="ts">
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';

defineProps({
  menu: {
    type: Array as PropType<RouteRecordRaw[]>,
  },
});
</script>

<template>
  <sider-menu-item v-for="item in menu" :key="item.path" :item="item" />
</template>
