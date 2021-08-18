<template>
  <div id="markdownEditor">
    <vue-vditor v-model="editor" :options="options" class="vue-vditor"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  name: 'MarkdownEditor',
  components: {
    VueVditor: defineAsyncComponent(() => import('components/VueVditor/VueVditor.vue'))
  },
  setup () {
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
      }
    }
  }
})
</script>
