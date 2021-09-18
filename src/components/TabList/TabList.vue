<script setup lang="ts">
import { computed } from 'vue'

import { RouteLocationNormalized, useRouter } from 'vue-router'

import { useStore } from 'vuex'
import { storeKey } from 'src/store'

const router = useRouter()

const store = useStore(storeKey)

const tabList = computed<RouteLocationNormalized[]>(() => store.state.tabList.tabList)

function closeTag (item: RouteLocationNormalized) {
  // const current = tabList.value.indexOf(tabList.value.find(p => p.path === router.currentRoute.value.path))
  // const index = tabList.value.indexOf(item)
}

store.commit('tabList/addTag', router.currentRoute.value)

router.afterEach((to) => {
  store.commit('tabList/addTag', to)
})

</script>

<template>
  <q-tabs
    align="left"
    dense
    inline-label
    breakpoint="0"
    indicator-color="transparent"
    mobile-arrows
    outside-arrows
  >
    <q-route-tab
      v-for="item in tabList"
      :key="item.path"
      :to="item.path"
      class="q-card--bordered"
      active-class="bg-primary text-white"
      content-class="tabList-q-router-tab-content"
      no-caps
    >
      <template v-slot:default>
        <span class="tabList-q-router-tab-content-title">{{ item.meta.title }}</span>
        <span v-if="tabList.length > 1" class="q-ml-md"/>
        <q-icon
          v-if="tabList.length > 1"
          name="mdi-close"
          size="16px"
          class="q-chip__icon--remove"
          @click.self.prevent="closeTag(item)"
        />
      </template>
    </q-route-tab>
  </q-tabs>
</template>

<style scoped>

:deep(.tabList-q-router-tab-content) {
  min-width: 4rem !important;
}

.tabList-q-router-tab-content-title {
  opacity: 1 !important;
  min-width: 4rem;
}
</style>
