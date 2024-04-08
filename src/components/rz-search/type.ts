type selectOptionsType = {
  label: string
  value: number | string
}
export type formDataType = Array<{
  type: string
  label: string
  prop: string
  attrs?: Record<string, unknown>
  on?: Record<string, unknown>
  options?: selectOptionsType[]
  labelWidth: string
  propAlias?: string[]
}>
