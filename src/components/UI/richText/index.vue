<template>
  <section class="editor-input">
  
    <Toolbar
      class="ToolBar"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 100%; overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="onChange"
      @on-blur="onBlur"
    >

    </Editor>
    <Polish :editor="editorRef" v-if="editorRef" ref="polishRef" @mousedown.stop @click.stop />

  </section>
</template>

<script setup>

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ApiProxy } from '@/config/index.ts'
import { computed,inject,ref,shallowRef,onBeforeUnmount,onMounted } from 'vue'
import { useStore } from 'vuex'
import { throttle } from 'lodash-es'
import PubSub from 'pubsub-js'
import Polish from './components/polish.vue'

import aiMenuConf from './plugins/ai-menu.ts'
import aiButtonConf from './plugins/ai-button.ts'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emits = defineEmits(['update:modelValue'])

const polishRef = ref(null)

let state = reactive({
  selectContent: '',
  
})  
const store = useStore()

// -------- inject --------
const message = inject('message')
// -------- ref --------

// -------- computed --------
const token = computed(() => store.getters.loginInfo?.token)

const toolbarConfig = computed(() => ({
  excludeKeys: ['insertVideo','uploadVideo','editVideoSize','group-video','ai-key'],
  insertKeys:{
    // index:1,
    keys:['AiMenu','AiButton']
  }
}))

const editorConfig = computed(() => ({
  placeholder: '请输入内容...',
  MENU_CONF:{
    // 配置默认字号
    // 配置上传图片
    uploadImage:{
      // 请求路径
      server: `${ApiProxy.java.main}/common/upload`,
      // 后端接收的文件名称
      fieldName: 'file',
      maxFileSize: 10 * 1024 * 1024, // 10M
      // 上传的图片类型
      allowedFileTypes: ['image/*'],
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 0,
      // 自定义插入返回格式【后端返回的格式】
      customInsert (res, insertFn) {
        const { fileName,url,originalFilename } = res
        insertFn(url,originalFilename,'#')
        // resultList.length && resultList.forEach(file => {
        //   insertFn(file.fileUrl,file.originalFilename,'#')
        // })
      },
      // 携带的数据
      meta: {
        Authorization: 'Bearer' + token.value
      },
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: true,
      // 单个文件上传成功之后
      onSuccess (file, res) {
        message.success(`${file.name} 上传成功`)
      },
      // 单个文件上传失败
      onFailed (file, res) {
        message.error(`${file.name} 上传失败`)
      },
      // 上传错误，或者触发 timeout 超时
      onError (file, err, res) {
        message.error(`${file.name} 上传出错`)
      },
    }
  },
  autoFocus: true,
  hoverbarKeys:{
    text:{
      menuKeys: [
        'bold',        // 加粗
        'italic',      // 斜体
        'underline',   // 下划线
        'through',     // 删除线
        'code',        // 行内代码
        'clearStyle',  // 清除格式
        '|',           // 菜单分组分割线（可选）
        'fontSize',    // 字体大小
        'fontFamily',  // 字体
        'color',       // 文字颜色
        'bgColor',      // 背景颜色
        'AiMenu'
      ]
    }
  }
}))

// -------- fn --------

const mode = ref('default')

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const valueHtml = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emits('update:modelValue', val)
  }
})

const handleCreated = editor => {
  editorRef.value = editor
  // 监听选区变化事件
}

const onBlur = (editor) => {
  // polishRef.value.showPolish()
}



let  onChange  = (editor) => {
  throttleChange('string')
}



onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

/**
 * 获取选中的文本
 * @param {string} selectType - 选中的文本类型，默认是字符串,还有种是JSON格式
 * @returns {string} - 选中的文本
 */
function getSelectionText(selectType = 'string') {
  const editor = editorRef.value
  if (editor == null) return ''
  if(selectType === 'json'){
    state.selectContent = editor.getFragment()
    return editor.getFragment()
  }else{
    state.selectContent = editor.getSelectionText()
    return editor.getSelectionText()
  }
}

let throttleChange = throttle(getSelectionText, 3000)

/**
 * 获取选中的元素（根据html标签）
 * @param {string} type - 选中的元素类型，例如：'p'、'h1'等
 * @returns {Array} - 选中的元素数组
 */
function getElemsByType(type) {
  const editor = editorRef.value
  if (editor == null) return []
  return editor.getElemsByType(type)
}

/**
 * 在选区插入文本
 * @param {string} text - 要插入的文本
 */
function insertTextAtSelection(text) {
  const editor = editorRef.value
  if (editor == null) return
  editor.insertText(text)
}

PubSub.subscribe('ai-menu', (msg, data) => {
  const { editor, eventKey,editContent,content } = data
  
  switch (eventKey) {
    case 'polish':
      polishRef.value.init({
        content:content,
        editContent:editContent
      })
      break
    case 'optimize':
      editor.insertText('优化')
      break
  }
})


onMounted(() => {

})
onUnmounted(() => {
  PubSub.unsubscribe('ai-menu')
})

defineExpose({
  // ref
  editor: editorRef,

  // 方法
  getSelectionText,
  getElemsByType,
  insertTextAtSelection
})

</script>

<style lang="scss" scoped>
.editor-input {
  border: 1px solid #ccc;
  z-index: 3;
  height: 100%;

  .ToolBar{
    border: 1px solid #ccc;
    margin: 10px 15%;
    border: none;
    border-radius: 10px;
    box-shadow: none;
    box-shadow: 0 0 10px 0 #0000000f;
    height: 40px;
    margin: 10px auto;
    max-width: 1500px;
    padding: 0 16px;
  }
}
</style>
