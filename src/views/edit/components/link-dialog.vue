<template>
  <el-dialog custom-class="nodeHyperlinkDialog" v-model="showDialog" title="超链接">
    <div class="item">
      <span class="name">链接</span>
      <el-input v-model="link" placeholder="xxxx.com">
        <template #prepend>https://</template>
      </el-input>
    </div>
    <div class="item">
      <span class="name">名称</span>
      <el-input v-model="linkTitle"></el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { mindMap as m } from '@/utils/mind-map'

const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits(['update:show'])

const showDialog = ref(false)
const link = ref('')
const linkTitle = ref('')

watch(
  () => props.show,
  val => {
    if (val) {
      showDialog.value = true
      link.value = (m.curNode.getData('hyperlink') || '').replace(/^https?:\/\//, '')
      linkTitle.value = m.curNode.getData('hyperlinkTitle') || ''
    }
  }
)

watch(showDialog, val => {
  if (!val) {
    emits('update:show', false)
  }
})

const confirm = () => {
  m.activeNodes.forEach(node => {
    node.setHyperlink('https://' + link.value, linkTitle.value)
  })
  showDialog.value = false
}
</script>

<style lang="less" scoped>
.nodeHyperlinkDialog {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .name {
      display: block;
      width: 50px;
    }
  }
}
</style>
