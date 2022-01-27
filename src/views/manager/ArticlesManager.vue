<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/utils/api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const articles = ref([
  {
    id: 1,
    title: 1,
    description: 1,
  },
]);

// articles.value = await api.get('/articles')
</script>

<template>
  <data-table :value="articles" responsiveLayout="stack" breakpoint="960px">
    <template #header>
      <div class="table-header">
        <a-button type="primary">
          <router-link to="/editor">新建</router-link>
        </a-button>
      </div>
    </template>
    <column field="id" header="序号"></column>
    <column field="title" header="标题"></column>
    <column field="description" header="简介"></column>
    <column field="content" header="内容"></column>
    <column field="category" header="分类"></column>
    <column field="tags" header="标签"></column>
    <column header="操作">
      <template #body="slotProps">
        <router-link :to="`${slotProps.data.id}`">编辑</router-link>
      </template>
    </column>
  </data-table>
</template>

<style scoped>
.table-header {
  display: flex;
  justify-content: flex-end;
}
</style>
