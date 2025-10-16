<template>
  <div class="write-application">
    <div class="page-container">
      <div class="page-title" @click="getAppInfo">
        <span>智能写作</span>
      </div>
      <div class="page-section-title">
        <span>智能写作，让文字创作变得轻松快捷</span>
      </div>
      <div class="page-action-button">
        <el-button type="primary" size="large" @click="onCreateDocument">新建文档</el-button>
        <el-button type="default" size="large">本地导入</el-button>
      </div>

      <div class="write-actions">
        <el-radio-group v-model="writeAction" size="large" fill="#1890ff">
          <el-radio-button label="快速帮写" value="quick">快速帮写</el-radio-button>
          <el-radio-button label="写作模版" value="template">写作模版</el-radio-button>
        </el-radio-group>
      </div>
      <div class="write-quick-panel">
        <div class="clear-button">
          <el-button type="default" @click="onClear">清除</el-button>
        </div>
        <div class="tip">
          <img :src="imgPath('application/write/small.png')" alt="">
          嗨！今天想写些什么？
        </div>
        <TagSelect ref="tagSelectRef" v-model="selectedTags"></TagSelect>

        <div class="text-area-panel">
          <el-input
            v-model="state.params.query"
            placeholder="可以在此自由输入更多描述要求"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
          ></el-input>


          <el-button type="primary" @click="onGenerate">生成文章</el-button>
        </div>
      </div>

      <div class="select-tip-tag-panel">
        <div class="panel-title">试试这些提示词吧</div>

        <div class="tags">
          <el-button
            v-for="tag in tipTags"
            :key="tag.key"
            type="default"
            @click="onAddTag(tag.key)"
          >
            {{ tag.label }}
          </el-button>
        </div>

        <el-button type="text" @click="onTryTemplate">尝试我们提供的写作模版  ></el-button>
      </div>
      <div class="page-module">
        <div class="module-title">基础写作</div>
        <div class="write-ai-plugins">
          <div v-for="plugin in writeAIplugins" :key="plugin.key" class="plugin-item">
            <div class="main">
              <img :src="imgPath('application/write/' + plugin.icon)" alt="">
              <div class="plugin-label">{{ plugin.label }}</div>
              <div class="plugin-tip">{{ plugin.tip }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref  ,onMounted,reactive } from 'vue'
import { imgPath } from '@/utils'
import { useRouter } from 'vue-router'
import { tipTags,writeAIplugins } from './json'
import TagSelect from './components/tagSelect.vue'
import { ElMessage } from 'element-plus'
import { getAppInfoApi  } from '@/api'
import { markdownDocx, Packer } from 'markdown-docx'
import { ApiProxy, applicationApiKey } from '@/config'
import useApplication from '@/hooks/use-application'
const prefix = ApiProxy.java.ai

let router = useRouter()
let tagSelectRef = ref<any>()
let writeAction = ref('quick')
let selectedTags = ref<string[]>([ 'writeType', 'writeTitle', 'writeStyle', 'writeLimit', 'writeOutline', 'writeKeywords' ])
function onClear() {
  selectedTags.value = []
  state.params = {
    query: ''
  }
}


let state = reactive({
  params: {
    query: ''
  },
  generatorParams: {}
})

function onCreateDocument(){
  router.push({
    path: '/intelligentWriting/document',
    query: {
    }
  })
}

function onAddTag(tagKey: string) {
  if(!selectedTags.value.includes(tagKey)){
    selectedTags.value.push(tagKey)
  }else{
    ElMessage({
      message: '标签已存在',
      type: 'warning'
    })
  }
}

function onTryTemplate(){
  writeAction.value = 'template'
}


function getAppInfo(){
  getAppInfoApi().then(res => {
    if(res.code === 200){
      ElMessage({
        message: '获取应用基本信息成功',
        type: 'success'
      })
    }
  })
}


// 文本数据的传输
function onSuccess(richText: string){
  let documentId = new Date().getTime().toString()
  sessionStorage.setItem('documentId', documentId)
  sessionStorage.setItem(documentId + 'richText', richText || '')
  router.push({
    path: '/intelligentWriting/document',
    query: {
      documentId: documentId,
    }
  })
}

const userQuery = ref('请帮我写一篇以盗墓为主题的惊悚小说，篇幅为300字')

function onGenerate(){
  let tagSelect = tagSelectRef.value
  let generatorParams = tagSelect.getUseTipTags()
  Object.assign(state.params, generatorParams)
  onSend()
}

let { onSend,generatedContent } = useApplication({
  apiKey: applicationApiKey['文本生成应用'],
  apiUrl: prefix + '/v1/completion-messages',
  showLoading: true,
  params: {
    inputs: state.params,
    response_mode: 'streaming',
    user: '1'
  },
  onSuccess: onSuccess,
})


