<script setup lang=ts>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
</script>

<template>
  <q-page class="page-login">
    <q-form class="login-form">
      <div class="text-center">
        <q-img width="64px" height="64px" src="favicon.ico"></q-img>
      </div>
      <q-input
        v-model="username"
        dense
        outlined
        placeholder="用户名"
        type="text"
        class="q-mt-lg"
        bg-color="white"
      />
      <q-input
        v-model="password"
        dense
        outlined
        placeholder="密码"
        type="password"
        class="q-mt-lg"
        bg-color="white"
      />
      <q-btn
        color="primary"
        style="width: 100%"
        label="登录"
        class="q-mt-lg"
      />
    </q-form>
  </q-page>
</template>

<style scoped>
.page-login {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.login-form {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
