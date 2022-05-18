<template>
  <div class="grid justify-center items-center h-screen">
    <n-result status="error" title="404 资源不存在">
      <template #footer>
        <n-button type="primary" @click="$router.push('/')">回到首页</n-button>
      </template>
    </n-result>
  </div>
</template>
