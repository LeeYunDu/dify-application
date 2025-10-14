<template>
  <div class="page-container">
    <img class="img-block" :src="imgPath('home/block-11.png')" alt="">
    <img
      class="img-block drawer-click"
      :src="imgPath('home/block-1.png')"
      alt=""
      @click="onShow"
    >
    <div class="page-title">智能体构建</div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <img class="tab-icon" :src="imgPath(item.icon)" alt="">
      </el-tab-pane>
    </el-tabs>
    <img class="img-block" :src="imgPath('home/block-6.png')" alt="">
    <img class="img-block" :src="imgPath('home/block-7.png')" alt="">
    <img class="img-block" :src="imgPath('home/block-8.png')" alt="">
    <img class="img-block" :src="imgPath('home/block-9.png')" alt="">
    <img
      class="img-block drawer-click"
      :src="imgPath('home/block-10.png')"
      alt=""
      @click="onShow"
    >
  </div>

  <SimpleDrawer
    v-model="state.show"
    title="咨询"
    :footer-show="true"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :model="state.params"
    >
    </UiForm>
  </SimpleDrawer>
</template>


<script lang="ts" setup>
import { imgPath } from '@/utils'
import { ref,reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { FieldItem } from '@/typings/items'
import SimpleDrawer from '@/components/simple-components/simple-drawer/index.vue'
import { UiForm } from '@/components/UI/form'
import { addFormOptions } from './json'
import { ElMessage } from 'element-plus'

let state = reactive({
  show:false
})

const activeName = ref('1')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

function onShow(){
  console.log(11)

  state.show = true
}


let tabList = ref<FieldItem[]>([
  {  label: '多模型灵活切换',  key: '1' ,icon:'home/block-12.png',path:'' },
  {  label: '多类知识库挂载',  key: '2' ,icon:'home/block-2.png',path:'' },
  {  label: '预置海量开发插件',  key: '3' ,icon:'home/block-3.png',path:'' },
  {  label: '可视化工作流构建能力',  key: '4' ,icon:'home/block-4.png',path:'' },
])


async function onConfirm (cb) {
  try {

    ElMessage.success('留言成功!')
    state.show = false
    // 发送指令，刷新列表
    cb()
  } catch (e) {
    cb()
  }
}

function onClosed () {
  state.show = false
}

</script>


<style lang="scss" scoped>

.img-block{
  width: 100%;
  &.drawer-click{
    cursor: pointer;
  }
}

.page-container{
  ::v-deep(.el-tabs){
    .el-tabs__nav-scroll{
      display: flex;
      justify-content: center;
    }
    .el-tabs__item{
      font-size: 16px!important;
      padding-bottom: 12px;
    }
  }

}
 .page-title{
  font-family: PingFang SC;
  font-size:32px;
  width: 100%;
  color: #333;
  line-height: 155px;
  height: 155px;
  font-weight: 600;
  text-align: center;
}

.tab-icon{
  width: 100%;
}
</style>
