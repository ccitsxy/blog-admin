<template>
  <q-tabs
    align="left"
    dense
    inline-label
    breakpoint="0"
    indicator-color="transparent"
    swipable
  >
    <q-route-tab
      v-for="item in tags"
      :key="item"
      :to="item.path"
      :class="{'text-white bg-primary':$route.path===item.path}"
      content-class="tagView-q-router-tab"
      no-caps
    >
      <template v-slot:default>
        <q-icon
          v-if="item.meta.icon"
          size="18px"
          :name="item.meta.icon"
          class="q-mr-sm"
        />
        <div>
          {{ item.meta.title }}
        </div>
        <q-icon
          v-if="tags.length > 1"
          size="16px"
          name="mdi-close"
          class="q-ml-xs q-chip__icon--remove"
          @click.self.prevent="closeTag(item)"
        />
      </template>
    </q-route-tab>
  </q-tabs>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useRouter, RouteLocationNormalized } from 'vue-router'

import { useStore } from 'vuex'
import { storeKey } from 'src/store'

export default defineComponent({
  name: 'TagView',
  setup () {
    const router = useRouter()

    const store = useStore(storeKey)

    const tags = computed<RouteLocationNormalized[]>(() => store.state.tagsView.tabList)

    const tab = ref(router.currentRoute.value.meta.name)

    function closeTag (item: RouteLocationNormalized) {
      const index = tags.value.indexOf(item)
      if (index === 0) {
        void router.push(tags.value[tags.value.length - 1])
      } else {
        void router.push(tags.value[index - 1])
      }
      store.commit('tagsView/removeTag', item)
    }

    store.commit('tagsView/addTag', router.currentRoute.value)

    router.afterEach((to) => {
      store.commit('tagsView/addTag', to)
    })

    return {
      tags,
      closeTag,
      tab
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
