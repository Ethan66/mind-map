<!-- tagViews -->
<template>
  <div class="tags-scroll">
    <el-tag
      v-for="(item, index) in cacheRouter"
      :key="item.fullPath"
      :effect="item.path === route.path ? 'dark' : 'light'"
      :closable="item.fullPath !== '/index'"
      class="tag"
      @click="$router.push(item.fullPath)"
      @close="handleClose(index)"
    >
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const cacheRouter = ref<{ path: string; title: string; fullPath: string }[]>([])
const route = useRoute()

watch(
  () => route,
  v => {
    !cacheRouter.value.some(res => res.path === route.path) &&
      cacheRouter.value.push({
        path: v.path,
        fullPath: v.fullPath,
        title: `${v.meta.title}`
      })
  },
  {
    immediate: true,
    deep: true
  }
)

watchEffect(() => {
  if (cacheRouter.value.length > 8) {
    cacheRouter.value.shift()
  }
})

const router = useRouter()
const handleClose = (index: number) => {
  cacheRouter.value.splice(index, 1)
  const len = cacheRouter.value.length
  router.replace(cacheRouter.value[len - 1]?.path || '/index')
}
</script>
<style lang="less" scoped>
.tags-scroll {
  padding: 5px 0 6px 15px;
  box-shadow: 0 4px 5px rgba(0, 21, 41, 0.08);
  z-index: 1;
  background-color: #fff;
}

.tag {
  cursor: pointer;
}

.tag + .tag {
  margin-left: 12px;
}
</style>
