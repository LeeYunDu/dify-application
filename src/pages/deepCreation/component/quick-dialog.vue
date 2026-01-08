<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="600px"
    body-padding="0"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <div class="quick-dialog-container">
      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">📝</div>
          <div class="section-title">写作要求</div>
        </div>

        <div class="form-grid">
          <div class="form-item">
            <div class="form-label required">文章标题</div>
            <input
              v-model="formData.title"
              class="form-input"
              placeholder="请输入文章标题"
              @input="validateField('title')"
            />
            <div v-if="errors.title" class="form-error">{{ errors.title }}</div>
          </div>

          <div class="form-item">
            <div class="form-label required">文章类型</div>
            <div class="select-wrapper">
              <select
                v-model="formData.type"
                class="form-select"
                @change="validateField('type')"
              >
                <option value="">请选择文章类型</option>
                <option value="workSummary">工作总结</option>
                <option value="workPlan">工作计划</option>
                <option value="researchReport">调研报告</option>
                <option value="speech">演讲稿</option>
                <option value="news">新闻稿</option>
                <option value="other">其他</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
            <div v-if="errors.type" class="form-error">{{ errors.type }}</div>
          </div>

          <div class="form-item">
            <div class="form-label required">文章风格</div>
            <div class="select-wrapper">
              <select
                v-model="formData.style"
                class="form-select"
                @change="validateField('style')"
              >
                <option value="">请选择文章风格</option>
                <option value="formal">正式专业</option>
                <option value="casual">轻松活泼</option>
                <option value="concise">简洁明了</option>
                <option value="detailed">详尽深入</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
            <div v-if="errors.style" class="form-error">{{ errors.style }}</div>
          </div>

          <div class="form-item">
            <div class="form-label required">字数限制</div>
            <div class="number-input-wrapper">
              <input
                v-model.number="formData.wordLimit"
                type="number"
                class="form-input"
                placeholder="1000"
                min="100"
                max="10000"
                step="100"
                @input="validateField('wordLimit')"
              />
              <span class="input-suffix">字</span>
            </div>
            <div v-if="errors.wordLimit" class="form-error">{{ errors.wordLimit }}</div>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">🎯</div>
          <div class="section-title">详细要求</div>
        </div>

        <div class="form-grid">
          <div class="form-item full-width">
            <div class="form-label">写作要求</div>
            <textarea
              v-model="formData.requirements"
              class="form-textarea"
              placeholder="请详细描述您的写作要求，例如：&#10;• 文章主题和核心观点&#10;• 重点内容方向&#10;• 目标读者群体&#10;• 特殊格式要求等"
              rows="6"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">📁</div>
          <div class="section-title">素材与参考</div>
        </div>

        <div class="form-grid">
          <div class="form-item full-width">
            <div class="form-label">文章素材</div>
            <div class="upload-area" @click="handleUpload('material')">
              <div class="upload-content">
                <div class="upload-icon">📎</div>
                <div class="upload-text">点击上传文章素材</div>
                <div class="upload-hint">支持 PDF、Word、TXT 等格式</div>
              </div>
            </div>
            <div v-if="formData.materialFiles.length > 0" class="file-list">
              <div v-for="(file, index) in formData.materialFiles" :key="index" class="file-item">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-remove" @click.stop="removeFile('material', index)">✕</span>
              </div>
            </div>
          </div>

          <div class="form-item full-width">
            <div class="form-label">参考范文</div>
            <div class="upload-area" @click="handleUpload('reference')">
              <div class="upload-content">
                <div class="upload-icon">📄</div>
                <div class="upload-text">点击上传参考范文</div>
                <div class="upload-hint">支持 PDF、Word、TXT 等格式</div>
              </div>
            </div>
            <div v-if="formData.referenceFiles.length > 0" class="file-list">
              <div v-for="(file, index) in formData.referenceFiles" :key="index" class="file-item">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-remove" @click.stop="removeFile('reference', index)">✕</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">⚙️</div>
          <div class="section-title">高级设置</div>
        </div>

        <div class="form-grid">
          <div class="form-item">
            <div class="form-label">联网搜索</div>
            <div class="switch-wrapper">
              <div
                class="switch"
                :class="{ active: formData.enableSearch }"
                @click="toggleSwitch('enableSearch')"
              >
                <div class="switch-slider"></div>
              </div>
              <span class="switch-label">{{ formData.enableSearch ? '已开启' : '已关闭' }}</span>
            </div>
            <div class="form-hint">开启后会联网搜索文章主题，获取更多相关内容</div>
          </div>

          <div class="form-item">
            <div class="form-label">分步骤生成</div>
            <div class="switch-wrapper">
              <div
                class="switch"
                :class="{ active: formData.enableStepGeneration }"
                @click="toggleSwitch('enableStepGeneration')"
              >
                <div class="switch-slider"></div>
              </div>
              <span class="switch-label">{{ formData.enableStepGeneration ? '已开启' : '已关闭' }}</span>
            </div>
            <div class="form-hint">开启后将先为您生成可自由调整的大纲，再生成匹配大纲的文档正文内容，建议长文写作时开启</div>
          </div>
        </div>
      </div>

      <div class="form-tips">
        <div class="tips-icon">💡</div>
        <div class="tips-content">
          <div class="tips-title">小贴士</div>
          <div class="tips-text">填写越详细，生成的文章质量越高哦！</div>
        </div>
      </div>
    </div>
  </SimpleDialog>
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits(['update:modelValue', 'update:row', 'success'])
const row = computed(() => props.row || {})

