<template>
  <div class="write-application">
    <div class="page-container">
      <div class="page-title" @click="getAppInfo">
        <span>深度创作·专业模版AI写作</span>
      </div>
      <div class="page-section-title">
        <span>专注于生成高质量、结构化且内容丰富的长文本文章</span>
      </div>

      <div class="quickly-write">
        <div class="quick-item" v-for="item in quicklyWrite" :key="item.title"
            @click="state.show = true"
        
        >
         <div class="info">
           <div class="title">{{item.title}}</div>
          <div class="quick-content">{{item.content}}</div>
         </div>
         <img :src="imgPath(item.icon)" class="icon" alt="">
        </div>
      </div>
      
      
      <div class="page-module">
        <div class="module-title">创作历史</div>
        <div class="write-ai-plugins">
          <div 
            v-for="plugin in writeHistory" :key="plugin.title" class="plugin-item"
          >
            <div class="main">
              <div class="plugin-label">{{ plugin.title }}</div>
              <div class="plugin-content">{{ plugin.content }}</div>
               <div class="plugin-footer">
                <div class="write-status">已完成</div>
                <div class="write-time">2025-01-05</div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>

  <QuickDialog  v-model="state.show" />
</template>

<script setup lang="ts">
import { ref  ,onMounted,reactive } from 'vue'
import { useRouter } from 'vue-router'
import { markdownDocx, Packer } from 'markdown-docx'
import { ApiProxy, applicationApiKey } from '@/config'
import useApplication from '@/hooks/use-application'
import { imgPath } from '@/utils'

import QuickDialog from '@/pages/deepCreation/component/quick-dialog.vue'

const prefix = ApiProxy.java.ai

let router = useRouter()
let tagSelectRef = ref<any>()
let writeAction = ref('quick')
let selectedTags = ref<string[]>([ 'writeType', 'writeTitle', 'writeStyle', 'writeLimit', 'writeOutline', 'writeKeywords' ])


let   writeHistory =  [
    {
      title:'供电服务指挥分中',
      content:'供电服务指挥分中是指在供电系统中，为了确保供电的稳定性和可靠性，对供电设备进行指挥和管理的分中单位。它负责监控和管理供电系统中的各种设备，包括电源、变压器、开关、断路器等。'
    },
    {
      title:'2025年3月份月度工作总结报告',
      content:'2025年3月份，供电服务指挥分中负责监控和管理供电系统中的各种设备，包括电源、变压器、开关、断路器等。在这一个月中，分中单位负责协调和指挥各种设备的运行，确保供电的稳定性和可靠性。'
    },
    {
      title:'2025年5月份工作总结讲话稿',
      content:'2025年5月份，供电服务指挥分中负责监控和管理供电系统中的各种设备，包括电源、变压器、开关、断路器等。在这一个月中，分中单位负责协调和指挥各种设备的运行，确保供电的稳定性和可靠性。'
    }
  ]

let quicklyWrite = [
  {
    title:'讲话稿写作',
    content:'主要用于各种会议、活动、演讲等场合',
    icon:'/deepCreation/type-1.png'
  },
  {
    title:'研究报告写作',
    content:'主要用于研究项目、实验报告、技术文档等场景',
    icon:'/deepCreation/type-2.png'
  },
  {
    title:'创意写作',
    content:'主要用于创作原创的文章、小说、诗歌等',
    icon:'/deepCreation/type-3.png'
  }
]

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
  show:false,
  generatorParams: {}
})



function onTryTemplate(){
  writeAction.value = 'template'
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
    font-weight: 600;
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
    width: 25%;
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
       .plugin-footer{
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 12px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.8);

        .write-status{
          color: #9c3dff;
        }
      }

    .plugin-content{
      font-size: 14px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.8);
      @include ellipsisMultiline(3)
    }

      &:hover{
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }

      .plugin-label{
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-size: 18px;
        margin: 6px 0;
      }
      img{
        width: 100%;
      }
    }

  }
}


.quickly-write{
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
  margin-top: 80px;

  .quick-item{
    width: 33.33%;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .icon{
      width: 100px;
      height: 50px;
      margin-left: 12px;
      margin-bottom: 12px;
    }
    &:hover{
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      background: white;
    }

    .info{
      .title{
        color: #262a30;
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 12px;
        font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';
      }
    }
  }
}
</style>
