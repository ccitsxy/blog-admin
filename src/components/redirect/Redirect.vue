<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
onMounted(() => {
  const { params, query } = route;
  const { path } = params;
  setTimeout(() => {
    void router.replace({
      path: '/' + (Array.isArray(path) ? path.join('/') : path),
      query,
    });
  }, 500);
});
</script>

<template>
  <div />
</template>
