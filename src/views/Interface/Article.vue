<script setup lang="ts">
import { ref } from 'vue'

import VditorPreview from '@/components/VueVditor/VueVditorPreview.vue'

const markdown = ref('# 博客 #\n' +
  '\n' +
  '## 前端\n' +
  '\n' +
  '1. Vue\n' +
  '2. Vue Router\n' +
  '3. Vuex\n' +
  '4. ElementUI\n' +
  '5. Axios\n' +
  '6. mavonEditor\n' +
  '7. Lodash\n' +
  '8. Webpack\n' +
  '\n' +
  '## 后端\n' +
  '\n' +
  '1. Spring Boot\n' +
  '2. Spring Data Jpa\n' +
  '3. Spring Data Redis\n' +
  '4. Apache Log4j 2\n' +
  '5. Apache Shiro\n' +
  '6. Apache Commons\n' +
  '7. Fastjson\n' +
  '8. Druid\n' +
  '9. Maven\n' +
  '\n' +
  '## 数据库\n' +
  '\n' +
  '1. MySQL\n' +
  '2. Redis\n' +
  '\n' +
  '# 实现功能\n' +
  '\n' +
  '## 整体\n' +
  '\n' +
  '- 用户：登录 注册 退出\n' +
  '- 首页：文章列表、最热标签、最新文章、最热文章\n' +
  '- 文章分类-标签：列表、详情\n' +
  '- 文章归档\n' +
  '- 文章：写文章、文章详情\n' +
  '- 评论：文章添加评论 对评论回复\n' +
  '- 文章列表滑动分页\n' +
  '\n' +
  '## 后端\n' +
  '\n' +
  '- 用户、文章、文章分类、标签和评论 增删改查api接口\n' +
  '- 基于token权限控制\n' +
  '- Redis存储Session\n' +
  '- 全局异常处理\n' +
  '- 操作日志记录\n' +
  '\n' +
  '# 待实现功能\n' +
  '\n' +
  '- 评论的分页 点赞\n' +
  '- 留言板\n' +
  '- 第三方登录\n' +
  '- ......\n' +
  '\n' +
  '# 运行\n' +
  '\n' +
  '## 方式一 直接运行SpringBoot项目\n' +
  '\n' +
  '（已将打包的静态文件放到了 resources/static下）\n' +
  '\n' +
  '1. 将blog-api导入到IDE工具中\n' +
  '2. resources/sql/blog-schema.sql、blog-data.sql导入MySQL数据库\n' +
  '3. 打开Redis数据库\n' +
  '4. resources/application.yml 修改MySQL、Redis连接\n' +
  '5. Run as 运行,访问：[http://localhost:8888](http://localhost:8888/)\n' +
  '\n' +
  '## 方式二 前后分离（开发方式）\n' +
  '\n' +
  '1. 按方式一运行blog-api，提供api数据接口\n' +
  '\n' +
  '2. 打开命令行\n' +
  '\n' +
  '   > cd blog-app\n' +
  '\n' +
  '   > npm install\n' +
  '\n' +
  '   > npm run dev\n' +
  '\n' +
  '3. 访问：[http://localhost:8080](http://localhost:8080/)\n' +
  '\n' +
  '4. 修改blog-app/src 下的文件进行开发\n' +
  '\n' +
  '5. npm run build 生成最终静态文件')

</script>

<template>
  <div>
    <vditor-preview v-model="markdown"/>
  </div>
</template>
