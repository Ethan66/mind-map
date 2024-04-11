<template>
  <div class="detail-page">
    <div style="position: absolute; right: 10px">
      <el-button type="primary" :icon="Plus" v-if="isNewFile" @click="router.push({ name: 'edit' })"
        >新 增</el-button
      >
      <el-button
        type="primary"
        :icon="Edit"
        v-else
        @click="router.push({ name: 'edit', query: { commitId: route.params.commitId } })"
        >编 辑</el-button
      >
    </div>
    <div id="mindMapContainer"></div>
  </div>
</template>
<script setup>
import { Plus, Edit } from '@element-plus/icons-vue'
import { mindMap as m, createMindMap } from '@/utils/mind-map'

const route = useRoute()
const router = useRouter()

const isNewFile = ref(true)
onMounted(() => {
  const filePath = `../../mindData/${route.params.commitId}.json`
  import(filePath).then(res => {
    isNewFile.value = false
    createMindMap({
      el: document.querySelector('#mindMapContainer')
    })
    m.v.setFullData(res.default)
  })
})
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
