<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  preview()
})

const toc: { id: string; el: HTMLElement; }[] = []

const toggle = ref(false)

function preview () {
  void Vditor.preview(document.getElementById('preview') as HTMLDivElement, props.modelValue, {
    mode: 'light',
    hljs: {
      lineNumber: true
    },
    after () {
      const headingElements: HTMLElement[] = []
      Array.from(document.getElementById('preview')!.children).forEach((item) => {
        if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
          headingElements.push(<HTMLElement>item)
        }
      })
      headingElements.forEach((item) => {
        toc.push({
          id: item.id,
          el: item
        })
      })
      toggle.value = true
    }
  })
}

function anchorScroll (el: HTMLElement) {
  el.scrollIntoView()
}

</script>

<template>
  <div class="preview">
    <div id="preview"/>
    <n-anchor v-if="toggle" class="toc" ignore-gap :bound="80">
      <n-anchor-link
        v-for="item in toc"
        :key="item.id"
        :title="item.id"
        :href="$route.path + '#' + item.id"
        @click.prevent="anchorScroll(item.el)"
      />
    </n-anchor>
  </div>
</template>

<style scoped>
.preview {
  background-color: #fff;
}

.toc {
  position: fixed;
  top: 200px;
  right: 24px;
}
</style>
