<template>
  <json-editor-vue
    class="editor"
    v-model="jsonobj"
    @blur="remarkValidate"
    currentMode="code"
    :modeList="modeList"
    :options="options"
  />
</template>

<script lang="ts" setup>
import JsonEditorVue from 'json-editor-vue3'
import { ref, watchEffect } from 'vue'

const jsonstr = ref<string>('{}')
const jsonobj = ref(JSON.parse(jsonstr.value))

const options = ref({
  search: false,
  history: false
})
const modeList = ref(['text', 'view', 'tree', 'code', 'form']) // 可选模式

const remarkValidate = () => {
  let newjsonstr = JSON.stringify(jsonobj.value)
  console.log('remarkValidate', jsonobj.value, newjsonstr, jsonstr.value)
  if (jsonstr.value === newjsonstr) {
    console.log('no change')
  } else {
    jsonstr.value = newjsonstr
  }
}

const props = defineProps<{
  content: string
}>()

watchEffect(() => {
  jsonstr.value = props.content
  jsonobj.value = JSON.parse(jsonstr.value)
})
</script>

<style lang="less" scoped>
.editor {
  height: 400px;
}
</style>
