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
</script>

<template>
  <div id="editor">
    <vue-vditor v-model="editor" :options="options" />
  </div>
</template>
