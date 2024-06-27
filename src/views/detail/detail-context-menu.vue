<template>
  <div
    class="contextmenuContainer listBox"
    v-if="isShow"
    :style="{ left: position.left + 'px', top: position.top + 'px' }"
  >
    <div
      class="item"
      @click="
        () => {
          m.v.view.fit()
          handleHideMenu()
        }
      "
    >
      <span class="name">适应画布</span>
      <span class="desc">Ctrl + i</span>
    </div>
  </div>
</template>

<script setup>
import { mindMap as m, bus } from '@/utils/mind-map'
const isShow = ref(false)
const position = reactive({
  left: 0,
  top: 0,
  mosuedownX: 0,
  mosuedownY: 0
})

let isMousedown = false
// 鼠标按下
const onMousedown = ([e] = []) => {
  if (e.which !== 3) {
    return
  }
  position.mosuedownX = e.clientX
  position.mosuedownY = e.clientY
  isMousedown = true
}

// 鼠标抬起
const onMouseup = ([e] = []) => {
  if (!isMousedown) {
    return
  }
  isMousedown = false
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
const handleShowMenu = ([e] = []) => {
  position.left = e.clientX + 10
  position.top = e.clientY + 10
  isShow.value = true
}

// 隐藏右键菜单
const handleHideMenu = () => {
  isShow.value = false
  position.left = 0
  position.top = 0
}

bus.on('svg_mousedown', onMousedown)
bus.on('mouseup', onMouseup)

onBeforeUnmount(() => {
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
