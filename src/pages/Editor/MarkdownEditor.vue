<template>
  <div id="markdownEditor">
    <vue-vditor v-model="editor" :options="options" class="vue-vditor" @after="handleAfterEvent"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

import Vditor from 'vditor'

export default defineComponent({
  name: 'MarkdownEditor',
  components: {
    VueVditor: defineAsyncComponent(() => import('components/VueVditor/VueVditor.vue'))
  },
  setup () {
    function handleAfterEvent (event: Vditor) {
      console.log(event)
    }

    return {
      editor: ref(''),
      options: {
        height: 360,
        cache: {
          enable: false
        },
        fullscreen: {
          index: 3000
        }
      },
      handleAfterEvent
    }
  }
})
</script>
