<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Scrollbar from 'smooth-scrollbar'
import routes from '../router/routes'
import useWidth from '../utils/useWidth'

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

const { width } = useWidth()
const menuItemClick = () => {
  if (width.value <= 768) {
    collapsed.value = !collapsed.value
  }
}

onMounted(() => {
  Scrollbar.init(document.querySelector('.menu-scrollbar') as HTMLElement)
  Scrollbar.init(document.querySelector('.content-scrollbar') as HTMLElement)
})
</script>

<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :class="width > 768 ? 'layout-sider' : 'layout-sider-mobile'"
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
          <sider-menu :menu="menu" />
        </a-menu>
      </div>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="layout-header">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="collapsed = !collapsed" />
        <menu-fold-outlined v-else class="trigger" @click="collapsed = !collapsed" />
        <a-breadcrumb style="margin-left: 16px">
          <a-breadcrumb-item v-for="route in $router.currentRoute.value.matched" :key="route.path">
            <span
              v-if="$route.matched.indexOf(route) === $route.matched.length - 1"
            >{{ route.meta.title }}</span>
            <span
              v-else
              class="breadcrumb-link"
              @click="router.push(route.path)"
            >{{ route.meta.title }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div style="flex: 1 1 0" />
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <UserOutlined />1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />3rd item
              </a-menu-item>
            </a-menu>
          </template>
          <UserOutlined />
        </a-dropdown>
      </a-layout-header>

      <tabs-view class="layout-tabs" />

      <div class="content-scrollbar">
        <a-layout-content class="layout-content">
          <router-view />
        </a-layout-content>
      </div>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout-header .layout-header {
  background: #fff;
  padding: 0 16px;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
}

.layout-tabs {
  border-bottom: 1px solid #f0f0f0;
}

.layout-content {
  padding: 24px;
  min-height: calc(100vh - 134px);
}

.layout-sider-mobile {
  height: 100%;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

@media (max-width: 768px) {
  .layout-sider-mask-collapsed {
    height: 0 !important;
  }

  .layout-sider-mask {
    opacity: 1;
    height: 100%;
    width: 100%;
    background-color: #2b1e1e73;
    transition: none;
    animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    position: fixed;
    top: 0;
    left: 0;
  }
}

.trigger {
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  font-size: 20px;
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
}

.logo h1 {
  margin: 0 0 0 12px;
  overflow: hidden;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  -webkit-animation: fade-in;
  animation: fade-in;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
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

.content-scrollbar {
  height: calc(100vh - 111px);
}

.content-scrollbar :deep(.scrollbar-thumb) {
  background-color: #c1c1c1;
}

:deep(.scrollbar-track) {
  background-color: transparent;
}
