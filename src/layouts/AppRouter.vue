<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import { useLoadingBar } from 'naive-ui';
import { useTitle } from '@vueuse/core';

import NestedPage from './NestedPage.vue';

const router = useRouter();
const route = useRoute();

const loadingBar = useLoadingBar();
router.beforeEach(() => {
  loadingBar.start();
});
router.afterEach(() => {
  loadingBar.finish();
  useTitle(route.meta.title);
});
</script>
<template>
  <nested-page />
</template>
