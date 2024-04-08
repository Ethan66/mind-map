<!--  -->
<template>
  <el-dialog v-model="visible" :title="title">
    <jsonEditor :content="content" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect, nextTick, computed } from 'vue'
const props = withDefaults(
  defineProps<{
    unmount: () => void
    content: Record<string, any>
    title?: string
    token?: string
    isNeedEncrypt?: boolean
  }>(),
  {
    isNeedEncrypt: true
  }
)

const visible = ref(true)
watchEffect(() => {
  if (!visible.value) nextTick(props.unmount)
})

import AES from '@/utils/encryp'
const content = computed(() => {
  try {
    return props.isNeedEncrypt
      ? AES.decrypt(props.token, props.content.data)
      : JSON.stringify(props.content, null, 2)
  } catch (e) {
    return '解密失败，请检查token是否正确'
  }
})

import jsonEditor from '@/bussiness/json-editor/index.vue'
</script>
<style lang="less" scoped></style>
