<template>
  <q-tabs
    v-model="tags"
    align="left"
    class="col-12 text-black"
    dense
    swipeable
    inline-label
    :breakpoint="0"
    indicator-color="transparent"
  >
    <template v-for="item in tags" :key="item">
      <q-route-tab
        class="bg-white shadow-up-1"
        content-class="tagView-q-router-tab"
        :to="item.path"
        active-class="text-primary"
      >
        <template v-slot:default>
          <q-icon v-if="item.meta.icon" size="18px" :name="item.meta.icon" class="q-mr-xs"/>
          <div class="q-mx-xs" style="text-transform: none">{{ item.meta.title }}</div>
          <q-icon v-if="tags.length > 1" size="18px" name="close" @click.self.prevent="closeTag(item)"/>
        </template>
      </q-route-tab>
    </template>
  </q-tabs>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useRouter, RouteLocationNormalized } from 'vue-router'

import { useStore } from 'vuex'
import { storeKey } from 'src/store'

export default defineComponent({
  name: 'TagView',
  setup () {
    const router = useRouter()

    const store = useStore(storeKey)

    const tags = computed(() => store.state.tagsView.tabList)

    function closeTag (item: RouteLocationNormalized) {
      const index = tags.value.indexOf(item)
      if (index === 0) {
        void router.push(tags.value[tags.value.length - 1])
      } else {
        void router.push(tags.value[index - 1])
      }
      store.commit('tagsView/removeTag', item)
    }

    /*    watch(() => tags.value.length,
      () => {
      }) */

    store.commit('tagsView/addTag', router.currentRoute.value)

    router.afterEach((to) => {
      store.commit('tagsView/addTag', to)
    })

    return {
      tags,
      closeTag
    }
  }
})
</script>

<!--suppress CssInvalidPseudoSelector -->
<style scoped>
:deep(.tagView-q-router-tab) {
  min-width: 36px !important;
}
</style>
