<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect, h, defineAsyncComponent } from 'vue'
import { useRouter, RouterLink, RouteRecordRaw } from 'vue-router'
import routes from '../../router/routes'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'

const LayoutView = defineAsyncComponent(() => import('@/components/Layout/LayoutView.vue'))

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const collapsed = ref<boolean>(false)

const menuOptions = routes[0].children?.map(item => mapMenu(item))

function mapMenu (item: RouteRecordRaw) {
  return {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: item.path
          }
        },
        { default: () => item.meta?.title }
      ),
    key: item.path,
    icon: item.meta?.icon,
    // children: item.children?.map(item2 => mapMenu(item2))
  }
}

const router = useRouter()
watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    selectedKeys.value = matched.map((r) => r.path)
    if (!collapsed.value) {
      // 防止侧边菜单收起时切换路由导致侧边菜单弹出
      openKeys.value = matched
        .filter((r) => r.path !== router.currentRoute.value.path)
        .map((r) => r.path)
    }
  }
})

const width = ref(0)

function onResize () {
  width.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

function triggerCilck () {
  collapsed.value = !collapsed.value
}

// function menuItemClick () {
//   if (width.value <= 768) {
//     collapsed.value = !collapsed.value
//   }
// }
</script>

<template>
  <n-layout position="absolute" has-sider>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="width > 768 ? 64 : 0"
      :width="200"
      :native-scrollbar="false"
      :collapsed="collapsed"
      class="layout-sider"
      inverted
    >
      <div class="layout-sider-logo">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
          <path
            d="M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22c18.2 6.8 31.3 24.4 31.3 45c0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7c54.4-11.4 98.3-55.4 109.7-109.7c17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9c129.4 7 233.4 112 240.9 241.5c.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9c76.8 6.3 138 68.2 144.9 145.2c.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3c-8.4-110.1-96.5-198.2-206.6-206.7z"
            fill="currentColor"></path>
        </svg>
        <h1 v-show="!collapsed">Blog</h1>
      </div>
      <n-menu
        :value="$route.path"
        :collapsed-icon-size="20"
        :options="menuOptions"
        inverted
        :root-indent="24"
        :indent="24"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="layout-header">
        <n-icon v-if="collapsed" @click="triggerCilck()" size="24" class="layout-header-icon">
          <menu-unfold-outlined/>
        </n-icon>
        <n-icon v-else size="24" @click="triggerCilck()" class="layout-header-icon">
          <menu-fold-outlined/>
        </n-icon>
      </n-layout-header>
      <n-layout-content
        content-style="padding: 24px;"
        position="absolute"
        :native-scrollbar="false"
        class="layout-content"
      >
        <transition name="fade">
          <div
            v-show="!collapsed"
            class="layout-sider-mask"
            @click="triggerCilck()"
          />
        </transition>
        <layout-view/>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.layout-header {
  display: flex;
  align-items: center;
  height: 64px;
  z-index: 10;
  padding: 0 16px 0 16px;
}

.layout-content {
  top: 64px;
}

@media (max-width: 768px) {
  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    height: 100%;
  }

  .layout-sider-mask {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #00000073;
  }
}

.layout-header-icon:hover {
  color: #2080F0;
}

/*:deep(.n-menu-item-content) {*/
/*  !*padding-left: 22px !important;*!*/
/*}*/

/*:deep(.n-menu-item-content__icon) {*/
/*  margin-right: 16px !important;*/
/*}*/

.layout-sider-logo {
  display: flex;
  align-items: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
}

.layout-sider-logo svg {
  height: 32px;
  margin-left: 16px;
}

.layout-sider-logo h1 {
  margin: 0 0 0 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
