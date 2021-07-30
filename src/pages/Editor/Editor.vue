<template>
  <VueVditor v-model="editor" :options="options" class="vue-vditor" @after="handleAfterEvent"></VueVditor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueVditor from 'components/Vditor/VueVditor.vue'
import Vditor from 'vditor'

export default defineComponent({
  name: 'Editor',
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
