<template>
  <div class="flex-col table-page">
    <slot name="header" />
    <el-table class="table" v-bind="$attrs">
      <template v-for="it in items" :key="it.prop">
        <template v-if="it.toolTip">
          <el-table-column v-bind="it">
            <template #default="scope">
              <el-tooltip effect="dark" :content="scope.row[it.prop] || '-'">
                <div class="tooltip">{{ scope.row[it.prop] || '-' }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column v-if="it.vSlot" v-bind="it">
            <template #default="scope">
              <slot :scope="scope" :name="it.vSlot" />
            </template>
          </el-table-column>
          <el-table-column v-else v-bind="it" />
        </template>
      </template>
    </el-table>
    <el-pagination
      v-if="isShowPaginate"
      class="pageinate"
      background
      layout="total, sizes, jumper, prev, pager, next"
      :total="total"
      :current-page="pageInfo.page_number"
      :page-size="pageInfo.page_size"
      @current-change="onChange($event, 'page_number')"
      @size-change="onChange($event, 'page_size')"
    />
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    items: any[]
    total?: number
    pageInfo?: {
      page_number: number
      page_size: number
    }
    isShowPaginate?: boolean
  }>(),
  {
    items: () => [],
    total: 0,
    pageInfo: () => ({
      page_number: 1,
      page_size: 10
    }),
    isShowPaginate: true
  }
)
const emit = defineEmits(['update:pageInfo'])

const onChange = (e: number, params: string) => {
  emit('update:pageInfo', Object.assign(props.pageInfo, { [params]: e }))
}
</script>

<style lang="less" scoped>
.table {
  margin: 0 0 16px;
}

.table :deep(.el-table__cell) {
  padding: 8px 0 !important;
}

.table-page {
  background-color: #fff;
  border-radius: 6px;
  padding: 16px;
}

.pageinate {
  align-self: flex-end;
  padding-right: 0 !important;
  margin-right: -5px;
}
</style>
