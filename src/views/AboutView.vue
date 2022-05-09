<script setup lang="ts">
import { ref } from 'vue';

const editor = ref('');
const options = {
  height: 480,
};
</script>

<template>
  <div class="about">
    <vue-vditor v-model="editor" :options="options" />
  </div>
</template>
