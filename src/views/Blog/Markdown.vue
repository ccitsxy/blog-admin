<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

const VueVditor = defineAsyncComponent(() => import('@/components/VueVditor/VueVditor.vue'))

// const title = ref('')
// const description = ref('')
const content = ref('')
const options = {
  toolbar: [
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
    <vue-vditor v-model="content" :options="options"/>
  </div>
</template>

<style scoped>

</style>
