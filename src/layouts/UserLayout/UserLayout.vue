<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const LayoutView = defineAsyncComponent(
  () => import('@/layouts/LayoutView.vue')
);
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <router-link to="/">
            <img
              alt="logo"
              class="logo"
              width="44"
              height="44"
              src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg"
            />
            <span class="title">Preview Pro</span>
          </router-link>
        </div>
        <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <div class="main">
        <layout-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(UserLayout.css);
</style>
