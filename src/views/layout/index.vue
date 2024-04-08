<!-- 页面布局 -->
<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <SideBar class="side" :isCollapse="isCollapse" />

    <!-- 头部导航栏 -->
    <LayoutHeader class="head" v-model:isCollapse="isCollapse" />

    <!-- 标签页 -->
    <TagsView />

    <!-- 主体内容 -->
    <div class="main">
      <rz-router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideBar from './components/sidebar.vue'
import LayoutHeader from './components/header.vue'
import TagsView from './components/tags-view.vue'

import { ref } from 'vue'
const isCollapse = ref(false)
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr; /* 两列 */
  grid-template-rows: auto auto 1fr; /* 三行 */
  background-color: #f0f2f5;
}

.layout .side {
  grid-row: 1 / span 3; /* 从第一行开始，占三行 */
}

.layout .head {
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}

.layout .main {
  padding: 10px;
  border-radius: 6px;
  background-color: #f0f2f5;
  overflow-y: scroll;
}
</style>
