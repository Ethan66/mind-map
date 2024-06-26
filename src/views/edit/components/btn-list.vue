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
    <tag-dialog v-model:show="showTagDialog" />
    <icon-drawer v-model:show="showIconDrawer" />
    <style-drawer v-model:show="showStyleDrawer" />
    <note-dialog v-model:show="showNoteDialog" />
    <link-dialog v-model:show="showLinkDialog" />
  </div>
</template>

<script setup lang="ts">
import { mindMap as m, bus } from '@/utils/mind-map'
import { ElMessageBox } from 'element-plus'
import { list, isBackEnd, isForwardEnd } from './btn-list.ts'
import tagDialog from './tag-dialog.vue'
import iconDrawer from './icon-drawer.vue'
import styleDrawer from './style-drawer.vue'
import noteDialog from './note-dialog.vue'
import linkDialog from './link-dialog.vue'
import { localStore } from '@/utils/storage'

const emit = defineEmits(['update:showExport'])

// 监听回退
const handleListenBackForward = ([index, len]: number[] = []) => {
  isBackEnd.value = index <= 0
  isForwardEnd.value = index >= len - 1
}
bus.on('back_forward', handleListenBackForward)

// 点击按钮
const router = useRouter()
const showTagDialog = ref(false)
const showIconDrawer = ref(false)
const showStyleDrawer = ref(false)
const showNoteDialog = ref(false)
const showLinkDialog = ref(false)
const onClickBtn = item => {
  if (item.disabled) return
  const args = item.args ?? []
  if (item.code === 'tag') {
    showTagDialog.value = true
  }
  if (item.code === 'icon') {
    showIconDrawer.value = true
  }
  if (item.code === 'style') {
    showStyleDrawer.value = true
  }
  if (item.code === 'note') {
    showNoteDialog.value = true
  }
  if (item.code === 'link') {
    showLinkDialog.value = true
  }
  if (item.type === 'mind') {
    m.execCommand(item.code, ...args)
  }
  if (item.type === 'export') {
    emit('update:showExport', true)
  }
  if (item.type === 'quit') {
    ElMessageBox.confirm('退出将不保存修改数据，请确定要退出吗', '警告', {
      type: 'warning'
    }).then(() => {
      localStore.remove('data')
      localStore.remove('editing')
      router.go(-1)
    })
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
