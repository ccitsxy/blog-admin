<script setup lang="ts">

</script>

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
              src="https://www.naiveui.com/assets/naivelogo.93278402.svg"
            />
            <span class="title">Naive UI</span>
          </router-link>
        </div>
        <div class="desc">一个 Vue 3 组件库</div>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #ffffff url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
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
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 33px;
  color: black;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  color: #00000073;
  margin-top: 12px;
  margin-bottom: 40px;
}

.main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}
</style>
