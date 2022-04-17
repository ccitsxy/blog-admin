<script setup lang="ts">
import { ref } from 'vue';

import { EditOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

import VueVditor from '@/components/VueVditor/VueVditor.vue';

const articles = ref([
  {
    id: 1,
    title: 1,
  },
]);

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
  <div class="article-manager">
    <data-table :value="articles" responsive-layout="stack" breakpoint="960px">
      <template #header>
        <div class="table-header">
          <a-button type="primary" @click="visible = true">
            <edit-outlined /> 写文章
          </a-button>
        </div>
      </template>
      <column field="id" header="序号" />
      <column field="title" header="标题" />
      <column field="category" header="分类" />
      <column field="tags" header="标签" />
      <column field="createdAt" header="创建时间" />
      <column field="updatedAt" header="修改时间" />
      <column header="操作">
        <template #body="slotProps">
          <a>{{ slotProps.data }}</a>
        </template>
      </column>
    </data-table>
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
.article-manager {
  background-color: white;
  padding: -16px;
}
/* table */
.table-header {
  display: flex;
  justify-content: flex-end;
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

:global(.full-modal .ant-modal) {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
:global(.full-modal .ant-modal-content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
}
:global(.full-modal .ant-modal-body) {
  flex: 1;
}
</style>
