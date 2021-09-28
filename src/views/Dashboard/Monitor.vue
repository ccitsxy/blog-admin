<script setup lang="ts">
</script>

<template>
  <a-descriptions
    title="Responsive Descriptions"
    bordered
    :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
    class="monitor"
  >
    <a-descriptions-item label="Product">{{}}</a-descriptions-item>
    <a-descriptions-item label="Billing">Prepaid</a-descriptions-item>
    <a-descriptions-item label="Time">18:00:00</a-descriptions-item>
    <a-descriptions-item label="Amount">$80.00</a-descriptions-item>
    <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
    <a-descriptions-item label="Official">$60.00</a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>
.monitor{
  background-color: #fff;
  padding: 24px;
}
</style>
