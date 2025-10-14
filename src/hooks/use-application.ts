import { processStreamResponse } from '@/utils/streamProcessor'
import { ApiProxy, applicationApiKey } from '@/config'
const prefix = ApiProxy.java.ai
import { onUnmounted, reactive } from 'vue'
import { ElLoading } from 'element-plus'

export interface ApplicationOptions {
  apiKey: string,
  apiUrl: string,
  params: Record<string, any>,
  onSuccess?: (content: string) => void,
}

export default function useApplication (options: ApplicationOptions) {
  let state = reactive({
    isGenerating: false,
    usageInfo: null,
    abortController: new AbortController()
  })


  let loadingInstance = null
  let generatedContent = ref('')



  // 处理生成进度
  const handleProgress = (content, chunkData) => {
    generatedContent.value = content
  }

  // 处理生成完成
  const handleComplete = async (content, endData) => {
    generatedContent.value = content
    state.usageInfo = endData.metadata?.usage || null
    state.isGenerating = false
    options.onSuccess?.(content)
  }

  // 中止生成
  const abortGeneration = () => {
    if (state.abortController) {
      state.abortController.abort()
      state.isGenerating = false
    }
  }


  // 发送接口
  function sendMessageApi (data, abortController = null) {
    let fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + options.apiKey,
      },
      body: JSON.stringify(options.params),
    }
    if (abortController) {
      fetchConfig.signal = abortController.signal
    }
    return fetch(options.apiUrl ?? prefix + '/v1/', fetchConfig)
  }

  function onSend () {
    console.log(options.params);
    if (loadingInstance) {
      loadingInstance.close()
    }
    loadingInstance = ElLoading.service({
      lock: true,
      text: '生成中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    state.isGenerating = true
    sendMessageApi(options.params, state.abortController)
      .then(response => processStreamResponse(response, handleProgress, handleComplete))
      .catch(error => {
        console.error('请求失败:', error)
        state.isGenerating = false
        if (loadingInstance) {
          loadingInstance.close()
        }
      })
  }

  onUnmounted(() => {
    abortGeneration()
    if (loadingInstance) {
      loadingInstance.close()
    }
  })

  return {
    onSend,
    onStop: abortGeneration,

    generatedContent,
  }
}