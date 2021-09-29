<script setup lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue'

defineProps({
  type: {
    type: String,
    required: true
  }
})

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2839510_24h2342jm4w.js' // 在 iconfont.cn 上生成
})
</script>

<template>
  <my-icon :type="'icon-'+type"/>
</template>

<style scoped>

</style>
