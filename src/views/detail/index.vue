<template>
  <div class="detail-page">
    <div style="position: absolute; right: 10px; display: flex">
      <el-select
        v-model="commitId.current"
        style="margin-right: 10px; width: 150px"
        placeholder="commitId"
        @change="$router.push({ path: $route.path, query: { commitId: commitId.current } })"
      >
        <el-option v-for="id in commitId.options" :key="id" :label="id" :value="id"> </el-option>
      </el-select>
      <el-button type="primary" :icon="Plus" v-if="isNewFile" @click="onGoEdit">新 增</el-button>
      <el-button type="primary" :icon="Edit" v-else @click="onGoEdit">编 辑</el-button>
    </div>
    <div id="mindMapContainer" :key="commitId.current"></div>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit } from '@element-plus/icons-vue'
import { mindMap as m, createMindMap } from '@/utils/mind-map'
import { localStore } from '@/utils/storage'

const route = useRoute()
const pageName = route.path.replace(/^\/(([a-zA-Z-]+?\/)+)([a-z-A-Z]+)$/g, '$3')
const commitId = reactive({ current: (route.query.commitId || '') as string, options: [] })

;(() => {
  const json = import.meta.glob(`@/mindData/**.json`)
  commitId.options = Object.keys(json)
    .filter(pathname => pathname.includes(`/${pageName}_`))
    .map(pathname => pathname.replace(new RegExp(`.+${pageName}_(\\w+)\\.json`), '$1'))
})()

watch(
  () => commitId.current,
  () => {
    handleRenderMindMap()
  }
)

const isNewFile = ref(true)
onMounted(() => {
  handleRenderMindMap()
})

// 渲染思维导图
const handleRenderMindMap = () => {
  const filePath = `../../mindData/${pageName + (commitId.current ? '_' + commitId.current : '')}.json`
  import(filePath).then(res => {
    isNewFile.value = false
    createMindMap({
      el: document.querySelector('#mindMapContainer')
    })
    m.v.setFullData(res.default)
  })
}

const router = useRouter()
const onGoEdit = () => {
  localStore.remove('data')
  localStore.remove('editing')
  router.push({ name: 'edit', query: { pageName, commitId: commitId.current } })
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
