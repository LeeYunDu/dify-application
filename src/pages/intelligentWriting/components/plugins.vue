<template>
  <div class="plugins-container">
    <div class="plugins-wrapper">
      <div
        v-for="plugin in plugins"
        :key="plugin.id"
        class="plugin-item"
        @click="handlePluginClick(plugin)"
      >
        <div class="plugin-icon">
          <svg
            v-if="plugin.svgIcon"
            class="svg-icon"
            :width="plugin.iconSize || 20"
            :height="plugin.iconSize || 20"
            viewBox="0 0 1024 1024"
          >
            <path :d="plugin.svgIcon" fill="currentColor" />
          </svg>
          <img
            v-else
            :src="plugin.icon"
            alt="{{ plugin.name }}"
            class="img-icon"
          />
        </div>
        <div class="plugin-name">{{ plugin.name }}</div>
      </div>
    </div>

    <!-- 插件面板 - 默认隐藏，点击插件时显示具体功能 -->
    <div v-if="activePlugin" class="plugin-panel">
      <div class="plugin-panel-header">
        <h3>{{ activePlugin.name }}</h3>
        <button class="close-btn" @click="closePluginPanel">×</button>
      </div>
      <div class="plugin-panel-content">
        <!-- 插件功能的具体实现可以在这里添加 -->
        <div class="plugin-placeholder">
          插件功能实现区域
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 插件配置类型定义
interface PluginConfig {
  id: string
  name: string
  icon?: string // 图标路径
  svgIcon?: string // SVG路径数据
  iconSize?: number
  handler?: () => void // 插件功能处理函数
}

// 响应式数据
const activePlugin = ref<PluginConfig | null>(null)

// 插件配置数据
const plugins = reactive<PluginConfig[]>([
  {
    id: 'navigator',
    name: '领航员',
    svgIcon: 'M512 0C229.27 0 0 229.27 0 512s229.27 512 512 512 512-229.27 512-512S794.73 0 512 0zm0 928C282.53 928 96 741.47 96 512S282.53 96 512 96s416 186.53 416 416-186.53 416-416 416z'
  },
  {
    id: 'template',
    name: '模板',
    svgIcon: 'M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z'
  },
  {
    id: 'polishing',
    name: '润色',
    svgIcon: 'M877.5 296.4L636.9 64.9c-6-6-14.1-9.4-22.5-9.4h-51.5c-8.5 0-16.6 3.4-22.6 9.4L146.5 296.4c-11.1 11.1-11.9 28.5-1.9 41.2l12.7 18.3c10 14.4 31.2 17.6 45.6 7.6l100.8-70.5v293c0 21.4 25.9 32.1 40.9 16.9l32.4-32.4c12.5-12.5 32.8-12.5 45.3 0l40 40c12.5 12.5 32.8 12.5 45.3 0l40-40c12.5-12.5 32.8-12.5 45.3 0l40 40c12.5 12.5 32.8 12.5 45.3 0l32.4 32.4c15 15.2 40.9 4.5 40.9-16.9V312.1l100.4 70.5c14.4 10 35.6 6.9 45.6-7.6l12.7-18.3c10-12.7 9.2-30.1-1.9-41.2zM512 468c-24.3 0-44-19.7-44-44s19.7-44 44-44 44 19.7 44 44-19.7 44-44 44zm-64 256c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z'
  },
  {
    id: 'continue-writing',
    name: '续写',
    svgIcon: 'M928 448H768v352H192V128h192V32H64C28.7 32 0 60.7 0 96v832c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64h-64v320z'
  },
  {
    id: 'expand',
    name: '扩写',
    svgIcon: 'M64 32C28.7 32 0 60.7 0 96v832c0 35.3 28.7 64 64 64h448V896H64V96h448V32H64zm704 192V32h-64v192h-192v64h192v192h64V320h192v-64H768z'
  },
  {
    id: 'summary',
    name: '摘要',
    svgIcon: 'M904 512H544V152c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v360H120c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h360v360c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V568h360c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z'
  },
  {
    id: 'correction',
    name: '纠错',
    svgIcon: 'M877.1 485.2L549.3 157.4c-8.1-8.1-21.1-8.1-29.2 0l-85.8 85.8 175 175 368.6-368.7c4.6-4.6 4.6-12.2 0-16.8l-60.1-60.1c-4.6-4.6-12.2-4.6-16.8 0L741.2 278.7l-175-175L242.5 372.1c-25.8 25.8-25.8 67.6 0 93.4l127.1 127.1c25.8 25.8 67.6 25.8 93.4 0L903.9 548.6c25.8-25.8 25.8-67.6 0-93.4zM115.9 824.6L25.4 915.2c-15.8 15.8-4.6 41.5 17.9 41.5h91.5l103.9-103.9-56.7-56.7c-30.1-30.1-78.8-30.1-109-0l-41.1 41-1.3-1.3zM272 456c0-4.4-3.6-8-8-8s-8 3.6-8 8v128c0 4.4 3.6 8 8 8s8-3.6 8-8V456zm144-8c-4.4 0-8 3.6-8 8v184c0 4.4 3.6 8 8 8s8-3.6 8-8V456c0-4.4-3.6-8-8-8zm144 0c-4.4 0-8 3.6-8 8v240c0 4.4 3.6 8 8 8s8-3.6 8-8V456c0-4.4-3.6-8-8-8z'
  }
])

// 处理插件点击事件
const handlePluginClick = (plugin: PluginConfig) => {
  // 如果有自定义处理器，则调用
  if (plugin.handler) {
    plugin.handler()
  } else {
    // 否则显示插件面板
    activePlugin.value = plugin
  }
}

// 关闭插件面板
const closePluginPanel = () => {
  activePlugin.value = null
}


</script>

<style scoped>
/* 插件容器 - 固定在页面右侧 */
.plugins-container {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
}

/* 插件列表包装器 */
.plugins-wrapper {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 12px 4px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

/* 插件项 */
.plugin-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #666;
}

/* 插件图标 */
.plugin-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.svg-icon,
.img-icon {
  width: 100%;
  height: 100%;
}

/* 插件名称 */
.plugin-name {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  text-align: center;
}

/* 插件项悬停效果 */
.plugin-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}

/* 插件面板 */
.plugin-panel {
  position: fixed;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  width: 360px;
  max-height: 600px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e8e8e8;
  overflow: hidden;
  z-index: 1001;
  animation: slideIn 0.3s ease;
}

/* 插件面板头部 */
.plugin-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fafafa;
}

.plugin-panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 关闭按钮 */
.close-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

/* 插件面板内容 */
.plugin-panel-content {
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
}

/* 插件功能占位符 */
.plugin-placeholder {
  padding: 40px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}

/* 滑入动画 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .plugins-container {
    right: 10px;
  }

  .plugin-panel {
    width: calc(100vw - 100px);
    right: 60px;
  }
}
</style>
