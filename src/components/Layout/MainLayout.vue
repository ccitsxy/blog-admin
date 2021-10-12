<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect, h, defineAsyncComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import routes from '../../router/routes'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'

const LayoutView = defineAsyncComponent(() => import('@/components/Layout/LayoutView.vue'))

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const collapsed = ref<boolean>(false)

const menuOptions = routes[0].children?.map(item => ({
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
  icon: item.meta?.icon
}))

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
        <img src="../../assets/logo.png" alt="logo">
        <h1 v-show="!collapsed">Admin</h1>
      </div>
      <n-menu
        :collapsed-icon-size="20"
        :options="menuOptions"
        inverted
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

:deep(.n-menu-item-content) {
  padding-left: 22px !important;
}

:deep(.n-menu-item-content__icon) {
  margin-right: 16px !important;
}

.layout-sider-logo {
  display: flex;
  align-items: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
}

.layout-sider-logo img {
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
