<script setup lang="ts">
import { ref } from 'vue';

const toggle = ref(false);
const text = ref('');
</script>
<template>
  <div>
    <n-switch v-model:value="toggle" class="mb-2" />
    <transition name="fade">
      <vue-vditor v-if="toggle" v-model="text" />
    </transition>
  </div>
</template>
