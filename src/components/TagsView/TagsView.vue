<template>
  <q-tabs
    align="left"
    active-color="primary"
    class="col-12 text-black"
    dense
    inline-label
    :breakpoint="0"
  >
    <q-route-tab
      to="/dashboard/analysis"
      class="bg-white"
      content-class="tagView-q-router-tab"
    >
      <template v-slot:default>
        <q-icon size="18px" name="home" class="q-mr-xs"/>
        <div class="q-mx-xs">分析页</div>
        <q-icon size="18px" name="refresh" class="q-mr-xs"/>
        <q-icon size="18px" name="close"/>
      </template>
    </q-route-tab>

  </q-tabs>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagView'
})
</script>

<!--suppress CssInvalidPseudoSelector -->
<style scoped>
:deep(.tagView-q-router-tab) {
  min-width: 36px !important;
}
</style>
