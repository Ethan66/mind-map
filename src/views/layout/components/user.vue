<!-- user -->
<template>
  <el-dropdown>
    <div class="flex-row ag-cen btn">
      <span class="font-14 mr-7">admin</span>
      <el-icon><CaretBottom /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="$router.replace('/login')">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { CaretBottom } from '@element-plus/icons-vue'
</script>
<style lang="less" scoped>
.btn {
  outline-color: transparent;
  cursor: pointer;
}
</style>
