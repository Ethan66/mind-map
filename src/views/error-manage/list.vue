<!-- 错误列表管理页面 -->
<template>
  <rz-search-table
    ref="freezeUsersTable"
    :api="getErrorList"
    :searchItems="searchItems"
    :tableItems="tableItems"
    :list-field="['list']"
    :total-field="['total']"
    isGrid
  >
    <template #btn="{ scope }">
      <el-link class="active" @click="handlerDetail(scope.row)">查看</el-link>
    </template>
  </rz-search-table>
</template>

<script lang="ts" setup>
import { getErrorList } from '@/api'
import useDialog from '@/utils/use-dialog'

import { reactive } from 'vue'
import { searchData, tableData } from './options'
const searchItems = reactive(searchData)
const tableItems = reactive(tableData)
const handlerDetail = (row: any) => {
  useDialog('rz-dialog-json', {
    title: '详情',
    content: row,
    isNeedEncrypt: false
  })
}
</script>
<style lang="less" scoped>
.active {
  color: #1890ff;
  cursor: pointer;
}
</style>
