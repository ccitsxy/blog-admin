<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-black shadow-up-1"
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title shrink>Blog</q-toolbar-title>
        <breadcrumb/>
      </q-toolbar>
      <q-separator/>
      <tags-view/>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="240"
      class="bg-white shadow-up-1"
    >
      <q-list>
        <q-scroll-area style="height: 100vh;">
          <drawer-menu :menu="menu"/>
        </q-scroll-area>
      </q-list>
    </q-drawer>

    <q-page-container>
      <page-index class="q-pa-md" style="background-color: #f2f3f8;min-height: calc(100vh - 87px);"/>
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
