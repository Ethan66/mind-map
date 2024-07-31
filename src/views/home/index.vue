<template>
  <div class="home-wrap">
    <div id="mindMapContainer"></div>
  </div>
</template>
<script setup lang="ts">
import { mindMap as m, createMindMap } from '@/utils/mind-map'

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
