<template>
    <drawer-menu-item
      v-for="item in menu"
      :key="item"
      :item="item"
    ></drawer-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import DrawerMenuItem from 'components/Drawer/DrawerMenuItem.vue'

export default defineComponent({
  name: 'DrawerMenu',
  components: { DrawerMenuItem },
  props: {
    menu: {
      type: Array as PropType<RouteRecordRaw[]>
    }
  }
})
</script>
