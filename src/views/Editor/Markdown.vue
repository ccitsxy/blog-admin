<script setup lang="ts">
import { ref } from 'vue'

const editor = ref('')
const options = {
  height: 360,
  cache: {
    enable: false
  },
  fullscreen: {
    index: 3000
  }
}

const spinning = ref(true)
function after () {
  spinning.value = false
}
</script>

<template>
  <a-spin :spinning="spinning">
    <div id="editor">
      <vue-vditor v-model="editor" :options="options" @after="after()"/>
    </div>
  </a-spin>
</template>
