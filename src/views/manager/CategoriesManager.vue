<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/utils/api';

const categories = ref([]);
</script>

<template>
  <data-table :value="categories" responsiveLayout="stack" breakpoint="960px">
    <template #header>
      <div class="table-header">
        <a-button type="primary">新建</a-button>
      </div>
    </template>
    <column field="id" header="序号" />
    <column field="name" header="名称" />
    <column field="createdAt" header="创建时间" />
    <column field="updatedAt" header="修改时间" />
    <column header="操作">
      <template #body="slotProps">
        <a>编辑</a>
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
