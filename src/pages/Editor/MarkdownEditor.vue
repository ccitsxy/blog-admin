<template>
  <div id="markdownEditor">
    <q-input
      v-model="title"
      label="标题"
      outlined
      dense
      clearable
      clear-icon="mdi-close"
      bg-color="white"
      class="q-mb-md"
    />
    <div class="row q-col-gutter-xs q-mb-md">
<!--    <q-select
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
    />-->
    </div>
    <vue-vditor
      v-model="editor"
      :options="options"
    />
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
      title: ref(''),
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
