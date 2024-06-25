<template>
  <el-dialog v-model="showDialog" title="备注" width="800">
    <el-input v-model="note" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { mindMap as m } from '@/utils/mind-map'

const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits(['update:show', 'updateTags'])
const showDialog = ref(false)
const note = ref('')
watch(
  () => props.show,
  val => {
    if (val) {
      showDialog.value = true
      note.value = m.curNode.getData('note') || []
    }
  }
)

watch(showDialog, val => {
  if (!val) {
    emits('update:show', false)
  }
})

const onConfirm = () => {
  m.activeNodes.forEach(node => {
    node.setNote(note.value)
  })
  showDialog.value = false
}
</script>

<style scoped lang="less"></style>
