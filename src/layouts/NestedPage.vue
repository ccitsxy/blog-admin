<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <suspense>
        <template #default>
          <component :is="Component" :key="route.path" />
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </keep-alive>
  </router-view>
</template>
