<script setup lang="ts">
/* eslint-disable */

import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted, ref } from 'vue'

const markdown = ref("# 博客 #\n" +
  "\n" +
  "## 前端\n" +
  "\n" +
  "### Vue\n" +
  "\n" +
  "### Vue Router\n" +
  "\n" +
  "### Vuex\n" +
  "\n" +
  "### ElementUI\n" +
  "\n" +
  "### Axios\n" +
  "\n" +
  "### mavonEditor\n" +
  "\n" +
  "### Lodash\n" +
  "\n" +
  "### Webpack\n" +
  "\n" +
  "## 后端\n" +
  "\n" +
  "### Spring Boot\n" +
  "\n" +
  "### Spring Data Jpa\n" +
  "\n" +
  "### Spring Data Redis\n" +
  "\n" +
  "### Apache Log4j 2\n" +
  "\n" +
  "### Apache Shiro\n" +
  "\n" +
  "### Apache Commons\n" +
  "\n" +
  "### Fastjson\n" +
  "\n" +
  "### Druid\n" +
  "\n" +
  "### Maven\n" +
  "\n" +
  "## 数据库\n" +
  "\n" +
  "1. MySQL\n" +
  "2. Redis\n" +
  "\n" +
  "# 实现功能\n" +
  "\n" +
  "## 整体\n" +
  "\n" +
  "用户：登录 注册 退出\n" +
  "\n" +
  "首页：文章列表、最热标签、最新文章、最热文章\n" +
  "\n" +
  "文章分类-标签：列表、详情\n" +
  "\n" +
  "文章归档\n" +
  "\n" +
  "文章：写文章、文章详情\n" +
  "\n" +
  "评论：文章添加评论 对评论回复\n" +
  "\n" +
  "文章列表滑动分页\n" +
  "\n" +
  "## 后端\n" +
  "\n" +
  "- 用户、文章、文章分类、标签和评论 增删改查api接口\n" +
  "- 基于token权限控制\n" +
  "- Redis存储Session\n" +
  "- 全局异常处理\n" +
  "- 操作日志记录\n" +
  "\n" +
  "# 待实现功能\n" +
  "\n" +
  "- 评论的分页 点赞\n" +
  "- 留言板\n" +
  "- 第三方登录\n" +
  "- ......\n" +
  "\n" +
  "# 运行\n" +
  "\n" +
  "## 方式一 直接运行SpringBoot项目\n" +
  "\n" +
  "（已将打包的静态文件放到了 resources/static下）\n" +
  "\n" +
  "1. 将blog-api导入到IDE工具中\n" +
  "2. resources/sql/blog-schema.sql、blog-data.sql导入MySQL数据库\n" +
  "3. 打开Redis数据库\n" +
  "4. resources/application.yml 修改MySQL、Redis连接\n" +
  "5. Run as 运行,访问：[http://localhost:8888](http://localhost:8888/)\n" +
  "\n" +
  "## 方式二 前后分离（开发方式）\n" +
  "\n" +
  "1. 按方式一运行blog-api，提供api数据接口\n" +
  "\n" +
  "2. 打开命令行\n" +
  "\n" +
  "   > cd blog-app\n" +
  "\n" +
  "   > npm install\n" +
  "\n" +
  "   > npm run dev\n" +
  "\n" +
  "3. 访问：[http://localhost:8080](http://localhost:8080/)\n" +
  "\n" +
  "4. 修改blog-app/src 下的文件进行开发\n" +
  "\n" +
  "5. npm run build 生成最终静态文件")

onMounted(() => {
  preview()
})


function preview () {
    Vditor.preview(document.getElementById('preview') as HTMLDivElement, markdown.value, {
      mode: 'light',
      hljs: {
        lineNumber: true
      },
      after () {
        Vditor.outlineRender(
          document.getElementById('preview')!,
          document.getElementById('outline')!)
        const headingElements: { id: string; offsetTop: number; }[] = []
        Array.from(document.getElementById('preview')!.children).forEach((item:any) => {
          if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
            headingElements.push(item)
          }
        })
        let toc: { id: string; offsetTop: number; }[] = []
        addEventListener('scroll', () => {
          const scrollTop = window.scrollY
          toc = []
          headingElements.forEach((item) => {
            toc.push({
              id: item.id,
              offsetTop: item.offsetTop
            })
          })
          const currentElement = document.querySelector('.vditor-outline__item--current')
          for (let i = 0, iMax = toc.length; i < iMax; i++) {
            if (scrollTop < toc[i].offsetTop - 160) {
              if (currentElement) {
                currentElement.classList.remove('vditor-outline__item--current')
              }
              const index = i > 0 ? i - 1 : 0
              document.querySelector('span[data-target-id="' + toc[index].id + '"]')!
                .classList.add('vditor-outline__item--current')
              document.querySelector('.vditor-outline__item--current')!.scrollIntoView()
              break
            }
          }
        })
      }
    })
}
</script>

<template>
  <div class="table">
    <div id="preview"></div>
    <div id="outline"></div>
  </div>
</template>

<style>
#outline {
  width: 270px;
  max-height: calc(100% - 256px);
  /*max-height: 128px;*/
  display: block;
  position: fixed;
  top: 200px;
  right: 64px;
  overflow: auto;
  font-size: 14px;
  background-color: #fff;
  white-space: nowrap;
}
#outline ul {
  margin-left: 16px;
  list-style: none;
}
#outline > ul {
  padding-left: 0;
  margin-left: 0;
}
#outline li > span {
  cursor: pointer;
  border-left: 1px solid transparent;
  display: block;
  padding-left: 8px;
}
#outline li > span.vditor-outline__item--current {
  border-left: 1px solid #1976d2;
  color: #1976d2;
  background-color: #f6f8fa;
}
#outline li > span:hover {
  color: #1976d2;
  background-color: #f6f8fa;
}
</style>
