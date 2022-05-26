<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useLoadingBar } from 'naive-ui';
import { useTitle } from '@vueuse/core';

const router = useRouter();

const loadingBar = useLoadingBar();
router.beforeEach(() => {
  loadingBar.start();
});
router.afterEach(() => {
  loadingBar.finish();
  useTitle(router.currentRoute.value.meta.title);
});
</script>
<template>
  <router-view />
</template>
