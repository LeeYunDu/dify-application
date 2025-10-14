
<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    wuser-idth="700px"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :labels="useFields"
      :model="state.params"
    >
    </UiForm>
  </SimpleDialog>
</template>

<script lang="ts" setup>
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed, onMounted  } from 'vue'
import { addFormOptions, formFields } from '../json'
import { addUserApi, updateUserApi, getUserApi } from '@/api/modules/java.system.user'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { useStore } from 'vuex'
import { listRoleApi } from '@/api/modules/java.system.role'
import { listDeptApi } from '@/api/modules/java.system.dept'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])
const formRef = ref(null)
const row = computed(() => props.row || {})
const state = reactive({
  show: computed({
    get: () => {
      // 弹窗打开时，如果row有userId，则请求详情
      if(props.modelValue && get(props.row, 'userId')){
        asyncDetailData()
      }
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: computed(() => {
    return props.row.userId ? '编辑' : '新增' + '用户'
  })  ,
  data: {},
  params:{
    sex:0,
    status:0,
    roleIds:[],
    deptId:[],
    password:'123456',
  },
  roleOptions:[],
  deptOptions:[]
})

let store = useStore()

let useFields = computed(()=>{
  let oriFields = formFields
  // 角色字段
  let roleFields = oriFields.find(item => item.key === 'roleIds')
  if(roleFields){
    roleFields.options = state.roleOptions
  }
  // 部门字段
  let deptFields = oriFields.find(item => item.key === 'deptId')
  if(deptFields){
    deptFields.options = state.deptOptions
  }

  // 编辑接口不显示密码字段
  let index = oriFields.findIndex(item => item.key === 'password')
  if(index !== -1){
    oriFields.splice(index, 1)
  }
  return oriFields
})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}


// 角色列表
async function getRoleOptions(){
  const { status, msg, rows,total } = await listRoleApi({ pageNum:1,pageSize:1000 })
  if (!(status===200)) return ElMessage.error(msg)
  state.roleOptions = rows.map(item => ({
    label: item.roleName,
    value: item.roleId
  }))
}

// 部门列表
async function getDeptOptions(){
  const { status, msg, data,total } = await listDeptApi({ pageNum:1,pageSize:1000 })
  if (!(status===200)) return ElMessage.error(msg)
  state.deptOptions = data.map(item => ({
    label: item.deptName,
    value: item.deptId
  }))
}


// 详情接口
async function asyncDetailData(){
  const { status, msg, data } = await getUserApi(get(props.row, 'userId'))
  if (!(status===200)) return ElMessage.error(msg)
  state.params = data
}

async function onConfirm (cb) {
  try {
    console.log(Object.assign(
      {},
      state.params,
      get(props.row, 'userId') && { userId: get(props.row, 'userId') } // 如果是编辑接口则添加userId
    ))

    await formRef.value?.validate()
    let handleApi = props.row.userId ? updateUserApi : addUserApi

    let params = Object.assign(
      {},
      state.params,
      get(props.row, 'userId') && { userId: get(props.row, 'userId') } // 如果是编辑接口则添加userId
    )


    const { status, msg, data } = await handleApi(params || {})
    if (!(status===200)) throw new Error(msg)

    ElMessage.success('操作成功!')
    emits('update:modelValue', false)
    // 发送指令，刷新列表
    emits('reload')
    cb()
  } catch (e) {
    console.log(e,'e')

    cb()
  }
}


onMounted(()=>{
  getRoleOptions()
  getDeptOptions()
})

</script>

<style lang="scss" scoped>

</style>
