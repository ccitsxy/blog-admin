<template>
  <q-item
    v-if="!item.children"
    :to="item.path"
    exact
    active
    active-class="active-menu bg-blue-1 text-primary"
  >
    <q-item-section avatar>
      <q-icon :name="item.meta.icon"></q-icon>
    </q-item-section>
    <q-item-section>{{ item.meta.title }}</q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    :default-opened="expansion"
    :icon="item.meta.icon"
    :label="item.meta.title"
    :content-inset-level="0.5"
    group="menu"
    :class="{'text-primary':expansion}"
  >
    <template v-for="item2 in item.children" :key="item2">
      <drawer-menu-item
        :item="item2"
      ></drawer-menu-item>
    </template>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'

export default defineComponent({
  name: 'DrawerMenuItem',
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    }
  },
  setup: function (props) {
    const expansion = ref(false)
    const route = useRoute()
    watch(route, () => {
      if (props.item.children) {
        for (const child of props.item.children) {
          expansion.value = child.path === route.path
        }
      }
    }, {
      immediate: true
    })
    return {
      expansion
    }
  }
})
</script>

<style scoped>
.active-menu {
  border-right: 4px solid #1976D2;
}
</style>
