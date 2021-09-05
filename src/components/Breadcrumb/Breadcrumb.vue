<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="item in $route.matched.slice(1)"
      :key="item"
      :label="item.meta.title"
      :to="item.path"
      class="text-white"
    >
    </q-breadcrumbs-el>
  </q-breadcrumbs>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Breadcrumb'
})
</script>
