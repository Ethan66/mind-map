<template>
  <div class="detail-page">
    <div style="position: absolute; right: 10px; display: flex; z-index: 100">
      <el-select
        v-model="commitId.current"
        style="margin-right: 10px; width: 150px"
        placeholder="commitId"
        @change="
          () => {
            isFinishRender = false
            $router.push({ path: $route.path, query: { commitId: commitId.current } })
          }
        "
      >
        <el-option v-for="id in commitId.options" :key="id" :label="id" :value="id"> </el-option>
      </el-select>
      <el-button type="primary" :icon="Plus" @click="onGoEdit('add')">新 增</el-button>
      <el-button type="warning" :icon="Edit" @click="onGoEdit('edit')">编 辑</el-button>
    </div>
    <context-menu></context-menu>
    <div v-if="isFinishRender" id="mindMapContainer" :key="commitId.current"></div>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit } from '@element-plus/icons-vue'
import { mindMap as m, createMindMap, bus } from '@/utils/mind-map'
import contextMenu from './detail-context-menu.vue'
import { localStore } from '@/utils/storage'

const route = useRoute()
const router = useRouter()
let pageName = route.path.replace(/^\/(([a-zA-Z-]+?\/)+)([a-z-A-Z]+)$/g, '$3')
pageName = pageName.replace('/', '')
const commitId = reactive({ current: (route.query.commitId || '') as string, options: [] })

;(() => {
  const json = import.meta.glob(`@/mindData/**.json`)
  commitId.options = Object.keys(json)
    .filter(pathname => pathname.includes(`/${pageName}_`))
    .map(pathname => pathname.replace(new RegExp(`.+${pageName}_(\\w+)\\.json`), '$1'))
  if (!route.query.commitId) {
    commitId.options.length && (commitId.current = commitId.options[0])
    router.push({ path: route.path, query: { commitId: commitId.current } })
  }
})()

watch(
  () => commitId.current,
  () => {
    handleRenderMindMap()
  }
)

onMounted(() => {
  handleRenderMindMap()
})

const isFinishRender = ref(false)
let mindMapData = { json: null }
// 渲染思维导图
const handleRenderMindMap = () => {
  clearTimeout(timer)
  const modules = import.meta.glob('../../mindData/**/*.json')
  const filePath = `../../mindData/${pageName + (commitId.current ? '_' + commitId.current : '')}.json`
  modules[filePath]().then((res: { default: any }) => {
    isFinishRender.value = true
    mindMapData.json = res.default
  })
}

onUpdated(() => {
  if (!isFinishRender.value) return
  createMindMap({
    el: document.querySelector('#mindMapContainer')
  })
  m.v.setFullData(mindMapData.json)
})

let timer = null
const handleListenREsize = () => {
  if (!isFinishRender.value) return
  isFinishRender.value = false
  timer = setTimeout(handleRenderMindMap, 300)
}
bus.on('renderMindMap', handleListenREsize)
window.addEventListener('resize', handleListenREsize)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleListenREsize)
})

const onGoEdit = (operateType: 'add' | 'edit') => {
  localStore.remove('data')
  localStore.remove('editing')
  router.push({ name: 'edit', query: { operateType, pageName, commitId: commitId.current } })
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
