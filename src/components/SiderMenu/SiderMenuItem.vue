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
  </template>
  <template v-else>
  </template>
</template>
