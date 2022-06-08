<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
</script>
<template>
  <div>
    <n-input v-model:value="title"></n-input>
    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
  </div>
</template>
