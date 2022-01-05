<script setup lang="ts">
import { reactive, watchEffect, computed, ref } from 'vue';
import {
  useRouter,
  RouterLink,
  RouteLocationNormalizedLoaded,
} from 'vue-router';
import {
  // GlobalFooter,
  getMenuData,
  clearMenuItem,
} from '@ant-design-vue/pro-layout';
import type { RouteContextProps } from '@ant-design-vue/pro-layout';
import {
  ReloadOutlined,
  CloseOutlined,
  MoreOutlined,
} from '@ant-design/icons-vue';
import LayoutView from '@/layouts/LayoutView.vue';

const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // default openKeys
  selectedKeys: [], // default selectedKeys
});

const tabs = ref<RouteLocationNormalizedLoaded[]>([]);

const proConfig = ref({
  layout: 'side',
  fixedHeader: false,
  fixSiderbar: false,
  splitMenus: false,
  menuHeaderRender: undefined,
  footerRender: undefined,
  headerRender: undefined,
});

const breadcrumb = computed(() =>
  router.currentRoute.value.matched
    .slice(1)
    .concat()
    .map((item) => {
      return {
        path: item.path,
        breadcrumbName: item.meta.title || '',
      };
    })
);

watchEffect(() => {
  if (router.currentRoute) {
    // console.log("router", router.currentRoute.value);

    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched
      .filter((r) => r.name !== 'index')
      .map((r) => r.path);

    state.openKeys = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path);

    if (
      tabs.value.some(
        (p: { path: string }) => p.path === router.currentRoute.value.path
      ) ||
      router.currentRoute.value.path.startsWith('/redirect')
    )
      return;

    tabs.value.push(router.currentRoute.value);
  }
});

// const onChange = (targetKey: string) => {
//   router.push(`${targetKey}`);
// };

const reloadPage = () => {
  void router.push({
    path: '/redirect' + router.currentRoute.value.fullPath,
  });
};
</script>

<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :menu-data="menuData"
    v-bind="proConfig"
  >
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img
          src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg"
          alt="logo"
        />
        <h1>Preview Pro</h1>
      </router-link>
    </template>

    <template #headerContentRender>
      <div class="layout-breadcrumb">
        <reload-outlined @click="reloadPage" class="layout-breadcrumb-icon" />
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            <router-link :to="item.path">{{ item.breadcrumbName }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </template>

    <template #rightContentRender>
      <a-button type="primary">测试</a-button>
    </template>

    <a-tabs
      :activeKey="$route.path"
      type="editable-card"
      hideAdd
      class="layout-tabs"
    >
      <a-tab-pane
        v-for="tab in tabs"
        style="height: 0"
        :key="tab.path"
        :closable="false"
      >
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <router-link class="layout-tabs-tab" :to="tab.path">
              {{ tab.meta.title }}
              <close-outlined class="layout-tabs-tab-icon" />
            </router-link>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">关闭</a-menu-item>
                <a-menu-item key="2">关闭其他</a-menu-item>
                <a-menu-item key="3">关闭到左侧</a-menu-item>
                <a-menu-item key="4">关闭到右侧</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>

      <template #leftExtra>
        <span style="margin-left: 16px" />
      </template>

      <template #rightExtra>
        <a-dropdown>
          <more-outlined style="margin-right: 16px; font-size: 1rem" />
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">关闭当前</a-menu-item>
              <a-menu-item key="2">关闭其他</a-menu-item>
              <a-menu-item key="3">关闭到左侧</a-menu-item>
              <a-menu-item key="4">关闭到右侧</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>

    <div class="layout-content">
      <layout-view />
    </div>

    <!-- <template #footerRender>
      <GlobalFooter
        :links="[
          { title: 'Github', href: 'https://github.com/ccitsxy/blog-admin' },
          { title: 'Ant Design Vue', href: 'https://next.antdv.com' },
        ]"
        copyright="2021 &copy; SXY"
      />
    </template>-->
  </pro-layout>
</template>

<style>
.ant-pro-basicLayout-content {
  margin: 0;
}

.ant-tabs-nav .ant-tabs-tab {
  display: flex !important;
  transition: none !important;
}

.ant-tabs-nav:before {
  display: unset !important;
  margin-bottom: -1px !important;
}

.ant-tabs-tab {
  padding: 0 !important;
}

.ant-tabs-tab-btn > .ant-dropdown-trigger {
  padding: 8px 16px;
}

.ant-tabs-tab-btn > a {
  transition: none !important;
}

/* firefox */
.ant-layout-sider-children > div:nth-child(2) {
  scrollbar-width: thin;
}

.layout-breadcrumb {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.layout-breadcrumb-icon {
  font-size: 20px;
  margin-right: 16px;
  cursor: pointer;
}

.layout-tabs {
  background-color: #fff;
  padding-top: 6px;
}

.layout-tabs-tab {
  width: 100%;
  color: inherit;
}

.layout-tabs-tab-icon {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  margin-left: 8px;
  margin-right: 0 !important;
}

.layout-content {
  height: calc(100vh - 110px);
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  //padding: 16px;
  /* firefox */
  scrollbar-width: thin;
}

/* webkit */
.layout-content::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.layout-content::-webkit-scrollbar-thumb {
  border-radius: 6px;
  border: 2px solid transparent;
  background-color: #cdcdcd;
  background-clip: padding-box;
}
</style>
