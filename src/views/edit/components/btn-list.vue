<template>
  <div class="operate-page">
    <ul class="operate__btn-list">
      <li
        v-for="item in list"
        :key="item.code"
        :class="{ disabled: item.disabled }"
        :data-aa="item.disabled"
        @click="onClickBtn(item)"
      >
        <p class="btn-list__icon">
          <component :is="item.icon"></component>
        </p>
        <p class="btn-list__title">{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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
import { mindMap as m, bus } from '@/utils/mind-map'
const list = computed(() => [
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
    code: 'icon', // to do
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
    code: 'tag', // to do
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
    args: ['json', true, 'aa', true],
    icon: markRaw(Upload)
  },
  {
    code: 'quit',
    title: '直接退出',
    type: 'quit',
    icon: markRaw(DArrowLeft)
  }
])

// 监听回退
const isBackEnd = ref(false)
const isForwardEnd = ref(false)
const handleListenBackForward = ([index, len]: number[] = []) => {
  isBackEnd.value = index <= 0
  isForwardEnd.value = index >= len - 1
}
bus.on('back_forward', handleListenBackForward)

watch(
  () => m.curNode,
  node => {
    if (node && !node.getStyle('borderWidth')) {
      node.setStyle('borderWidth', 1)
      node.setStyle('borderColor', '#549688')
      node.setStyle('fillColor', '#fff')
    }
  }
)

// 点击按钮
const router = useRouter()
const onClickBtn = item => {
  const args = item.args ?? []
  if (item.type === 'mind') {
    m.execCommand(item.code, ...args)
  }
  if (item.type === 'export') {
    m.export(...args)
  }
  if (item.type === 'quit') {
    router.go(-1)
  }
}

onBeforeUnmount(() => {
  bus.off('back_forward', handleListenBackForward)
})
</script>

<style lang="less" scoped>
.operate-page {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  .operate__btn-list {
    display: flex;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 6px;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.06);
    li {
      cursor: pointer;
      &:hover:not(.disabled) {
        .btn-list__icon {
          background: #f5f5f5;
        }
      }
    }
    li:not(:last-of-type) {
      margin-right: 20px;
    }
    .btn-list__icon {
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      box-sizing: border-box;
      width: 100%;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        color: #1a1a1acc;
        width: 18px;
        height: 18px;
      }
    }
    .btn-list__title {
      margin-top: 4px;
      font-size: 13px;
      letter-spacing: 1px;
      color: #1a1a1acc;
    }
    li.disabled {
      //   cursor: not-allowed;
      //   pointer-events: none;
      svg {
        color: #bcbcbc;
      }
      .btn-list__title {
        color: #bcbcbc;
      }
    }
  }
}
</style>
