import { defineAsyncComponent, App } from 'vue'
type goldImport = Record<string, any>
const componentsName: goldImport = import.meta.glob('./*/index.vue', { eager: true })
const components: goldImport = import.meta.glob('./*/index.vue')

const modules: goldImport = import.meta.glob('./*/index.ts')
const moduleName: goldImport = import.meta.glob('./*/index.ts', { eager: true })

export default function install(app: App) {
  // template 组件
  for (const [key, value] of Object.entries(components)) {
    // 注册组件名字   没有抛出Name， 引用文件组件文件夹名字
    const name = componentsName[key].default.name || key.slice(2, key.lastIndexOf('/'))
    // console.log('全局组件：' + name)
    app.component(name, defineAsyncComponent(value))
  }

  // render 组件
  for (const [key] of Object.entries(modules)) {
    app.use(moduleName[key].default)
  }
}
