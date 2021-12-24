<script setup lang="ts">

</script>

<template>
  <div class="register">
    <n-form>
      <n-form-item-row label="用户名">
        <n-input size="large" placeholder="请输入用户名"/>
      </n-form-item-row>
      <n-form-item-row label="密码">
        <n-input type="password" size="large" placeholder="请输入密码"/>
      </n-form-item-row>
      <n-form-item-row label="确认密码">
        <n-input type="password" size="large" placeholder="请再次输入密码"/>
      </n-form-item-row>
      <n-form-item-row label="Email">
        <n-input type="email" size="large" placeholder="请输入Email"/>
      </n-form-item-row>
    </n-form>
    <n-button type="primary" block size="large">注册</n-button>
  </div>
</template>
