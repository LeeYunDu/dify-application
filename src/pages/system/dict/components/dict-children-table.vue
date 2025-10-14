<template>
  <div class="dict-children-table-component">
    <div class="page-header">
      <el-button type="primary" @click="onAdd">新增字典项</el-button>
    </div>
    <div class="page-center">
      <div class="table-box">
        <UiTable
          v-bind="tableOptions"
          :show-page="false"
          @page-change="onPageChange"
        >
          <template #action="{$row,config}">
            <template v-for="btn in actionButtons" :key="btn.key">
              <span
                v-if="showBtns(btn.key, $row)"
                class="action-btn"
                type="text"
                @click="onAction(btn.key, $row)"
              >{{ btn.label }}</span>
            </template>
          </template>
        </UiTable>
      </div>
    </div>
  </div>
  <AddDictChildDialog
    v-model="state.dialogShow"
    :parent-row="row"
    :row="state.row"
    @reload="asyncData"
  />
</template>

<script setup lang="ts">
import { reactive,ref,computed,onMounted } from 'vue'
import { ElMessage, ElMessageBox   } from 'element-plus'
import { UiTable } from '@/components/UI/table'
import { get } from 'lodash-es'
import { getDictsApi, delDataApi } from '@/api/modules/java.system.dict'
import AddDictChildDialog from './add-dict-options-dialog.vue'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})


const emits = defineEmits(['update:modelValue','update:row'])

const row = computed(() => props.row || {})


const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '表格弹窗',
  data:{},
  row:{},
  dialogShow:false
})

let tableOptions = reactive({
  props:{
    border: false,
    height: '100%',
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  options:{
    autoScroll:false,
    pagination:{
      total:0,
      mapper:{
        currentPage:'pageNum',
      },
      props:{
        pageSize:10,
        pageNum:1
      }
    },
  },
  data:[],
  columns: [
    { label: '', key: 'null', width: '80px' },
    { label: '字典编号', key: 'dictCode', },
    { label: '字典名称', key: 'dictLabel', },
    { label: '字典键值', key: 'dictValue', },
    { label: '序号', key: 'dictSort', },
    {
      label: '操作',
      key: 'action',
      type: 'slot',
      slotName: 'action',
      width: '300px',
    },
  ]
  ,
})

const actionButtons = ref([
  { label:'编辑',key:'edit' },
  { label:'删除',key:'delete' },
])

function onAdd () {
  state.dialogShow = true
}

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'detail': true,
    'edit': true,
    'delete': true,
    'down': true,
  }
  return active[key]
}

const onAction = (key:string, row:any) => {
  state.row = row
  const actionMap:any = {
    'detail': () => ({}),
    'edit': () => {
      state.dialogShow = true
    },
    'down': () => ({}),
    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将删除字典项,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          const { status,msg } = await delDataApi(row.dictCode)
          if (!(status===200)) return ElMessage.error(msg)
          ElMessage.success('操作成功')
          asyncData()
        })
    },
  }
  actionMap[key] && actionMap[key](row)
}


function onPageChange (opts:any){
  let { params } = opts
  Object.assign(curParams.value,params)
  asyncData()
}

function onClosed () {
  emits('update:row', {})
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})


const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  const { status, msg, data }: any = await getDictsApi(row.value.dictType)
  if (!status) return ElMessage.error(msg)
  tableOptions.data = data
  tableOptions.options.pagination.total = data.length
}

onMounted(() => {
  asyncData()
})


</script>

<style lang="scss" scoped>
.dict-children-table-component{
  margin: 20px 0 20px;

  .page-header{
    .title{
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
