<script setup lang="ts">
import { ref } from 'vue';

import 'ant-design-vue/lib/message/style/index.css';

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
</script>

<template>
  <a-form layout="vertical">
    <a-form-item label="标题">
      <a-input v-model="title" />
    </a-form-item>
    <a-form-item label="简介">
      <vue-vditor v-model="description" :options="descriptionOptions" />
    </a-form-item>
    <a-form-item label="内容">
      <vue-vditor v-model="content" :options="contentOptions" />
    </a-form-item>
    <a-form-item label="分类">
      <a-select v-model="category" />
    </a-form-item>
    <a-form-item label="标签">
      <a-select v-model="tags" mode="tags" />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary">提交</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
