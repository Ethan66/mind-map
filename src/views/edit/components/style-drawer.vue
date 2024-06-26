<template>
  <Sidebar ref="sidebar" title="节点样式" v-model:show="showDialog">
    <div class="styleBox">
      <div class="sidebarContent">
        <!-- 文字 -->
        <div class="title noTop">文字</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">字号</span>
            <el-select
              size="small"
              style="width: 80px"
              v-model="style.fontSize"
              @change="update('fontSize')"
            >
              <el-option
                v-for="item in fontSizeList"
                :key="item"
                :label="item"
                :value="item"
                :style="{ fontSize: item + 'px' }"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="btnGroup">
            <el-tooltip content="颜色" placement="bottom">
              <div>
                <el-popover placement="bottom" trigger="hover" width="260">
                  <template #reference>
                    <div class="styleBtn" v-popover:popover>
                      A
                      <span
                        class="colorShow"
                        :style="{ backgroundColor: style.color || '#eee' }"
                      ></span>
                    </div>
                  </template>
                  <color-selector
                    v-model:color="style.color"
                    @change="update('color')"
                  ></color-selector>
                </el-popover>
              </div>
            </el-tooltip>
            <el-tooltip content="加粗" placement="bottom">
              <div
                class="styleBtn"
                :class="{
                  actived: style.fontWeight === 'bold'
                }"
                @click="toggleFontWeight"
              >
                B
              </div>
            </el-tooltip>
            <el-tooltip content="斜体" placement="bottom">
              <div
                class="styleBtn i"
                :class="{
                  actived: style.fontStyle === 'italic'
                }"
                @click="toggleFontStyle"
              >
                I
              </div>
            </el-tooltip>
            <el-tooltip content="划线" placement="bottom">
              <div>
                <el-popover placement="bottom" trigger="hover" width="260">
                  <template #reference>
                    <div
                      class="styleBtn u"
                      :style="{
                        textDecoration: style.textDecoration || 'none'
                      }"
                    >
                      U
                    </div>
                  </template>
                  <el-radio-group
                    size="small"
                    v-model="style.textDecoration"
                    @change="update('textDecoration')"
                  >
                    <el-radio-button label="无" value="none"></el-radio-button>
                    <el-radio-button label="下划线" value="underline"></el-radio-button>
                    <el-radio-button label="中划线" value="line-through"></el-radio-button>
                    <el-radio-button label="上划线" value="overline"></el-radio-button>
                  </el-radio-group>
                </el-popover>
              </div>
            </el-tooltip>
          </div>
        </div>
        <!-- 边框 -->
        <div class="title">边框</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <el-popover placement="bottom" trigger="hover" width="260">
              <template #reference>
                <span
                  class="block"
                  :style="{ width: '80px', backgroundColor: style.borderColor }"
                ></span>
              </template>
              <color-selector
                v-model:color="style.borderColor"
                @change="update('borderColor')"
              ></color-selector>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">样式</span>
            <el-select
              size="small"
              style="width: 80px"
              v-model="style.borderDasharray"
              placeholder=""
              @change="update('borderDasharray')"
            >
              <el-option
                v-for="item in borderDasharrayList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
                <svg width="120" height="34">
                  <line
                    x1="10"
                    y1="17"
                    x2="110"
                    y2="17"
                    stroke-width="2"
                    :stroke="style.borderDasharray === item.value ? '#409eff' : '#000'"
                    :stroke-dasharray="item.value"
                  ></line>
                </svg>
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 背景 -->
        <div class="title">背景</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <el-popover placement="bottom" trigger="hover" width="260">
              <template #reference>
                <span
                  class="block"
                  :style="{ width: '80px', backgroundColor: style.fillColor }"
                ></span>
              </template>
              <color-selector
                v-model:color="style.fillColor"
                @change="update('fillColor')"
              ></color-selector>
            </el-popover>
          </div>
        </div>
        <!-- 形状 -->
        <div class="title">形状</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">形状</span>
            <el-select
              size="small"
              style="width: 120px"
              v-model="style.shape"
              placeholder=""
              @change="update('shape')"
            >
              <el-option
                v-for="item in shapeList"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              >
                <svg width="60" height="26" style="margin-top: 5px">
                  <path
                    :d="shapeListMap[item.value]"
                    fill="none"
                    :stroke="style.shape === item.value ? '#409eff' : '#000'"
                    stroke-width="2"
                  ></path>
                </svg>
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 线条 -->
        <div class="title">线条</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <el-popover placement="bottom" trigger="hover" width="260">
              <template #reference>
                <span
                  class="block"
                  :style="{ width: '80px', backgroundColor: style.lineColor }"
                ></span>
              </template>
              <color-selector
                v-model:color="style.lineColor"
                @change="update('lineColor')"
              ></color-selector>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">样式</span>
            <el-select
              size="small"
              style="width: 80px"
              v-model="style.lineDasharray"
              placeholder="请选择..."
              @change="update('lineDasharray')"
            >
              <el-option
                v-for="item in borderDasharrayList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
                <svg width="120" height="34">
                  <line
                    x1="10"
                    y1="17"
                    x2="110"
                    y2="17"
                    stroke-width="2"
                    :stroke="style.lineDasharray === item.value ? '#409eff' : '#000'"
                    :stroke-dasharray="item.value"
                  ></line>
                </svg>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import colorSelector from './color-selector.vue'
