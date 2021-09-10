<script setup lang="ts">
import { computed } from 'vue'

import { RouteLocationNormalized, useRouter } from 'vue-router'

import { useStore } from 'vuex'
import { storeKey } from 'src/store'

const router = useRouter()

const store = useStore(storeKey)

const tags = computed<RouteLocationNormalized[]>(() => store.state.tagsView.tabList)

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

</script>

<template>
  <q-tabs
    align="left"
    dense
    inline-label
    breakpoint="0"
    indicator-color="transparent"
    shrink
    mobile-arrows
    class="tagsView"
  >
    <q-route-tab
      v-for="item in tags"
      :key="item.path"
      :to="item.path"
      class="tagsView-q-router-tab"
      active-class="text-primary tagsView-q-router-tab-active"
      content-class="tagsView-q-router-tab-content"
      no-caps
    >
      <template v-slot:default>
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

<style scoped>

.tagsView {
  height: 36px;
  border: 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

:deep(.tagsView-q-router-tab-content) {
  min-width: 36px !important;
}

.tagsView-q-router-tab{
  height: 36px;
  border: 1px solid #e0e0e0;
  border-left: none;
  border-top: none;
  z-index: 9;
}

:deep(.q-tabs__content){
  position: absolute;
}

.tagsView-q-router-tab-active {
  border-bottom-color: #fff;
}
</style>
