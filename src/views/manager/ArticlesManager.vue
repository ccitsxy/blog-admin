<script setup lang="ts">
import { ref } from 'vue';

import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
import type { TablePaginationConfig } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';

import VueVditor from '@/components/VueVditor/VueVditor.vue';

const articles = ref([
  {
    id: 1,
    title: 1,
    content: 1,
    description: 1,
  },
]);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

for (let i = 2; i < 51; i++) {
  articles.value.push({ id: i, title: i, content: i, description: i });
}

const visible = ref(false);

const title = ref('');
const content = ref('');
const category = ref('');
const tags = ref([]);
const description = ref('');

const contentOptions = {
  minHeight: 480,
  placeholder: '请输入正文',
};

const descriptionOptions = {
  minHeight: 240,
  placeholder: '请输入简介',
};

const spinning = ref(true);

const titleRef = ref<HTMLElement>();

const pagination: TablePaginationConfig = {
  showSizeChanger: true,
  position: ['bottomCenter'],
};

function changeSpinning() {
  spinning.value = false;
  titleRef.value?.focus();
}

function addArticle() {
  void message.success('成功');
  visible.value = false;
}

function addDraft() {
  void message.success('成功');
  visible.value = false;
}
</script>

<template>
  <div class="articles-manager">
    <div class="table-header">
      <a-button type="primary" @click="visible = true">
        <edit-outlined /> 写文章
      </a-button>
    </div>

    <a-table
      class="manager-table"
      :columns="columns"
      :data-source="articles"
      :pagination="pagination"
      :row-class-name="
        (_record:any, index:number) => (index % 2 === 1 ? 'table-striped' : undefined)
      "
    >
    </a-table>

    <a-modal
      v-model:visible="visible"
      title="Basic Modal"
      width="100%"
      wrap-class-name="full-modal"
      :footer="false"
    >
      <a-spin :spinning="spinning">
        <a-form layout="vertical">
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item>
                <a-input
                  ref="titleRef"
                  v-model="title"
                  placeholder="标题"
                  size="large"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item>
                <vue-vditor
                  v-model="content"
                  :options="contentOptions"
                  @after="changeSpinning"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="12">
              <a-form-item>
                <a-select v-model="category" placeholder="分类" size="large" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="12">
              <a-form-item>
                <a-select
                  v-model="tags"
                  placeholder="标签"
                  mode="multiple"
                  size="large"
                  :show-arrow="true"
                  :show-search="false"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item>
                <vue-vditor
                  v-model="description"
                  :options="descriptionOptions"
                  @after="changeSpinning"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" style="text-align: center">
              <a-form-item>
                <a-button type="primary" size="large" @click="addArticle()"
                  >提交文章</a-button
                >
                <a-button size="large" class="ml-4" @click="addDraft()"
                  >存草稿</a-button
                >
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<style scoped>
.articles-manager {
  /* background-color: white; */
}

/* table */
.table-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
}

.table-header-icon {
  font-size: 1rem;
  margin-right: 8px;
  cursor: pointer;
}

.articles-manager :deep(.ant-table-sticky-scroll) {
  overflow-x: hidden !important;
}

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

.manager-table :deep(.table-striped) td {
  /* background-color: #fafafa; */
}
</style>

<style>
.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
}
.full-modal .ant-modal-body {
  flex: 1;
}

.ant-modal-mask {
  background-color: #fff;
  overflow: hidden;
}

.ant-modal-wrap {
  scrollbar-width: thin;
}
</style>
