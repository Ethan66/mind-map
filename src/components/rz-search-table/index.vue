<template>
  <div :class="{ 'content-page': isGrid }">
    <rz-search
      :items="props.searchItems"
      @confirm="searchResult"
      :defaultData="props.defaultData"
    />
    <rz-table
      v-model:pageInfo="pageInfo"
      :data="info.list"
      :items="props.tableItems"
      :total="info.total"
      size="small"
      v-bind="$attrs"
      v-loading="loading"
      :class="{ 'mt-12': true, ' content-page__table': isGrid }"
      border
    >
      <template #header>
        <slot name="header" />
      </template>
      <template v-for="it in slots" v-slot:[it.vSlot]="{ scope }">
        <slot :name="it.vSlot" :scope="scope" />
      </template>
    </rz-table>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { watchEffect, reactive, ref, computed } from 'vue'
type sortProps = {
  // 排序字段
  prop: string

  // 排序字段对应的后端字段-需要排序的字段
  field: string

  // 排序字段对应的后端字段-返回的字段
  fieldResult: string

  // 排序字段对应的后端字段-升序或者降序
  type: string

  // 升序对应后端字段
  ascending: string
  // 降序对应后端字段
  descending: string
}
// { prop: '', field: 'orderField', type: 'orderType', ascending: 'asc', descending: 'desc' }
const props = defineProps<{
  api: (params: any) => Promise<any>
  searchItems: any[]
  tableItems: any[]
  defaultData?: any
  isGrid?: boolean
  listField?: string[]
  totalField?: string[]
  sortField?: sortProps[]
  funcParams?: any
}>()

const slots = computed(() => (props.tableItems || []).filter((it: any) => it.vSlot))

const info = reactive<{
  list: any[]
  total: number
}>({
  list: [], // 搜索结果
  total: 0
})

let pageInfo = ref({
    page_number: 1,
    page_size: 10
  }),
  searchFilter = {}
const loading = ref(false)

let resultData: any
const getList = async () => {
  loading.value = true
  const res = await props.api({ ...pageInfo.value, ...searchFilter, ...props.funcParams })
  const listData: any = props.listField?.reduce((result: any, ele: string) => {
    result = result[ele]
    return result
  }, res)

  loading.value = false
  info.list = listData
  const totalData: any = props.totalField?.reduce((result: any, ele: string) => {
    result = result[ele]
    return result
  }, res)

  info.total = totalData
  resultData = res.data
}

// 将方法、变量暴露给父组件使用，父组件可通过ref API拿到子组件暴露的数据
defineExpose({
  // 声明方法
  update() {
    getList()
  },
  getData() {
    return resultData
  }
})

watchEffect(() => {
  pageInfo.value && getList()
})

const searchResult = (e: any) => {
  searchFilter = { ...e }
  pageInfo.value = { page_number: 1, page_size: 10 }
}
</script>

<style lang="less" scoped>
.content-page {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
}

.content-page__table {
  overflow: hidden;
}
</style>
