<script setup>

import IconTooling from "./icons/IconTooling.vue";
import {useRouter} from "vue-router";
import TreeMenu from "@/components/menu/TreeMenu.vue";
import {onMounted} from "vue";
import Marked from "@/components/markdown/Marked.vue";

const router = useRouter()
onMounted(() => {
  console.log(router.options.routes, 'routes')
})
</script>

<template>
  <div class="common-layout fixed-layout">
    <el-container>
      <el-header>
        <div class="header-container">
          <router-link to="/">
            <img src="https://gw.alipayobjects.com/zos/bmw-prod/bd2a8444-b177-49d5-b510-68ea104cc626.svg"
                 class="index_logoImgLight__5NKEJ" alt="Alipay, China's leading third-party online payment solution"
                 style="width: auto; height: 26px;">
          </router-link>
        </div>
      </el-header>
      <el-container>
        <el-aside class="el-aside-left" width="255px">
          <tree-menu :menu-items="router.options.routes" :depth="0"></tree-menu>
        </el-aside>
        <el-container>
          <el-main class="index-main">
            <article class="index-content">
              <h3>Documentation</h3>
              <p class="mt-4">Before you start developing Alipay products and solutions, familiarize yourself with our
                latest documentation <br>including developer guides, API reference, code samples, and more.</p>
              <div class="notice d-flex bg-primary-subtle px-4 py-2">
                <icon-tooling/>
                <div class="notice-content ms-2">
                  <p>
                    See
                    <a href="https://global.alipay.com/docs/ac/legacy/legacydoc">Legacy documentation</a>
                    for previous versions of Alipay documentation, including product docs, APIs, and release notes on
                    Cross-border Payment Services, Face-to-face Payment Services, and others.
                  </p>
                </div>
              </div>
            </article>
            <Marked></Marked>
          </el-main>

          <el-footer>Footer</el-footer>
        </el-container>
        <el-aside class="el-aside-right" width="255px">
          <ul>
            <li>
              <router-link to="/">主页</router-link>
            </li>
            <li>
              <router-link to="pacypay">收银台支付</router-link>
            </li>
            <li>
              <router-link to="sdk">JS-SDK收银台</router-link>
            </li>
            <li>
              <router-link to="extended">两方接口支付</router-link>
            </li>
          </ul>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-aside-left {
  border-right: 2px solid #eee;
}

.el-aside-right {
  border-left: 2px solid #eee;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
}

.fixed-layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.index-main {
  padding: 0 200px;
}
</style>
