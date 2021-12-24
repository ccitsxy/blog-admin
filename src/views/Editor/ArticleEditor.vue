<script setup lang="ts">
import { ref } from 'vue';
import VueVditor from '@/components/VueVditor/VueVditor.vue';

const title = ref('');
const description = ref('');
const markdown = ref('');
</script>

<template>
  <div class="article-editor">
    <n-input v-model="title" class="form-item" placeholder="标题" />
    <vue-vditor
      v-model="description"
      :minHeight="120"
      class="form-item"
      placeholder="简介"
    />
    <vue-vditor v-model="markdown" class="form-item" placeholder="正文" />
  </div>
</template>

<style scoped>
.form-item {
  margin-bottom: 8px;
}
</style>
