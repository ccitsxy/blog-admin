<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
</script>
<template>
  <div>
    <n-input v-model="title"></n-input>
  </div>
</template>
