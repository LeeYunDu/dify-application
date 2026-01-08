<template>
  <div class="outline-container">
    <div class="outline-header">
      <div class="outline-title">📋 文档大纲</div>
    </div>

    <div class="outline-content">
      <div
        v-for="(item, index) in outlineData"
        v-show="shouldShowItem(index)"
        :key="index"
        class="outline-item"
        :class="{ active: activeIndex === index, expanded: isExpanded(index) }"
        :style="{ paddingLeft: (item.level - 1) * 20 + 'px' }"
        @click="handleItemClick(item, index)"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <div class="outline-item-content">
          <span class="outline-icon">{{ item.icon }}</span>
          <span class="outline-text">{{ item.title }}</span>
          <span v-if="item.level === 1" class="expand-icon">
            {{ isExpanded(index) ? '▼' : '▶' }}
          </span>
          <button
            v-if="hoverIndex === index && item.level !== 1"
            class="expand-btn"
            @click.stop="handleExpand(item)"
          >
            ✍️ 扩写
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface OutlineItem {
  title: string
  level: number
  icon: string
  id?: string
  parentId?: string
}

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['heading-click', 'expand'])

const outlineData = ref<OutlineItem[]>([])
const activeIndex = ref(-1)
const expandedItems = ref<Set<string>>(new Set())
const hoverIndex = ref(-1)

const mockOutlineData: OutlineItem[] = [
  { title: '一、引言', level: 1, icon: '📌', id: 'h1-1' },
  { title: '1.1 研究背景', level: 2, icon: '📍', parentId: 'h1-1' },
  { title: '1.2 研究目的', level: 2, icon: '📍', parentId: 'h1-1' },
  { title: '1.3 研究意义', level: 2, icon: '📍', parentId: 'h1-1' },
  { title: '二、文献综述', level: 1, icon: '📌', id: 'h1-2' },
  { title: '2.1 国内外研究现状', level: 2, icon: '📍', parentId: 'h1-2' },
  { title: '2.2 理论基础', level: 2, icon: '📍', parentId: 'h1-2' },
  { title: '2.3 相关技术', level: 2, icon: '📍', parentId: 'h1-2' },
  { title: '三、研究方法', level: 1, icon: '📌', id: 'h1-3' },
  { title: '3.1 研究设计', level: 2, icon: '📍', parentId: 'h1-3' },
  { title: '3.2 数据采集', level: 2, icon: '📍', parentId: 'h1-3' },
  { title: '3.3 数据分析', level: 2, icon: '📍', parentId: 'h1-3' },
  { title: '四、研究结果', level: 1, icon: '📌', id: 'h1-4' },
  { title: '4.1 数据统计', level: 2, icon: '📍', parentId: 'h1-4' },
  { title: '4.2 结果分析', level: 2, icon: '📍', parentId: 'h1-4' },
  { title: '4.3 结果讨论', level: 2, icon: '📍', parentId: 'h1-4' },
  { title: '五、结论与展望', level: 1, icon: '📌', id: 'h1-5' },
  { title: '5.1 主要结论', level: 2, icon: '📍', parentId: 'h1-5' },
  { title: '5.2 创新点', level: 2, icon: '📍', parentId: 'h1-5' },
  { title: '5.3 未来展望', level: 2, icon: '📍', parentId: 'h1-5' },
  { title: '六、参考文献', level: 1, icon: '📌', id: 'h1-6' },
  { title: '七、致谢', level: 1, icon: '📌', id: 'h1-7' }
]

function parseOutline(content: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const outline: OutlineItem[] = []

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    const icon = level === 1 ? '📌' : level === 2 ? '📍' : '•'
    outline.push({
      title: heading.textContent || '',
      level,
      icon,
      id: `heading-${index}`
    })
  })

  outlineData.value = outline
}

function handleMouseEnter(index: number) {
  hoverIndex.value = index
}

function handleMouseLeave() {
  hoverIndex.value = -1
}

function handleExpand(item: OutlineItem) {
  emit('expand', item)
}

function handleItemClick(item: OutlineItem, index: number) {
  activeIndex.value = index
  if (item.level === 1) {
    toggleItem(index)
  }
  scrollToHeading(item, index)
}

function scrollToHeading(item: OutlineItem, index: number) {
  emit('heading-click', item)
}

function expandAll() {
  const level1Items = outlineData.value.filter(item => item.level === 1)
  level1Items.forEach(item => {
    if (item.id) {
      expandedItems.value.add(item.id)
    }
  })
}

function collapseAll() {
  expandedItems.value = new Set()
}

function toggleItem(index: number) {
  const item = outlineData.value[index]
  if (item.level === 1 && item.id) {
    if (expandedItems.value.has(item.id)) {
      expandedItems.value.delete(item.id)
    } else {
      expandedItems.value.add(item.id)
    }
  }
}

function isExpanded(index: number): boolean {
  const item = outlineData.value[index]
  if (item.level === 1 && item.id) {
    return expandedItems.value.has(item.id)
  }
  return true
}

function shouldShowItem(index: number): boolean {
  const item = outlineData.value[index]
  if (item.level === 1) {
    return true
  }
  if (item.parentId) {
    return expandedItems.value.has(item.parentId)
  }
  return true
}

onMounted(() => {
  if (props.content) {
    parseOutline(props.content)
  } else {
    outlineData.value = mockOutlineData
  }
})

onUnmounted(() => {
})

watch(() => props.content, (newContent) => {
  if (newContent) {
    parseOutline(newContent)
  }
})
</script>

<style scoped lang="scss">
.outline-container {
  width: 280px;
  height: 100%;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.outline-header {
  padding: 20px;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
}

.outline-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.outline-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  font-size: 12px;
  color: #667eea;
  background: transparent;
  border: 1px solid #667eea;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: #ffffff;
  }
}

.outline-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
}

.outline-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  margin-bottom: 4px;
  position: relative;

  &:hover {
    background: #e9ecef;
    border-left-color: #667eea;
  }

  &.active {
    background: #e8f0fe;
    border-left-color: #667eea;
    color: #667eea;
    font-weight: 500;
  }

  &.expanded {
    .expand-icon {
      transform: rotate(180deg);
    }
  }
}

.outline-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.outline-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.outline-text {
  font-size: 14px;
  color: #495057;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.expand-icon {
  font-size: 10px;
  color: #667eea;
  transition: transform 0.3s ease;
  margin-left: 4px;
}

.expand-btn {
  padding: 4px 8px;
  font-size: 12px;
  color: #667eea;
  background: #f0f4ff;
  border: 1px solid #667eea;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 8px;
  white-space: nowrap;

  &:hover {
    background: #667eea;
    color: #ffffff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
