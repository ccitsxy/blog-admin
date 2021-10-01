<template>
  <div class="analysis">
    <a-card v-for="item in 20" :key="item" title="Card" style="width: 300px">
      <p>{{ item }}</p>
    </a-card>
  </div>
</template>
