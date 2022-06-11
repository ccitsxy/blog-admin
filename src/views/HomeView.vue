<script setup lang="ts">
import { ref, h } from 'vue';

import { NTime, type DataTableColumns } from 'naive-ui';

import { getArticles, type Article } from '@/api/articles';

const toggle = ref(false);
const text = ref('');
const articlesColumns: DataTableColumns<Article> = [
  {
    title: '_id',
    key: '_id',
  },
  {
    title: 'title',
    key: 'title',
  },
  {
    title: 'description',
    key: 'description',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'markdown',
    key: 'markdown',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'createdAt',
    key: 'createdAt',
    render(row) {
      return h(NTime, {
        time: new Date(row.createdAt),
      });
    },
  },
  {
    title: 'updatedAt',
    key: 'updatedAt',
    render(row) {
      return h(NTime, {
        time: new Date(row.updatedAt),
      });
    },
  },
];
const articlesData = ref<Article[]>();
getArticles().then((response) => {
  articlesData.value = response.data;
  console.log(articlesData.value);
});
</script>
<template>
  <div>
    <n-switch v-model:value="toggle" class="mb-2" />
    <transition name="fade">
      <vue-vditor v-if="toggle" v-model="text" />
    </transition>
    <n-card>{{ articlesData }}</n-card>
    <n-data-table :columns="articlesColumns" :data="articlesData" />
  </div>
</template>
