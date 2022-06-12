<script setup lang="ts">
import { h, ref } from 'vue';

import type { DataTableColumns } from 'naive-ui';
import { NTag, NTime } from 'naive-ui';

import type { Article } from '@/api/articles';
import { getArticles } from '@/api/articles';

const toggle = ref(false);
const text = ref('');
const articlesColumns: DataTableColumns<Article> = [
  // {
  //   title: '_id',
  //   key: '_id',
  // },
  {
    title: 'title',
    key: 'title',
    ellipsis: {
      tooltip: true,
    },
  },
  // {
  //   title: 'description',
  //   key: 'description',
  //   ellipsis: {
  //     tooltip: true,
  //   },
  // },
  // {
  //   title: 'markdown',
  //   key: 'markdown',
  //   ellipsis: {
  //     tooltip: true,
  //   },
  // },
  {
    title: 'category',
    key: 'category',
    render(row) {
      return h('div', { class: 'bar', innerHTML: row.category.name });
    },
  },
  {
    title: 'tags',
    key: 'tags',
    render(row) {
      return row.tags.map((tagKey) => {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px',
            },
            type: 'primary',
          },
          {
            default: () => tagKey.name,
          }
        );
      });
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
});
</script>
<template>
  <div>
    <n-switch v-model:value="toggle" class="mb-2" />
    <transition name="fade">
      <vue-vditor v-if="toggle" v-model="text" />
    </transition>
    <n-data-table
      :loading="!articlesData"
      :columns="articlesColumns"
      :data="articlesData"
      :scroll-x="640"
      striped
    />
  </div>
</template>
