<template>
  <q-editor
    v-model="editor"
    :toolbar="[
        [{
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6'
            ]
          },'bold', 'italic', 'strike', 'underline','link'],
        ['unordered', 'ordered', 'outdent', 'indent'],
        ['quote','hr','code', 'subscript', 'superscript'],
        ['undo', 'redo'],
        ['viewsource'],
        ['fullscreen']
      ]"/>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MarkdownEditor',
  setup () {
    return {
      editor: ref('')
    }
  }
})
</script>
