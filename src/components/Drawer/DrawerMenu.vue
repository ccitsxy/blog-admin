<template>
  <q-list>
    <drawer-menu-item
      v-for="item in menu"
      :key="item"
      :item="item"
      :init-level="0"
    />
  </q-list>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'DrawerMenu',
  components: { DrawerMenuItem: defineAsyncComponent(() => import('components/Drawer/DrawerMenuItem.vue')) },
  props: {
    menu: {
      type: Array as PropType<RouteRecordRaw[]>
    }
  }
})
</script>
