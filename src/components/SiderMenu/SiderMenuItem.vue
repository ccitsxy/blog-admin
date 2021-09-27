<script setup lang="ts">
import { PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  }
})

</script>

<template>
  <template v-if="!item.children">
    <a-menu-item :key="item.path" @click="$router.push(item.path)">
      <template v-if="item.meta?.icon" #icon>
        <component :is="item.meta?.icon"></component>
      </template>
      <span>{{ item.meta?.title }}</span>
    </a-menu-item>
  </template>
  <template v-else>
    <a-sub-menu :key="item.path">
      <template v-if="item.meta?.icon" #icon>
        <component :is="item.meta?.icon"></component>
      </template>
      <template #title>{{ item.meta?.title }}</template>
      <sider-menu-item v-for="child in item.children" :key="child.path" :item="child"/>
    </a-sub-menu>
  </template>
</template>
