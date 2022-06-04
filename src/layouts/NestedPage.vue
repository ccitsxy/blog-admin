<template>
  <div>
    <!-- add div to avoid none single root element -->
    <router-view v-slot="{ Component, route }">
      <transition name="slide-left" mode="out-in" appear>
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" :key="route.path" />
        </keep-alive>
        <component :is="Component" v-else :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>
