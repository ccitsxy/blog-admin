<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const VueVditor = defineAsyncComponent(() => import('components/VueVditor/VueVditor.vue'))

const title = ref('')
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
  <div id="markdownEditor">
    <q-input
      v-model="title"
      placeholder="标题"
      outlined
      dense
      clearable
      clear-icon="mdi-close"
      bg-color="white"
      class="q-mb-md"
    />
<!--    <div class="row q-col-gutter-xs q-mb-md">
      <q-select
        :options="options"
        label="分类"
        dense
        outlined
        clearable
        clear-icon="mdi-close"
        dropdown-icon=""
        bg-color="white"
        class="col-6"
      />
      <q-select
        :options="options"
        label="分类"
        dense
        outlined
        clearable
        clear-icon="mdi-close"
        dropdown-icon=""
        bg-color="white"
        class="col-6"
      />
    </div>-->
    <vue-vditor
      v-model="editor"
      :options="options"
    />
  </div>
</template>
