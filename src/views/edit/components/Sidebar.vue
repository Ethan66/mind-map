<template>
  <div class="sidebarContainer" @click.stop :class="{ show: show }">
    <el-icon class="closeBtn" @click="$emit('update:show', false)">
      <Close />
    </el-icon>
    <div class="sidebarHeader" v-if="title">
      {{ title }}
    </div>
    <div class="sidebarContent" ref="sidebarContent">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
defineProps<{ title: string; show: boolean }>()
</script>

<style lang="less" scoped>
.sidebarContainer {
  position: fixed;
  right: -300px;
  top: 110px;
  bottom: 0;
  z-index: 100;
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;

  &.show {
    right: 0;
  }

  .sidebarHeader {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .sidebarContent {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .closeBtn {
    position: absolute;
    right: 20px;
    top: 12px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
