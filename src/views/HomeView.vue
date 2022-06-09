<script setup lang="ts">
import { ref } from 'vue';

const toogle = ref(false);
const text = ref('');
</script>
<template>
  <div>
    <n-switch v-model:value="toogle" class="mb-2" />
    <transition name="fade">
      <vue-vditor v-if="toogle" v-model="text" />
    </transition>
  </div>
</template>
