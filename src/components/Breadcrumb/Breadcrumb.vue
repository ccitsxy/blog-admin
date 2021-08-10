<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="item in $route.matched.slice(1)"
      :key="item"
      :icon="item.meta.icon"
      :label="item.meta.title"
      :to="item.path"
    />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Breadcrumb'
})
</script>
