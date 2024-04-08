<!-- breadcrumb -->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in routeList" :key="item.path" :to="{ path: item.path }">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const routeList = ref<{ title: string; path: string }[]>([])
watchEffect(() => {
  routeList.value = route.matched
    .filter(it => it.meta.title)
    .map(it => ({
      title: `${it.meta.title}`,
      path: it.path
    }))
})
</script>
<style lang="less" scoped></style>
