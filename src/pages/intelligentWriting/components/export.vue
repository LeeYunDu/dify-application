
<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="50%"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :model="state.params"
    >
    </UiForm>
  </SimpleDialog>
</template>

<script lang="ts" setup>
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed } from 'vue'
import { exportToDocx } from '@/utils/htmlToDocx'

import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  content: { type: String, default: '' },
  title: { type: String, default: '导出文档' }
})
// 表单查询字段配置
const formFields = [
  {
    label: '导出标题', key: 'title', type: 'input',
    props: {
      type:'text',
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 50,
      'show-word-limit': true,
      placeholder: '请输入标题,限50字内',
    },
  },
  {
    label: '导出格式', key: 'exportType', type: 'radio-group', options: [
      { label: 'docx', value: 'docx' },
    ],
    props: {
      formItem: { required: true, },
      disabled: true
    },
    child: { type: 'radio' }
  },
]
const addFormOptions = {
  labels: formFields,
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
}

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])
const formRef = ref(null)
const row = computed(() => props.row || {})
const state = reactive({
  show: computed({
    get: () => {
      // 弹窗打开时，如果row有id，则请求详情
      if(props.modelValue && get(props.row, 'id')){
        asyncDetailData()
      }
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title:'导出文档',
  data: {},
  params:{
    title:computed(()=>props.title || '导出文档'),
    exportType:'docx',
  }
})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

// 详情接口
async function asyncDetailData(){
  let useApi = (id:any)=>{}
  const { status, msg, data } = await useApi(get(props.row, 'id'))
  if (!(status===200)) return ElMessage.error(msg)
  state.data = data
}

async function onConfirm (cb) {
  try {
    function useApi (params:any){} // 到时候删除
    await formRef.value?.validate()

    exportToDocx(props.content, state.params.title || '文档.docx')
    ElMessage.success('导出成功!')
    emits('update:modelValue', false)
    // 发送指令，刷新列表
    emits('reload')
    cb()
  } catch (e) {
    cb()
  }
}


</script>

<style lang="scss" scoped>

</style>
