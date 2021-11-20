<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <router-link to="/">
            <img
              alt="logo"
              class="logo"
              height="44"
              src="https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg"
              width="44"
            />
            <span class="title">Ant Design</span>
          </router-link>
        </div>
        <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
/* const links = [
  {
    key: 'help',
    title: '帮助',
    href: ''
  },
  {
    key: 'privacy',
    title: '隐私',
    href: ''
  },
  {
    key: 'terms',
    title: '条款',
    href: ''
  }
] */
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #ffffff;
}

.content {
  padding: 32px 0;
  flex: 1;
}

@media (min-width: 768px) {
  .container {
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .content {
    padding: 112px 0 24px 0;
  }
}

.top {
  text-align: center;
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
</style>
