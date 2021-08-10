<template>
  <div id="htmlEditor">
    <editor
      v-model="editor"
      :init="init"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  name: 'HTMLEditor',
  components: {
    Editor: defineAsyncComponent(() => import('@tinymce/tinymce-vue'))
  },
  setup () {
    const editor = ref('')
    return {
      editor,
      init: {
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'codesample'
        ],
        toolbar:
          'formatselect | bold italic backcolor' +
          ' | alignleft aligncenter alignright alignjustify' +
          ' | bullist numlist outdent indent | codesample' +
          ' | removeformat | undo redo | fullscreen code help',
        language: 'zh_CN'
      }
    }
  }
})
</script>

<style>
.tox-notifications-container {
  display: none;
}

.tox-tinymce-aux, .tox-fullscreen {
  z-index: 3000 !important;
}
</style>
