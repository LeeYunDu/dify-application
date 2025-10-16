import { processStreamResponse } from '@/utils/streamProcessor'
import { ApiProxy, applicationApiKey } from '@/config'
const prefix = ApiProxy.java.ai
import { onUnmounted, reactive, ref } from 'vue'
import { ElLoading } from 'element-plus'
import { get } from 'lodash-es'

export interface ApplicationOptions {
  apiKey: string,
  apiUrl: string,
  params: Record<string, any>,

  loadingText?: string,
  showLoading?: boolean,

  onSuccess?: (content: string) => void,
  onError?: (error: any) => void,
}

export default function useApplication (options: ApplicationOptions) {
  let state = reactive({
    isGenerating: false,
    usageInfo: null,
    abortController: new AbortController()
  })


  let loadingInstance = null
  let generatedContent = ref('')
  let isGenerating = ref(false)



  // 处理生成进度
  const handleProgress = (content, chunkData) => {
    generatedContent.value = content
  }

  // 处理生成完成
  const handleComplete = async (content, endData) => {
    generatedContent.value = content
    state.usageInfo = endData.metadata?.usage || null
    isGenerating.value = false
    options.onSuccess?.(content)
  }

  // 中止生成
  const abortGeneration = () => {
    if (state.abortController) {
      state.abortController.abort()
      isGenerating.value = false
    }
  }


  // 发送接口
  function sendMessageApi (data, abortController = null) {
    let fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + get(options.params, 'apiKey', options.apiKey),
      },
      body: JSON.stringify(options.params),
    }
    if (abortController) {
      fetchConfig.signal = abortController.signal
    }
    return fetch(options.apiUrl ?? prefix + '/v1/', fetchConfig)
  }

  function onSend () {
    if (loadingInstance) {
      loadingInstance.close()
    }

    if (options.showLoading) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: options.loadingText || '生成中...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    isGenerating.value = true
    sendMessageApi(options.params, state.abortController)
      .then(response => processStreamResponse(response, handleProgress, handleComplete))
      .catch(error => {
        console.error('请求失败:', error)
        isGenerating.value = false
        if (loadingInstance) {
          loadingInstance.close()
        }
        options.onError?.(error)
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
    isGenerating

  }
}