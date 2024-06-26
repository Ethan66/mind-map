<template>
  <div class="colorContainer">
    <div class="colorList">
      <span
        class="colorItem iconfont"
        v-for="item in colorList"
        :style="{ backgroundColor: item }"
        :class="{ icontouming: item === 'transparent' }"
        :key="item"
        @click="onChooseColor(item)"
      ></span>
    </div>
    <div class="moreColor">
      <span>更多颜色</span>
      <el-color-picker
        size="small"
        v-model="selectColor"
        @change="onChooseColor()"
      ></el-color-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorList = [
  '#4D4D4D',
  '#999999',
  '#FFFFFF',
  '#F44E3B',
  '#FE9200',
  '#FCDC00',
  '#DBDF00',
  '#A4DD00',
  '#68CCCA',
  '#73D8FF',
  '#AEA1FF',
  '#FDA1FF',
  '#333333',
  '#808080',
  '#cccccc',
  '#D33115',
  '#E27300',
  '#FCC400',
  '#B0BC00',
  '#68BC00',
  '#16A5A5',
  '#009CE0',
  '#7B64FF',
  '#FA28FF',
  '#000000',
  '#666666',
  '#B3B3B3',
  '#9F0500',
  '#C45100',
  '#FB9E00',
  '#808900',
  '#194D33',
  '#0C797D',
  '#0062B1',
  '#653294',
  '#AB149E',
  'transparent'
]
const props = defineProps<{ color: string }>()
watch(
  () => props.color,
  val => {
    selectColor.value = val
  }
)
const selectColor = ref('')
selectColor.value = props.color
const emit = defineEmits(['change', 'update:color'])
const onChooseColor = (val = selectColor.value) => {
  emit('update:color', val)
  emit('change')
}
</script>

<style lang="less" scoped>
.colorList {
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  .colorItem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.moreColor {
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
}
</style>
