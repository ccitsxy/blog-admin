<script setup lang="ts">
import { ref } from 'vue';

import { api } from '@/utils/api';

import VueVditor from '@/components/VueVditor/VueVditor.vue';

const title = ref('');
const description = ref('');
const content = ref('');
const category = ref('');
const tags = ref([]);

const contentOptions = {
  minHeight: 360,
};

const descriptionOptions = {
  minHeight: 120,
};

api.post(
  '/articles',
  {
    title: title,
    description: description,
    content: content,
    category: category,
    tags: tags,
  },
  {
    headers: {
      Authorization: `Bearer${localStorage.getItem('token')}`
    },
  }
);
</script>

<template>
  <a-form layout="vertical">
    <a-form-item label="标题">
      <a-input v-model="title" />
    </a-form-item>
    <a-form-item label="内容">
      <vue-vditor v-model="content" :options="contentOptions" />
    </a-form-item>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="分类">
          <a-select v-model="category" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="标签">
          <a-select v-model="tags" mode="tags" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="简介">
      <vue-vditor v-model="description" :options="descriptionOptions" />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary">提交</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<style scoped>
:deep(.vditor-toolbar) {
  padding: unset !important;
}

@media (min-width: 960px) {
  :deep(.vditor-toolbar) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
