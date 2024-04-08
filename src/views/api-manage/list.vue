<!-- 接口数据管理页面 -->
<template>
  <rz-search-table
    ref="freezeUsersTable"
    :api="getApiDataList"
    :searchItems="searchItems"
    :tableItems="tableItems"
    :list-field="['list']"
    :total-field="['total']"
    isGrid
  >
    <template #btn="{ scope }">
      <el-link class="ells" @click="handlerDetail(scope.row)">查看</el-link>
    </template>
    <template #token="{ scope }">
      <div class="ells" @click="copyText(scope.row.user_token)">{{ scope.row.user_token }}</div>
    </template>
    <template #reponse="{ scope }">
      <div class="ells" @click="handlerShow(scope.row, 'http_response')">
        {{ scope.row.http_response }}
      </div>
    </template>
    <template #request="{ scope }">
      <div class="ells" @click="handlerShow(scope.row, 'request_body')">
        {{ scope.row.request_body }}
      </div>
    </template>
  </rz-search-table>
</template>

<script lang="ts" setup>
import { getApiDataList } from '@/api'

import { reactive } from 'vue'
import { searchData, tableData } from './options'
const searchItems = reactive(searchData)
const tableItems = reactive(tableData)
const handlerDetail = (row: any) => {
  console.log(row)
  useDialog('rz-dialog-json', {
    title: '详情',
    content: row,
    isNeedEncrypt: false
  })
}

import { copyText } from '@/utils/common'
import useDialog from '@/utils/use-dialog'

const handlerShow = (row: any, key: string) => {
  useDialog('rz-dialog-json', {
    title: '详情',
    content: JSON.parse(row[key]),
    token: getToken(row)
  })
}

const getToken = (row: any) => {
  const requestHeader = row.request_headers ? JSON.parse(row.request_headers) : {}
  return row.user_token || requestHeader.token
}
</script>
<style lang="less" scoped>
.ells {
  color: #1890ff;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
