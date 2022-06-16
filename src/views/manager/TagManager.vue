<script setup lang="ts">
import { h, ref } from 'vue';

import type { DataTableColumns } from 'naive-ui';
import { NTime, NButton } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';

import { getTags } from '@/api/tags';
import type { Tag } from '@/api/tags';

const show = ref(false);
function showModel() {
  show.value = true;
}

// const tag = reactive<Tag>({
//   name: '',
// });
// function publishTag() {
//   createTag(tag);
// }

const tagsColumns: DataTableColumns<Tag> = [
  {
    title: '名称',
    key: 'name',
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
const tagsData = ref<Tag[]>();
getTags().then((response) => {
  tagsData.value = response.data;
});
</script>
<template>
  <div>
    <div class="flex justify-end mb-2">
      <n-button type="primary" @click="showModel">
        <template #icon>
          <n-icon :component="PlusOutlined" />
        </template>
        新建
      </n-button>
    </div>
    <n-modal
      v-model:show="show"
      transform-origin="center"
      preset="confirm"
      class="w-80 h-80"
      positive-text="取消"
      negative-text="添加"
    >
    </n-modal>

    <n-data-table
      :loading="!tagsData"
      :columns="tagsColumns"
      :data="tagsData"
      striped
      :scroll-x="800"
    />
  </div>
</template>
