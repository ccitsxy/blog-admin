<script setup lang="ts">
import { GithubOutlined } from '@vicons/antd';
</script>
<template>
  <div class="h-[2000px]">测试</div>
  <a
    class="flex items-center space-x-2"
    href="https://github.com/ccitsxy/blog-admin"
    target="_blank"
  >
    <n-icon :component="GithubOutlined" size="20" />
    <span>Github</span>
  </a>
</template>
