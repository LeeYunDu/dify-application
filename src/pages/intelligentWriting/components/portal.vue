<template>
  <div class="portal">
    <div class="portal-header">
      <el-button type="default" icon="House" @click="goBack">
        首页
      </el-button>
      <div class="portal-title">
        <el-input v-model="state.params.title" style="width: 100%;" placeholder="请输入标题"></el-input>
      </div>
      <el-button type="default" icon="House" @click="copyRichText">
        复制全文
      </el-button>
      <el-button type="default" icon="House" @click="importRichText">
        导入文档
      </el-button>
      <el-button type="primary" icon="House" @click="exportRichText">
        导出文档
      </el-button>
    </div>
  </div>
  <export
    v-model="state.show"
    :content="state.params.richText"
    :title="state.params.title"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { reactive ,computed } from 'vue'
import Export from './export.vue'


let props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const state = reactive({
  show: false,
  params: {
    richText: computed(()=>props.content),
    title: ''
  }
})


let router = useRouter()
function goBack(){
  router.push({
    path: '/intelligentWriting/index',
  })
}

function copyRichText() {
  const richText = state.params.richText.value
  if (richText) {
    const tempInput = document.createElement('input')
    tempInput.value = richText
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    ElMessage.success('复制成功')
  } else {
    ElMessage.warning('请先输入内容')
  }
}

function importRichText() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.docx,.doc,.txt'
  input.click()
}
function exportRichText() {
  const richText = props.content
  if (richText) {
    state.show = true
  } else {
    ElMessage.warning('请先输入内容')
  }
}


</script>

<style scoped lang="scss">
.portal {
  width: 100%;
  border-radius: 0;
  display: flex;
  align-items: center;
  padding:6px 12px;

}
.portal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.go-back-btn {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  display: flex;
  align-items: center;
  span{
    margin-left: 4px;
  }
}


.portal-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  color: #000;
  margin: 0 20px;
  font-family: PingFang SC;

  position: relative;
  padding-left: 20px;

  .el-input{
    width: 100%;
  }

  &::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1px;
    height: 100%;
    background-color: #000;
    opacity: .15;
  }
}
</style>
