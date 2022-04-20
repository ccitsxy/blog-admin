<script setup lang="ts">
import { ref } from 'vue';

import { EditOutlined } from '@ant-design/icons-vue';
import { message, TablePaginationConfig } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

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
        (_record, index) => (index % 2 === 1 ? 'table-striped' : undefined)
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
                <a-button
                  size="large"
                  style="margin-left: 16px"
                  @click="addDraft()"
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
@import './ArticlesManager.css';
</style>
