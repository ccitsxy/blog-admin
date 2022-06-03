<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
</script>
<template>
  <div>
    <n-input v-model:value="title"></n-input>
  </div>
</template>
