<template>
  <el-form inline :model="params" ref="form" label-width="72px" class="search-page">
    <el-form-item
      v-for="(it, index) in items"
      :key="index"
      :label="it.label"
      :prop="it.prop"
      :label-width="it.labelWidth"
    >
      <el-input
        v-if="it.type === 'el-input'"
        v-bind="it.attrs"
        v-on="it.on || {}"
        v-model="params[it.prop]"
      />

      <el-select
        v-if="it.type === 'el-select'"
        v-bind="it.attrs"
        v-on="it.on || {}"
        v-model="params[it.prop]"
      >
        <el-option
          v-for="item in it.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-date-picker
        v-if="it.type === 'el-date-picker'"
        v-bind="it.attrs"
        v-on="it.on || {}"
        v-model="params[it.prop]"
        @change="timeSelect($event, it)"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit" :icon="Search">查询</el-button>
      <el-button type="danger" @click="onReset" :icon="Delete">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { Delete, Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { formDataType } from './type'
import { formatTime } from '@/utils/common'

const props = defineProps({
  items: {
    type: Object as () => formDataType,
    require: true,
    default: () => ({})
  },
  defaultData: {
    type: Object,
    require: false
  }
})

const params = reactive<Record<string, any>>({})
const init = () => {
  const data = props.defaultData
  props.items.forEach(it => {
    params[it.prop] = data ? data[it.prop] || null : null
  })
}
init()

const timeSelect = (e: any, item: any) => {
  const [key1, key2] = item.propAlias
  const times = e.map((it: Date) => formatTime(it))
  ;[params[key1], params[key2]] = times || [null, null]
}

// 表单提交
const emit = defineEmits(['confirm'])
const onSubmit = () => {
  const obj = JSON.parse(JSON.stringify(params))
  props.items.forEach(item => {
    if (item?.propAlias) {
      delete obj[item.prop]
    }
  })
  emit('confirm', obj)
}

const onReset = () => {
  Object.keys(params).forEach(key => {
    params[key] = null
  })
  onSubmit()
}
</script>

<style lang="less" scoped>
.search-page :deep(.el-input--default) {
  width: 198px;
}

.search-page {
  background-color: #fff;
  border-radius: 6px;
  padding: 18px 16px 0;
}
</style>
