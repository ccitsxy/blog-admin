<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :exclude="['RedirectView']">
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
</template>
