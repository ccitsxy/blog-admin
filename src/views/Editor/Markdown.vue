<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')
const description = ref('')
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
  <a-textarea v-model="title" placeholder="标题" show-count auto-size :maxlength="100" />
  <a-textarea v-model="description" placeholder="简介" show-count auto-size :maxlength="200" />
  <a-spin :spinning="spinning">
    <div id="editor">
      <vue-vditor v-model="editor" :options="options" @after="after()"/>
    </div>
  </a-spin>
</template>

<style scoped>
.editor-input{
  margin-bottom: 16px;
}
</style>