let router = useRouter()

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: '',
  data: {}
})

const formData = reactive({
  title: '',
  type: '',
  style: '',
  wordLimit: 1000,
  requirements: '',
  materialFiles: [],
  referenceFiles: [],
  enableSearch: false,
  enableStepGeneration: false
})

const errors = reactive({
  title: '',
  type: '',
  style: '',
  wordLimit: ''
})

function validateField(field: string) {
  switch (field) {
    case 'title':
      errors.title = formData.title.trim() ? '' : '请输入文章标题'
      break
    case 'type':
      errors.type = formData.type ? '' : '请选择文章类型'
      break
    case 'style':
      errors.style = formData.style ? '' : '请选择文章风格'
      break
    case 'wordLimit':
      if (!formData.wordLimit) {
        errors.wordLimit = '请输入字数限制'
      } else if (formData.wordLimit < 100) {
        errors.wordLimit = '字数不能少于100字'
      } else if (formData.wordLimit > 10000) {
        errors.wordLimit = '字数不能超过10000字'
      } else {
        errors.wordLimit = ''
      }
      break
  }
}

function validateAll() {
  validateField('title')
  validateField('type')
  validateField('style')
  validateField('wordLimit')
  
  return !errors.title && !errors.type && !errors.style && !errors.wordLimit
}

function onClosed () {
  resetForm()
  emits('update:row', {})
  emits('update:modelValue', false)
}

function onConfirm (cb: any) {
  cb()

  router.push({
    path: '/deepCreation/document',
    query: {
      ...formData
    }
  })

  // if (validateAll()) {
  //   emits('success', { ...formData })
  //   onClosed()
  //   cb()
  // } else {
  //   ElMessage.warning('请完善表单信息')
  //   cb()
  // }
}

function resetForm() {
  Object.assign(formData, {
    title: '',
    type: '',
    style: '',
    wordLimit: 1000,
    requirements: '',
    materialFiles: [],
    referenceFiles: [],
    enableSearch: false,
    enableStepGeneration: false
  })
  Object.assign(errors, {
    title: '',
    type: '',
    style: '',
    wordLimit: ''
  })
}

function handleUpload(type: string) {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '.pdf,.doc,.docx,.txt'

  input.onchange = (e: any) => {
    const files = Array.from(e.target.files)
    if (type === 'material') {
      formData.materialFiles.push(...files)
    } else if (type === 'reference') {
      formData.referenceFiles.push(...files)
    }
  }

  input.click()
}

