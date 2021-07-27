<template>
  <div>
    <div id="vditor"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default defineComponent({
  name: 'MarkdownEditor',
  setup () {
    onMounted(() => {
      const contentEditor = new Vditor('vditor', {
        minHeight: 360,
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false
        },
        fullscreen: {
          index: 2021
        },
        after: () => {
          contentEditor.setValue('hello,Vditor+Vue!')
        }
      })
    })
  }
})
</script>
