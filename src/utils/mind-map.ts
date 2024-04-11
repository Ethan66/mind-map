import mitt from 'mitt'
import MindMap from 'simple-mind-map'
import Export from 'simple-mind-map/src/plugins/Export.js'
import { reactive } from 'vue'

MindMap.usePlugin(Export)

const init = () => {
  // 监听节点激活事件
  mindMap.v.on('node_active', (node: any, nodeList: any) => {
    mindMap.activeNodes = nodeList
    mindMap.hasActiveNode = !!nodeList.length
    mindMap.curNode = node
  })
  ;[
    'back_forward',
    'node_contextmenu',
    'node_click',
    'draw_click',
    'expand_btn_click',
    'svg_mousedown',
    'mouseup'
  ].forEach((event: string) => {
    mindMap.v.on(event, (...args: (string | boolean)[]) => {
      bus.emit(event, args)
    })
  })
}
export const bus = mitt()

export const mindMap = reactive({
  v: null as unknown as MindMap,
  activeNodes: [] as any[],
  curNode: null as any,
  hasActiveNode: false,
  execCommand: (type: string) => {
    mindMap.v.execCommand(type)
  },
  export: (...arg: (string | boolean)[]) => {
    console.log(111, ...arg, mindMap.v)
    mindMap.v.export(...arg)
  }
})

// 创建实例
export const createMindMap = (options: any) => {
  mindMap.v = new MindMap(options)
  init()
}
