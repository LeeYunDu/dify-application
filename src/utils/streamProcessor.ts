// streamProcessor.js

/**
 * 处理AI写作流式响应数据
 * @param {Response} response - fetch API的响应对象
 * @param {Function} onProgress - 进度回调函数，接收完整文本内容
 * @param {Function} onComplete - 完成回调函数
 * @returns {Promise<string>} 完整的响应文本
 */
export async function processStreamResponse (response, onProgress = null, onComplete = null) {
  console.log(response, 'response');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let fullText = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // 解码数据块
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // 按行分割处理（SSE格式通常以\n\n分隔）
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || ''; // 保留未完成的数据

      for (const line of lines) {
        if (line.trim() === '') continue;

        try {
          // 解析JSON数据
          const jsonData = JSON.parse(line.replace(/^data: /, ''));

          // 根据你提供的格式处理数据
          if (jsonData.event === 'message' && jsonData.answer) {
            fullText += jsonData.answer;

            // 调用进度回调
            if (onProgress) {
              onProgress(fullText, jsonData);
            }
          }

          // 处理结束事件
          if (jsonData.event === 'message_end') {
            if (onComplete) {
              onComplete(fullText, jsonData);
            }
            return fullText;
          }
        } catch (error) {
          console.warn('解析流数据失败:', error, '原始数据:', line);
        }
      }
    }

    return fullText;
  } finally {
    reader.releaseLock();
  }
}



