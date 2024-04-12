<template>
  <el-dialog v-model="visible" title="导出" class="export-dialog">
    <div style="display: flex; align-items: center">
      <span>导出文件名称</span>
      <el-input v-model="data.name" disabled style="width: 200px; margin: 0 10px" />
      <el-checkbox v-model="data.hasTheme" disabled>是否包含主题、结构等配置数据</el-checkbox>
    </div>
    <div class="export-dialog__json-btn">
      <img src="@/assets/svg/JSON.svg" alt="" />
      <div>
        <p>JSON</p>
        <p>流行的数据交换格式，可用于导入</p>
      </div>
    </div>
    <p style="margin-top: 15px; font-size: 13px; color: #f56c6c">
      tips： 因浏览器指定了下载路径，无法修改，请手动将导出的文件剪切到 'src/mindData' 文件夹
    </p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm"> 确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { mindMap as m } from '@/utils/mind-map'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  val => {
    val && (visible.value = true)
  }
)

const visible = ref(false)
watch(visible, val => {
  !val && emit('update:modelValue', false)
})

const route = useRoute()
const data = reactive({ name: route.query.pageName, fileType: 'json', hasTheme: true })

!data.name && ElMessage.error('路由缺少commitId，请退出')
const onConfirm = () => {
  if (!data.name) return ElMessage.error('路由缺少commitId，请退出')
  m.export(...[data.fileType, true, data.name, data.hasTheme])
  visible.value = false
}
</script>

<style lang="less">
.export-dialog {
  padding: 10px 0;
  .el-dialog__body {
    padding: 20px;
    background: #f2f4f7;
  }
  .el-dialog__header {
    padding-left: 10px;
  }
  .export-dialog__json-btn {
    margin-top: 10px;
    width: 200px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 6px;
    border: 2px solid #409eff;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    p:last-child {
      margin-top: 5px;
      font-size: 12px;
    }
    p {
      width: 110px;
    }
  }
  .el-dialog__footer {
    padding-right: 10px;
  }
}
</style>
