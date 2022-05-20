<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.path" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>
