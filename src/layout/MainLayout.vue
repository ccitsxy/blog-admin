<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Scrollbar from 'smooth-scrollbar'
import routes from '../router/routes'

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const collapsed = ref<boolean>(false)

const menu = routes[0].children

const router = useRouter()
watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    selectedKeys.value = matched.map(r => r.path)
    if (!collapsed.value) {
      // 防止侧边菜单收起时切换路由导致侧边菜单弹出
      openKeys.value = matched
        .filter(r => r.path !== router.currentRoute.value.path)
        .map(r => r.path)
    }
  }
})

<<<<<<< HEAD
<<<<<<< HEAD
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
const menuItemClick = () => {
=======
const { width } = useWidth()
const menuItemClick = (e: Event) => {
>>>>>>> parent of 5a0cb90 (update)
=======
const { width } = useWidth()
const menuItemClick = (e: Event) => {
>>>>>>> parent of 5a0cb90 (update)
  if (width.value <= 768) {
    collapsed.value = !collapsed.value
  }
}

onMounted(() => {
  Scrollbar.init(document.querySelector('.menu-scrollbar') as HTMLElement)
})
</script>

<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="layout-sider"
      :trigger="null"
      collapsible
      width="208"
      :collapsed-width="width > 768 ? 48 : 0"
    >
      <div
        :class="[{ 'layout-sider-mask-collapsed': collapsed }, 'layout-sider-mask']"
        @click="collapsed = !collapsed"
      />
      <div :class="[{ 'logo-collapsed': collapsed }, 'logo']">
        <router-link to="/">
          <img
            height="32"
            width="32"
            src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg"
            alt="logo"
          />
          <h1 :class="[{ 'logo-title-collapsed': collapsed }, 'logo-title']">Pro Layout</h1>
        </router-link>
      </div>
      <div class="menu-scrollbar">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          theme="dark"
          mode="inline"
          @click="menuItemClick"
        >
          <sider-menu :menu="menu"/>
        </a-menu>
      </div>
    </a-layout-sider>

    <a-layout>
      <a-layout-header :class="[{ 'layout-header-collapsed': collapsed }, 'layout-header']">
        <icon-font
          v-if="collapsed"
          type="icon-unfold"
          class="trigger"
          @click="collapsed = !collapsed"
        />
        <icon-font v-else type="icon-fold" class="trigger" @click="collapsed = !collapsed"/>
        <a-breadcrumb class="layout-breadcrumb">
          <a-breadcrumb-item v-for="route in $router.currentRoute.value.matched" :key="route.path">
            <span v-if="$route.matched.indexOf(route) === $route.matched.length - 1">
              {{ route.meta.title }}
            </span>
            <span v-else class="breadcrumb-link" @click="router.push(route.path)">
              {{ route.meta.title }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
<<<<<<< HEAD
<<<<<<< HEAD
        <div style="flex: 1 1 0"/>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd item</a-menu-item>
=======
=======
>>>>>>> parent of 5a0cb90 (update)
        <div style="flex: 1 1 0"></div>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <UserOutlined />
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />
                3rd item
              </a-menu-item>
>>>>>>> parent of 5a0cb90 (update)
            </a-menu>
          </template>
          <icon-font type="icon-user"/>
        </a-dropdown>
      </a-layout-header>

      <tabs-view :class="[{ 'layout-tabs-collapsed': collapsed }, 'layout-tabs']"/>
      <a-layout-content :class="[{ 'layout-content-collapsed': collapsed }, 'layout-content']">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout-header {
  background: #fff;
  padding: 0 16px;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  position: fixed;
  right: 0;
  width: calc(100% - 208px);
  transition: all 0.2s;
  z-index: 10;
}

.layout-header-collapsed,
.layout-tabs-collapsed {
  width: calc(100% - 48px) !important;
}

.layout-breadcrumb {
  margin-left: 16px;
}

.layout-tabs {
  position: fixed;
  margin-top: 48px;
  width: calc(100% - 208px);
  right: 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s;
  z-index: 10;
}

.layout-content {
  margin-top: 111px;
  margin-left: 208px;
  min-height: calc(100vh - 111px);
  padding: 24px;
  transition: all 0.2s;
}

.layout-content-collapsed {
  margin-left: 48px;
}

.layout-sider {
  height: 100%;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
}

@media (max-width: 768px) {
  .layout-header,
  .layout-tabs,
  .layout-content {
    width: 100% !important;
    margin-left: 0;
  }

  .layout-sider-mask-collapsed {
    height: 0 !important;
  }

  .layout-sider-mask {
    opacity: 1;
    height: 100%;
    width: 100%;
    background-color: #2b1e1e73;
    position: fixed;
    top: 0;
    left: 0;
  }
}

.trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 24px;
}

.trigger:hover,
.breadcrumb-link:hover {
  color: #1890ff;
  cursor: pointer;
}

.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  line-height: 32px;
  cursor: pointer;
  transition: all 0.2s;
}

.logo h1 {
  margin: 0 0 0 12px;
  overflow: hidden;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
}

.logo h1,
.logo > img {
  display: inline-block;
  height: 32px;
  vertical-align: middle;
}

.logo > a {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
}

.logo-collapsed {
  padding-left: 8px;
}

.logo-title-collapsed {
  display: none !important;
}

.menu-scrollbar {
  height: calc(100vh - 64px);
  overflow: auto;
}

.menu-scrollbar :deep(.scrollbar-thumb) {
  background-color: #54626f;
}

:deep(.scrollbar-track) {
  background-color: transparent;
}
<<<<<<< HEAD
<<<<<<< HEAD

:deep(.ant-tabs-close-x) {
  margin-left: 8px !important;
}
=======
>>>>>>> parent of 5a0cb90 (update)
=======
>>>>>>> parent of 5a0cb90 (update)
</style>
