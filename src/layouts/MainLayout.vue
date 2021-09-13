<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

import mainLayoutRoutes from 'layouts/mainLayoutRoutes'

const PageIndex = defineAsyncComponent(() => import('pages/PageIndex.vue'))
const TagsView = defineAsyncComponent(() => import('components/TagsView/TagsView.vue'))
const Breadcrumb = defineAsyncComponent(() => import('components/Breadcrumb/Breadcrumb.vue'))
const DrawerMenu = defineAsyncComponent(() => import('components/Drawer/DrawerMenu.vue'))

const menu = mainLayoutRoutes

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const thumbStyle = {
  right: '2px',
  borderRadius: '5px',
  backgroundColor: '#c1c1c1',
  width: '5px',
  height: '5px',
  opacity: 0.75
}

</script>

<template>
  <q-layout view="lHh lpR lFf">
    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen?'mdi-menu-open':'mdi-menu'"
          @click="toggleLeftDrawer"
        ></q-btn>
        <breadcrumb class="q-mx-md"/>
        <div class="q-ml-auto">
          <q-btn
            flat
            dense
            round
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          />
        </div>
      </q-toolbar>
      <q-separator/>
      <tags-view/>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="240"
      class="text-black no-scroll"
      bordered
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        style="height: 100vh"
      >
        <drawer-menu :menu="menu"/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-scroll-area
        :thumb-style="thumbStyle"
        style="height: calc(100vh - 88px);"
      >
        <page-index class="q-pa-md"/>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
