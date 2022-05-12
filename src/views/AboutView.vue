<script setup lang="ts">
import { ref } from 'vue';

const editor = ref('');
const options = {
  height: 480,
};
const show = ref(true);
function after() {
  show.value = false;
}
</script>

<template>
  <div class="about">
    <n-spin :show="show" class="h-[480px]" description="加载中...">
      <vue-vditor v-model="editor" :options="options" @after="after()" />
    </n-spin>
  </div>
</template>
