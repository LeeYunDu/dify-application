<template>
  <div class="polish-box" v-if="state.show">
  <Teleport to=".w-e-text-container">
    <div class="polish-container" >
      <!-- w-e-text-container -->
      <div id="modal_content" >
        <div class="overlay-wrap ">
          <div class="overlay-wrap-top">
            <el-button type="primary" @click="onAction('polish')">润色</el-button>
            <el-button type="primary" disabled @click="onAction('continue')">续写</el-button>
            <el-button type="primary" disabled @click="onAction('expand')">扩写</el-button>
            <el-button type="primary" disabled  @click="onAction('summary')">摘要</el-button>
            <el-button type="primary" disabled @click="onAction('correct')">纠错</el-button>
          </div>
        </div>
        <div class="overlay_input_content ">
          <div class="overlay_input_content_center">
            <div class="title flal jsp">
              <span class="flal">
                <img src="data:image/png;base64,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"
                     alt="">
                有什么要求请向我提问</span>
              <span class="all_empty" @click="onClear">清空</span>
            </div>

            <div class="gennerator-box">
              <div class="status-box">
                <el-button type="primary" v-show="state.isSuccess" @click="onApply">立即应用</el-button>
                <el-button type="danger" v-show="isGenerating" @click="onStop">中止生成</el-button>
              </div>
              <div class="gennerator-content" v-html="generatedContent">
                
              </div>
            </div>
            <div class="input-content">
              <input v-model="state.params.query" placeholder="如果对上方内容不太满意，您可以继续提出您的要求" value="">
            </div>

            <div class="button-group">
              <el-button type="default" @click="hidePolish">关闭</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </Teleport>
  </div>


</template>

<script lang="ts" setup>
import { ref, reactive ,onMounted} from 'vue'
import { getAppInfoApi  } from '@/api'
import { ApiProxy, applicationApiKey } from '@/config'
import useApplication from '@/hooks/use-application'
import { ElMessage } from 'element-plus'
const prefix = ApiProxy.java.ai

const props = defineProps({
  editor: { type: Object, default: () => {} }
})

let state = reactive({
  show: false,
  ask:'',
  selection:null,
  isSuccess:false,
  params:{
    content:'',
    editContent:''
  }
})

let { onSend,generatedContent,isGenerating,onStop } = useApplication({
  apiKey: applicationApiKey['文本润色'],
  apiUrl: prefix + '/v1/completion-messages',
  showLoading: false,
  params: {
    inputs: state.params,
    response_mode: 'streaming',
    user: '1',
    api_key: applicationApiKey['文本润色'],
  },
  onSuccess: onSuccess,
})

function onSuccess(richText){
  state.isSuccess = true
}  

function onSubmit(){
  // 提交请求
} 

function onAction(action){
  state.isSuccess = false
  switch(action){
    case 'polish':
      onSend()
      break
    default:
      ElMessage.info('整在建设中..')
      break
  }
  // 润色请求
}

function onApply(){
  // 获取选择的内容
  const editor = props.editor
  editor.focus()
  try {
    setTimeout(() => {
        editor.removeMark('bgColor')
        // editor.insertText(generatedContent.value).
        editor.dangerouslyInsertHtml(generatedContent.value)
        editor.deselect()
        generatedContent.value = ''
        state.isSuccess = false
    }, 0);
  } catch (error) {
    console.log(error,'插入失败');
  }
}

function showPolish() {
  state.show = true
}

function hidePolish() {
  state.show = false
}

function onClear(){
  state.ask = ''
}

defineExpose({
  showPolish,
  init(params){
    showPolish()
    Object.assign(state.params,params)
  }
})

onMounted(() => {

})



</script>

<style scoped lang="scss">
.polish-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  .el-button{
    padding: 4px 12px;
  }
}

#modal_content {
  width: 700px;

  .overlay_input_content {
    background: #fff;
    background-clip: padding-box;
    border-radius: 8px;
    display: flex;
    padding: 4px 6px;
    position: relative;
    transition: width .1s ease;
    border: 3px solid #27f;
    margin-top: 12px;
    box-shadow: 0px 0px 12px 0px rgba(39, 127, 255, 0.50);

    .overlay_input_content_center {
      width: 100%;
      padding: 12px;
      display: flex;
      flex-direction: column;

      .input-content {
        margin: 12px 0;
        input{
          width: 100%;
          height: 32px;
          line-height: 32px;
          padding: 0 12px;
          border-radius: 4px;
          color: #262a30;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .fcc {
        background: #27f;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        height: 24px;
        text-align: center;
        width: 60px;
        line-height: 24px;
        margin-left: auto;
      }

      .title: {
        color: #262a30;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        font-weight: 500;

      }

      .flal {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #262a30;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        font-weight: 600;

        img {
          margin-right: 8px;
          width: 22px;
        }

        .all_empty {
          margin-left: auto;
          color: #000;
          cursor: pointer;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: 400;
          opacity: .25;
        }
      }
    }
  }

  .overlay-wrap {
    width: 100%;
    box-shadow: 0px 0px 12px 0px rgba(39, 127, 255, 0.50);
    .overlay-wrap-top {
      background: transparent;
      background-clip: padding-box;
      border-radius: 8px;
      display: flex;
      padding: 4px 6px;
      position: relative;
      transition: width .1s ease;
      border: 3px solid #27f;

      .el-button{
        padding: 0 10px;
      }
    }



    .overlay-btn {
      width: 65px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #262a30;
      font-family: PingFangSC-Medium;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #e8e8e8;
      color: #5c626b;

    }


  }
}

.button-group{
  display: flex;
  justify-content: flex-end;
  .el-button{
    padding: 0 10px;
  }
}

.gennerator-box{
  padding:12px 0 ;
  .status-box{
    margin-bottom: 12px;
  }
}
</style>