import { fontSizeList, borderDasharrayList, shapeList, shapeListMap } from './style-config'
import { mindMap as m } from '@/utils/mind-map'

const style = reactive({
  shape: '',
  color: '',
  fontSize: '',
  textDecoration: '',
  fontWeight: '',
  fontStyle: '',
  borderColor: '',
  fillColor: '',
  borderDasharray: '',
  lineColor: '',
  lineDasharray: ''
})

const showDialog = ref(false)
const props = defineProps<{ show: boolean }>()
watch([() => props.show, () => m.curNode], ([val, curNode]) => {
  if (val && curNode) {
    showDialog.value = true
    ;[
      'shape',
      'color',
      'fontSize',
      'textDecoration',
      'fontWeight',
      'fontStyle',
      'borderColor',
      'fillColor',
      'borderDasharray',
      'lineColor',
      'lineDasharray'
    ].forEach(item => {
      style[item] = curNode.getStyle(item, false)
    })
  }
})
const emit = defineEmits(['update:show'])

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

const toggleFontWeight = () => {
  style.fontWeight = style.fontWeight === 'bold' ? 'normal' : 'bold'
  update('fontWeight')
}

const toggleFontStyle = () => {
  style.fontStyle = style.fontStyle === 'italic' ? 'normal' : 'italic'
  update('fontStyle')
}

const update = prop => {
  m.activeNodes.forEach(node => {
    node.setStyle(prop, style[prop])
  })
}
</script>

<style lang="less" scoped>
.styleBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tab {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 20px;
  }
}
.tipBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  .tipIcon {
    font-size: 100px;
  }
}

.sidebarContent {
  padding: 20px;
  padding-top: 10px;

  .title {
    font-size: 16px;
    font-family:
      PingFangSC-Medium,
      PingFang SC;
    font-weight: 500;
    color: rgba(26, 26, 26, 0.9);
    margin-bottom: 10px;
    margin-top: 20px;

    &.noTop {
      margin-top: 0;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .btnGroup {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .rowItem {
      display: flex;
      align-items: center;

      .name {
        font-size: 12px;
        margin-right: 10px;
      }

      .block {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;

        &.disabled {
          background-color: #f5f7fa !important;
          border-color: #e4e7ed !important;
          color: #c0c4cc !important;
          cursor: not-allowed !important;
        }
      }
    }

    .styleBtn {
      position: relative;
      width: 50px;
      height: 30px;
      background: #fff;
      border: 1px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;

      &.actived {
        background-color: #eee;
      }

      &.disabled {
        background-color: #f5f7fa !important;
        border-color: #e4e7ed !important;
        color: #c0c4cc !important;
        cursor: not-allowed !important;
      }

      &.i {
        font-style: italic;
      }

      &.u {
      }

      .colorShow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
      }
    }
  }
}
.borderLine {
  display: inline-block;
  width: 100%;
  background-color: #000;
  &.isDark {
    background-color: #fff;
  }
}
</style>
<style lang="less">
.el-select-dropdown__item.selected {
  .borderLine {
    background-color: #409eff;
  }
}
</style>
