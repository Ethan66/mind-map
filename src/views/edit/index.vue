<template>
  <div class="mind-map-edit">
    <btn-list></btn-list>
    <context-menu></context-menu>
    <div id="mindMapContainer"></div>
  </div>
</template>
<script setup>
import btnList from './components/btn-list.vue'
import contextMenu from './components/context-menu.vue'
import { mindMap as m, createMindMap } from '@/utils/mind-map'

const route = useRoute()

onMounted(() => {
  createMindMap(
    {
      el: document.getElementById('mindMapContainer')
    },
    true
  )
  if (route.query.commitId) {
    const filePath = `../../mindData/${route.query.commitId}.json`
    import(filePath).then(res => {
      m.v.setFullData(res.default)
    })
  }
})
</script>

<style lang="less" scoped>
.mind-map-edit {
  width: 100%;
  height: 100%;
  position: relative;
  #mindMapContainer {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 10px;
    width: 100%;
    height: 100%;
    background-color: rgb(241, 241, 241) !important;
  }
}
</style>
