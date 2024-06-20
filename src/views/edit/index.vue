<template>
  <div class="mind-map-edit">
    <btn-list v-model:showExport="showExport"></btn-list>
    <context-menu></context-menu>
    <div id="mindMapContainer"></div>
    <export-dialog v-model="showExport" :isNewFile="isNewFile" />
  </div>
</template>
<script setup>
import btnList from './components/btn-list.vue'
import contextMenu from './components/context-menu.vue'
import exportDialog from './components/export-dialog.vue'
import { mindMap as m, createMindMap } from '@/utils/mind-map'
import { localStore } from '@/utils/storage'

const showExport = ref(false)
const isNewFile = ref(true)

const route = useRoute()
onMounted(() => {
  createMindMap(
    {
      el: document.getElementById('mindMapContainer'),
      data: {
        data: {
          text: '根节点'
        },
        children: []
      }
    },
    true
  )
  localStore.get('editing').then(({ v }) => {
    if (!v && route.query.pageName) {
      const filePath = `../../mindData/${route.query.pageName}.json`
      import(filePath).then(res => {
        isNewFile.value = false
        m.v.setFullData(res.default)
      })
    }
  })
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
