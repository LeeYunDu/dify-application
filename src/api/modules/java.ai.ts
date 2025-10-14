import { ApiProxy, applicationApiKey } from '@/config'
import request from '../request'
import { TextMessageDTO } from './DTO/ai'
import axios from 'axios'

const prefix = ApiProxy.java.ai

// 获取应用基本信息
export function getAppInfoApi (): Promise<any> {
  return request({
    url: prefix + '/console/api/info',
    type: 'GET',
  })
}

// 文本类交互应用-发送消息接口
export function sendMessageApi (params: TextMessageDTO) {
  return axios.post(prefix + '/v1/completion-messages', params, {
    headers: {
      'Authorization': 'Bearer ' + applicationApiKey['文本生成应用'],
      'Content-Type': 'application/json',
    },
    // cancelToken: cancelTokenSource.token,
    responseType: 'stream' // 重要：确保axios返回流式响应
  })
  return request({
    url: prefix + '/v1/completion-messages',
    type: 'POST',
    params: params
  },
    {
      headers: {
        'Authorization': 'Bearer ' + applicationApiKey['文本生成应用'],
        'Content-Type': 'application/json',
      },
      responseType: 'stream' // 重要：确保axios返回流式响应
    })
}
