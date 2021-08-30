<template>
  <q-item
    v-if="!item.children"
    :to="item.path"
    active
    :class="{'text-primary bg-blue-1':$route.path === item.path}"
    :inset-level="initLevel"
  >
    <q-item-section avatar>
      <q-icon v-if="item.meta.icon" :name="item.meta.icon"></q-icon>
    </q-item-section>
    <q-item-section>{{ item.meta.title }}</q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    v-model="expansion"
    :icon="item.meta.icon"
    :label="item.meta.title"
    :class="{'text-primary':$route.path.startsWith(item.path)}"
    :header-inset-level="initLevel"
    :expand-icon-class="{'text-primary':$route.path.startsWith(item.path)}"
  >
    <template v-for="item2 in item.children" :key="item2">
      <drawer-menu-item
        :item="item2"
        :init-level="initLevel+0.5"/>
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
    },
    initLevel: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const expansion = ref(false)
    const route = useRoute()
    watch(route, () => {
      if (route.path.startsWith(props.item.path)) {
        expansion.value = true
      } else if (props.item.path !== route.path) {
        expansion.value = false
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
