import mitt from 'mitt'
import MindMap from 'simple-mind-map'
import Export from 'simple-mind-map/src/plugins/Export.js'
import { localStore } from '@/utils/storage'
import { reactive } from 'vue'

MindMap.usePlugin(Export)

const init = () => {
  // 监听节点激活事件
  mindMap.v.on('node_active', (node: any, nodeList: any) => {
    mindMap.activeNodes = nodeList || []
    mindMap.hasActiveNode = !!nodeList.length
    mindMap.curNode = node || (mindMap.hasActiveNode ? nodeList[0] : null)
    if (node && !node.getStyle('borderWidth') && !node.isRoot) {
      node.setStyle('borderWidth', 1)
      node.setStyle('borderColor', '#549688')
      node.setStyle('fillColor', '#fff')
    }
  })
  mindMap.v.on('data_change', (data: object) => {
    localStore.set('editing', '1')
    localStore.set('data', data)
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
  localStore.get('data').then(({ v }) => {
    if (v) {
      mindMap.v.setData(v)
    }
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
    mindMap.v.export(...arg)
  }
})

// 创建实例
export const createMindMap = (options: any, isEdit?: boolean) => {
  mindMap.v = new MindMap({
    mousewheelAction: 'zoom',
    data: {},
    initRootNodePosition: ['left', 'center'],
    textAutoWrapWidth: 10000,
    themeConfig: {
      associativeLineTextFontSize: 13,
      root: {
        fontSize: 14
      },
      node: {
        fontSize: 13
      },
      generalization: {
        fontSize: 13
      },
      second: {
        fontSize: 13
      }
    },
    ...options
  })
  if (isEdit) {
    init()
  } else {
    ;['svg_mousedown', 'mouseup'].forEach((event: string) => {
      mindMap.v.on(event, (...args: (string | boolean)[]) => {
        bus.emit(event, args)
      })
    })
  }
  mindMap.v.keyCommand.removeShortcut('Del')
  mindMap.v.keyCommand.removeShortcut('Control+C')
  mindMap.v.keyCommand.removeShortcut('Control+V')
}
