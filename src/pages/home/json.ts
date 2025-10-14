import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData
import { checkLinkWay, checkNumber } from '@/utils/validator'

// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: '文本输入框', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
      placeholder: '请输入内容',
    },
  },
  {
    label: '选择器', key: 'y2', type: 'select', options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    }
  },
  {
    label: '', type: 'slot', slotName: 'button', key: '', props: {
      gridItem: { span: 4 },
      formItem: {
        labelWidth: 0
      }
    }
  }
]

// 表单配置
export const tableQueryFormOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 6 }
  }
}

export const tableColumn: FieldItem[] = [
  { label: '多选框', type: 'selection', key: 'checkbox-group', width: '100px' },
  { label: '序号', type: 'index', key: 'index', width: '100px' },
  { label: '文本字段', key: 'y1', },
  { label: '字典字段', key: 'chooseType12Name', transform: '12.dist' },
  { label: '时间字段', key: 'y3', transform: '{y}-{m}-{d}' },
  { label: '插槽字段', key: 'y4', type: 'slot', slotName: 'y4' },
  {
    label: '函数字段',
    key: 'y5',
    transform: (data: any) => {
      return data == 0 ? '否' : '是'
    }
  },
  {
    label: '弹窗操作事件',
    key: 'dialogAction',
    type: 'slot',
    slotName: 'dialogAction',
    width: '400px',
  },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '210px',
  },
]


export const formFields = [
  {
    label: '请留下您的需求、联系方式和公司名称，客服姐姐会飞速联系您噢！', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      placeholder: '请输入您想要咨询的问题噢~',
      type: 'textarea',
      rows: 5
    },
  },
  {
    label: '手机号', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
    },
  },
  {
    label: '姓名', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
    },
  },
  {
    label: '公司名称', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
    },
  },
]


export const addFormOptions = {
  labels: formFields,
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'top',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
}
