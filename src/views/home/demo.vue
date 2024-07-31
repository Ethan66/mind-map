<template>
  <div class="mindMapDemo">
    <div id="mindMapContainer"></div>
    <div class="toolbar" v-if="activeNodes.length > 0">
      <button @click="inserImage">插入图片</button>
      <button @click="insertIcon">插入图标</button>
      <button @click="insertLink">插入超链接</button>
      <button @click="insertNote">插入备注</button>
      <button @click="insertTag">插入标签</button>
      <button @click="insertGa">插入概要</button>
      <button @click="insertLine">插入关联线</button>
    </div>
  </div>
</template>
<script setup>
import MindMap from 'simple-mind-map'

let mindMap = null

// 当前激活的节点列表
const activeNodes = shallowRef([])

// 插入图片
const inserImage = () => {
  activeNodes.value.forEach(node => {
    node.setImage({
      url: 'https://lxqnsys.oss-cn-beijing.aliyuncs.com/qlx/xh2AXkBxYm5jGe5fD7DWYrC5b.png',
      title: '图片的标题或描述',
      width: 100, // 图片的宽高也不能少
      height: 100
    })
  })
}

// 插入图标
const insertIcon = () => {
  const iconList = ['priority_1', 'priority_2']
  activeNodes.value.forEach(node => {
    node.setIcon(iconList)
  })
}

// 插入超链接
const insertLink = () => {
  activeNodes.value.forEach(node => {
    node.setHyperlink('http://lxqnsys.com/', '理想青年实验室')
  })
}

// 插入备注
const insertNote = () => {
  activeNodes.value.forEach(node => {
    node.setNote('备注内容')
  })
}

// 插入标签
const insertTag = () => {
  activeNodes.value.forEach(node => {
    node.setTag(['标签1', '标签2'])
  })
}

// 插入概要
const insertGa = () => {
  mindMap.execCommand('ADD_GENERALIZATION', {
    text: '自定义概要内容'
  })
}

// 插入关联线
const insertLine = () => {
  mindMap.associativeLine.createLineFromActiveNode()
}

onMounted(() => {
  mindMap = new MindMap({
    el: document.getElementById('mindMapContainer'),
    data: {
      data: {
        text: '根节点'
      },
      children: [
        {
          data: {
            text: '二级节点'
          },
          children: []
        },
        {
          data: {
            text: '二级节点'
          },
          children: []
        }
      ]
    },
    initRootNodePosition: ['left', 'center']
  })

  // 监听节点激活事件
  mindMap.on('node_active', (node, nodeList) => {
    activeNodes.value = nodeList
  })
})
</script>

<style>
.mindMapDemo {
  width: 100%;
  position: relative;
}

#mindMapContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 400px;
}

#mindMapContainer * {
  margin: 0;
  padding: 0;
}

.toolbar {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
