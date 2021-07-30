<template>
  <vue-vditor v-model="editor" :options="options" class="vue-vditor" @after="handleAfterEvent"></vue-vditor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueVditor from 'components/VueVditor/VueVditor.vue'
import Vditor from 'vditor'

export default defineComponent({
  name: 'MarkdownEditor',
  components: { VueVditor },
  setup () {
    function handleAfterEvent (event:Vditor) {
      console.log(event)
    }

    return {
      handleAfterEvent,
      editor: ref(''),
      options: {
        height: 360,
        cache: {
          enable: true,
          id: 'vue-vditor'
        },
        fullscreen: {
          index: 3000
        }
      }
    }
  }
})
</script>
