<template>
  <Sidebar title="图标" v-model:show="showDialog">
    <div class="box">
      <div class="boxContent">
        <!-- 图标 -->
        <div class="iconBox">
          <div class="item" v-for="item in nodeIcons" :key="item.name">
            <div class="title">{{ item.name }}</div>
            <div class="list">
              <div
                class="icon"
                v-for="icon in item.list"
                :key="icon.name"
                v-html="getHtml(icon.icon)"
                :class="{
                  selected: chooseIconList.includes(item.type + '_' + icon.name)
                }"
                @click="setIcon(item.type, icon.name)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { nodeIconList } from 'simple-mind-map/src/svg/icons'
import { mergerIconList } from 'simple-mind-map/src/utils/index'
import { mindMap as m } from '@/utils/mind-map'

const nodeIcons = mergerIconList([...nodeIconList])
const chooseIconList = ref([])

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])
const showDialog = ref(false)
watch(
  () => props.show,
  val => {
    if (val && m.curNode) {
      showDialog.value = true
      chooseIconList.value = m.curNode.getData('icon') || []
    }
  }
)
watch(showDialog, val => {
  if (!val) {
    emit('update:show', false)
  }
})
watch(
  () => m.curNode,
  val => {
    !val && (showDialog.value = false)
  }
)

// 获取图标渲染方式
const getHtml = icon => {
  return /^<svg/.test(icon) ? icon : `<img src="${icon}" />`
}

// 设置icon
const setIcon = (type, name) => {
  m.activeNodes.forEach((node, i) => {
    const newIconList = getNewIcon(m.curNode, type, name)
    node.setIcon(newIconList)
    if (i === 0) {
      chooseIconList.value = newIconList
    }
  })
}

// 获取最新的icon
const getNewIcon = (node, type, name) => {
  const result = [...(node.getData('icon') || [])]
  let key = type + '_' + name
  let index = result.findIndex(item => {
    return item === key
  })
  // 删除icon
  if (index !== -1) {
    result.splice(index, 1)
  } else {
    let typeIndex = result.findIndex(item => {
      return item.split('_')[0] === type
    })
    // 替换icon
    if (typeIndex !== -1) {
      result.splice(typeIndex, 1, key)
    } else {
      // 增加icon
      result.push(key)
    }
  }
  return result
}
</script>

<style lang="less" scoped>
.box {
  padding: 0 20px;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  .boxContent {
    .iconBox {
      .item {
        margin-bottom: 20px;
        font-weight: bold;
        .title {
          margin-bottom: 10px;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          .icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;
            :deep(img) {
              width: 100%;
              height: 100%;
            }
            :deep(svg) {
              width: 100%;
              height: 100%;
            }
            &.selected {
              &::after {
                content: '';
                position: absolute;
                left: -4px;
                top: -4px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 2px solid #409eff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
