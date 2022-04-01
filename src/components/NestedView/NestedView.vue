<template>
  <router-view #default="{ Component, route }">
    <keep-alive :include="/[/redirect/]+/">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>
