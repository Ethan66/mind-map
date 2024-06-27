<!-- sidebar -->
<template>
  <el-menu
    :collapse="isCollapse"
    active-text-color="#409eff"
    background-color="#304156"
    text-color="#ced2d5"
    unique-opened
    router
    class="side-bar"
    :default-active="currentPath"
  >
    <el-menu-item class="logo-wapper" index="/index">
      <el-icon><img src="/vite.svg" class="logo" /></el-icon>
      <span class="ml-6 font-15" style="color: #fff">unicom 思维导图</span>
    </el-menu-item>

    <RzMenuItem v-for="item in routesList" :key="item.path" :route="item" />
  </el-menu>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ isCollapse: boolean }>(), {
  isCollapse: false
})

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentPath = computed(() => route.path)

watch(
  () => currentPath.value,
  () => {
    console.log(currentPath.value)
  }
)
import { routes } from '@/router'
// 只获取layout下的页面路由
const routesList = computed(() => {
  const layoutRoute = routes.find(route => route.path === '/')
  const children = layoutRoute?.children || []
  return filterRoutes(children)
})

/** 处理 不需要显示在菜单栏上路由 */
const filterRoutes = (routes: any[]) => {
  return routes.filter(route => {
    if (route.meta?.isHidden) return false
    if (route.children) route.children = filterRoutes(route.children)
    return true
  })
}
import RzMenuItem from './rz-menu-item.vue'
</script>
<style lang="less" scoped>
.side-bar {
  height: 100%;
  min-height: 100%;
  overflow-y: scroll;
}

.side-bar::-webkit-scrollbar {
  display: none;
}

.logo-wapper {
  position: sticky;
  top: 0;
  height: 60px;
  background-color: #2b2f3a;
  cursor: pointer;
  z-index: 1;
}

.logo {
  width: 26px;
  border-radius: 4px;
}
</style>
