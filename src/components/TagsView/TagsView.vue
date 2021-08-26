<template>
  <q-tabs
    align="left"
    dense
    inline-label
    :breakpoint="0"
    indicator-color="transparent"
    swipable
  >
    <q-route-tab
      v-for="item in tags"
      :key="item"
      :to="item.path"
      :class="{'text-primary bg-blue-1':$route.path===item.path}"
      content-class="tagView-q-router-tab"
      no-caps
    >
      <template v-slot:default>
        <div
          class="q-mx-xs"
        >
          {{ item.meta.title }}
        </div>
        <q-icon
          v-if="$route.path===item.path"
          size="16px"
          name="mdi-refresh"
          class="q-chip__icon--remove q-mr-xs"
        />
        <q-icon
          v-if="tags.length > 1"
          size="16px"
          name="mdi-close"
          class="q-chip__icon--remove"
          @click.self.prevent="closeTag(item)"
        />
        <q-menu
          touch-position
          context-menu
        >
          <q-list dense>
            <q-item clickable v-close-popup>
              <q-item-section @click="removeOthersTagView(item)">
                关闭其他
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="removeLeftTagView(item)">
                关闭到左侧
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="removeRightTagView(item)">
                关闭到右侧
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="removeAllTagView">
                刷新当前页
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </template>
    </q-route-tab>
    <q-btn
      flat
      class="q-ml-auto text-center"
      style="height: 18px;width: 18px"
    >
      <template v-slot:default>
        <q-icon
          size="18px"
          name="mdi-dots-vertical"
        />
        <q-menu auto-close>
          <q-list dense style="min-width: 100px">
            <q-item clickable>
              <q-item-section>关闭其他</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>刷新当前页</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </template>
    </q-btn>
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
  min-width: 48px !important;
}
</style>
