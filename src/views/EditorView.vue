<script setup lang="ts">
import { ref } from 'vue';

import { message, UploadChangeParam } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
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

const fileList = ref([]);
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
        <a-upload
          v-model:file-list="fileList"
          name="smfile"
          action="https://sm.ms/api/v2/upload"
          list-type="picture"
          :headers="{'Authorization': 'yNZj1wpzatYYsYq0OnkJzaQn4kmQOEbv'}"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </a-space>
    </a-form-item>
  </a-form>
</template>
