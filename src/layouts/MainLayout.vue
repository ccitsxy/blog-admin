<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="shadow-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          @click="toggleLeftDrawer"
        />
        <breadcrumb class="q-mx-md"/>
      </q-toolbar>
      <q-separator/>
      <q-toolbar>
        <tags-view/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="240"
      class="bg-white text-black shadow-1"
    >
      <q-scroll-area class="fit" style="overflow:hidden;">
        <drawer-menu :menu="menu"/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="fit">
      <q-scroll-area style="height: calc(100vh - 100px);">
        <page-index class="q-pa-md" style="min-height: calc(100vh - 100px);"/>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

import mainLayoutRoutes from 'layouts/mainLayoutRoutes'

export default defineComponent({
  name: 'MainLayout',
  components: {
    PageIndex: defineAsyncComponent(() => import('pages/PageIndex.vue')),
    TagsView: defineAsyncComponent(() => import('components/TagsView/TagsView.vue')),
    Breadcrumb: defineAsyncComponent(() => import('components/Breadcrumb/Breadcrumb.vue')),
    DrawerMenu: defineAsyncComponent(() => import('components/Drawer/DrawerMenu.vue'))
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      menu: mainLayoutRoutes,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style scoped>
/*.scroll::-webkit-scrollbar {
  display: none;
}

.q-layout--standard {
  min-height: 100% !important;
}*/
</style>
