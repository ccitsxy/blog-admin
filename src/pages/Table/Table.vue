<script setup lang="ts">

const columns = []

const rows = []
</script>

<template>
  <div>
    <q-table
      title="文章"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :grid="$q.screen.xs"
    >
    </q-table>
  </div>
</template>
