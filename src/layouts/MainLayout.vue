<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-dark">
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
      <q-separator></q-separator>
      <tag-view/>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-white"
      :width="240"
      bordered
    >
      <q-list>
        <q-scroll-area style="height: 100vh;">
          <drawer-menu :menu="menu"/>
        </q-scroll-area>
      </q-list>
    </q-drawer>

    <q-page-container style="background-color: #f2f3f8;">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import mainLayoutRoutes from 'layouts/mainLayoutRoutes'
import DrawerMenu from 'components/Drawer/DrawerMenu.vue'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb.vue'
import TagView from 'components/TagView/TagView.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    TagView,
    Breadcrumb,
    DrawerMenu
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
