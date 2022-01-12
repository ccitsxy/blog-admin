<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const VueVditor = defineAsyncComponent(
  () => import('@/components/VueVditor/VueVditor.vue')
);

const editor = ref('');
const options = {
  height: 360,
  cache: {
    enable: false,
  },
  fullscreen: {
    index: 3000,
  },
};
</script>

<template>
  <div id="home">
    <vue-vditor v-model="editor" :options="options" />
  </div>
</template>
