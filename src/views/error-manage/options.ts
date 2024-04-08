import { formatDefaultTime, formatTime } from '@/utils/common'

export const searchData = [
  {
    type: 'el-input',
    label: '项目名称',
    labelWidth: '70',
    attrs: {
      placeholder: '请输入项目名称',
      clearable: true,
      style: 'width: 240px'
    },
    prop: 'app_name'
  },
  {
    type: 'el-select',
    label: '错误类型',
    labelWidth: '70',
    attrs: {
      placeholder: '请选择错误类型',
      clearable: true,
      style: 'width: 240px'
    },
    options: [
      {
        label: 'jsError',
        value: 'jsError'
      },
      {
        label: 'promiseError',
        value: 'promiseError'
      },
      {
        label: 'resourceError',
        value: 'resourceError'
      }
    ],
    prop: 'error_type'
  },
  {
    type: 'el-input',
    label: '账号信息',
    labelWidth: '70',
    attrs: {
      placeholder: '请输入账号信息',
      clearable: true,
      style: 'width: 240px'
    },
    prop: 'account'
  },
  {
    type: 'el-date-picker',
    label: '时间范围',
    prop: 'createTime',
    labelWidth: '70',
    attrs: {
      clearable: true,
      type: 'datetimerange',
      'start-placeholder': '开始日期',
      'range-separator': '至',
      'end-placeholder': '结束日期',
      'value-format': 'x',
      'default-time': formatDefaultTime(['00:00:00', '23:59:59'])
    },
    propAlias: ['createStartTime', 'createEndTime']
  }
]

export const tableData = [
  { prop: 'id', label: 'ID', width: 60, align: 'center' },
  { prop: 'app_name', label: '项目名称', align: 'center' },
  { prop: 'error_type', label: '错误类型', align: 'center' },
  { prop: 'message', minWidth: '200px', label: '错误信息', align: 'center' },
  { prop: 'account', label: '账号信息', align: 'center' },
  {
    prop: 'create_time',
    label: '创建时间',
    formatter: (_row: any, _col: any, val: any) => {
      return val ? formatTime(val) : '-'
    },
    align: 'center'
  },
  { prop: 'btn', label: '操作', vSlot: 'btn', width: 60, align: 'center', fixed: 'right' }
]
