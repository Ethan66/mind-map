<!-- 子菜单 -->
<template>
  <el-sub-menu v-if="route.children?.length" :index="route.path" class="sub-menu">
    <template #title>
      <el-icon :size="15">
        <rz-svg-icon :icon-class="route.meta?.icon" />
      </el-icon>
      <span class="font-14 ml-6">{{ route.meta?.title }}</span>
    </template>
    <RzMenuItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
      :parent-path="route.path"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :route="route"
    :index="'/' + (parentPath || '') + '/' + route.path"
    class="menu-item"
  >
    <el-icon :size="15">
      <rz-svg-icon :icon-class="route.meta?.icon" />
    </el-icon>
    <template #title>
      <span class="font-14 ml-6">{{ route.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
defineProps<{
  route: RouteRecordRaw
  parentPath?: string
}>()
</script>
<style lang="less" scoped>
.sub-menu :v-deep .menu-item {
  background-color: #1f2d3d;
}

.menu-item:hover {
  background-color: #001528 !important;
}
</style>
