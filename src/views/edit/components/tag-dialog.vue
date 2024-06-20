<template>
  <el-dialog v-model="showDialog" title="标签" width="800">
    <el-select
      v-model="tags"
      multiple
      filterable
      allow-create
      default-first-option
      :reserve-keyword="false"
      style="width: 600px"
    >
      <el-option v-for="str in options" :key="str" :label="str" :value="str" />
    </el-select>
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
import { localStore } from '@/utils/storage'

const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits(['update:show', 'updateTags'])
const showDialog = ref(false)
const tags = ref<string[]>([])
const options = ref<string[]>([])
watch(
  () => props.show,
  val => {
    if (val) {
      showDialog.value = true
      const initVal = m.curNode.getData('tag') || []
      tags.value = [...initVal]
      localStore.get('tag-options').then(({ v }) => {
        options.value = [...new Set([...initVal, ...(v || [])]).values()]
      })
    }
  }
)

watch(showDialog, val => {
  if (!val) {
    emits('update:show', false)
  }
})

const onConfirm = () => {
  showDialog.value = false
  m.activeNodes.forEach(node => node.setTag(tags.value))
  localStore.set('tag-options', [...new Set([...options.value, ...tags.value]).values()])
}
</script>

<style scoped lang="less"></style>
