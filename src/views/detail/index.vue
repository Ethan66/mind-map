<template>
  <div class="detail-page">
    <div style="position: absolute; right: 10px">
      <el-button type="primary" :icon="Plus" v-if="isNewFile" @click="onGoEdit">新 增</el-button>
      <el-button type="primary" :icon="Edit" v-else @click="onGoEdit">编 辑</el-button>
    </div>
    <div id="mindMapContainer"></div>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit } from '@element-plus/icons-vue'
import { mindMap as m, createMindMap } from '@/utils/mind-map'

const route = useRoute()
const pageName = route.path.replace(/^\/(([a-zA-Z-]+?\/)+)([a-z-A-Z]+)$/g, '$3')

const isNewFile = ref(true)
onMounted(() => {
  const filePath = `../../mindData/${pageName}.json`
  import(filePath).then(res => {
    isNewFile.value = false
    createMindMap({
      el: document.querySelector('#mindMapContainer')
    })
    m.v.setFullData(res.default)
  })
})

const router = useRouter()
const onGoEdit = () => {
  localStorage.removeItem('mind-map-data')
  localStorage.removeItem('mind-map-editing')
  router.push({ name: 'edit', query: { pageName } })
}
</script>

<style>
.detail-page {
  position: relative;
  padding: 10px;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fafafa;
}

#mindMapContainer {
  width: 100%;
  height: 100%;
}
</style>
