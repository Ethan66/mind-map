<template>
  <div class="home-wrap">
    <div style="position: absolute; top: 10px; right: 10px; display: flex; z-index: 100">
      <el-button type="warning" :icon="Edit" @click="onGoEdit('edit')">编 辑</el-button>
    </div>
    <div id="mindMapContainer"></div>
  </div>
</template>
<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'

import { mindMap as m, createMindMap } from '@/utils/mind-map'
import { localStore } from '@/utils/storage'

// 渲染思维导图
const handleRenderMindMap = () => {
  const modules = import.meta.glob('../../mindData/**/*.json')
  const filePath = `../../mindData/home.json`
  modules[filePath]().then((res: { default: any }) => {
    createMindMap({
      el: document.querySelector('#mindMapContainer')
    })
    m.v.setFullData(res.default)
  })
}

const router = useRouter()
const onGoEdit = (operateType: 'add' | 'edit') => {
  localStore.remove('data')
  localStore.remove('editing')
  router.push({ name: 'edit', query: { operateType, pageName: 'home' } })
}

onMounted(() => {
  handleRenderMindMap()
})
</script>

<style>
.home-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

#mindMapContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

#mindMapContainer * {
  margin: 0;
  padding: 0;
}
</style>
