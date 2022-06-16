<script setup lang="ts">
import { h, reactive, ref } from 'vue';

import type { DataTableColumns } from 'naive-ui';
import { NTag, NTime, NButton } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';

import { createArticle, getArticles } from '@/api/articles';
import type { Article } from '@/api/articles';

const show = ref(false);
function showModel() {
  show.value = true;
}

const article = reactive<Article>({
  title: '',
  markdown: '',
  description: '',
  category: {
    name: '',
  },
  tags: [
    {
      name: '',
    },
  ],
});
function publishArticle() {
  createArticle(article);
}

const spin = ref(true);
const articlesColumns: DataTableColumns<Article> = [
  {
    title: '标题',
    key: 'title',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '分类',
    key: 'category',
    render(row) {
      return h('div', { class: 'bar' }, row.category.name);
    },
  },
  {
    title: '标签',
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
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    render(row) {
      return h(NTime, {
        time: new Date(row.createdAt as string),
      });
    },
  },
  {
    title: '修改时间',
    key: 'updatedAt',
    render(row) {
      return h(NTime, {
        time: new Date(row.updatedAt as string),
      });
    },
  },
  {
    title: '操作',
    key: 'action',
    render(row) {
      return h('div', [
        h(
          NButton,
          {
            onClick() {
              console.log(row);
            },
            type: 'primary',
            text: true,
            style: 'margin-right: 6px',
          },
          () => '编辑'
        ),
        h(
          NButton,
          {
            onClick() {
              console.log(row);
            },
            type: 'error',
            text: true,
          },
          () => '删除'
        ),
      ]);
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
    <div class="flex justify-end mb-2">
      <n-button type="primary" @click="showModel">
        <template #icon>
          <n-icon :component="PlusOutlined" />
        </template>
        写文章
      </n-button>
    </div>
    <n-modal
      v-model:show="show"
      transform-origin="center"
      preset="card"
      class="rounded-none h-screen"
      header-style="padding:0 8px;margin:0;"
      content-style="padding:0;margin:0"
    >
      <template #header>
        <div class="flex space-x-2 py-2">
          <n-input
            v-model:value="article.title"
            placeholder="标题"
            type="text"
          />
          <n-button round type="primary" ghost>保存草稿</n-button>
          <n-button round type="primary" @click="publishArticle">
            发布文章
          </n-button>
        </div>
      </template>
      <n-spin :show="spin">
        <vue-vditor
          v-model="article.markdown"
          class="!h-[calc(100vh-52px)] !border-x-[0] !rounded-none"
          @after="spin = false"
        />
      </n-spin>
    </n-modal>

    <n-data-table
      :loading="!articlesData"
      :columns="articlesColumns"
      :data="articlesData"
      striped
      :scroll-x="1200"
    />
  </div>
</template>
