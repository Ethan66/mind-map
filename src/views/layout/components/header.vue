<!-- 顶部导航栏 -->
<template>
  <div class="nav">
    <rz-svg-icon
      icon-class="collapse"
      :class="{ 'is-active': isCollapse, icon: true }"
      @click="emit('update:isCollapse', !isCollapse)"
    />
    <BreadCrumb class="ml-16" style="line-height: 21px" />
    <User />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ isCollapse: boolean }>(), {
  isCollapse: false
})

const emit = defineEmits(['update:isCollapse'])

import BreadCrumb from './bread-crumb.vue'
import User from './user.vue'
</script>
<style lang="less" scoped>
.nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-content: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.is-active {
  transform: rotate(0deg) !important;
}

.icon {
  cursor: pointer;
  width: 22px;
  height: 22px;
  font-size: 22px;
  display: inline-flex;
  transform: rotate(180deg);
}
</style>
