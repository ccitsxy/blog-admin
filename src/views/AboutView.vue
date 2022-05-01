<script setup lang="ts">
import { ref } from "vue";

const editor = ref("");
const options = {
  height: 960,
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <vue-vditor v-model="editor" :options="options" />
  </div>
</template>
