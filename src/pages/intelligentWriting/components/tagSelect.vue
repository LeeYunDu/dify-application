<template>
  <div class="tag-select-container">
    <div class="tag-select-content">
      <div
        v-for="tag in useTipTags"
        :key="tag.key"
        class="tag-item"
      >
        <div class="content-keys">
          <div v-for="(contentKey, contentIndex) in tag.contentKey" :key="contentIndex" class="content-item">
            <template v-if="contentKey == '$componentKey'">
              <template v-if="tag.componentType == 'select'">
                <el-select v-model="tag.value" placeholder="请选择">
                  <el-option
                    v-for="item in tag.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
              <template v-else-if="tag.componentType == 'input'">
                <el-input v-model="tag.value" placeholder="请输入" v-bind="tag.props"></el-input>
              </template>
            </template>
            <template v-else>
              {{ contentKey }}
            </template>
          </div>
          ,
        </div>

        <!-- 悬浮的时候显示 -->
        <div class="tag-close" @click="deleteTag(tag.key)">
          <el-icon>
            <CloseBold />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { tipTags } from '../json'

let useTipTags = ref([])

// 定义 props 和 emit
const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

// 内部状态
const selectedTags = ref<string[]>([...props.modelValue])


// 监听外部变化，实现双向绑定
watch(() => props.modelValue, newValue => {
  selectedTags.value = newValue
  if(selectedTags.value.length > 0){
    let currentTipTags = useTipTags.value.map(e=>e.key)
    selectedTags.value.forEach(item=>{
      let tag = tipTags.find(tag => tag.key == item)
      if(tag && !currentTipTags.includes(tag.key)){
        useTipTags.value.push(tag)
      }
    })

  }else{
    useTipTags.value = []
  }
}, { deep: true ,immediate:true })

// 监听内部变化，通知外部
watch(selectedTags, newValue => {
  emit('update:modelValue', newValue)
}, { deep: true })

// 切换标签选中状态
const toggleTag = (tagKey: string) => {
  const index = selectedTags.value.indexOf(tagKey)
  if (index > -1) {
    // 已选中，移除
    selectedTags.value.splice(index, 1)
    useTipTags.value = useTipTags.value.filter(tag => tag.key != tagKey)
  } else {
    // 未选中，添加
    selectedTags.value.push(tagKey)
  }
}


function deleteTag(tagKey){
  const index = selectedTags.value.indexOf(tagKey)
  if (index > -1) {
    // 已选中，移除
    selectedTags.value.splice(index, 1)
    useTipTags.value = useTipTags.value.filter(tag => tag.key != tagKey)
  }
}

function getCurrentTag(tagKey: string) {
  return useTipTags.value.find(tag => tag.key == tagKey)
}

function getUseTipTags(){
  let cloneDeep = JSON.parse(JSON.stringify(useTipTags.value))
  let result = []
  cloneDeep.map(tag=>{
    if(tag.value){
      let index = tag.contentKey.indexOf('$componentKey')
      tag.contentKey[index] = tag.value
      let resultTag = tag.contentKey.join('')
      result.push(resultTag)
    }
  })

  let values = cloneDeep.filter(tag=>tag.value)
  let map = {}
  values.map(tag=>{
    return map[tag.key] = tag.value
  })
  return map
  return cloneDeep
}

defineExpose({
  getCurrentTag,
  getUseTipTags
})
</script>

<style scoped>
.tag-select-container {
  border-radius: 8px;
  padding: 16px 0;
}

.tag-select-header {
  margin-bottom: 12px;
}

.tag-select-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.tag-select-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 6px 12px;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  border-radius: 8px;

  &:hover {
    border: 1px solid #1890ff;
  }
}


.tag-item.selected {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.tag-select-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
}

.selected-tags-info {
  font-size: 12px;
  color: #666;

}

.tag-item {
  position: relative;
  border: 1px solid transparent;

  .tag-close {
    display: none;
  }

  &:hover {
    background: rgba(229, 231, 235, 0.2);

    .tag-close {
      position: absolute;
      top: 4px;
      color: #999;
      right: 8px;
      display: block;
    }
  }
}

.content-keys {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  position: relative;
  align-items: center;

  ::v-deep(.el-input){
    .el-input__wrapper{
      background: transparent;
      color: #959ba3;
      padding: 0;
      border: none;
      box-shadow: none;
      font-size: 16px;
      border: none;
      outline: none;

    }
  }

  ::v-deep(.el-select) {
    background: transparent;

    .el-select__suffix {
      display: none;
    }

    .el-select__wrapper {
      background: transparent;
      color: #959ba3;
      padding: 0;
      border: none;
      box-shadow: none;
      min-width: 80px;
      font-size: 16px;

    }
  }

  .content-item {
    height: 32px;
    display: flex;
    align-items: center;


  }


}
</style>
