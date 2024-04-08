// 动态引入文件
export const importFile = (url: string) => () => import(`@/views/${url}.vue`)

export const isDate = (value: unknown): boolean =>
  Object.prototype.toString.call(value) === '[object Date]'

// 格式化时间日期
export const formatTime = (time: number | Date, format?: string) => {
  const t: Date = isDate(time) ? new Date(new Date(time)) : new Date(time)
  const tf = (i: number) => {
    return (i < 10 ? '0' : '') + i
  }
  const f: string = format || 'yyyy-MM-dd HH:mm:ss'
  return f.replace(/yyyy|MM|dd|HH|mm|ss/g, (a: string): string => {
    const arr: Record<string, string> = {
      yyyy: tf(t.getFullYear()),
      MM: tf(t.getMonth() + 1),
      dd: tf(t.getDate()),
      HH: tf(t.getHours()),
      mm: tf(t.getMinutes()),
      ss: tf(t.getSeconds())
    }
    return arr[a]
  })
}

// 格式化 表格内数据
export const formatter = (data: any[]) => (_row: any, _col: any, val: unknown) =>
  (data.find(item => item.value === val) || {}).label || '-'

export const formatLabelValue = (
  value: any,
  array: any[],
  labelField = 'label',
  valueFeild = 'value'
) => (array.find(item => item[valueFeild] === value) || {})[labelField] || '-'

// 时间选择器default-time
export const formatDefaultTime = (timeArray?: string[]) => {
  const timeValue = new Array(2).fill('').map((_it, index) => timeArray?.[index] || '00:00:00')
  return timeValue.map(ele => {
    const time = ele.split(':').map(it => Number(it))
    return new Date(2000, 1, 1, ...time)
  })
}

// 取整或者取一位小数
export const formatNumber = (num: number) => {
  return parseFloat(num.toFixed(1))
}

// 复制文本
import { ElMessage } from 'element-plus'
export const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text)
  ElMessage.success('复制成功')
  return
}
