import { ApiProxy } from '@/config'
import request from '../request'
const prefix = ApiProxy.java.main
const prefixAi = ApiProxy.java.ai

// 获取登录验证码
export function getLoginCodeApi (): Promise<any> {
  return request({
    url: prefix + '/captchaImage',
    type: 'GET',

  }, {
    headers: {
      isToken: false
    },
  })
}


// ai应用市场的登录接口
export function onLoginAiApi (params: any): Promise<any> {
  return request({
    url: prefixAi + '/console/api/login',
    type: 'POST',
    data: params
  })
}