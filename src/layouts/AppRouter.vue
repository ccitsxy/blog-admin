<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useLoadingBar } from 'naive-ui';
import { useTitle } from '@vueuse/core';

const router = useRouter();

const loadingBar = useLoadingBar();
router.beforeEach(() => {
  loadingBar.start();
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
});
router.afterEach(() => {
  loadingBar.finish();
  useTitle(router.currentRoute.value.meta.title);
});
</script>
<template>
  <router-view />
</template>
