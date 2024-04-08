<!-- 首页 -->
<template>
  <h3>前端监控日志系统</h3>
  <h3 class="link" @click="$router.push('/error-manage')">错误监控</h3>
  <h3 class="link" @click="$router.push('/api-manage')">接口数据监控</h3>
  <h3 class="link" @click="$router.push('/performation-manage')">性能监控</h3>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
.link {
  font-weight: normal;
  font-size: 15px;
  cursor: pointer;
}

.link:hover {
  color: @themeColor;
  text-decoration: underline;
}
</style>
