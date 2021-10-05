<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const title = ref('')
const description = ref('')
const editor = ref('')
const options = {
  toolbar: [
    'emoji',
    'headings',
    'bold',
    'italic',
    'strike',
    'link',
    '|',
    'list',
    'ordered-list',
    'check',
    'outdent',
    'indent',
    '|',
    'quote',
    'line',
    'code',
    'inline-code',
    'insert-before',
    'insert-after',
    '|',
    'upload',
    'table',
    '|',
    'undo',
    'redo',
    '|',
    'fullscreen',
    'edit-mode',
    {
      name: 'more',
      toolbar: [
        'both',
        'code-theme',
        'content-theme',
        'export',
        'outline',
        'preview',
        'devtools',
        'info',
        'help'
      ]
    }
  ],
  height: 360,
  cache: {
    enable: false
  },
  fullscreen: {
    index: 3000
  }
}

</script>

<template>
  <div class="markdown">
    <a-button type="primary" @click="visible=! visible">发布文章</a-button>
    <a-modal
      v-model:visible="visible"
      title="发布文章"
      cancel-text="取消"
      okText="发布"
      @ok="visible=! visible"
      width="100%"
      wrapClassName="full-modal"
    >
      <a-form>
        <a-form-item label="标题">
          <a-textarea v-model="title" show-count auto-size :maxlength="100"/>
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea v-model="description" show-count auto-size :maxlength="200"/>
        </a-form-item>
        <a-row :gutter="[16,16]">
          <a-col :span="12">
            <a-form-item label="分类">
              <a-select>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="标签">
              <a-select>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="内容">
          <vue-vditor v-model="editor" :options="options"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
    z-index: 12;
  }

  .ant-modal-title {
    line-height: 24px;
    font-size: 18px;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .ant-modal-body {
    flex: 1;
  }

  @media (max-width: 768px) {
    .vditor-toolbar {
      padding: 0 !important;
    }
  }
}
</style>