function removeFile(type: string, index: number) {
  if (type === 'material') {
    formData.materialFiles.splice(index, 1)
  } else if (type === 'reference') {
    formData.referenceFiles.splice(index, 1)
  }
}

function toggleSwitch(field: string) {
  if (field === 'enableSearch') {
    formData.enableSearch = !formData.enableSearch
  } else if (field === 'enableStepGeneration') {
    formData.enableStepGeneration = !formData.enableStepGeneration
  }
}

const curParams: any = ref({
  pageNum: 1,
  pageSize: 10
})

async function asyncData () {
  const params: any = Object.assign({}, curParams.value || {})
  const { success, msg, data }: any = { success: true, msg: '', data: {} }
  if (!success) return ElMessage.error(msg)
  state.data = get(data || {}, 'list', [])
}

</script>

<style lang="scss" scoped>
.quick-dialog-container {
  padding: 32px;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  min-height: 400px;
}

.form-section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e8ecf1;
}

.section-icon {
  font-size: 24px;
  margin-right: 12px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 0.5px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-item {
  display: flex;
  flex-direction: column;
  position: relative;

  &.full-width {
    grid-column: 1 / -1;
  }
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 8px;
  letter-spacing: 0.3px;

  &.required::after {
    content: '*';
    color: #e74c3c;
    margin-left: 4px;
    font-weight: 600;
  }
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  color: #2d3748;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #a0aec0;
  }

  &:hover {
    border-color: #9c3dff;
    box-shadow: 0 0 0 3px rgba(156, 61, 255, 0.1);
  }

  &:focus {
    border-color: #9c3dff;
    box-shadow: 0 0 0 3px rgba(156, 61, 255, 0.2);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  line-height: 1.6;
}

.select-wrapper {
  position: relative;

  .form-select {
    appearance: none;
    padding-right: 40px;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239c3dff' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  .select-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    display: none;
  }
}

.number-input-wrapper {
  position: relative;

  .form-input {
    padding-right: 48px;
  }

  .input-suffix {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 14px;
    pointer-events: none;
  }
}

.form-error {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: #e74c3c;
  font-weight: 500;
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

.form-hint {
  font-size: 12px;
  color: #718096;
  margin-top: 6px;
  font-style: italic;
}

.form-tips {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin-top: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tips-icon {
  font-size: 28px;
  margin-right: 16px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.tips-content {
  flex: 1;
}

.tips-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.tips-text {
  font-size: 14px;
  opacity: 0.9;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  background: #ffffff;
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: #e74c3c;
  animation: shake 0.3s ease-in-out;
}

.upload-area {
  width: 100%;
  padding: 32px;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: #9c3dff;
    background: #f0f4ff;
    box-shadow: 0 4px 12px rgba(156, 61, 255, 0.15);
  }

  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .upload-icon {
    font-size: 48px;
    margin-bottom: 12px;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .upload-text {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
  }

  .upload-hint {
    font-size: 12px;
    color: #718096;
  }
}

.file-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #9c3dff;
    box-shadow: 0 2px 8px rgba(156, 61, 255, 0.1);
  }

  .file-name {
    flex: 1;
    font-size: 14px;
    color: #2d3748;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-left: 12px;
    border-radius: 50%;
    background: #f7fafc;
    color: #718096;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;

    &:hover {
      background: #e74c3c;
      color: #ffffff;
      transform: rotate(90deg);
    }
  }
}

.switch-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.switch {
  position: relative;
  width: 52px;
  height: 28px;
  background: #cbd5e0;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.active {
    background: linear-gradient(135deg, #9c3dff 0%, #7b2fff 100%);
    box-shadow: 0 2px 8px rgba(156, 61, 255, 0.3);
  }

  .switch-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &.active .switch-slider {
    left: 26px;
  }
}

.switch-label {
  font-size: 14px;
  color: #718096;
  transition: color 0.3s ease;

  .switch.active + & {
    color: #9c3dff;
    font-weight: 600;
  }
}
</style>
