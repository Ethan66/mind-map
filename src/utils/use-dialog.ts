import { createApp, defineAsyncComponent } from 'vue'
type goldImport = Record<string, any>
const componentList: goldImport = import.meta.glob(`../bussiness/*/index.vue`)

export default function (name: string, props: Record<string, any> = {}) {
  const component = defineAsyncComponent(componentList[`../bussiness/${name}/index.vue`])
  const confirmInstance = createApp(component, {
    unmount: () => {
      unmount()
    },
    ...props
  })

  // 创建一个挂载容器
  const parentNode = document.createElement('div')
  document.body.appendChild(parentNode)
  // 挂载组件
  confirmInstance.mount(parentNode)

  const unmount = () => {
    confirmInstance.unmount()
    document.body.removeChild(parentNode)
  }
}
