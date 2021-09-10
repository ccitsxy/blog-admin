<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

import mainLayoutRoutes from 'layouts/mainLayoutRoutes'

const PageIndex = defineAsyncComponent(() => import('pages/PageIndex.vue'))
const TagsView = defineAsyncComponent(() => import('components/TagsView/TagsView.vue'))
const Breadcrumb = defineAsyncComponent(() => import('components/Breadcrumb/Breadcrumb.vue'))
const DrawerMenu = defineAsyncComponent(() => import('components/Drawer/DrawerMenu.vue'))

const menu = mainLayoutRoutes

const leftDrawerOpen = ref(false)

const miniState = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-black"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          @click="toggleLeftDrawer"
        ></q-btn>
        <breadcrumb class="q-mx-md"/>
      </q-toolbar>
      <q-separator/>
      <tags-view/>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="240"
      :mini="miniState"
      class="bg-white text-black"
      bordered
      style="overflow: hidden;"
    >
      <q-item style="height: 50px">
        <q-item-section avatar>
          <q-img height="24px" width="24px" src="favicon.ico"></q-img>
        </q-item-section>
        <q-item-section>Quasar App</q-item-section>
      </q-item>
      <q-separator/>
      <q-scroll-area class="fit" style="overflow: hidden;">
        <drawer-menu :menu="menu"/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="fit">
      <q-scroll-area style="height: calc(100vh - 86px);">
        <page-index class="q-pa-md" style="min-height: calc(100vh - 86px);"/>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
