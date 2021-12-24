<script setup lang="ts">
import { login } from '@/api/auth/auth';

void login({ username: 'sxy', password: '' });
</script>

<template>
  <div class="login">
    <n-form>
      <n-form-item-row label="用户名">
        <n-input size="large" placeholder="请输入用户名" />
      </n-form-item-row>
      <n-form-item-row label="密码">
        <n-input type="password" size="large" placeholder="请输入密码" />
      </n-form-item-row>
    </n-form>
    <n-button type="primary" block size="large">登录</n-button>
  </div>
</template>

<style scoped></style>
