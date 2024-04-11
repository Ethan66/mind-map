<template>
  <div
    class="contextmenuContainer listBox"
    v-if="isShow"
    :style="{ left: position.left + 'px', top: position.top + 'px' }"
  >
    <template v-if="type === 'node'">
      <div
        class="item"
        @click="exec('INSERT_NODE', insertNodeBtnDisabled)"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        <span class="name">插入同级节点</span>
        <span class="desc">Enter</span>
      </div>
      <div
        class="item"
        @click="exec('INSERT_CHILD_NODE')"
        :class="{ disabled: m.curNode?.isGeneralization }"
      >
        <span class="name">插入子级节点</span>
        <span class="desc">Tab</span>
      </div>
      <div
        class="item"
        @click="exec('INSERT_PARENT_NODE')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        <span class="name">插入父节点</span>
        <span class="desc">Shift + Tab</span>
      </div>
      <div
        class="item"
        @click="exec('ADD_GENERALIZATION')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        <span class="name">插入概要</span>
        <span class="desc">Ctrl + G</span>
      </div>
      <div class="item" @click="exec('UP_NODE')" :class="{ disabled: upNodeBtnDisabled }">
        <span class="name">上移节点</span>
        <span class="desc">Ctrl + ↑</span>
      </div>
      <div class="item" @click="exec('DOWN_NODE')" :class="{ disabled: downNodeBtnDisabled }">
        <span class="name">下移节点</span>
        <span class="desc">Ctrl + ↓</span>
      </div>
      <div class="item danger" @click="exec('REMOVE_NODE')">
        <span class="name">删除节点</span>
        <span class="desc">Delete</span>
      </div>
      <div class="item danger" @click="exec('REMOVE_CURRENT_NODE')">
        <span class="name">删除当前节点</span>
        <span class="desc">Shift + Backspace</span>
      </div>
      <div
        class="item"
        @click="exec('COPY_NODE')"
        :class="{ disabled: m.curNode?.isGeneralization }"
      >
        <span class="name">复制节点</span>
        <span class="desc">Ctrl + C</span>
      </div>
      <div
        class="item"
        @click="exec('CUT_NODE')"
        :class="{ disabled: m.curNode?.isGeneralization }"
      >
        <span class="name">剪切节点</span>
        <span class="desc">Ctrl + X</span>
      </div>
      <div class="item" @click="exec('PASTE_NODE')">
        <span class="name">粘贴节点</span>
        <span class="desc">Ctrl + V</span>
      </div>
      <div
        class="item"
        @click="exec('REMOVE_HYPERLINK')"
        v-show="!!m.curNode?.getData('hyperlink')"
      >
        <span class="name">移除超链接</span>
      </div>
      <div class="item" @click="exec('REMOVE_NOTE')" v-show="!!m.curNode?.getData('note')">
        <span class="name">移除备注</span>
      </div>
    </template>
    <template v-if="type === 'svg'">
      <div class="item" @click="exec('FIT_CANVAS')">
        <span class="name">适应画布</span>
        <span class="desc">Ctrl + i</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { mindMap as m, bus } from '@/utils/mind-map'
import { computed } from 'vue'
const isShow = ref(false)
const isMousedown = ref(false)
const type = ref('')
const position = reactive({
  left: 0,
  top: 0,
  mosuedownX: 0,
  mosuedownY: 0
})

// 没有选中节点、根节点、概要节点
const insertNodeBtnDisabled = computed(
  () => !m.curNode || m.curNode?.isRoot || m.curNode?.isGeneralization
)
// 能否上移节点
const upNodeBtnDisabled = computed(() => {
  if (insertNodeBtnDisabled.value) return true
  return (
    m.curNode?.parent.children.findIndex(item => {
      return item === m.curNode
    }) === 0
  )
})
// 能否下移节点
const downNodeBtnDisabled = computed(() => {
  if (insertNodeBtnDisabled.value) return true
  return (
    m.curNode?.parent.children.findIndex(item => {
      return item === m.curNode
    }) ===
    m.curNode?.parent.children.length - 1
  )
})

// 鼠标按下
const onMousedown = ([e] = []) => {
  if (e.which !== 3) {
    return
  }
  position.mosuedownX = e.clientX
  position.mosuedownY = e.clientY
  isMousedown.value = true
}

// 鼠标抬起
const onMouseup = ([e] = []) => {
  if (!isMousedown.value) {
    return
  }
  isMousedown.value = false
  if (
    Math.abs(position.mosuedownX - e.clientX) > 3 ||
    Math.abs(position.mosuedownY - e.clientY) > 3
  ) {
    handleHideMenu()
    return
  }
  handleShowMenu([e])
}
// 展示右键菜单
const handleShowMenu = ([e, node] = []) => {
  console.warn('----- my data is e,node: ', e, node)
  type.value = node ? 'node' : 'svg'
  position.left = e.clientX + 10
  position.top = e.clientY + 10
  isShow.value = true
  node && (m.curNode = node)
}

// 隐藏右键菜单
const handleHideMenu = ([e, node] = []) => {
  isShow.value = false
  position.left = 0
  position.top = 0
  type.value = ''
}

bus.on('node_contextmenu', handleShowMenu)
bus.on('node_click', handleHideMenu)
bus.on('draw_click', handleHideMenu)
bus.on('expand_btn_click', handleHideMenu)
bus.on('svg_mousedown', onMousedown)
bus.on('mouseup', onMouseup)

const exec = (key, disabled, ...args) => {
  if (disabled) {
    return
  }
  switch (key) {
    case 'COPY_NODE':
      m.v.renderer.copy()
      break
    case 'CUT_NODE':
      m.v.renderer.cut()
      break
    case 'PASTE_NODE':
      m.v.renderer.paste()
      break
    case 'RETURN_CENTER':
      m.v.renderer.setRootNodeCenter()
      break
    case 'FIT_CANVAS':
      m.v.view.fit()
      break
    case 'REMOVE_HYPERLINK':
      m.v.curNode?.setHyperlink('', '')
      break
    case 'REMOVE_NOTE':
      m.v.curNode?.setNote('')
      break
    default:
      m.execCommand(key, ...args)
      break
  }
  handleHideMenu()
}

onBeforeUnmount(() => {
  bus.off('node_contextmenu', handleShowMenu)
  bus.off('node_click', handleHideMenu)
  bus.off('draw_click', handleHideMenu)
  bus.off('expand_btn_click', handleHideMenu)
  bus.off('svg_mousedown', onMousedown)
  bus.off('mouseup', onMouseup)
})
</script>

<style lang="less" scoped>
.listBox {
  width: 260px;
  background: #fff;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.contextmenuContainer {
  position: fixed;
  font-size: 14px;
  font-family:
    PingFangSC-Regular,
    PingFang SC;
  font-weight: 400;
  color: #1a1a1a;
  z-index: 100;

  .item {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &.danger {
      color: #f56c6c;
    }

    &:hover {
      background: #f5f5f5;

      .subItems {
        visibility: visible;
      }
    }

    &.disabled {
      color: grey;
      cursor: not-allowed;
      pointer-events: none;

      &:hover {
        background: #fff;
      }
    }

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subItems {
      position: absolute;
      left: 100%;
      top: 0;
      visibility: hidden;
    }
  }
}
</style>
