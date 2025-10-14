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
    />
  </section>
</template>

<script setup>

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ApiProxy } from '@/config/index.ts'
import { computed,inject,ref,shallowRef,onBeforeUnmount,onMounted } from 'vue'
import { useStore } from 'vuex'
import aiMenuConf from './plugins/ai-menu.ts'
import aiButtonConf from './plugins/ai-button.ts'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emits = defineEmits(['update:modelValue'])

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
  autoFocus: true
}))

// -------- fn --------

const mode = ref('default')

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const valueHtml = computed({
  get () {
    console.log(props.modelValue,'props.modelValue')
    return props.modelValue
  },
  set (val) {
    emits('update:modelValue', val)
  }
})

const handleCreated = editor => {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onMounted(() => {

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