async function exportToDocx(markdownContent, filename = 'document.docx') {
  try {
    // 核心转换：将 Markdown 字符串转换为 DOCX 文档对象
    const doc = await markdownDocx(markdownContent)

    // 将文档对象转换为 Blob
    const blob = await Packer.toBlob(doc)

    // 创建下载链接并触发下载
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename // 设置下载的文件名
    document.body.appendChild(a)
    a.click()

    // 清理创建的对象 URL 和 DOM 元素
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

  } catch (error) {
    console.error('导出 DOCX 文件失败:', error)
  }
}

async function onDownload(){
  exportToDocx(generatedContent.value)
}

onMounted(async () => {
  // exportToDocx(mockAIData2)
  // generatedContent.value = await markdownDocx(mockAIData)
  // 将文档对象转换为 Blob
  // const blob = await Packer.toBlob(doc);
})

</script>

<style lang="scss" scoped>
.write-application {
  background: rgb(246, 249, 255);
  min-height: 100vh;
  padding: 0 0 0 0;
  .page-container{
    width: 1200px;
    margin: 0 auto;
    background-image: imgPathScss('application/write/banner.png');
    background-size: auto 280px;
    background-position: right top;
    background-repeat: no-repeat;
    height: 100%;
    padding-top: 100px;
  }


  .page-title{
    color: rgb(38 42 48);
    font-size: 48px;
    text-align: left;
    margin-bottom: 16px;
    font-weight: 500;
    font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';


  }
  .page-action-button{
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .page-section-title{
    text-align: left;
    span{
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      color: rgb(92 98 107);
      font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';

    }
  }
}

.application-block{
  border:  0 solid #e5e7eb;
  background: rgba($color: #e5e7eb, $alpha: .2);
  &~.application-block{
    margin-top: 16px;
  }
  .banner{
    width: 100%;
  }
}

.app-list{
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
  .app-item{
    width: 20%;
    padding: 12px 10px;
    .app-main{
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      background: white;
      position: relative;
      height: 126px;
      padding: 20px 16px;
      background: #FFFFFF;
      border: 1px solid #E9ECF0;
      border-radius: 8px;
      cursor: pointer;
        position: relative;
      height: 126px;
      padding: 20px 16px;
      background: #FFFFFF;
      border: 1px solid #E9ECF0;
      border-radius: 8px;
      &:hover{
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .app-icon{
      flex:0 0 60px;
      width: 60px;
      height: 60px;
      margin-left: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .app-info{
      flex: 1;
      .app-title{
        font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';
        font-size: 18px;
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        line-height: 1.5;
        word-break: break-all;
        color: #262A30;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .app-content{
        @include ellipsisMultiline(1)
        // word-break: break-all;
      }
    }
  }
}

.button-group{
  display: flex;
  align-items: center;
  margin-top: 12px;
  .button-item{

  }
}

.write-quick-panel{
  padding: 12px;
  border: 2px solid #9c3dff;
  border-radius: 8px;
  margin-top: 12px;
  background-image: linear-gradient(to right,#fff,#fff),linear-gradient(151deg,#22b4ff 0%,#27f 50%,#9c3dff 100%);
  position: relative;
  .clear-button{
    position: absolute;
    top: 12px;
    right: 12px;
  }
  .tip{
    display: flex;
    align-items: center;
    color: #262a30;
    font-size: 16px;
    img{
      width: 20px;
      margin-right: 8px;
    }
  }
}

.write-actions{

}

.select-tip-tag-panel{
  box-shadow: 0 2px 43px #cbb0d840;
  border-radius: 8px;
  padding: 12px;
  background: white;
  margin-top: 12px;
  .panel-title{
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    color: #000;
    font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';
  }

  .tags{
    padding: 24px 0 ;
  }
}

.page-module{

  margin: 24px 0 ;
  .module-title{
    font-weight: 500;
    font-size: 24px;
    color: #333;
  }
}

.write-ai-plugins{
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
  .plugin-item{
    width: 16.66%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 12px 6px;
    border-radius: 4px;

    .main{
      display: flex;
      flex-direction: column;
      background: white;
      padding: 12px 12px;
    border-radius: 4px;

      &:hover{
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }

      .plugin-label{
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
        margin: 6px 0;
      }
      img{
        width: 100%;
      }
    }

  }
}


.text-area-panel{
  ::v-deep(.el-textarea){
    .el-textarea__inner{
      font-size: 18px;
      background: transparent;
      border: none;
      box-shadow: none;
    }
  }
}
</style>
