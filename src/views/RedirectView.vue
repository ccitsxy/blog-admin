<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onBeforeMount(() => {
  const { params, query } = router.currentRoute.value;
  const { path } = params;
  router.replace({
    path: '/' + (Array.isArray(path) ? path.join('/') : path),
    query,
  });
});
</script>

<template>
  <n-empty />
</template>
