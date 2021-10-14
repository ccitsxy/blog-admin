<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

import { UnorderedListOutlined } from '@vicons/antd'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  preview()
})

const toc: { id: string; indent: number; }[] = []

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
          indent: Number(item.tagName[1])
        })
      })
      toggle.value = true
    }
  })
}

</script>

<template>
  <div class="preview">
    <div id="preview"/>
    <n-icon class="toggle-button" size="26" @click="toggle=!toggle">
      <unordered-list-outlined/>
    </n-icon>
    <n-anchor v-if="toggle" class="toc" ignore-gap :bound="80">
      <n-anchor-link
        v-for="item in toc"
        :key="item.id"
        :title="item.id"
        :href="$route.path + '#' + item.id"
        :style="{paddingLeft: item.indent * 16 + 'px'}"
      />
    </n-anchor>
  </div>
</template>

<style scoped>
.preview {
  background-color: #fff;
}

.toggle-button {
  padding: 8px;
  position: fixed;
  bottom: 48px;
  right: 48px;
  border-radius:50%;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);
}

.toggle-button:hover{
  color: #2080F0;
}

.toc {
  background-color: #fff;
  position: fixed;
  top: 64px;
  right: 24px;
}
</style>
