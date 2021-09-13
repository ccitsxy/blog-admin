<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  initLevel: {
    type: Number,
    required: true
  }
})

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
</script>

<template>
  <q-item
    v-if="!item.children"
    :to="item.path"
    :class="$route.path.startsWith(item.path)?'text-primary menu-item-active':'text-black'"
    :inset-level="initLevel"
  >
    <q-item-section v-if="item.meta?.icon" avatar>
      <q-icon :name="item.meta.icon"></q-icon>
    </q-item-section>
    <q-item-section>{{ item.meta?.title }}</q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    v-model="expansion"
    :icon="item.meta?.icon"
    :label="item.meta?.title"
    :header-class="$route.path.startsWith(item.path)?'text-primary':'text-black'"
    :header-inset-level="initLevel"
    :expand-icon-class="$route.path.startsWith(item.path)?'text-primary':'text-black'"
  >
    <template v-for="item2 in item.children" :key="item2">
      <drawer-menu-item
        :item="item2"
        :init-level="initLevel+0.5"/>
    </template>
  </q-expansion-item>
</template>

<style scoped>
.menu-item-active {
  border-right: 3px solid #1976D2;
  background-color: #eaf2f9;
}
</style>
