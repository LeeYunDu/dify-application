// 传输模式枚举
export enum ResponseMode {
  // 阻塞式
  Blocking = 'blocking',
  // 流式
  Streaming = 'streaming',
}

export interface TextMessageDTO {
  inputs: {
    [x: string]: string
  },
  response_mode: string
  user: string
  files?: any[]
}
