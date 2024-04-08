import { formatDefaultTime, formatTime } from '@/utils/common'

export const searchData = [
  {
    type: 'el-input',
    label: '项目名称：',
    labelWidth: '80',
    attrs: {
      placeholder: '请输入项目名称',
      clearable: true,
      style: 'width: 240px'
    },
    prop: 'app_name'
  },
  {
    type: 'el-input',
    label: '接口地址：',
    labelWidth: '80',
    attrs: {
      placeholder: '请输入接口地址',
      clearable: true,
      style: 'width: 240px'
    },
    prop: 'http_url'
  },
  {
    type: 'el-input',
    label: '账号邮箱：',
    labelWidth: '80',
    attrs: {
      placeholder: '请输入账号邮箱',
      clearable: true,
      style: 'width: 240px'
    },
    prop: 'account'
  },
  {
    type: 'el-date-picker',
    label: '时间范围：',
    prop: 'createTime',
    labelWidth: '80',
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
  { prop: 'http_status', label: '响应状态', align: 'center' },
  { prop: 'http_url', width: '300px', label: '接口地址', align: 'left' },
  { prop: 'request_body', minWidth: '200px', label: '请求体', align: 'center', vSlot: 'request' },
  { prop: 'http_response', minWidth: '200px', label: '响应体', align: 'center', vSlot: 'reponse' },

  { prop: 'account', width: '200px', label: '账号邮箱', align: 'center' },
  { prop: 'user_token', minWidth: '200px', label: 'token', align: 'center', vSlot: 'token' },
  {
    prop: 'request_time',
    label: '请求时间',
    formatter: (_row: any, _col: any, val: any) => {
      return val ? formatTime(val) : '-'
    },
    width: '160px',
    align: 'center'
  },
  { prop: 'btn', label: '操作', vSlot: 'btn', width: 70, align: 'center', fixed: 'right' }
]
