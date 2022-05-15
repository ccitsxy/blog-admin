<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <router-link to="/">
            <img
              alt="logo"
              class="logo"
              width="44"
              height="44"
              src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg"
            />
            <span class="title">Preview Pro</span>
          </router-link>
        </div>
        <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <div class="main">
        <nested-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 80px;
  overflow: auto;
  background: #ffffff
    url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')
    no-repeat center 110px;
  background-size: 100%;
}

.content {
  padding: 32px 0;
}

.top {
  text-align: center;
  margin-bottom: 80px;
}

.header {
  height: 44px;
  line-height: 44px;
}

.header a {
  text-decoration: none;
}

.logo {
  height: 44px;
  margin-right: 16px;
  vertical-align: top;
}

.title {
  position: relative;
  top: 2px;
  color: black;
  font-size: 33px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-weight: 600;
}

.desc {
  margin-top: 12px;
  margin-bottom: 40px;
  color: #00000073;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-variant: tabular-nums;
}

.main {
  width: 320px;
  margin: 0 auto;
}
</style>
