<template>
  <q-tabs
    align="left"
    active-color="primary"
    class="col-12"
    dense
    swipeable
    inline-label
    indicator-color="transparent"
    :breakpoint="0"
  >
    <q-route-tab
      class="tagView"
      to="/"
      exact
      content-class="tagView-q-router-tab"
    >
      <template v-slot:default>
        <q-icon size="24px" name="home"/>
        <div class="line-limit-length q-mx-xs">主页</div>
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
