<script setup lang="ts">
const articleColumn = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Title',
    key: 'title',
  },
];
const articleData = [
  { id: 3, title: 'Wonderwall' },
  { id: 4, title: "Don't Look Back in Anger" },
  { id: 12, title: 'Champagne Supernova' },
];
</script>

<template>
  <div>
    <n-data-table
      :columns="articleColumn"
      :data="articleData"
      bordered
      striped
    />
  </div>
</template>
