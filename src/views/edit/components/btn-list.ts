import {
  Back,
  Right,
  Delete,
  Connection,
  Coordinate,
  Picture,
  Grape,
  Link,
  Tickets,
  PriceTag,
  Menu,
  Upload,
  DArrowLeft
} from '@element-plus/icons-vue'
import { mindMap as m } from '@/utils/mind-map'

export const isBackEnd = ref(false)
export const isForwardEnd = ref(false)

export const list = computed(() => [
  {
    code: 'BACK',
    disabled: isBackEnd.value, //  readonly
    title: '回退',
    type: 'mind',
    icon: markRaw(Back)
  },
  {
    code: 'FORWARD',
    disabled: isForwardEnd.value, // readonly
    title: '前进',
    type: 'mind',
    icon: markRaw(Right)
  },
  {
    code: 'INSERT_NODE',
    disabled: !m.hasActiveNode || m.curNode?.isGeneralization,
    title: '同级节点',
    type: 'mind',
    icon: markRaw(Connection)
  },
  {
    code: 'INSERT_CHILD_NODE',
    disabled: !m.hasActiveNode || m.curNode?.isGeneralization,
    title: '子节点',
    type: 'mind',
    icon: markRaw(Coordinate)
  },
  {
    code: 'REMOVE_CURRENT_NODE',
    disabled: !m.hasActiveNode,
    title: '删除节点',
    type: 'mind',
    icon: markRaw(Delete)
  },
  {
    code: 'image', // to do
    disabled: !m.hasActiveNode,
    title: '图片',
    type: 'dialog',
    icon: markRaw(Picture)
  },
  {
    code: 'icon',
    disabled: !m.hasActiveNode,
    title: '图标',
    type: 'dialog',
    icon: markRaw(Grape)
  },
  {
    code: 'link', // to do
    disabled: !m.hasActiveNode,
    title: '超链接',
    type: 'dialog',
    icon: markRaw(Link)
  },
  {
    code: 'note', // to do
    disabled: !m.hasActiveNode,
    title: '备注',
    type: 'dialog',
    icon: markRaw(Tickets)
  },
  {
    code: 'tag',
    disabled: !m.hasActiveNode,
    title: '标签',
    type: 'dialog',
    icon: markRaw(PriceTag)
  },
  {
    code: 'ADD_GENERALIZATION',
    disabled: !m.hasActiveNode || m.curNode?.isRoot || m.curNode?.isGeneralization,
    title: '概要',
    type: 'mind',
    icon: markRaw(Menu)
  },
  {
    code: 'export',
    title: '导出',
    type: 'export',
    icon: markRaw(Upload)
  },
  {
    code: 'quit',
    title: '退出',
    type: 'quit',
    icon: markRaw(DArrowLeft)
  }
])
