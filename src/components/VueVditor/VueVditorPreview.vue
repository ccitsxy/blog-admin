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

const toc: { id: string; indent: number; text: string; el: HTMLElement; }[] = []

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
          text: item.innerText,
          indent: Number(item.tagName[1]),
          el: item
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
    <n-button @click="toggle=!toggle" circle text color="black" class="toggle-button">
      <n-icon size="26">
        <unordered-list-outlined/>
      </n-icon>
    </n-button>
    <n-anchor v-if="toggle" ignore-gap :bound="12" class="toc">
      <n-anchor-link
        v-for="item in toc"
        :key="item.id"
        :title="item.text"
        :href="$route.path + '#' + item.id"
        :style="{paddingLeft: item.indent * 16 + 'px'}"
        @click.prevent="item.el.scrollIntoView({behavior: 'smooth'})"
      />
    </n-anchor>
  </div>
</template>

<style scoped>
.preview {
  background-color: #fff;
}

.toggle-button {
  width: 44px;
  height: 44px;
  position: fixed;
  bottom: 40px;
  right: 48px;
  border-radius: 50%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  background-color: white;
}

.toc {
  background-color: #fff;
  position: fixed;
  top: 90px;
  right: 26px;
}
</style>
